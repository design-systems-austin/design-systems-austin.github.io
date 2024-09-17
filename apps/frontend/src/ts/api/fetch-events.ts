export const fetchEvents = async () => {
  const baseServerUrl = import.meta.env.VITE_API_BASE_URL
  const response = await fetch(`${baseServerUrl}/api/notion-events`)
  const data = await response.json()
  return data
}
