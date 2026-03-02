import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Home from "../../page/Home";

export default function ProtectedLayout() {
  return (
    <>
      <SignedIn>
        <Home />
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}