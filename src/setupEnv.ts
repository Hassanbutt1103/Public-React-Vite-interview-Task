export {};

// eslint-disable-next-line @typescript-eslint/no-require-imports
const utilModule = require("util") as {
  TextEncoder: typeof globalThis.TextEncoder;
  TextDecoder: typeof globalThis.TextDecoder;
};

if (typeof globalThis.TextEncoder === "undefined") {
  globalThis.TextEncoder = utilModule.TextEncoder;
}

if (typeof globalThis.TextDecoder === "undefined") {
  globalThis.TextDecoder = utilModule.TextDecoder;
}