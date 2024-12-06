import { useState } from "react";
import { useSession } from "@clerk/clerk-react";

const useFetch = (cb, options = {}, requiresAuth = true) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { session } = useSession();

  const fn = async (...args) => {

    setLoading(true);
    setError(null);

    try {
      let supabaseAccessToken = null;

      // Skip token fetching if `requiresAuth` is false
      if (requiresAuth) {
        if (!session) {
          throw new Error("No session available");
        }

        supabaseAccessToken = await session.getToken({
          template: "supabase",
        });

        if (!supabaseAccessToken) {
          throw new Error("Failed to retrieve Supabase access token");
        }
      }

      // Call the API with or without the token based on `requiresAuth`
      const response = await cb(supabaseAccessToken, options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;
