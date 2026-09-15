import { WhatsAppIcon } from "../ui/WhatsAppIcon"

const PHONE_NUMBER = "254113174493"
const PREFILLED_MESSAGE = "Hi Dennis, I came across your portfolio and would like to chat."

export function WhatsAppButton() {
  const href = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(PREFILLED_MESSAGE)}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg transition hover:scale-105 hover:bg-[#20bd5a] active:scale-95 md:bottom-6 md:right-6"
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25d366]" />
      <WhatsAppIcon className="relative h-7 w-7" />
    </a>
  )
}
