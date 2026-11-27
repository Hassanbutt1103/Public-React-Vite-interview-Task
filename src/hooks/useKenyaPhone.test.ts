import { act, renderHook } from "@testing-library/react";
import { useKenyaPhone } from "./useKenyaPhone";

describe("useKenyaPhone hook", () => {
  it("shows live error immediately when typing a non-+254 country code", () => {
    const { result } = renderHook(() => useKenyaPhone());

    act(() => {
      result.current.handlePhoneChange("+92");
    });
    expect(result.current.error).toBe("Only +254 country code is allowed");

    act(() => {
      result.current.handlePhoneChange("254");
    });
    expect(result.current.error).toBe("Phone number must start with +254");
  });

  it("clears error when corrected to +254 and passes valid demo phone", () => {
    const { result } = renderHook(() => useKenyaPhone());

    act(() => {
      result.current.handlePhoneChange("+1");
    });
    expect(result.current.error).toBe("Only +254 country code is allowed");

    act(() => {
      result.current.handlePhoneChange("+254712345678");
    });
    expect(result.current.error).toBe("");

    let isValid = false;
    act(() => {
      isValid = result.current.validateForSubmit();
    });
    expect(isValid).toBe(true);
  });

  it("rejects invalid format or non-demo +254 number on submit", () => {
    const { result } = renderHook(() => useKenyaPhone("+25471234567"));

    act(() => {
      result.current.validateForSubmit();
    });
    expect(result.current.error).toBe("Invalid phone number format");

    act(() => {
      result.current.handlePhoneChange("+254799999999");
    });
    act(() => {
      result.current.validateForSubmit();
    });
    expect(result.current.error).toBe("Invalid phone number");
  });
});