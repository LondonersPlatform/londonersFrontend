"use client"
// import TransportIcon from "@/public/svg-assets/transport-icon"
import Image from "next/image"
import TransportIcon from "@/public/underr.png"


export function PropertyTransportation({transportData}:any) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Transportation</h2>

      <div className="space-y-3 flex gap-12 lg:flex-row flex-col items-start">
        {transportData.map((transport:any, index:number) => (
          <div key={index} className="flex items-center gap-4">
            <div className="  h-full justify-center items-center flex flex-col w-28">
              <Image src={TransportIcon} alt={transport.name}  className=" " />
            </div>
            <span>{transport.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}