"use client";

import { BlogCommentAdminList } from "@/components/admin/BlogCommentAdminList";

export function CommentsAdminSection() {
  return (
    <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-900/20">
      <BlogCommentAdminList
        title="Blog comments"
        description="Approve visitor comments, then use Delete to remove them permanently (including approved ones)."
        showPostSlug
        defaultFilter="all"
      />
    </section>
  );
}
