import { Compass } from "lucide-react"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

/**
 * Minimal public layout for the legal and account-deletion pages. These must load without
 * signing in (Play Store requires the deletion URL to be reachable signed out), so they don't
 * use the dashboard layout.
 */
export default function LegalShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">Trip Tribe</span>
          </Link>
          <Link to="/signin" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Sign in
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">{children}</main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 py-6 text-xs text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
          <Link to="/delete-account" className="hover:text-foreground">Delete account</Link>
          <span>© 2026 Trip Tribe</span>
        </div>
      </footer>
    </div>
  )
}
