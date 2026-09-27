import type { CategoryId, ProductArtKind } from "../types";

// Retro 8-bit style sprite, hand-placed on an 8x12 pixel grid (viewBox 64x96).
const spriteRows = [
  "..CCCC..",
  ".HCCCCH.",
  ".HSSSSH.",
  "..SSSS..",
  "..CCCC..",
  ".CCCCCC.",
  ".CCCCCC.",
  "SCCCCCCS",
  ".CCCCCC.",
  "..PPPP..",
  "..PPPP..",
  "..BBBB..",
];
const spriteColors: Record<string, string> = {
  C: "#d9583f",
  H: "#40291c",
  S: "#f2c396",
  P: "#3b5f8a",
  B: "#40291c",
};

export function Character({ x, y, facing, walking, walkStep }: { x: number; y: number; facing: "left" | "right"; walking: boolean; walkStep: number }) {
  const rows = walking
    ? [...spriteRows.slice(0, 9), "..PPPP..", ".PP..PP.", walkStep % 2 === 0 ? ".BB...B." : ".B...BB."]
    : spriteRows;
  return (
    <div
      className={`character character--${facing} ${walking ? "character--walking" : ""}`}
      aria-label="Your character"
      style={{ left: `${x}%`, bottom: `${y}px` }}
    >
      <svg className="character-svg" viewBox="0 0 64 96" aria-hidden="true">
        <rect x="14" y="92" width="36" height="4" fill="#182320" opacity=".25" />
        {rows.map((row, rowIndex) =>
          row.split("").map((cell, colIndex) =>
            cell === "." ? null : (
              <rect
                key={`${rowIndex}-${colIndex}`}
                x={colIndex * 8}
                y={rowIndex * 8}
                width={8}
                height={8}
                fill={spriteColors[cell]}
              />
            ),
          ),
        )}
      </svg>
    </div>
  );
}

// Shared renderer for 8x8 "pixel art" icons (plain SVG rects, no raster assets).
function PixelGrid({ rows, colors }: { rows: string[]; colors: Record<string, string> }) {
  return (
    <>
      {rows.map((row, rowIndex) =>
        row.split("").map((cell, colIndex) =>
          cell === "." ? null : (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex * 4}
              y={rowIndex * 4}
              width={4}
              height={4}
              fill={colors[cell]}
            />
          ),
        ),
      )}
    </>
  );
}

interface PixelPattern {
  rows: string[];
  colors: Record<string, string>;
}

const categoryPixelArt: Record<CategoryId, PixelPattern[]> = {
  dairy: [
    { rows: ["..FFFF..", ".FFFFFF.", ".FAAAAF.", ".FFFFFF.", ".FFFFFF.", ".FFFFFF.", ".FFFFFF.", "..FFFF.."], colors: { F: "#f7f2e8", A: "#568a9b" } },
    { rows: ["........", ".FFFFFF.", "FFFAFFFF", "FFFFFFFF", "FFFAFFFF", "FFFFFFFF", ".FFFFFF.", "........"], colors: { F: "#f3e3a8", A: "#d8c583" } },
    { rows: ["........", ".FFFFFF.", "FFFFFFFF", "FFFFFFFF", ".AAAAAA.", "..AAAA..", "........", "........"], colors: { F: "#fbfaf5", A: "#568a9b" } },
    { rows: ["........", "FFFFFFFF", "FFFFFFFF", "FFFFFFFF", "FFFFFFFF", "........", "........", "........"], colors: { F: "#f4d873" } },
  ],
  vegetables: [
    { rows: ["...LL...", "..FFFF..", ".FFFFFF.", "FFFFFFFF", "FFFFFFFF", "FFFFFFFF", ".FFFFFF.", "..FFFF.."], colors: { F: "#d9583f", L: "#6b8f4e" } },
    { rows: ["..FFFF..", ".FFFFFF.", ".FFFFFF.", ".FFFFFF.", ".FFFFFF.", ".FFFFFF.", ".FFFFFF.", "..FFFF.."], colors: { F: "#7ea34c" } },
    { rows: ["..LLLL..", "..FFFF..", "..FFFF..", "..FFFF..", "...FF...", "...FF...", "....F...", "....F..."], colors: { F: "#d9833f", L: "#6b8f4e" } },
    { rows: ["........", "..FFFF..", ".FFFFFF.", "FFFFAFFF", "FFFFFFFF", "FFFAFFFF", ".FFFFFF.", "..FFFF.."], colors: { F: "#c79a5f", A: "#8a6a3f" } },
  ],
  fruit: [
    { rows: ["...L....", "..FFFF..", ".FFFFFF.", "FFFFFFFF", "FFFFFFFF", "FFFFFFFF", ".FFFFFF.", "..FFFF.."], colors: { F: "#d9583f", L: "#6b4423" } },
    { rows: ["...L....", "..FFFF..", ".FFFFFF.", "FFFFFFFF", "FFFFFFFF", "FFFFFFFF", ".FFFFFF.", "..FFFF.."], colors: { F: "#e8973f", L: "#6b8f4e" } },
    { rows: ["......FF", ".....FF.", "....FF..", "...FF...", "..FF....", ".FF.....", "FF......", "F......."], colors: { F: "#e8c23f" } },
    { rows: ["..L.....", ".FF.FF..", "FF.FF.FF", ".FF.FF..", "FF.FF.FF", ".FF.FF..", "..FF....", "........"], colors: { F: "#7a5a9a", L: "#6b4423" } },
  ],
  meat: [
    { rows: ["....FF..", "...FFFF.", "..FFFFF.", ".FFFFFF.", "FFFFFF..", "FFFF....", "FA......", "A......."], colors: { F: "#d9a35f", A: "#f2ead9" } },
    { rows: ["........", ".FFFFFF.", "FFFAFFFF", "FFFFFAFF", "FFFAFFFF", "FFFFFAFF", ".FFFFFF.", "........"], colors: { F: "#a8563f", A: "#e8c9a0" } },
    { rows: ["........", ".FFFFFF.", "FFFAFFFF", "FFFFFAFF", "FFFAFFFF", "FFFFFAFF", ".FFFFFF.", "........"], colors: { F: "#d98a7a", A: "#f2d9c9" } },
    { rows: ["........", ".FFF.FFF", "FFFFAFFF", "FFFF.FFF", "FFFFAFFF", "FFFF.FFF", ".FFF.FFF", "........"], colors: { F: "#a8563f", A: "#6b4423" } },
  ],
  sweets: [
    { rows: ["..FFFF..", "..AAAA..", ".FFFFFF.", "FFFFFFFF", "FFFFFFFF", "FFFFFFFF", ".FFFFFF.", "..FFFF.."], colors: { F: "#e8a83f", A: "#6b4423" } },
    { rows: ["........", "FFFFFFFF", "FFAFFAFF", "FFFFFFFF", "FFAFFAFF", "FFFFFFFF", "FFAFFAFF", "FFFFFFFF"], colors: { F: "#6b4423", A: "#4a2f18" } },
    { rows: ["..FFFF..", ".FFFFFF.", "FFFFFFFF", "FFFFFFFF", "..AAAA..", "..AAAA..", "...AA...", "...AA..."], colors: { F: "#f7e3c9", A: "#c79a5f" } },
    { rows: ["........", ".FA.FA..", ".FA.FA..", "........", ".FA.FA..", ".FA.FA..", "........", "........"], colors: { F: "#d9869a", A: "#f7f2e8" } },
  ],
  drinks: [
    { rows: ["..BBBB..", "..BFFB..", ".BFFFFB.", ".BFAAFB.", ".BFAAFB.", ".BFFFFB.", ".BFFFFB.", "..BBBB.."], colors: { B: "#568a9b", F: "#f7f2e8", A: "#9dcbd4" } },
    { rows: ["..TTTT..", ".TTTTTT.", ".TTFFTT.", ".TFFFFT.", ".TFAFFT.", ".TFFFFT.", ".TTTTTT.", "........"], colors: { T: "#e8973f", F: "#f7f2e8", A: "#e8c23f" } },
    { rows: ["........", ".FFFFF..", ".FAAFFF.", ".FAAFFF.", ".FAAFFF.", ".FFFFFFF", "..SSSS..", "........"], colors: { F: "#f7f2e8", A: "#6b4423", S: "#568a9b" } },
    { rows: ["........", ".FFFFF..", ".FAAFFF.", ".FAAFFF.", ".FAAFFF.", ".FFFFFFF", "..SSSS..", "........"], colors: { F: "#f7f2e8", A: "#a9714b", S: "#6b8f4e" } },
  ],
};

export function ShelfProduct({ category, index }: { category: CategoryId; index: number }) {
  const pattern = categoryPixelArt[category][index % 4];
  return (
    <svg className="shelf-product" viewBox="0 0 32 32" aria-hidden="true">
      <PixelGrid rows={pattern.rows} colors={pattern.colors} />
    </svg>
  );
}

const productPixelArt: Record<ProductArtKind, PixelPattern> = {
  milk: categoryPixelArt.dairy[0],
  feta: categoryPixelArt.dairy[1],
  yogurt: categoryPixelArt.dairy[2],
  butter: categoryPixelArt.dairy[3],
  tomato: categoryPixelArt.vegetables[0],
  cucumber: categoryPixelArt.vegetables[1],
  carrot: categoryPixelArt.vegetables[2],
  potato: categoryPixelArt.vegetables[3],
  apple: categoryPixelArt.fruit[0],
  orange: categoryPixelArt.fruit[1],
  banana: categoryPixelArt.fruit[2],
  grape: categoryPixelArt.fruit[3],
  chicken: categoryPixelArt.meat[0],
  beef: categoryPixelArt.meat[1],
  pork: categoryPixelArt.meat[2],
  sausage: categoryPixelArt.meat[3],
  honey: categoryPixelArt.sweets[0],
  chocolate: categoryPixelArt.sweets[1],
  iceCream: categoryPixelArt.sweets[2],
  loukoumi: categoryPixelArt.sweets[3],
  water: categoryPixelArt.drinks[0],
  juice: categoryPixelArt.drinks[1],
  coffee: categoryPixelArt.drinks[2],
  tea: categoryPixelArt.drinks[3],
};

export function ProductArt({ kind }: { kind: ProductArtKind }) {
  const pattern = productPixelArt[kind];
  return (
    <div className="product-art" role="img" aria-label={kind}>
      <span className="product-art__glow" aria-hidden="true" />
      <svg className="product-art__pixel" viewBox="0 0 32 32" aria-hidden="true">
        <PixelGrid rows={pattern.rows} colors={pattern.colors} />
      </svg>
    </div>
  );
}
