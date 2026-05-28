import { readJsonFile, writeJsonFile } from "./server-storage";
import { Review, ReviewPublic, ReviewStatus } from "./types";

type ReviewsStore = { reviews: Review[] };

const FILE = "reviews.json";

export function coordsFromId(id: string): { lat: number; lng: number } {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  const lat = ((Math.abs(hash) % 12000) / 100) - 60;
  const lng = ((Math.abs(hash >> 8) % 36000) / 100) - 180;
  return { lat, lng };
}

export function toPublicReview(review: Review): ReviewPublic {
  return {
    id: review.id,
    name: review.name,
    avatar: review.avatar,
    rating: review.rating,
    message: review.message,
    createdAt: review.createdAt,
    lat: review.lat,
    lng: review.lng,
  };
}

async function readStore(): Promise<ReviewsStore> {
  return readJsonFile<ReviewsStore>(FILE, { reviews: [] });
}

async function writeStore(store: ReviewsStore): Promise<void> {
  await writeJsonFile(FILE, store);
}

export async function getAllReviews(): Promise<Review[]> {
  const store = await readStore();
  return store.reviews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getApprovedReviews(): Promise<ReviewPublic[]> {
  const reviews = await getAllReviews();
  return reviews
    .filter((r) => r.status === "approved")
    .map(toPublicReview);
}

export async function addReview(input: {
  name: string;
  email: string;
  avatar?: string;
  rating: number;
  message: string;
}): Promise<Review> {
  const store = await readStore();
  const id = `rev_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const { lat, lng } = coordsFromId(id);

  const review: Review = {
    id,
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    avatar: input.avatar?.trim() || undefined,
    rating: Math.min(5, Math.max(1, Math.round(input.rating))),
    message: input.message.trim(),
    status: "pending",
    createdAt: new Date().toISOString(),
    lat,
    lng,
  };

  store.reviews.unshift(review);
  await writeStore(store);
  return review;
}

export async function updateReviewStatus(
  id: string,
  status: ReviewStatus
): Promise<Review | null> {
  const store = await readStore();
  const index = store.reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;

  store.reviews[index] = { ...store.reviews[index], status };
  await writeStore(store);
  return store.reviews[index];
}

export async function deleteReview(id: string): Promise<boolean> {
  const store = await readStore();
  const next = store.reviews.filter((r) => r.id !== id);
  if (next.length === store.reviews.length) return false;
  await writeStore({ reviews: next });
  return true;
}
