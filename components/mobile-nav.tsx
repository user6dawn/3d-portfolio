"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-black/95 border-gray-800">
        <div className="flex flex-col space-y-6 mt-8">
          <Link
            href="#services"
            className="text-lg font-medium hover:text-pink-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            Services
          </Link>
          <Link
            href="#portfolio"
            className="text-lg font-medium hover:text-pink-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            Portfolio
          </Link>
          <Link
            href="#about"
            className="text-lg font-medium hover:text-pink-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="text-lg font-medium hover:text-pink-400 transition-colors"
            onClick={() => setOpen(false)}
          >
            Contact
          </Link>
          <Button
            className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 w-full mt-4"
            onClick={() => setOpen(false)}
          >
            Hire Me
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
