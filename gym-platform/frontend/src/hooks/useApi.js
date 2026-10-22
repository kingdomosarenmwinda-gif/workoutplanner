import { useState, useCallback } from 'react'
import client from '../api/client'

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (method, url, data, config) => {
    setLoading(true)
    setError(null)
    try {
      const res = await client.request({ method, url, data, ...config })
      return res.data
    } catch (e) {
      const msg = e.response?.data?.message || e.message || 'Request failed'
      setError(msg)
      throw e
    } finally {
      setLoading(false)
    }
  }, [])

  return { loading, error, request, setError }
}
export default useApi
