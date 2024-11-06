"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {currencies} from "@/data/data"
import {currencyTypes, initialDataCached, ShowCurrenciesProps} from "@/types"
import {
  getValueStorageCards,
  getValueStorageData,
  saveToLocalStorage,
} from "@/utils/localStorage"
import {useEffect, useState} from "react"
import {Button} from "./ui/button"
import {SquareX} from "lucide-react"
import Image from "next/image"

export const ShowCurrencies = ({value, currencyProp}: ShowCurrenciesProps) => {
  //load api request from localStorage
  const [initialData, setInitialData] = useState<initialDataCached>(
    getValueStorageData("initialData")
  )
  //load default currencies cards from localStorage
  const [cards, setCards] = useState<currencyTypes[]>(
    getValueStorageCards("countries")
  )
  //load api request from localStorage
  useEffect(() => {
    setInitialData(getValueStorageData("initialData"))
  }, [value, currencyProp])

  useEffect(() => {
    setCards(getValueStorageCards("countries"))
  }, [])
  //save current currencies cards into localStorage
  useEffect(() => {
    saveToLocalStorage("countries", cards)
  }, [cards])
  //state for new currency
  const [newCurrency, setNewCurrency] = useState({
    code: "noneCurrency",
    name: "",
    country: "",
  })
  //onChange currency select
  const onChangeCurrency = (value: string) => {
    const newCurrency = currencies.filter((item) => {
      if (item.code === value) return item
    })
    setNewCurrency(newCurrency[0])
  }
  //handle delete a specif currency card
  const handleDeleteCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index))
  }
  //handle add a new currency card
  const handleAddCard = (newCard: currencyTypes) => {
    if (
      cards.length < 6 &&
      newCard.code !== "noneCurrency" &&
      !cards.some((card) => card.code === newCard.code)
    ) {
      setCards([newCard, ...cards])
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-[300px]">
      <h2 className="font-bold mb-2">Select the countries</h2>
      <div className="flex justify-around gap-5 mb-4">
        <Select onValueChange={onChangeCurrency}>
          <SelectTrigger className="min-w-[280px] max-w-[280px]">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Countries</SelectLabel>
              {currencies.map((item: currencyTypes) => {
                return (
                  <SelectItem value={item.code} key={item.code}>
                    <span className="flex justify-center items-center">
                      <Image
                        width={100}
                        height={100}
                        alt="flag image"
                        src={`/flags/${item.code.substring(0, 2)}.svg`}
                        className={`mr-2 w-[24px]`}
                      />
                      {item.name}
                    </span>
                  </SelectItem>
                )
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          onClick={() => handleAddCard(newCurrency)}
          className="hover:scale-105"
        >
          Add
        </Button>
      </div>
      <span className="mb-2 text-primary">Maximum 6 countries at a time</span>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-5">
        {cards.map((item, index) => {
          return (
            <Card
              className="backdrop-blur-sm bg-[#67676718] relative md:aspect-[16/7] border-0"
              key={item.code}
            >
              <button
                onClick={() => handleDeleteCard(index)}
                className="m-2 hover:scale-110 absolute right-0 text-primary"
              >
                <SquareX />
              </button>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 mt-2 md:mt-0">
                <CardTitle className="text-sm font-medium">
                  <div className="flex justify-center items-center">
                    <Image
                      width={100}
                      height={100}
                      alt="flag image"
                      src={`/flags/${item.code.substring(0, 2)}.svg`}
                      className={` w-[32px] md:w-[48px] aspect-square pr-1`}
                    />
                    <span className="ml-1 text-xs md:text-base">
                      {item.country}
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="">
                  <span className="text-sm md:text-lg lg:text-2xl font-bold break-all">
                    {value > 0
                      ? new Intl.NumberFormat("de-DE", {
                          style: "currency",
                          currency: `${item.code}` || "USD",
                        }).format(
                          value *
                            (initialData?.conversion_rates?.[item.code] /
                              initialData?.conversion_rates?.[currencyProp])
                        )
                      : 0}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{item.name}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
