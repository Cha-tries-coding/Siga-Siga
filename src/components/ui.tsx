import type { ReactNode } from "react";
import type { IconName } from "../types";

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    book: <><path d="M12 6.7c-1.7-1.4-3.9-2.2-6.2-2.2A2.3 2.3 0 0 0 3.5 6.8v10.9a2 2 0 0 1 2.3-1.7c2.2 0 4.3.7 6.2 2" /><path d="M12 6.7c1.7-1.4 3.9-2.2 6.2-2.2a2.3 2.3 0 0 1 2.3 2.3v10.9a2 2 0 0 0-2.3-1.7c-2.2 0-4.3.7-6.2 2" /><path d="M12 6.7v11" /></>,
    notebook: <><path d="M8 3.5h10a1.3 1.3 0 0 1 1.3 1.3v14.4A1.3 1.3 0 0 1 18 20.5H8" /><path d="M8 3.5A2.7 2.7 0 0 0 5.3 6.2v11.6A2.7 2.7 0 0 0 8 20.5" /><circle cx="5.3" cy="8" r=".9" /><circle cx="5.3" cy="12" r=".9" /><circle cx="5.3" cy="16" r=".9" /><path d="M10.5 9h6M10.5 12.3h6M10.5 15.6h3.5" /></>,
    chart: <><path d="M4 3.5v15A1.5 1.5 0 0 0 5.5 20H21" /><rect x="7" y="13" width="2.8" height="5.2" rx="1" /><rect x="11.6" y="9" width="2.8" height="9.2" rx="1" /><rect x="16.2" y="5.5" width="2.8" height="12.7" rx="1" /></>,
    help: <><circle cx="12" cy="12" r="9" /><path d="M9.5 9.3a2.6 2.6 0 1 1 3.7 2.4c-1 .5-1.4 1.1-1.4 2.2" /><path d="M12 17.2h.01" /></>,
    sound: <><path d="M5 10v4h3l4 3V7L8 10zM16 9.5a4 4 0 0 1 0 5M18.5 7a7 7 0 0 1 0 10" /></>,
    cart: <><path d="M3 4h2l2.2 11h11.5l2-7H6" /><circle cx="9" cy="19" r="1.5" /><circle cx="18" cy="19" r="1.5" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    arrow: <path d="m5 12 6-6v4h8v4h-8v4z" />,
    check: <path d="m5 12 4 4 10-10" />,
    gamepad: <><rect x="3" y="8" width="18" height="10" rx="4" /><path d="M7.5 11v4M5.5 13h4" /><circle cx="15.5" cy="12" r="1" /><circle cx="18" cy="14.5" r="1" /></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    receipt: <><path d="M6 3h12v19l-3-2-3 2-3-2-3 2z" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    add: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

export function Button({
  children,
  onClick,
  variant = "white",
  className = "",
  ariaLabel,
  disabled = false,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "white" | "blue" | "coral" | "ghost" | "green";
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}) {
  return (
    <button
      className={`button button--${variant} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function Text({
  as = "div",
  children,
  className = "",
}: {
  as?: "div" | "h1" | "h2" | "h3" | "p" | "span";
  children: ReactNode;
  className?: string;
}) {
  const Tag = as;
  return <Tag className={className}>{children}</Tag>;
}

