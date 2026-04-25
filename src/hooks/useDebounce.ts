import { useState, useEffect } from 'react'

/**
 * Debounces a value — useful for search inputs that trigger API calls.
 * @example
 *   const [search, setSearch] = useState('')
 *   const debouncedSearch = useDebounce(search, 400)
 *   // useQuery runs with debouncedSearch, not search
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs)
    return () => clearTimeout(timer)
  }, [value, delayMs])

  return debounced
}
