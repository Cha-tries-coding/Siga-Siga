import { useEffect, useRef, useState } from "react";
import { Button, Icon, Text } from "../components/ui";
import { ProductArt } from "../components/Illustrations";
import {
  categories,
  definiteArticles,
  gameSkills,
  genderExamples,
  grammarRules,
  greekNumbers,
  products,
  tutorialSteps,
} from "../data/game";
import type { CartItem, CategoryId, Panel, Product } from "../types";
import { speakGreek } from "../utils/speech";

const grammarTabIcons = ["book", "chart", "notebook"] as const;

const numberEnglish = ["one", "two", "three", "four", "five"];

const numberLessons = [
  { number: 1, explanation: "For one item, use the singular noun. The Greek word for ‘one’ changes with the noun: masculine ένας, feminine μία, neuter ένα.", examples: ["ένας καφές", "μία μπανάνα", "ένα μήλο"] },
  { number: 2, explanation: "For two items, use the plural noun. Δύο is the same for every gender.", examples: ["δύο καφέδες", "δύο μήλα"] },
  { number: 3, explanation: "Use τρεις with masculine or feminine nouns; use τρία with neuter nouns.", examples: ["τρεις καφέδες", "τρεις ντομάτες", "τρία μήλα"] },
  { number: 4, explanation: "Use τέσσερις with masculine or feminine nouns; use τέσσερα with neuter nouns.", examples: ["τέσσερις καφέδες", "τέσσερις ντομάτες", "τέσσερα μήλα"] },
  { number: 5, explanation: "Πέντε is the same for every gender. The noun stays plural.", examples: ["πέντε καφέδες", "πέντε μήλα"] },
] as const;

const pluralNotes: Record<string, string> = {
  Masculine: "The article changes from ο to οι. Here, χυμός becomes χυμοί.",
  Feminine: "The article changes from η to οι. Here, ντομάτα becomes ντομάτες.",
  Neuter: "The article changes from το to τα. Here, μήλο becomes μήλα.",
};

function GreekLine({ text: greekText, label }: { text: string; label?: string }) {
  return (
    <div className="greek-line">
      <span>{label && <small>{label}</small>}<b lang="el">{greekText}</b></span>
      <button type="button" aria-label={`Listen to ${greekText}`} onClick={() => speakGreek(greekText)}>
        <Icon name="sound" size={16} />
      </button>
    </div>
  );
}

// Renders **bold** markers as <b> elements.
function renderBold(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) => (index % 2 === 1 ? <b key={index}>{part}</b> : part));
}

function GrammarPanel({ cart }: { cart: CartItem[] }) {
  const [selected, setSelected] = useState(0);
  const [vocabularyAisle, setVocabularyAisle] = useState<CategoryId | "all" | "seen">(cart.length ? "seen" : "all");
  const discoveredGreek = new Set(cart.map((item) => item.product.greek));
  const vocabularyProducts = vocabularyAisle === "all" ? products : vocabularyAisle === "seen" ? products.filter((product) => discoveredGreek.has(product.greek)) : products.filter((product) => product.category === vocabularyAisle);

  return (
    <div className="panel-body grammar-layout notebook">
      <div className="panel-intro">
        <span className="eyebrow">LEARNER'S NOTEBOOK</span>
        <Text as="h2">Grammar & Vocabulary</Text>
        <Text as="p">Everything you need, one step at a time.</Text>
        <div className="rule-list">
          {grammarRules.map((label, index) => (
            <button
              className={`rule-item ${selected === index ? "active" : ""}`}
              onClick={() => setSelected(index)}
              key={label}
              type="button"
            >
              <span className="rule-item__icon"><Icon name={grammarTabIcons[index]} size={16} /></span>
              <span>
                <b>{label}</b>
              </span>
              <span className="rule-item__chevron">›</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lesson-card">
        {selected === 0 && (
          <>
            <span className="eyebrow">VOCABULARY</span>
            <Text as="h3">Food, singular & plural</Text>
            <Text as="p" className="lesson-lead">Learn each noun with its article: <b>ο</b> (masculine), <b>η</b> (feminine) or <b>το</b> (neuter). Compare the plural underneath; listen to both forms.</Text>
            <label className="vocab-filter">Browse vocabulary
              <select value={vocabularyAisle} onChange={(event) => setVocabularyAisle(event.target.value as CategoryId | "all" | "seen")}>
                {discoveredGreek.size > 0 && <option value="seen">Words in your cart ({discoveredGreek.size})</option>}
                <option value="all">ΟΛΑ ΤΑ ΡΑΦΙΑ ({products.length})</option>
                {categories.map((category) => <option value={category.id} key={category.id}>{category.greek}</option>)}
              </select>
            </label>
            <div className="vocab-list">
              {vocabularyProducts.map((product) => {
                const article = definiteArticles.find((item) => item.gender.toLowerCase() === product.gender)!;
                const discovered = discoveredGreek.has(product.greek);
                return (
                  <div className={`vocab-row ${discovered ? "vocab-row--discovered" : ""}`} key={product.greek}>
                    <ProductArt kind={product.art} />
                    <div>
                      <b>{article.singular} {product.greek}</b>
                      <span>{article.plural} {product.plural}</span>
                    </div>
                    <small>{product.english}</small>
                    {discovered && <span className="vocab-found" title="Found while shopping"><Icon name="check" size={11} /> Found</span>}
                    <div className="vocab-audio">
                      <button type="button" aria-label={`Listen to the singular: ${article.singular} ${product.greek}`} onClick={() => speakGreek(`${article.singular} ${product.greek}`)}>
                        <Icon name="sound" size={15} /> <span>Singular</span>
                      </button>
                      <button type="button" aria-label={`Listen to the plural: ${article.plural} ${product.plural}`} onClick={() => speakGreek(`${article.plural} ${product.plural}`)}>
                        <Icon name="sound" size={15} /> <span>Plural</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <Text as="p" className="lesson-footnote">For foods such as milk, water or honey, a plural can refer to containers, servings or kinds. For example, in the shopping list, « δύο γάλατα » means two cartons of milk.</Text>
          </>
        )}

        {selected === 1 && (
          <>
            <span className="eyebrow">NUMBERS</span>
            <Text as="h3">Count from 1 to 5</Text>
            <Text as="p" className="lesson-lead">First, look at the noun's article in Food vocabulary: <b>ο</b> means masculine, <b>η</b> feminine and <b>το</b> neuter. The number sometimes changes to match. Use a singular noun after 1, and a plural noun after 2, 3, 4 or 5.</Text>
            <div className="lesson-cards">
              {numberLessons.map((lesson) => (
                <section className="lesson-example" key={lesson.number}>
                  <h4>{lesson.number} · {numberEnglish[lesson.number - 1]}</h4>
                  <p>{lesson.explanation}</p>
                  {lesson.examples.map((example) => <GreekLine text={example} key={example} />)}
                </section>
              ))}
            </div>
          </>
        )}

        {selected === 2 && (
          <>
            <span className="eyebrow">GRAMMAR</span>
            <Text as="h3">Singular & plural nouns</Text>
            <div className="lesson-lead lesson-lead--stacked">
              <p>A singular noun names one item; a plural noun names more than one.</p>
              <p>In Greek, the article changes too.</p>
              <p>These examples show common changes, but there are some irregular forms that we’ll see in the next lessons.</p>
              <p>Listen to both lines of each pair.</p>
            </div>
            <div className="lesson-cards">
              {genderExamples.map((example) => (
                <section className="lesson-example" key={example.gender}>
                  <h4>{example.gender}</h4>
                  <p>{pluralNotes[example.gender]}</p>
                  <GreekLine label="One" text={`${example.singularArticle} ${example.singular}`} />
                  <GreekLine label="More than one" text={`${example.pluralArticle} ${example.plural}`} />
                </section>
              ))}
              <section className="lesson-example">
                <h4>Other plurals to remember</h4>
                <p>These words have different endings. Learn each pair together.</p>
                <GreekLine label="One coffee" text="ο καφές" />
                <GreekLine label="More than one" text="οι καφέδες" />
                <GreekLine label="Milk" text="το γάλα" />
                <GreekLine label="Cartons of milk" text="τα γάλατα" />
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function ObjectivesPanel() {
  return (
    <div className="tutorial">
      <span className="eyebrow">LEARNING OBJECTIVES</span>
      <Text as="h2">What you'll learn</Text>
      <div className="tutorial-skills tutorial-skills--standalone">
        <ul>
          {gameSkills.map((skill) => (
            <li key={skill}>
              <Icon name="check" size={17} /> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function CongratsPanel({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="tutorial">
      <span className="eyebrow">MISSION COMPLETE</span>
      <div className="tutorial-copy">
        <Text as="h2">Μπράβο!</Text>
        <Text as="p">You found everything on the list. Great job learning Greek!</Text>
      </div>
      <div className="tutorial-actions">
        <Button variant="blue" onClick={onContinue}>See Grammar and Vocabulary</Button>
      </div>
    </div>
  );
}

function HelpPanel({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [title, copy] = tutorialSteps[step];

  const next = () => {
    if (step === tutorialSteps.length - 1) {
      onClose();
      return;
    }
    setStep((current) => current + 1);
  };

  return (
    <div className="tutorial tutorial--help">
      <span className="eyebrow">HOW TO PLAY · {step + 1}/{tutorialSteps.length}</span>
      <div className="tutorial-copy tutorial-step-card" aria-live="polite">
        <Text as="h2">{title}</Text>
        <Text as="p">{copy}</Text>
      </div>
      <div className="tutorial-dots" aria-label="How to play steps">
        {tutorialSteps.map(([stepTitle], index) => (
          <button
            type="button"
            className={index === step ? "active" : ""}
            aria-label={`Step ${index + 1}: ${stepTitle}`}
            aria-current={index === step ? "step" : undefined}
            onClick={() => setStep(index)}
            key={stepTitle}
          ><span /></button>
        ))}
      </div>
      <div className="tutorial-actions">
        <Button variant="ghost" disabled={step === 0} onClick={() => setStep((current) => Math.max(0, current - 1))}>Back</Button>
        <Button variant="blue" onClick={next}>{step === tutorialSteps.length - 1 ? "Let's play" : "Next"}</Button>
      </div>
    </div>
  );
}

interface ShelfPanelProps {
  initialCategory: CategoryId;
  missionCategory: CategoryId;
  missionTargetGreek: string;
  missionTargetEnglish: string;
  missionTargetQuantity: number;
  missionStepIndex: number;
  missionStepsTotal: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onContinueMission: () => void;
}

function ShelfPanel({
  initialCategory,
  missionCategory,
  missionTargetGreek,
  missionTargetEnglish,
  missionTargetQuantity,
  missionStepIndex,
  missionStepsTotal,
  onAddToCart,
  onContinueMission,
}: ShelfPanelProps) {
  const [chosen, setChosen] = useState<Product | null>(null);
  const [blockedProduct, setBlockedProduct] = useState<Product | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const explanationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!added) return;
    const frame = window.requestAnimationFrame(() => {
      explanationRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      explanationRef.current?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [added]);
  const category = categories.find((item) => item.id === initialCategory)!;
  const visibleProducts = products.filter((product) => product.category === initialCategory);
  const isWrongAisle = initialCategory !== missionCategory;

  const selectProduct = (product: Product) => {
    setChosen(product);
    setAmount(null);
    setAnswer(null);
    setAdded(false);
  };

  if (chosen) {
    const quantityWord = (n: number) => greekNumbers.find((item) => item.number === n)![chosen.gender];
    const correctForm = amount === 1 ? chosen.greek : chosen.plural;
    const forms = [chosen.greek, chosen.plural];
    const buildExplanation = (n: number) => {
      const numberWord = quantityWord(n);
      const numberWordText = numberEnglish[n - 1];
      const article = definiteArticles.find((item) => item.gender.toLowerCase() === chosen.gender)!;
      return [
        n === 2 || n === 5
          ? `**${numberWord}** means “${numberWordText}” and stays the same for all three genders.`
          : `**${numberWord}** is the ${chosen.gender} form of “${numberWordText}”.`,
        `“${chosen.english}” is **${article.singular} ${chosen.greek}** in singular and **${article.plural} ${chosen.plural}** in plural.`,
        `For ${n} ${n === 1 ? "item" : "items"}, use the ${n === 1 ? "singular" : "plural"} noun: **${numberWord} ${correctForm}**.`,
      ];
    };
    const isGrammarCorrect = amount !== null && answer === correctForm;
    const isQuantityCorrect = amount !== null && amount === missionTargetQuantity;

    const chooseAnswer = (item: string) => {
      if (amount === null) return;
      setAnswer(item);
      setAdded(false);
    };

    const chooseQuantity = (nextAmount: number) => {
      setAmount(nextAmount);
      setAnswer(null);
      setAdded(false);
    };

    const confirmAdd = () => {
      if (!isGrammarCorrect || !isQuantityCorrect || added || amount === null) return;
      onAddToCart(chosen, amount);
      setAdded(true);
    };

    return (
      <div className="panel-body choice-panel">
        <span className="eyebrow">AISLE CHALLENGE · {missionStepIndex + 1}/{missionStepsTotal}</span>
        <Text as="h2">Add {chosen.english} to your cart.</Text>

        <div className={`choice-product ${added ? "choice-product--added" : ""}`}>
          <ProductArt kind={chosen.art} />
          <div><b>{chosen.greek}</b><span>{chosen.latin} · {chosen.english}</span></div>
          <button className="sound-inline" type="button" aria-label={`Listen to ${chosen.greek}`} onClick={() => speakGreek(chosen.greek)}>
            <Icon name="sound" size={17} />
          </button>
        </div>

        <div className="choice-step">
          <span className="step-number">1</span>
          <Text as="h3">Choose the quantity</Text>
          <div className="choice-row">
            {[1, 2, 3, 4].map((n) => (
              <Button
                variant={amount === n ? "blue" : "white"}
                onClick={() => chooseQuantity(n)}
                key={n}
              >
                {quantityWord(n)}
              </Button>
            ))}
          </div>
        </div>

        <div className="choice-step">
          <span className="step-number">2</span>
          <Text as="h3">Choose the noun form</Text>
          <div className="choice-row">
            {forms.map((item) => (
              <Button
                variant={answer === item ? (item === correctForm ? "green" : "coral") : "white"}
                onClick={() => chooseAnswer(item)}
                disabled={amount === null}
                key={item}
              >
                {item}
              </Button>
            ))}
          </div>
          {isGrammarCorrect && (
            <span className="form-tag">{amount === 1 ? "Singular" : "Plural"}</span>
          )}
        </div>

        {answer && amount !== null && (
          <div ref={explanationRef} tabIndex={added ? -1 : undefined} className={`feedback ${isGrammarCorrect && isQuantityCorrect ? "success" : "error"}`} aria-live="polite" key={`${answer}-${amount}`}>
            <Icon name={isGrammarCorrect && isQuantityCorrect ? "check" : "help"} />
            {!isGrammarCorrect ? (
              <div>
                <b>Almost! Try again.</b>
                <span>Check the ending for this quantity and try another option.</span>
              </div>
            ) : !isQuantityCorrect ? (
              <div>
                <b>{`Η σωστή ποσότητα είναι ${missionTargetQuantity}, όχι ${amount}.`}</b>
                <span>{`You need ${missionTargetQuantity}, not ${amount}. Re-read the objective above.`}</span>
              </div>
            ) : (
              <div>
                <b>Μπράβο! That's correct.</b>
                {added ? buildExplanation(amount).map((paragraph, index) => (
                  <span key={index}>{renderBold(paragraph)}</span>
                )) : <span>Add it to your cart to continue.</span>}
              </div>
            )}
          </div>
        )}

        <Button
          variant={added ? "green" : "blue"}
          className="add-to-cart-button"
          onClick={confirmAdd}
          disabled={!isGrammarCorrect || !isQuantityCorrect || added}
        >
          <Icon name={added ? "check" : "add"} size={18} />
          {added ? "Added to your cart" : "Add to cart"}
        </Button>
        {added && (
          <Button variant="blue" className="continue-button" onClick={onContinueMission}>
            {missionStepIndex + 1 === missionStepsTotal ? "Go to checkout" : "Continue to the next item"}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="panel-body products-panel">
      <div className="panel-heading">
        <div>
          <span className="eyebrow">{category.english.toUpperCase()} AISLE</span>
          <Text as="h2">{category.greek}</Text>
          <Text as="p">{isWrongAisle ? "This isn't on your list." : "Choose any product"}</Text>
        </div>
      </div>

      {isWrongAisle ? (
        <div className="wrong-aisle" aria-live="polite">
          <div className="wrong-aisle__row">
            <b>{`Δεν υπάρχει ${missionTargetGreek} εδώ.`}</b>
            <button
              className="sound-inline"
              type="button"
              aria-label={`Listen to Δεν υπάρχει ${missionTargetGreek} εδώ.`}
              onClick={() => speakGreek(`Δεν υπάρχει ${missionTargetGreek} εδώ.`)}
            >
              <Icon name="sound" size={15} />
            </button>
          </div>
          <span>{`There's no ${missionTargetEnglish} here.`}</span>
        </div>
      ) : (
        <>
          {blockedProduct && (
            <div className="wrong-aisle wrong-aisle--inline" aria-live="polite">
              <div className="wrong-aisle__row">
                <b>Δεν είναι στη λίστα σας τώρα.</b>
                <button
                  className="sound-inline"
                  type="button"
                  aria-label="Listen to Δεν είναι στη λίστα σας τώρα."
                  onClick={() => speakGreek("Δεν είναι στη λίστα σας τώρα.")}
                >
                  <Icon name="sound" size={15} />
                </button>
              </div>
              <span>{`You don't need ${blockedProduct.english} right now.`}</span>
              <span>Re-read the objective above.</span>
            </div>
          )}
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const isTargetProduct = product.greek === missionTargetGreek;

              return (
                <div className="product-card" key={product.greek}>
                  <button
                    className="product-card__main"
                    onClick={() => (isTargetProduct ? selectProduct(product) : setBlockedProduct(product))}
                    type="button"
                  >
                    <ProductArt kind={product.art} />
                    <div className="product-copy">
                      <b>{product.greek}</b>
                      <span>{product.latin}</span>
                      <small>{product.english}</small>
                    </div>
                  </button>
                  <button
                    className="sound-button"
                    type="button"
                    aria-label={`Listen to ${product.greek}`}
                    onClick={(event) => {
                      event.stopPropagation();
                      speakGreek(product.greek);
                    }}
                  >
                    <Icon name="sound" size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

interface CheckoutPanelProps {
  cart: CartItem[];
  objectiveLabel: string;
  objectiveProgress: number;
  objectiveTarget: number;
  missionComplete: boolean;
  isLastMissionStep: boolean;
  onComplete: () => void;
  onContinueMission: () => void;
  onReset: () => void;
}

function CheckoutPanel({
  cart,
  objectiveLabel,
  objectiveProgress,
  objectiveTarget,
  missionComplete,
  isLastMissionStep,
  onComplete,
  onContinueMission,
  onReset,
}: CheckoutPanelProps) {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const objectiveMet = objectiveProgress >= objectiveTarget;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="panel-body checkout-panel">
      <div className="cashier">
        <div className="cashier-avatar"><span /></div>
        <div className="dialogue">
          <span className="eyebrow">THE CASHIER</span>
          <b>Θέλετε σακούλα;</b>
          <small>Would you like a bag?</small>
          <Button variant="ghost" onClick={() => speakGreek("Θέλετε σακούλα;")}>
            <Icon name="sound" size={18} /> Listen
          </Button>
        </div>
      </div>

      <div className="checkout-content">
        <div className="receipt">
          <Icon name="receipt" size={28} />
          <Text as="h3">Your receipt</Text>
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.product.greek}>
                <span>{item.quantity} × {item.product.greek}</span>
                <b>{(item.product.price * item.quantity).toFixed(2).replace(".", ",")} €</b>
              </div>
            ))
          )}
          <hr />
          <div className="receipt-total"><span>Total</span><b>{total.toFixed(2).replace(".", ",")} €</b></div>
        </div>

        <div className="checkout-score">
          <Text as="h3">Mission results</Text>
          <div><Icon name="check" size={17} /><span>{objectiveLabel} {Math.min(objectiveProgress, objectiveTarget)}/{objectiveTarget}</span></div>
          <div><Icon name="cart" size={17} /><span>{itemCount} item{itemCount === 1 ? "" : "s"} in cart</span></div>
          <div><Icon name={objectiveMet ? "check" : "help"} size={17} /><span>{objectiveMet ? (isLastMissionStep ? "Mission ready to complete" : "Ready for the next item") : "Keep shopping to complete the objective"}</span></div>
          <Button variant="blue" onClick={isLastMissionStep ? onComplete : onContinueMission} disabled={!objectiveMet || missionComplete}>
            {missionComplete ? "Mission completed" : isLastMissionStep ? "Complete mission" : "Continue to the next item"}
          </Button>
          <Button variant="ghost" onClick={onReset}>Start over</Button>
        </div>
      </div>
    </div>
  );
}

interface PanelViewProps {
  panel: Exclude<Panel, null>;
  close: () => void;
  category: CategoryId;
  cart: CartItem[];
  objectiveLabel: string;
  objectiveProgress: number;
  objectiveTarget: number;
  missionComplete: boolean;
  isLastMissionStep: boolean;
  missionCategory: CategoryId;
  missionTargetGreek: string;
  missionTargetEnglish: string;
  missionTargetQuantity: number;
  missionStepIndex: number;
  missionStepsTotal: number;
  onAddToCart: (product: Product, quantity: number) => void;
  onContinueMission: () => void;
  onCompleteMission: () => void;
  onResetMission: () => void;
  onShowGrammar: () => void;
}

export function PanelView({
  panel,
  close,
  category,
  cart,
  objectiveLabel,
  objectiveProgress,
  objectiveTarget,
  missionComplete,
  isLastMissionStep,
  missionCategory,
  missionTargetGreek,
  missionTargetEnglish,
  missionTargetQuantity,
  missionStepIndex,
  missionStepsTotal,
  onAddToCart,
  onContinueMission,
  onCompleteMission,
  onResetMission,
  onShowGrammar,
}: PanelViewProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    return () => openerRef.current?.focus();
  }, []);

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLButtonElement>(".close-button")?.focus();

    const keepFocusInDialog = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const buttons = Array.from(dialogRef.current.querySelectorAll<HTMLButtonElement>("button:not(:disabled)"));
      if (buttons.length === 0) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      } else if (!dialogRef.current.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", keepFocusInDialog);
    return () => document.removeEventListener("keydown", keepFocusInDialog);
  }, [panel]);

  return (
    <div className={`panel-overlay panel-overlay--${panel}`} role="dialog" aria-modal="true" aria-label={`${panel} panel`}>
      <div className="panel-shell" ref={dialogRef}>
        <Button className="close-button" variant="ghost" ariaLabel="Close" onClick={close}>
          <Icon name="close" size={20} />
        </Button>
        {panel === "grammar" && <GrammarPanel cart={cart} />}
        {panel === "objectives" && <ObjectivesPanel />}
        {panel === "help" && <HelpPanel onClose={close} />}
        {panel === "shelf" && (
          <ShelfPanel
            initialCategory={category}
            missionCategory={missionCategory}
            missionTargetGreek={missionTargetGreek}
            missionTargetEnglish={missionTargetEnglish}
            missionTargetQuantity={missionTargetQuantity}
            missionStepIndex={missionStepIndex}
            missionStepsTotal={missionStepsTotal}
            onAddToCart={onAddToCart}
            onContinueMission={onContinueMission}
          />
        )}
        {panel === "checkout" && (
          <CheckoutPanel
            cart={cart}
            objectiveLabel={objectiveLabel}
            objectiveProgress={objectiveProgress}
            objectiveTarget={objectiveTarget}
            missionComplete={missionComplete}
            isLastMissionStep={isLastMissionStep}
            onComplete={onCompleteMission}
            onContinueMission={onContinueMission}
            onReset={onResetMission}
          />
        )}
        {panel === "congrats" && <CongratsPanel onContinue={onShowGrammar} />}
      </div>
    </div>
  );
}
