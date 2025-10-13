import Spinner from "@/components/common/Spinner";
import Button from "@/components/ui/button/Button";
import { useGoogleAuthMutation } from "@/redux/apis/authApi";
import { useEffect, useRef, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type GoogleCredentialResponse = {
  clientId: string;
  credential: string;
  select_by: string;
};

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: GoogleCredentialResponse) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>
          ) => void;
        };
      };
    };
  }
}

const GoogleAuth = () => {
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const googleButtonRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [googleAuth, { isLoading }] = useGoogleAuthMutation();

  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      console.log("Google response:", response);
      console.log("Credential sending to backend:", response.credential);
      try {
        if (response.credential) {
          const res = await googleAuth({
            credential: response.credential,
          }).unwrap();
          toast.success("Login successful!");
          navigate("/");
          console.log("Backend response:", res);
        } else {
          throw new Error("No credentials found");
        }
      } catch (error) {
        console.error("Google login error:", error);
        toast.error("Google login failed");
      }
    },
    [googleAuth]
  );

  const handleGoogleError = (error: unknown) => {
    console.error("Google login failed:", error);
    toast.error("Google login failed");
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.google?.accounts?.id && googleButtonRef.current) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
        });

        setIsGoogleLoaded(true);
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [handleCredentialResponse]);

  const handleGoogleSignIn = async () => {
    if (googleButtonRef.current && isGoogleLoaded) {
      try {
        const googleButton =
          googleButtonRef.current.querySelector<HTMLDivElement>(
            'div[role="button"]'
          );
        googleButton?.click();
      } catch (error) {
        handleGoogleError(error);
      }
    } else {
      handleGoogleError("Google Sign-In not available");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
        <div className="mb-6 flex flex-col items-center">
          {/* <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-md">
            T
          </div> */}
          <img src="/favicon.png" alt="logo" />
          <h1 className="mt-3 text-2xl font-semibold text-gray-800">
            Truer Insights
          </h1>
          <p className="mt-1 text-gray-500 text-sm text-center max-w-xs">
            Sign in to access your dashboard and continue.
          </p>
        </div>

        <Button
          onClick={handleGoogleSignIn}
          size="md"
          type="button"
          variant="outline"
          className="w-[300px] h-12 font-medium flex items-center justify-center gap-2 hover:shadow-sm transition"
          disabled={!isGoogleLoaded}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {isGoogleLoaded ? "Sign in with Google" : "Loading..."}
        </Button>

        <div className="mt-6 text-xs text-gray-400 text-center">
          By signing in, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-gray-600">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer hover:text-gray-600">
            Privacy Policy
          </span>
          .
        </div>

        {/* Hidden Google Button Ref */}
        <div
          ref={googleButtonRef}
          style={{
            position: "absolute",
            top: "-9999px",
            left: "-9999px",
            visibility: "hidden",
          }}
        />
      </div>
    </>
  );
};

export default GoogleAuth;
