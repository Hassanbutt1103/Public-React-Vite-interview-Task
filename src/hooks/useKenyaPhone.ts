import { useState } from "react";

const ALLOWED_PREFIX = "+254";

function getLivePrefixError(value: string): string {
  if (!value) return "";

  // اگر یوزر + کے بغیر کچھ لکھنا شروع کرے تو فوراً بتائے
  if (!value.startsWith("+")) {
    return "Phone number must start with +254";
  }

  // جب تک +254 کی لمبائی (4 حروف) تک نہ پہنچے، ہر حرف کا موازنہ کرے
  const minLen = Math.min(value.length, ALLOWED_PREFIX.length);
  for (let i = 0; i < minLen; i++) {
    if (value[i] !== ALLOWED_PREFIX[i]) {
      return "Only +254 country code is allowed";
    }
  }

  return "";
}

export function useKenyaPhone(initialValue = "") {
  const [phone, setPhone] = useState(initialValue);
  const [error, setError] = useState("");

  const handlePhoneChange = (nextValue: string) => {
    setPhone(nextValue);

    const liveError = getLivePrefixError(nextValue);
    setError(liveError);
  };

  const validateForSubmit = (): boolean => {
    const trimmed = phone.trim();

    if (!trimmed) {
      setError("Phone number is required");
      return false;
    }

    const liveError = getLivePrefixError(trimmed);
    if (liveError) {
      setError(liveError);
      return false;
    }

    if (!/^\+254\d{9}$/.test(trimmed)) {
      setError("Invalid phone number format");
      return false;
    }

    if (trimmed !== "+254712345678") {
      setError("Invalid phone number");
      return false;
    }

    setError("");
    return true;
  };

  const setDemoPhone = () => {
    setPhone("+254712345678");
    setError("");
  };

  return {
    phone,
    error,
    setError,
    handlePhoneChange,
    validateForSubmit,
    setDemoPhone,
  };
}