import { MAP_H, MAP_W, type Rect } from "@/data/works";

/** 街のイラストの一部を切り出して見せる（作品のサムネイル用） */
export default function MapCrop({ rect, label, className = "" }: { rect: Rect; label: string; className?: string }) {
  const [x1, y1, x2, y2] = rect;
  const w = x2 - x1;
  const h = y2 - y1;
  return (
    <div
      className={`crop ${className}`}
      role="img"
      aria-label={`${label}のイラスト`}
      style={{
        aspectRatio: `${w} / ${h}`,
        backgroundSize: `${(MAP_W / w) * 100}% ${(MAP_H / h) * 100}%`,
        backgroundPosition: `${(x1 / (MAP_W - w)) * 100}% ${(y1 / (MAP_H - h)) * 100}%`,
      }}
    />
  );
}
