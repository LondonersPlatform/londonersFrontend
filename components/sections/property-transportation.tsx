import Image from "next/image"



export function PropertyTransportation({transportData}:any) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Transportation</h2>

      <div className="space-y-3">
        {transportData.map((transport:any, index:number) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={transport.icon}
                alt={transport.alt}
                fill
                className="object-cover"
              />
            </div>
            <span>{transport.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}