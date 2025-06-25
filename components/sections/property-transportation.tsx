import TransportIcon from "@/public/svg-assets/transport-icon"
import Image from "next/image"



export function PropertyTransportation({transportData}:any) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Transportation</h2>

      <div className="space-y-3 flex gap-12 lg:flex-row flex-col items-center">
        {transportData.map((transport:any, index:number) => (
          <div key={index} className="flex items-center gap-4">
            <div className="relative rounded-full overflow-hidden">

              <TransportIcon />
       
            </div>
            <span>{transport.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}