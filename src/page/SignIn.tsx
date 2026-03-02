import { useSignIn } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import {
  Card,
  CardContent,
} from '../components/ui/card';
import { Button } from '../components/ui/button';

const SignIn = () => {
  const { isLoaded, signIn } = useSignIn();

  const signInWithGoogle = () => {
    if (!isLoaded) return;
    toast.loading('Signing in...');
    return signIn.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/sso-callback',
      redirectUrlComplete: '/home',
    });
  };

  return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-tr from-[#0B193C] to-[#2E5AAC]">

      <Card className="w-full max-w-md bg-white shadow-2xl rounded-2xl">
        <CardContent className="p-8 flex flex-col gap-6">

          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500">
              Sign in to your account
            </p>
          </div>

          {/* Google Login */}
          <Button
            variant="outline"
            onClick={signInWithGoogle}
            className="w-full"
          >
            Continue with Google
          </Button>
        </CardContent>
      </Card>

    </div>
  );
};

export default SignIn;