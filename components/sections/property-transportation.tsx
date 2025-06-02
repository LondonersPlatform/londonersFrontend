import Image from "next/image"



export function PropertyTransportation({transportData}:any) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Transportation</h2>

      <div className="space-y-3 flex gap-12 lg:flex-row flex-col items-center">
        {transportData.map((transport:any, index:number) => (
          <div key={index} className="flex items-center gap-4">
            <div className="relative  h-12 w-12 rounded-full overflow-hidden">
              <Image
                src={transport.icon}
                alt={transport.alt}
                fill
                className="object-cover "
              />
            </div>
            <span>{transport.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}