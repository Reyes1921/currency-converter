export const getCurrency = async (): Promise<{
  conversion_rates?: Record<string, number>
}> => {
  const api = process.env.API_KEY
  try {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${api}/latest/USD`
    )

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (!data.conversion_rates) {
      throw new Error('Missing "rates" property in response data')
    }

    return data
  } catch (error) {
    console.error("Error fetching currency data:", error)
    throw error
  }
}
