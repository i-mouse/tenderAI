import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const DISMISSED_KEY = "prism.guestBanner.dismissed";

export function GuestBanner() {
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISSED_KEY) === "true");

  if (dismissed) return null;

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-orange-200 bg-orange-50 px-4 py-2">
      <p className="font-sans text-sm text-ink">
        You're in guest mode. Sign in to save your work across sessions.
      </p>
      <div className="flex items-center gap-3">
        <Link to="/login" className="font-sans text-sm font-medium text-brand hover:text-brand-hover">
          Sign in
        </Link>
        <button
          type="button"
          onClick={() => {
            localStorage.setItem(DISMISSED_KEY, "true");
            setDismissed(true);
          }}
          aria-label="Dismiss"
          className="flex h-11 w-11 items-center justify-center text-ink-tertiary hover:text-ink md:h-6 md:w-6"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
