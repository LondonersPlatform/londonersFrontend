export default function Amenities() {
  const amenities = [
    {
      icon: "./g3.png",
      title: "Fast Internet",
      description: "High-speed fibre/optic broadband",
      color: "blue",
    },
    {
      icon: "./g4.png",
      title: "Prime Location",
      description: "Located in Central London's finest neighborhoods",
      color: "red",
    },
    {
      icon: "./b.png",
      title: "Toilet Bidets",
      description: "Built-in toilet bidets in all bathrooms",
      color: "teal",
    },
    {
      icon: "./g6.png",
      title: "Air Conditioners",
      description: "Temperature-controlled air conditioner in all rooms",
      color: "blue",
    },
    {
      icon: "./g14.png ",
      title: "Transportation",
      description: "Minutes away from tube stations and underground stations",
      color: "red",
    },
    {
      icon: "./g7.png",
      title: "Daily Housekeeping",
      description: "Daily cleaning services available upon request",
      color: "orange",
    },
    {
      icon: "./g8.png",
      title: "Netflix & Chill",
      description: "All TVs come with Netflix and other streaming services",
      color: "red",
    },
    {
      icon: "./g13.png",
      title: "Luggage Storage",
      description: "Luggage storage available on premises for early check-ins",
      color: "green",
    },
    {
      icon: "./g10.png",
      title: "Baby Friendly",
      description: "Baby cribs, high chairs, and baby monitors available",
      color: "blue",
    },
    {
      icon: "./g15.png",
      title: "Fully-Equipped Kitchen",
      description: "Well-maintained kitchens with all appliances",
      color: "yellow",
    },
    {
      icon: "./g12.png",
      title: "Management",
      description: "Professional management on call or on premises",
      color: "blue",
    },
    {
      icon: "./g11.png",
      title: "Babysitting",
      description: "Certified babysitters available upon request",
      color: "purple",
    },
  ]


  return (
    <section className="container mx-auto py-8  px-4 md:px-6">
      <h2 className="mb-24 text-center lg:text-3xl  text-lg font-bold">We have everything you need</h2>
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-start">
            <div
              className={`mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-${amenity.color}-100 text-${amenity.color}-500`}
            >
           <img src={`${amenity.icon}`} alt={amenity.description}/>
            </div>
            <div>
              <h3 className="font-bold">{amenity.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{amenity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

