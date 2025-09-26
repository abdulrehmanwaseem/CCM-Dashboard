import { supabase } from "@/lib/supabase";
import { useEffect } from "react";
import { useVerifyTokenMutation } from "@/redux/apis/authApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

const OAuthCallback = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [verifyToken] = useVerifyTokenMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      const exchangeTokens = async () => {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error || !session) {
          console.error("No Supabase session:", error);
          return;
        }

        const { access_token, refresh_token } = session;

        await verifyToken({ access_token, refresh_token }).unwrap();
        navigate("/", { replace: true });
      };

      exchangeTokens();
    }
  }, [verifyToken, navigate]);

  return null;
};

export default OAuthCallback;
