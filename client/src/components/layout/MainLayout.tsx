import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { BottomNavBar } from "./BottomNavBar"
import { WhatsAppButton } from "./WhatsAppButton"

export function MainLayout() {
  return (
    <div className="flex min-h-svh flex-col pb-16 md:pb-0">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <Footer />
      <BottomNavBar />
      <WhatsAppButton />
    </div>
  )
}
