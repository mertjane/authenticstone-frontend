export function parsePriceFromHtml(html: string): number {
  const match = html.match(/[\d,.]+/);
  if (!match) return 0;
  return parseFloat(match[0].replace(/,/g, ""));
}