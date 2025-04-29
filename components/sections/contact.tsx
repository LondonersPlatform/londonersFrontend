import Image from "next/image"

export default function Contact() {
  return (
    <section className="bg-[#000] py-16 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
         
            <div className="relative">
              <Image
                src="/l2.png"
                alt="Contact cards"
                width={400}
                height={300}
                className="rounded-2xl object-contain"
              />
            </div>
          </div>
          <div>
            <form className="space-y-4">
            <h2 className="mb-6 text-3xl font-bold">Get in touch</h2>
            <p className="mb-8">Fill out this form and get in touch with our friendly team!</p>
              <div>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full rounded-2xl  rounded-full bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-2xl  rounded-full bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Enter your number"
                  className="w-full rounded-2xl   bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your message"
                  rows={5}
                  className="w-full rounded-2xl   bg-[#FFFFFF33] p-3 text-white placeholder-gray-400"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full rounded-2xl bg-white p-3 text-center font-medium text-black hover:bg-gray-200"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

