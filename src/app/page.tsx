"use client"

import {useState} from "react"
import {Input} from "@/components/ui/input"
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
import {currencyTypes} from "@/types"
import dynamic from "next/dynamic"
import Image from "next/image"

const DynamicComponent = dynamic(
  () =>
    import("../components/ShowCurrencies").then((mod) => mod.ShowCurrencies),
  {
    loading: () => <div className="loader"></div>,
    ssr: false,
  }
)

export default function Home() {
  const [value, setValue] = useState(0)
  const [currency, setCurrency] = useState("USD")

  //onChange amount value
  const onChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value
    if (
      parseInt(currentValue) <= 0 ||
      currentValue.length === 0 ||
      parseInt(currentValue) > 100000000
    ) {
      setValue(value)
    } else {
      setValue(parseInt(currentValue))
    }
  }
  //onChange currency select
  const onChangeCurrency = (value: string) => {
    setCurrency(value)
  }

  return (
    <div className="flex flex-col justify-center items-center m-8">
      <div className="flex flex-col w-full max-w-sm items-center space-x-2 justify-center">
        <h3 className="font-bold mb-2">
          Select a currency and enter the amount
        </h3>

        <div className="flex">
          <Input
            type="number"
            placeholder="Enter amount"
            min="0"
            max="100000000"
            className="mr-4 md:min-w-[200px] md:max-w-[200px]"
            autoFocus
            onChange={onChangeValue}
          />
          <Select onValueChange={onChangeCurrency} defaultValue={"USD"}>
            <SelectTrigger className="md:min-w-[280px] md:max-w-[280px]">
              <SelectValue placeholder="Select a currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Currencies</SelectLabel>
                {currencies.map((item: currencyTypes) => {
                  return (
                    <SelectItem value={item.code} key={item.code}>
                      <span className="flex justify-center items-center">
                        <Image
                          width={100}
                          height={100}
                          alt="flag image"
                          src={
                            item.code === "EUR"
                              ? `/eu.svg`
                              : `https://flagsapi.com/${item.code.substring(
                                  0,
                                  2
                                )}/shiny/64.png`
                          }
                          className={`${
                            item.code === "EUR" ? "py-3 px-1" : ""
                          } mr-2 w-[24px]`}
                        />
                        {item.name}
                      </span>
                    </SelectItem>
                  )
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center m-10 min-h-[300px]">
        <DynamicComponent value={value} currencyProp={currency} />
      </div>
    </div>
  )
}
