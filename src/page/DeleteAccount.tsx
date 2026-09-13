import { useClerk, useUser } from "@clerk/clerk-react"
import { CircleCheck, TriangleAlert } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"
import { Link } from "react-router-dom"

import LegalShell from "@/components/legal/LegalShell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DELETION_EFFECTS, LEGAL_CONTACT_EMAIL } from "@/content/legal"
import { useApi } from "@/services/api"

const CONFIRM_WORD = "DELETE"

/**
 * Public account-deletion page. Play Store requires a deletion URL that works without the app
 * and without being signed in, so signed-out visitors get instructions, and signed-in visitors
 * can delete right here with a typed confirmation.
 */
export default function DeleteAccount() {
  const { isLoaded, isSignedIn, user } = useUser()
  const { signOut } = useClerk()
  const api = useApi()

  const [confirmText, setConfirmText] = useState("")
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleDelete = async () => {
    if (confirmText !== CONFIRM_WORD || deleting) return
    setDeleting(true)
    const toastId = toast.loading("Deleting your account...")
    try {
      // Someone who signed in but never opened the dashboard has no Trip Tribe record yet, and the
      // delete route needs one to find their sign-in account. Sync creates it if missing.
      await api.post("/users/sync")
      await api.delete("/users/me")
      toast.success("Your account has been deleted", { id: toastId })
      setDeleted(true)
      try {
        await signOut()
      } catch {
        // The sign-in account no longer exists, so there may be no session left to end.
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't delete your account", { id: toastId })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <LegalShell>
      <div className="space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-navy">Delete your Trip Tribe account</h1>
          <p className="text-muted-foreground">
            You can delete your account and data at any time, from the app or from this page.
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-2 text-red-700">
            <TriangleAlert className="h-5 w-5" />
            <h2 className="font-semibold">What deleting your account does</h2>
          </div>
          <ul className="list-disc space-y-2 pl-6 text-sm text-red-900">
            {DELETION_EFFECTS.map((effect) => (
              <li key={effect}>{effect}</li>
            ))}
          </ul>
        </section>

        {!isLoaded ? null : deleted ? (
          <section className="flex items-start gap-3 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-800">
            <CircleCheck className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="space-y-1">
              <p className="font-semibold">Your account has been deleted.</p>
              <p className="text-sm">Thanks for travelling with Trip Tribe.</p>
            </div>
          </section>
        ) : isSignedIn ? (
          <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm text-muted-foreground">
              Signed in as{" "}
              <span className="font-semibold text-foreground">
                {user?.primaryEmailAddress?.emailAddress ?? user?.fullName}
              </span>
              .
            </p>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-foreground">
                Type <span className="font-mono font-bold">{CONFIRM_WORD}</span> to confirm
              </span>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                autoComplete="off"
                placeholder={CONFIRM_WORD}
              />
            </label>
            <Button
              onClick={handleDelete}
              disabled={confirmText !== CONFIRM_WORD || deleting}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              {deleting ? "Deleting..." : "Delete my account"}
            </Button>
          </section>
        ) : (
          <section className="space-y-4 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-semibold text-foreground">How to delete your account</h2>
            <ol className="list-decimal space-y-2 pl-6 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">In the app:</span> open Account (your
                photo on My Trips), then choose Delete account.
              </li>
              <li>
                <span className="font-medium text-foreground">On the web:</span> sign in, then come
                back to this page to delete your account here.
              </li>
            </ol>
            <Link to="/signin">
              <Button variant="hero">Sign in</Button>
            </Link>
          </section>
        )}

        <p className="text-sm text-muted-foreground">
          Can't sign in any more? Email {LEGAL_CONTACT_EMAIL} from the address on your account and
          we'll delete it for you. See the{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>{" "}
          for details.
        </p>
      </div>
    </LegalShell>
  )
}
