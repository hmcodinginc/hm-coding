const SENSITIVE = /row-level security|permission denied|jwt|api key|postgres|violates|policy/i;

export function getUserErrorMessage(error: unknown, fallback: string): string {
  if (!error) return fallback;

  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : typeof error === "object" && "message" in error
          ? String((error as { message: unknown }).message)
          : "";

  if (!message || SENSITIVE.test(message)) {
    return fallback;
  }

  if (message.length > 160) {
    return fallback;
  }

  return message;
}
