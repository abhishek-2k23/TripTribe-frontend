import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useUser,
} from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import { useApi } from "../../services/api";
import Home from "../../page/Home";
import { Spinner } from "../ui/spinner";
import type { ApiResponse, BackendUser } from "../../types/auth.types";

export default function ProtectedLayout() {
  const { user, isLoaded } = useUser();
  const api = useApi();

  const { setClerkUser, setBackendUser } = useAuthStore();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const syncUser = async () => {
      try {
        if (!user) return;

        // 1️⃣ Store Clerk user
        setClerkUser({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
          image: user.imageUrl,
        });

        // 2️⃣ Sync with backend
        const res = await api.post<ApiResponse<BackendUser>>(
          "/users/sync",
          {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            name: user.fullName,
            imageUrl: user.imageUrl,
          }
        );

        setBackendUser(res.data);

      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Sync failed:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (isLoaded && user) {
      syncUser();
    }
  }, [user, isLoaded]);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

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