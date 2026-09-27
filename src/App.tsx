import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button, Icon } from "./components/ui";
import { missionSteps, missionTotalItems } from "./data/game";
import { Market } from "./game/Market";
import { PanelView } from "./panels/Panels";
import type { CartItem, CategoryId, Direction, Panel, Product } from "./types";

const nav = [
  ["help", "How to play", "Help", "gamepad"],
  ["objectives", "Learning objectives", "Goals", "check"],
  ["grammar", "Grammar and Vocabulary", "Lessons", "book"],
] as const;

function categoryFromX(x: number): CategoryId {
  if (x < 20) return "dairy";
  if (x < 35) return "vegetables";
  if (x < 50) return "fruit";
  if (x < 65) return "meat";
  if (x < 80) return "sweets";
  return "drinks";
}

export default function App() {
  const [panel, setPanel] = useState<Panel>("objectives");
  const [onboardingStep, setOnboardingStep] = useState<"objectives" | "help" | "done">("objectives");
  const [category, setCategory] = useState<CategoryId>("dairy");
  const [position, setPosition] = useState({ x: 42, y: 42 });
  const [showMoveHint, setShowMoveHint] = useState(false);
  const [facing, setFacing] = useState<"left" | "right">("right");
  const [walking, setWalking] = useState(false);
  const [walkStep, setWalkStep] = useState(0);
  const walkTimeout = useRef<number | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [missionStepIndex, setMissionStepIndex] = useState(0);
  const [missionComplete, setMissionComplete] = useState(false);

  const isLastMissionStep = missionStepIndex >= missionSteps.length - 1;
  const currentMission = missionSteps[Math.min(missionStepIndex, missionSteps.length - 1)];

  const selectedCategory = useMemo(() => categoryFromX(position.x), [position.x]);
  const nearShelf = position.y >= 42;

  const objectiveProgress = useMemo(
    () => cart
      .filter((item) => item.product.greek === currentMission.targetProductGreek)
      .reduce((sum, item) => sum + item.quantity, 0),
    [cart, currentMission],
  );

  const itemsFoundBeforeCurrentStep = useMemo(
    () => missionSteps.slice(0, missionStepIndex).reduce((sum, step) => sum + step.targetQuantity, 0),
    [missionStepIndex],
  );
  const totalItemsFound = itemsFoundBeforeCurrentStep + Math.min(objectiveProgress, currentMission.targetQuantity);

  // Let the learner read the explanation before advancing the shopping list.
  const continueMission = useCallback(() => {
    if (isLastMissionStep) {
      setPanel("checkout");
    } else {
      setMissionStepIndex((current) => current + 1);
      setPanel(null);
    }
  }, [isLastMissionStep]);

  const move = useCallback((direction: Direction) => {
    if (panel) return;
    setShowMoveHint(false);
    if (direction === "left") setFacing("left");
    if (direction === "right") setFacing("right");
    setWalking(true);
    setWalkStep((step) => step + 1);
    if (walkTimeout.current !== null) window.clearTimeout(walkTimeout.current);
    walkTimeout.current = window.setTimeout(() => setWalking(false), 170);

    setPosition((current) => ({
      x: Math.max(10, Math.min(90, current.x + (direction === "left" ? -3 : direction === "right" ? 3 : 0))),
      y: Math.max(22, Math.min(112, current.y + (direction === "up" ? 7 : direction === "down" ? -7 : 0))),
    }));
  }, [panel]);

  useEffect(() => () => {
    if (walkTimeout.current !== null) window.clearTimeout(walkTimeout.current);
  }, []);

  const openCategory = useCallback((nextCategory: CategoryId) => {
    setShowMoveHint(false);
    setCategory(nextCategory);
    setPanel("shelf");
  }, []);

  // Onboarding shows Learning objectives, then How to play, before revealing the game.
  const closePanel = useCallback(() => {
    if (onboardingStep === "objectives") {
      setOnboardingStep("help");
      setPanel("help");
      return;
    }
    if (onboardingStep === "help") {
      setOnboardingStep("done");
      setPanel(null);
      return;
    }
    if (panel === "shelf" && objectiveProgress >= currentMission.targetQuantity) {
      continueMission();
      return;
    }
    setPanel(null);
  }, [onboardingStep, panel, objectiveProgress, currentMission, continueMission]);

  const completeMission = useCallback(() => {
    setMissionComplete(true);
    setPanel("congrats");
  }, []);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCart((current) => {
      const existing = current.find((item) => item.product.greek === product.greek);
      if (!existing) return [...current, { product, quantity }];

      return current.map((item) =>
        item.product.greek === product.greek
          ? { ...item, quantity: item.quantity + quantity }
          : item,
      );
    });
  }, []);

  const resetMission = useCallback(() => {
    setCart([]);
    setMissionStepIndex(0);
    setMissionComplete(false);
    setPanel(null);
    setPosition({ x: 42, y: 42 });
    setShowMoveHint(false);
    setFacing("right");
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (onboardingStep === "done") closePanel();
        else {
          setOnboardingStep("done");
          setPanel(null);
        }
        return;
      }

      const directions: Record<string, Direction> = {
        ArrowUp: "up",
        ArrowDown: "down",
        ArrowLeft: "left",
        ArrowRight: "right",
      };

      const direction = directions[event.key];
      if (!panel && direction) {
        const target = event.target as HTMLElement | null;
        if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
        event.preventDefault();
        if (target?.closest("button, a")) target.blur();
        move(direction);
        return;
      }

      const target = event.target as HTMLElement | null;
      if (event.key === "Enter" && !panel && !target?.closest("button, input, textarea, select, a, [contenteditable='true']")) {
        event.preventDefault();
        if (nearShelf) openCategory(selectedCategory);
        else setShowMoveHint(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [move, nearShelf, selectedCategory, openCategory, panel, onboardingStep, closePanel]);

  return (
    <main className="app-viewport">
      <div className="game-frame">
        <header className="topbar">
          <div className="brand">
            <span>Σ</span>
            <div><b>Siga Siga</b><small>Greek, step by step</small></div>
          </div>

          <nav className="main-nav" aria-label="Game menu">
            {nav.map(([key, label, shortLabel, icon]) => (
              <Button key={key} onClick={() => setPanel(key)} ariaLabel={label} className={panel === key ? "active" : ""}>
                <Icon name={icon} size={19} /><span className="nav-long">{label}</span><span className="nav-short" aria-hidden="true">{shortLabel}</span>
              </Button>
            ))}
          </nav>
        </header>

        <div className={`objective ${missionComplete ? "objective--complete" : ""}`}>
          {missionComplete && <span className="objective-label">COMPLETE</span>}
          <div className="objective-text">
            <b>{currentMission.greek}</b>
            <small aria-live="polite">{missionComplete ? "Mission completed. Great job!" : showMoveHint ? "Walk up to the shelves with ↑, or click an aisle." : currentMission.english}</small>
          </div>
          <div className="objective-progress">
            <span className="objective-bar"><i className="objective-bar-fill" style={{ width: `${(totalItemsFound / missionTotalItems) * 100}%` }} /></span>
            <b>{totalItemsFound} / {missionTotalItems}</b>
          </div>
        </div>

        <Market
          openShelf={openCategory}
          openCheckout={() => setPanel("checkout")}
          position={position}
          facing={facing}
          walking={walking}
          walkStep={walkStep}
          nearbyCategory={selectedCategory}
          nearShelf={nearShelf}
          cart={cart}
        />

        {panel && (
          <PanelView
            panel={panel}
            close={closePanel}
            category={category}
            cart={cart}
            objectiveLabel={currentMission.english}
            objectiveProgress={objectiveProgress}
            objectiveTarget={currentMission.targetQuantity}
            missionCategory={currentMission.category}
            missionTargetGreek={currentMission.targetProductGreek}
            missionTargetEnglish={currentMission.targetProductEnglish}
            missionTargetQuantity={currentMission.targetQuantity}
            missionStepIndex={missionStepIndex}
            missionStepsTotal={missionSteps.length}
            missionComplete={missionComplete}
            isLastMissionStep={isLastMissionStep}
            onAddToCart={addToCart}
            onContinueMission={continueMission}
            onCompleteMission={completeMission}
            onResetMission={resetMission}
            onShowGrammar={() => setPanel("grammar")}
          />
        )}

        <div className="credit">Charlotte Capel, Learning Designer, 2026</div>
      </div>
    </main>
  );
}
