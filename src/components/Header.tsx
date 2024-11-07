import {ModeToggle} from "./ModeToggle"

export const Header = () => {
  return (
    <header className="top-0 left-0 z-20 py-3 w-full mx-auto max-w-[1280px]  mb-2">
      <div className="flex justify-between px-5 ">
        <h3 className="font-bold text-xl text-left">Currency Converter</h3>
        <div className="flex justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
