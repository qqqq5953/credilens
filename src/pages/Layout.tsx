import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Suspense } from "react"

export default function Layout() {
  return (
    <div className='flex flex-col h-screen bg-neutral-50'>
      <Header />
      <div className="flex flex-col grow border overflow-auto">
        <main className="px-4 py-8 ">
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  )
}