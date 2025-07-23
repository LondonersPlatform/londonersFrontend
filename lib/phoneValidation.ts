export interface CountryData {
  code: string
  name: string
  flag: string
  country: string
  minLength: number
  maxLength: number
  pattern?: RegExp
  format?: (phone: string) => string
  placeholder: string
}

export const countriesData: CountryData[] = [
  {
    code: "+44",
    name: "United Kingdom",
    flag: "🇬🇧",
    country: "GB",
    minLength: 10,
    maxLength: 11,
    pattern: /^[1-9]\d{8,9}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 4) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`
      }
      return cleaned
    },
    placeholder: "7911 123456",
  },
  {
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
    country: "US",
    minLength: 10,
    maxLength: 10,
    pattern: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`
      } else if (cleaned.length >= 3) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`
      }
      return cleaned
    },
    placeholder: "(555) 123-4567",
  },
  {
    code: "+20",
    name: "Egypt",
    flag: "🇪🇬",
    country: "EG",
    minLength: 10,
    maxLength: 11,
    pattern: /^(10|11|12|15)\d{8}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6)}`
      }
      return cleaned
    },
    placeholder: "10 1234 5678",
  },
  {
    code: "+33",
    name: "France",
    flag: "🇫🇷",
    country: "FR",
    minLength: 9,
    maxLength: 9,
    pattern: /^[1-9]\d{8}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      return cleaned.replace(/(\d{2})(?=\d)/g, "$1 ")
    },
    placeholder: "06 12 34 56 78",
  },
  {
    code: "+49",
    name: "Germany",
    flag: "🇩🇪",
    country: "DE",
    minLength: 10,
    maxLength: 12,
    pattern: /^[1-9]\d{9,11}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
      }
      return cleaned
    },
    placeholder: "151 2345 6789",
  },
  {
    code: "+86",
    name: "China",
    flag: "🇨🇳",
    country: "CN",
    minLength: 11,
    maxLength: 11,
    pattern: /^1[3-9]\d{9}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`
      }
      return cleaned
    },
    placeholder: "138 0013 8000",
  },
  {
    code: "+91",
    name: "India",
    flag: "🇮🇳",
    country: "IN",
    minLength: 10,
    maxLength: 10,
    pattern: /^[6-9]\d{9}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 5) {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`
      }
      return cleaned
    },
    placeholder: "98765 43210",
  },
  {
    code: "+81",
    name: "Japan",
    flag: "🇯🇵",
    country: "JP",
    minLength: 10,
    maxLength: 11,
    pattern: /^[7-9]\d{9,10}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`
      }
      return cleaned
    },
    placeholder: "90 1234 5678",
  },
  {
    code: "+82",
    name: "South Korea",
    flag: "🇰🇷",
    country: "KR",
    minLength: 10,
    maxLength: 11,
    pattern: /^[1-9]\d{9,10}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 7)} ${cleaned.slice(7)}`
      }
      return cleaned
    },
    placeholder: "10 1234 5678",
  },
  {
    code: "+61",
    name: "Australia",
    flag: "🇦🇺",
    country: "AU",
    minLength: 9,
    maxLength: 9,
    pattern: /^[2-9]\d{8}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
      }
      return cleaned
    },
    placeholder: "412 345 678",
  },
  {
    code: "+971",
    name: "UAE",
    flag: "🇦🇪",
    country: "AE",
    minLength: 9,
    maxLength: 9,
    pattern: /^[5]\d{8}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 2) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`
      }
      return cleaned
    },
    placeholder: "50 123 4567",
  },
  {
    code: "+966",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    country: "SA",
    minLength: 9,
    maxLength: 9,
    pattern: /^[5]\d{8}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 2) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`
      }
      return cleaned
    },
    placeholder: "50 123 4567",
  },
  {
    code: "+34",
    name: "Spain",
    flag: "🇪🇸",
    country: "ES",
    minLength: 9,
    maxLength: 9,
    pattern: /^[6-9]\d{8}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      return cleaned.replace(/(\d{3})(?=\d)/g, "$1 ")
    },
    placeholder: "612 345 678",
  },
  {
    code: "+39",
    name: "Italy",
    flag: "🇮🇹",
    country: "IT",
    minLength: 9,
    maxLength: 10,
    pattern: /^[3]\d{8,9}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
      }
      return cleaned
    },
    placeholder: "312 345 6789",
  },
  {
    code: "+7",
    name: "Russia",
    flag: "🇷🇺",
    country: "RU",
    minLength: 10,
    maxLength: 10,
    pattern: /^[9]\d{9}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 3) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`
      }
      return cleaned
    },
    placeholder: "912 345 67 89",
  },
  {
    code: "+55",
    name: "Brazil",
    flag: "🇧🇷",
    country: "BR",
    minLength: 10,
    maxLength: 11,
    pattern: /^[1-9]\d{9,10}$/,
    format: (phone: string) => {
      const cleaned = phone.replace(/\D/g, "")
      if (cleaned.length >= 2) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`
      }
      return cleaned
    },
    placeholder: "11 91234 5678",
  },
]

export const validatePhoneForCountry = (phone: string, countryCode: string): string => {
  const country = countriesData.find((c) => c.code === countryCode)
  if (!country) return "Invalid country selected"

  const cleanPhone = phone.replace(/\D/g, "")

  if (!cleanPhone) {
    return "Phone number is required"
  }

  if (cleanPhone.length < country.minLength) {
    return `Phone number must be at least ${country.minLength} digits for ${country.name}`
  }

  if (cleanPhone.length > country.maxLength) {
    return `Phone number must not exceed ${country.maxLength} digits for ${country.name}`
  }

  if (country.pattern && !country.pattern.test(cleanPhone)) {
    return `Invalid phone number format for ${country.name}`
  }

  return ""
}

export const formatPhoneForCountry = (phone: string, countryCode: string): string => {
  const country = countriesData.find((c) => c.code === countryCode)
  const cleaned = phone.replace(/\D/g, "")

  if (!country || !country.format) {
    return cleaned.replace(/(\d{3})(?=\d)/g, "$1 ")
  }

  return country.format(cleaned)
}

export const getCountryByCode = (code: string): CountryData | undefined => {
  return countriesData.find((c) => c.code === code)
}

export const detectCountryFromPhone = (fullPhone: string): { countryCode: string; nationalNumber: string } => {
  if (!fullPhone || !fullPhone.trim()) {
    return { countryCode: "+44", nationalNumber: "" }
  }

  const cleaned = fullPhone.replace(/\D/g, "") // remove non-digits


  const sortedCountries = [...countriesData].sort((a, b) => b.code.length - a.code.length)

  for (const country of sortedCountries) {
    const codeWithoutPlus = country.code.replace("+", "")
    if (cleaned.startsWith(codeWithoutPlus)) {
      const nationalNumber = cleaned.slice(codeWithoutPlus.length)
      return { countryCode: country.code, nationalNumber }
    }
  }

  // fallback to default
  return { countryCode: "+44", nationalNumber: cleaned }
}
