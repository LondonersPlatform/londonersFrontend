"use client"

import { useState } from "react"
import Image from "next/image"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/contact-us`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus("Message sent successfully!")
        setFormData({ name: "", email: "", message: "", subject: "" })
      } else {
        setStatus("Failed to send message.")
      }
    } catch (error) {
      console.error(error)
      setStatus("Error sending message.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-[#000] py-16 text-white">
      <div className="md:w-[85%] w-[96%] mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Image */}
          <div className="flex flex-col justify-center">
            <div className="relative">
              <Image
                src="/l1.svg"
                alt="Contact cards"
                width={550}
                height={550}
                className="rounded-2xl object-contain"
              />
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="mb-6 text-3xl font-bold">Get in touch</h2>
              <p className="mb-8">Fill out this form and get in touch with our friendly team!</p>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-full bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-full bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
              />

              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-full bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
              />

              <textarea
                name="message"
                placeholder="Your message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-2xl bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-white p-3 text-center font-medium text-black hover:bg-gray-200"
              >
                {loading ? "Sending..." : "Send"}
              </button>

              {status && (
                <p className="mt-2 text-sm text-center text-gray-300">{status}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
