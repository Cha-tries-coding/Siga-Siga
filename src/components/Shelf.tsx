import type { CategoryId } from "../types";
import { ShelfProduct } from "./Illustrations";

export function Shelf({
  category,
  label,
  target = false,
  reachable = false,
  onClick,
}: {
  category: CategoryId;
  label: string;
  target?: boolean;
  reachable?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className={`shelf shelf--${category} ${target ? "shelf--target" : ""} ${reachable ? "shelf--reachable" : ""}`}
      onClick={onClick}
      type="button"
      aria-label={`${label} aisle`}
    >
      {target && <span className="shelf__arrow" aria-hidden="true">▾</span>}
      <span className="shelf__awning" />
      <span className="shelf__label">{label}</span>
      <span className="shelf__inside">
        <span className="shelf__row shelf__row--top">
          {[0, 1, 2, 3].map((index) => <ShelfProduct category={category} index={index} key={index} />)}
        </span>
        <span className="shelf__row shelf__row--bottom">
          {[4, 5, 6, 7, 8].map((index) => <ShelfProduct category={category} index={index} key={index} />)}
        </span>
      </span>
    </button>
  );
}
