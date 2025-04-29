import Image from "next/image"

export default function Experience() {
  return (
    <section className="container mx-auto py-16 px-4 md:px-6">
      <div className="flex flex-col items-center">
        <div className="relative mb-8 flex w-full justify-between">
          <div className="lg:absolute left-0 top-1/2 -translate-y-1/2 transform">
            <Image
              src="/l0.png"
              alt="Stamp"
              width={100}
              height={100}
              className="h-32 w-32 object-contain"
            />
          </div>
          <h2 className="mx-auto text-3xl font-bold">The Londoners experience</h2>
          <div className="lg:absolute right-0 top-1/2 -translate-y-1/2 transform">
            <Image
             src="/l1.png"
              alt="Stamp"
              width={100}
              height={100}
              className="h-32 w-32 object-contain"
            />
          </div>
        </div>
        <div className="max-w-3xl text-center">
          <p className="mb-6 text-gray-700">
            The Londoners experience offers you all the home comforts you need inside one of our character-filled homes,
            each and every one of them unique.
          </p>
          <p className="mb-6 text-gray-700">
            We offer guests traveling to London a unique collection of beautiful homes to rent for short or long stays.
          </p>
          <p className="text-gray-700">
            Whether you're seeking convenience, wow-factor or homes suited to group and family bookings, our collections
            offer city break living in premium locations - all with the service you would expect from a hotel.
          </p>
        </div>
      </div>
    </section>
  )
}

