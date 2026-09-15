import { useEffect, useState } from "react"

/**
 * Delays reflecting `value` until it has stopped changing for `delayMs`.
 * Each new value resets the timer, so only the final value in a burst
 * (e.g. fast typing) is ever committed — the classic "debounce" behaviour.
 */
export function useDebouncedValue<T>(value: T, delayMs = 400): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timeout)
  }, [value, delayMs])

  return debounced
}
