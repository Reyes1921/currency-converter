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
      parseInt(currentValue) > 10000000000
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
    <main className="w-full mx-auto max-w-[1280px]">
      <h1 className="hidden">Currency Converter</h1>
      <div className="flex flex-col justify-center items-center px-5">
        <div className="flex flex-col w-full justify-center items-center">
          <h3 className="font-bold py-4 md:py-1">
            Select a currency and enter the amount
          </h3>

          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-4">
            <Input
              type="number"
              placeholder="Enter amount"
              min="0"
              max="100000000"
              className="max-w-[250px] md:min-w-[200px] md:max-w-[200px]"
              autoFocus
              onChange={onChangeValue}
            />
            <Select onValueChange={onChangeCurrency} defaultValue={"USD"}>
              <SelectTrigger className="max-w-[250px] md:min-w-[280px] md:max-w-[280px]">
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
                            src={`/flags/${item.code.substring(0, 2)}.svg`}
                            className={`mr-2 w-[24px] aspect-[14/18]`}
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
        <div className="my-8 min-h-[300px]">
          <DynamicComponent value={value} currencyProp={currency} />
        </div>
      </div>
    </main>
  )
}
