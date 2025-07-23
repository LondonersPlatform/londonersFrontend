"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, AlertCircle, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  countriesData,
  formatPhoneForCountry,
  getCountryByCode,
} from "@/lib/phoneValidation"

interface SmartPhoneInputProps {
  value: string
  countryCode: string
  onPhoneChange: (phone: string) => void
  onCountryChange: (code: string) => void
  error?: string
  className?: string
}

export default function SmartPhoneInput({
  value,
  countryCode,
  onPhoneChange,
  onCountryChange,
  error,
  className,
}: SmartPhoneInputProps) {
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [formattedValue, setFormattedValue] = useState("")

  // Initialize country code to +44 if empty
  useEffect(() => {
    if (!countryCode || countryCode === "") {
      onCountryChange("+44")
    }
  }, [])

  // Format phone number when value or country changes
  useEffect(() => {
    if (value && countryCode) {
      const national = value.replace(/\D/g, "")
      setFormattedValue(formatPhoneForCountry(national, countryCode))
    } else {
      setFormattedValue("")
    }
  }, [value, countryCode])

  const selectedCountry = getCountryByCode(countryCode || "+44")

  const filteredCountries = countriesData.filter(
    (country) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.includes(searchTerm),
  )

  const handlePhoneChange = (inputValue: string) => {
    const cleanValue = inputValue.replace(/\D/g, "")
    onPhoneChange(cleanValue)
    setFormattedValue(inputValue)
  }

  const handlePhoneBlur = () => {
    if (value && selectedCountry) {
      const formatted = formatPhoneForCountry(value, selectedCountry.code)
      setFormattedValue(formatted)
    }
  }

  const handleCountrySelect = (code: string) => {
    onCountryChange(code)
    setIsCountryOpen(false)
    setSearchTerm("")
    if (value) {
      const formatted = formatPhoneForCountry(value, code)
      setFormattedValue(formatted)
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <Label className="text-sm font-medium text-[#8c8c8c]">Phone number</Label>
      <div className="flex">
        <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-40 justify-between border-[#d9d9d9] rounded-r-none border-r-0 hover:bg-[#f5f5f5] bg-transparent"
            >
              <div className="flex items-center gap-2">
                {selectedCountry && (
                  <img
                    src={`https://flagcdn.com/w40/${selectedCountry.country.toLowerCase()}.png`}
                    alt={selectedCountry.name}
                    className="w-5 h-4 object-cover rounded-sm"
                  />
                )}
                <span className="text-sm">{selectedCountry?.code || "+44"}</span>
              </div>
              <ChevronDown size={16} className="text-[#8c8c8c]" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <div className="p-3 border-b border-[#f0f0f0]">
              <div className="relative">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8c8c8c]"
                />
                <Input
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750]"
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredCountries.map((country) => (
                <div
                  key={country.code}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f5f5] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
                  onClick={() => handleCountrySelect(country.code)}
                >
                  <img
                    src={`https://flagcdn.com/w40/${country.country.toLowerCase()}.png`}
                    alt={country.name}
                    className="w-5 h-4 object-cover rounded-sm"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-[#000000]">
                        {country.name}
                      </span>
                      <span className="text-sm text-[#8c8c8c]">{country.code}</span>
                    </div>
                  </div>
                </div>
              ))}
              {filteredCountries.length === 0 && (
                <div className="px-4 py-3 text-center text-[#8c8c8c] text-sm">
                  No countries found
                </div>
              )}
            </div>
          </PopoverContent>
        </Popover>
        <div className="flex-1">
          <Input
            value={formattedValue}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={cn(
              "border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750] rounded-l-none",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500"
            )}
            onBlur={handlePhoneBlur}
            placeholder={selectedCountry?.placeholder || "Enter phone number"}
            inputMode="numeric"
          />
          {error && (
            <div className="flex items-center gap-1 mt-1">
              <AlertCircle size={14} className="text-red-500" />
              <span className="text-xs text-red-500">{error}</span>
            </div>
          )}
        </div>
      </div>
      <p className="text-xs text-[#8c8c8c]">
        {selectedCountry
          ? `Format: ${selectedCountry.placeholder} (${selectedCountry.minLength}-${selectedCountry.maxLength} digits)`
          : "Select a country to see format requirements"}
      </p>
    </div>
  )
}