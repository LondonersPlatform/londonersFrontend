"use client"

import { useState, useEffect } from "react"
import * as Slider from "@radix-ui/react-slider"

interface PriceRangeProps {
  minPrice?: number
  maxPrice?: number
  initialMin?: number
  initialMax?: number
  step?: number
  formatValue?: (value: number) => string
  onChange?: (values: [number, number]) => void
  histogramData?: number[]
}

export default function PriceRangeSlider({
  minPrice = 0,
  maxPrice = 10000,
  initialMin = 100,
  initialMax = 10000,
  step = 100,
  formatValue = (value) => `$${value.toLocaleString()}`,
  onChange,
  histogramData = [
    5, 8, 12, 18, 15, 25, 30, 35, 42, 45, 50, 48, 30, 20, 15, 10, 8, 12, 20, 25, 30, 35, 15, 10, 5, 8, 12, 18, 15, 25,
    30, 35, 42, 45, 50, 48, 30, 20, 15, 10, 8, 12, 20, 25, 30, 35, 15, 10, 5,
  ],
}: PriceRangeProps) {
  const [values, setValues] = useState<[number, number]>([initialMin, initialMax])

  // Normalize histogram data for display
  const maxDataValue = Math.max(...histogramData)
  const normalizedData = histogramData.map((value) => value / maxDataValue)

  // Calculate which bars should be highlighted (between min and max)
  const highlightedBars = normalizedData.map((_, index) => {
    const barValue = minPrice + (index / (normalizedData.length - 1)) * (maxPrice - minPrice)
    return barValue >= values[0] && barValue <= values[1]
  })

  useEffect(() => {
    if (onChange) {
      onChange(values)
    }
  }, [values, onChange])

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-6">Price range</h2>

      {/* Histogram */}
      <div className="relative h-24 mb-4">
        <div className="absolute inset-0 flex items-end">
          {normalizedData.map((height, index) => (
            <div
              key={index}
              className={`w-full h-[${Math.max(height * 100, 5)}%] mx-[1px] ${
                highlightedBars[index] ? "bg-black" : "bg-gray-300"
              }`}
              style={{ height: `${Math.max(height * 100, 5)}%` }}
            />
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="relative pt-1 pb-8">
        <Slider.Root
          className="relative flex items-center select-none touch-none w-full h-5"
          value={values}
          min={minPrice}
          max={maxPrice}
          step={step}
          onValueChange={(newValues) => setValues(newValues as [number, number])}
        >
          <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
            <Slider.Range className="absolute bg-black rounded-full h-full" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Minimum price"
          />
          <Slider.Thumb
            className="block w-5 h-5 bg-white border-2 border-black rounded-full focus:outline-none focus:ring-2 focus:ring-black"
            aria-label="Maximum price"
          />
        </Slider.Root>

        {/* Min/Max Labels */}
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <div className="flex flex-col items-start">
            <span>Minimum</span>
            <div className="mt-1 px-3 py-1 border rounded-full">{formatValue(values[0])}</div>
          </div>
          <div className="flex flex-col items-end">
            <span>Maximum</span>
            <div className="mt-1 px-3 py-1 border rounded-full">{formatValue(values[1])}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

