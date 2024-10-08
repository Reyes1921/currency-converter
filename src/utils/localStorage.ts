import {defaultData} from "@/data/defaultData"
import {getCurrency} from "@/helpers/getCurrency"
import {currencyTypes, initialDataCached} from "@/types"

const responseDefault = {
  result: "string",
  documentation: "string",
  terms_of_use: "string",
  time_last_update_unix: 0,
  time_last_update_utc: "string",
  time_next_update_unix: 0,
  time_next_update_utc: "string",
  base_code: "string",
  conversion_rates: {USD: 1},
}

//get currencies cards from localStorage if not found returns default currencies cards
export const getValueStorageCards = (key: string): currencyTypes[] => {
  try {
    const data = localStorage.getItem(key)
    if (data) {
      return JSON.parse(data)
    } else {
      localStorage.setItem(key, JSON.stringify(defaultData))
      return defaultData
    }
  } catch (error) {
    console.error("Error getting cards data from localStorage:", error)
    return [{code: "", name: "", country: ""}]
  }
}
//get data from localStorage if not found returns data from api request and save it into localStorage
export const getValueStorageData = (key: string): initialDataCached => {
  try {
    const data = localStorage.getItem(key)

    if (data) {
      const parsedData = JSON.parse(data) as initialDataCached

      // Check if the data is expired (e.g., 12 AM)
      const currentTime = new Date().getTime()
      if (parsedData.time_next_update_unix * 1000 < currentTime) {
        // Data is expired, fetch new data
        getCurrency()
          .then((data) => {
            localStorage.setItem(key, JSON.stringify(data))
            return data
          })
          .catch((error) => {
            console.error("Error fetching currency data:", error)
            return responseDefault
          })
      } else {
        // Data is not expired, return cached data
        return parsedData
      }
    } else {
      getCurrency()
        .then((data) => {
          localStorage.setItem(key, JSON.stringify(data))
          return data
        })
        .catch((error) => {
          console.error("Error fetching currency data:", error)
          return responseDefault
        })
    }
  } catch (error) {
    console.error("Error getting initial data from localStorage:", error)
    return responseDefault
  }
  return responseDefault
}
//save data into localStorage
export const saveToLocalStorage = <T>(key: string, data: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error("Error saving data to localStorage:", error)
  }
}
