import Link from "next/link";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 py-10 md:h-24 md:py-0">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">LifeForge AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LifeForge AI. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
            Terms
          </Link>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
            Privacy
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}