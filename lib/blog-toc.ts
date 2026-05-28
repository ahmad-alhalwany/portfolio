export type TocItem = {
  id: string;
  text: string;
  level: number;
};

export function extractTocFromHtml(html: string): TocItem[] {
  const items: TocItem[] = [];
  const regex = /<h([2-3])[^>]*(?:id=["']([^"']+)["'])?[^>]*>(.*?)<\/h\1>/gi;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]);
    const text = match[3].replace(/<[^>]+>/g, "").trim();
    const id = match[2] || `section-${index}`;
    items.push({ id, text, level });
    index += 1;
  }

  return items;
}

export function injectHeadingIds(html: string): string {
  let index = 0;
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (_full, level, attrs, inner) => {
    const hasId = /id\s*=/.test(attrs);
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = hasId
      ? attrs.match(/id=["']([^"']+)["']/)?.[1]
      : `section-${index}`;
    index += 1;
    if (hasId) return `<h${level}${attrs}>${inner}</h${level}>`;
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });
}
