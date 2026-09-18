import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_HOST;

export type socialLogin =
  | { provider: "google"; code: string }
  | { provider: "facebook"; accessToken: string };

/**
 * Sends the provider credential to your API. The API verifies it with Google /
 * Facebook and responds with the same shape as your normal login endpoint,
 * so the auth slice and the token handling stay unchanged.
 */
export const socialAuth = createAsyncThunk(
  "auth/social",
  async (payload: socialLogin, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/auth/social`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // needed if your API sets an httpOnly refresh cookie
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // always reject with a string so ErrorMessage never receives an object
        return rejectWithValue(
          data.message || "Couldn't sign in with that account",
        );
      }

      return await res.json();
    } catch {
      return rejectWithValue(
        "Network error. Check your connection and try again.",
      );
    }
  },
);
