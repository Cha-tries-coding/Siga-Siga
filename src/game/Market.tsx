import { useEffect, useRef, useState } from "react";
import { categories } from "../data/game";
import type { CartItem, CategoryId } from "../types";
import { Character } from "../components/Illustrations";
import { Shelf } from "../components/Shelf";
import { Button } from "../components/ui";

interface MarketProps {
  openShelf: (category: CategoryId) => void;
  openCheckout: () => void;
  position: { x: number; y: number };
  facing: "left" | "right";
  walking: boolean;
  walkStep: number;
  nearbyCategory: CategoryId;
  nearShelf: boolean;
  cart: CartItem[];
}

export function Market({
  openShelf,
  openCheckout,
  position,
  facing,
  walking,
  walkStep,
  nearbyCategory,
  nearShelf,
  cart,
}: MarketProps) {
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const previousCount = useRef(cartCount);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (cartCount > previousCount.current) {
      setBump(true);
      const timeout = window.setTimeout(() => setBump(false), 420);
      previousCount.current = cartCount;
      return () => window.clearTimeout(timeout);
    }
    previousCount.current = cartCount;
  }, [cartCount]);

  return (
    <div className="market">
      <div className="aisle-grid">
        {categories.map((category) => (
          <Shelf
            category={category.id}
            label={category.greek}
            target={category.id === nearbyCategory}
            reachable={nearShelf && category.id === nearbyCategory}
            onClick={() => openShelf(category.id)}
            key={category.id}
          />
        ))}
      </div>

      <Character x={position.x} y={position.y} facing={facing} walking={walking} walkStep={walkStep} />

      <Button className={`cart-button ${bump ? "cart-button--bump" : ""}`} variant="blue" ariaLabel="Cart" onClick={openCheckout}>
        <span className="cart-label">Καλάθι</span>
        <b>{cartCount}</b>
      </Button>
    </div>
  );
}
