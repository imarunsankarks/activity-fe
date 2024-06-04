import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (userid, password) => {
    setLoading(true);
    setError(null);
    const response = await fetch(`${process.env.BR_URL}/api/user/signup/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userid, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // store user in local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update auth context
      dispatch({ type: "LOGIN", payload: json });

      setLoading(false);
    }
  };
  return { signup, loading, error };
};
