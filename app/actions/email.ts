"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
const resendApiKey = process.env.RESEND_API_KEY
const resend = resendApiKey ? new Resend(resendApiKey) : null

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  try {
    // Log environment check to help with debugging
    console.log("RESEND_API_KEY available:", !!resendApiKey)

    // For development/demo without API key
    if (!resend) {
      console.log("Email would be sent with the following data:", formData)
      return {
        success: false,
        message: "Email configuration error: API key not found. Please check your environment variables.",
      }
    }

    // Recipient email - using the correct email address
    const recipientEmail = "salihusaeed2712@gmail.com"

    // Send the actual email
    const { data, error } = await resend.emails.send({
      from: "info@cgsalih.com",
      to: recipientEmail,
      subject: `New Contact Form: ${formData.subject}`,
      text: `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
      `,
      // You could also use HTML for a nicer formatted email
    })

    if (error) {
      console.error("Resend API Error:", error)
      return {
        success: false,
        message: `Failed to send email: ${error.message || "Unknown error"}. Please try again later or contact directly via email.`,
      }
    }

    console.log("Email sent successfully:", data)
    return { success: true, message: "Your message has been sent successfully!" }
  } catch (error) {
    // Log the full error for debugging
    console.error("Unexpected error in sendContactEmail:", error)

    // Provide more detailed error message
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    return {
      success: false,
      message: `An unexpected error occurred: ${errorMessage}. Please try contacting directly via email.`,
    }
  }
}
