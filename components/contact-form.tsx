"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle, Mail } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEmailClick = () => {
    const { name, email, subject, message } = formData

    if (!name || !email || !subject || !message) {
      setFeedback({
        success: false,
        message: "Please fill in all fields before sending.",
      })
      return
    }

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=salihusaeed2712@gmail.com&su=${encodeURIComponent(
      subject || "Project inquiry"
    )}&body=${encodeURIComponent(
      `Hello,\n\nMy name is ${name}.\n\n${message}\n\nYou can reach me at: ${email}`
    )}`

    window.open(gmailUrl, "_blank") // opens Gmail in a new tab
    setFeedback({
      success: true,
      message: "Opening Gmail in a new tab...",
    })

    // Reset form after sending
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
  }

  const handleDirectEmail = async () => {
    try {
      await navigator.clipboard.writeText("salihusaeed2712@gmail.com")
      setFeedback({
        success: true,
        message: "Email address copied to clipboard!",
      })
    } catch (err) {
      setFeedback({
        success: false,
        message: "Failed to copy email. Please try manually.",
      })
    }
  }

  return (
    <form className="space-y-4 md:space-y-6 bg-gray-900 p-4 md:p-6 rounded-lg">
      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="name" className="text-sm md:text-base">
          Your name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-gray-800 border-gray-700 text-sm md:text-base h-9 md:h-10"
        />
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="email" className="text-sm md:text-base">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-gray-800 border-gray-700 text-sm md:text-base h-9 md:h-10"
        />
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="subject" className="text-sm md:text-base">
          What's this about?
        </Label>
        <Input
          id="subject"
          name="subject"
          placeholder="Project inquiry"
          value={formData.subject}
          onChange={handleChange}
          required
          className="bg-gray-800 border-gray-700 text-sm md:text-base h-9 md:h-10"
        />
      </div>

      <div className="space-y-1 md:space-y-2">
        <Label htmlFor="message" className="text-sm md:text-base">
          Your message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={handleChange}
          required
          className="bg-gray-800 border-gray-700 min-h-[100px] md:min-h-[120px] text-sm md:text-base"
        />
      </div>

      {feedback && (
        <div
          className={`p-3 rounded-md flex items-start gap-2 ${
            feedback.success ? "bg-green-950/50 text-green-400" : "bg-red-950/50 text-red-400"
          }`}
        >
          {feedback.success ? (
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          )}
          <p className="text-sm">{feedback.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          type="button"
          onClick={handleEmailClick}
          className="flex-1 bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 h-10 md:h-11 text-sm md:text-base"
        >
          Get in touch
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleDirectEmail}
          className="flex-1 border-gray-700 hover:bg-gray-800 h-10 md:h-11 text-sm md:text-base bg-transparent"
        >
          <Mail className="mr-2 h-4 w-4" />
          Get Email
        </Button>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Having trouble with the form? Contact me directly at salihusaeed2712@gmail.com
      </p>
    </form>
  )
}
