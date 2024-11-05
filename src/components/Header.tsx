import {ModeToggle} from "./ModeToggle"

export const Header = () => {
  return (
    <header className="w-full top-0 left-0 z-20 py-3 md:py-5 mx-auto max-w-[1280px]">
      <div className="flex justify-between px-5 md:px-28">
        <h3 className="font-bold text-2xl md:text-4xl text-left">
          Currency Converter
        </h3>
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
