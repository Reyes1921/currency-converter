import Image from "next/image"
import Link from "next/link"

export const Footer = () => {
  const icons = [
    {
      path: "https://github.com/Reyes1921/currency-converter",
      src: "/github.svg",
      title: "Github",
      alt: '"github logo',
    },
    {
      path: "https://www.linkedin.com/in/reyes-rondon/?locale=en_US",
      src: "/linkedin.svg",
      title: "Linkedin",
      alt: '"linkedin logo',
    },
    {
      path: "mailto:reyesjrondon@gmail.com",
      src: "/gmail.svg",
      title: "reyesjrondon@gmail.com",
      alt: '"gmail logo',
    },
  ]
  return (
    <footer className="w-full mx-auto max-w-[1280px]">
      <div className="flex justify-between px-5 pt-0 py-2">
        <div className="flex">
          {icons.map((icon) => (
            <Link
              href={icon.path}
              key={icon.alt}
              target="_blank"
              className="p-2 hover:scale-110 hover:opacity-70 inline-block"
            >
              <Image
                src={icon.src}
                height="12"
                width="20"
                className="filter dark:invert"
                alt={icon.alt}
              />
            </Link>
          ))}
        </div>
        <p className="p-2 text-black  dark:text-white"> Reyes Rondón</p>
      </div>
    </footer>
  )
}
