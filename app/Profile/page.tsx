"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Heart,
  Mail,
  LayoutDashboard,
  CalendarIcon,
  User,
  Menu,
  Upload,
  Camera,
  FileText,
  ImageIcon,
  X,
  Save,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { SidebarContent } from "@/components/layout/Sidebar"

const countries = [
  { code: "+1", name: "United States", flag: "🇺🇸", country: "US" },
  { code: "+20", name: "Egypt", flag: "🇪🇬", country: "EG" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧", country: "GB" },
  { code: "+33", name: "France", flag: "🇫🇷", country: "FR" },
  { code: "+49", name: "Germany", flag: "🇩🇪", country: "DE" },
  { code: "+86", name: "China", flag: "🇨🇳", country: "CN" },
  { code: "+91", name: "India", flag: "🇮🇳", country: "IN" },
  { code: "+81", name: "Japan", flag: "🇯🇵", country: "JP" },
  { code: "+82", name: "South Korea", flag: "🇰🇷", country: "KR" },
  { code: "+61", name: "Australia", flag: "🇦🇺", country: "AU" },
  { code: "+971", name: "UAE", flag: "🇦🇪", country: "AE" },
  { code: "+966", name: "Saudi Arabia", flag: "🇸🇦", country: "SA" },
]


export default function Component() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [firstName, setFirstName] = useState("Mohamed")
  const [lastName, setLastName] = useState("Hany")
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(new Date(1990, 5, 20))
  const [phoneNumber, setPhoneNumber] = useState("282 573 812")
  const [countryCode, setCountryCode] = useState("+20")
  const [gender, setGender] = useState("male")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg?height=200&width=200")
  const [isDragOver, setIsDragOver] = useState(false)
  const [isCountryOpen, setIsCountryOpen] = useState(false)

  const selectedCountry = countries.find((country) => country.code === countryCode)

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        alert("Please upload only image files (JPG, PNG)")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteProfileImage = () => {
    setProfileImage("/placeholder.svg?height=200&width=200")
  }

  const handleFileUpload = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"]
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload only PDF or image files (JPG, PNG)")
      return
    }

    if (file.size > maxSize) {
      alert("File size should be less than 5MB")
      return
    }

    setUploadedFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const removeFile = () => {
    setUploadedFile(null)
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith("image/")) {
      return <ImageIcon size={20} className="text-[#59d750]" />
    }
    return <FileText size={20} className="text-[#ff3d00]" />
  }

  const handleSave = () => {
    // Here you would typically send the data to your backend
    console.log("Saving profile data:", {
      firstName,
      lastName,
      dateOfBirth,
      phoneNumber,
      countryCode,
      gender,
      uploadedFile,
      profileImage,
    })
    alert("Profile saved successfully!")
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
        <SidebarContent/>
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-64 bg-[#000000] text-white p-0 border-0">
          <div className="flex flex-col h-full">
            <SidebarContent />
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="bg-white p-4 lg:p-6 border-b border-[#ededed]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} />
              </Button>
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold text-[#000000] mb-1">Profile</h1>
                <p className="text-[#8c8c8c] text-sm">
                  This section displays your personal information which you can edit
                </p>
              </div>
            </div>
            <Button onClick={handleSave} className="">
              <Save size={16} className="mr-2" />
              Save 
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="bg-white rounded-lg shadow-sm border border-[#ededed] p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="relative mb-4">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile picture"
                    width={200}
                    height={200}
                    className="w-48 h-48 rounded-lg object-cover border border-[#ededed]"
                  />
                </div>
                <div className="flex flex-col gap-2 w-48">
                  <Button
                    className="bg-[#000000] text-white hover:bg-[#000000]/90 w-full"
                    onClick={() => document.getElementById("profile-image-upload")?.click()}
                  >
                    <Camera size={16} className="mr-2" />
                    Change picture
                  </Button>
                  <Button
                    variant="outline"
                    className="text-[#8c8c8c] border-[#d9d9d9] hover:bg-[#f5f5f5] w-full"
                    onClick={handleDeleteProfileImage}
                  >
                    Delete picture
                  </Button>
                  <input
                    id="profile-image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleProfileImageUpload}
                  />
                </div>
              </div>

              {/* Form Section */}
              <div className="flex-1 space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium text-[#8c8c8c]">
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium text-[#8c8c8c]">
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750]"
                    />
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#8c8c8c]">Date of birth</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-[#d9d9d9] hover:bg-[#f5f5f5]",
                          !dateOfBirth && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateOfBirth ? format(dateOfBirth, "dd MMM yyyy") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-[#8c8c8c]">Phone number</Label>
                  <div className="flex">
                    <Popover open={isCountryOpen} onOpenChange={setIsCountryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-40 justify-between border-[#d9d9d9] rounded-r-none border-r-0 hover:bg-[#f5f5f5]"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{selectedCountry?.flag}</span>
                            <span className="text-sm">{selectedCountry?.code}</span>
                          </div>
                          <ChevronDown size={16} className="text-[#8c8c8c]" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="start">
                        <div className="max-h-60 overflow-y-auto">
                          {countries.map((country) => (
                            <div
                              key={country.code}
                              className="flex items-center gap-3 px-4 py-3 hover:bg-[#f5f5f5] cursor-pointer border-b border-[#f0f0f0] last:border-b-0"
                              onClick={() => {
                                setCountryCode(country.code)
                                setIsCountryOpen(false)
                              }}
                            >
                              <span className="text-xl">{country.flag}</span>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-[#000000]">{country.name}</span>
                                  <span className="text-sm text-[#8c8c8c]">{country.code}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750] rounded-l-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-[#8c8c8c]">Gender</Label>
                  <RadioGroup value={gender} onValueChange={setGender} className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="male" className="border-[#d9d9d9] text-[#000000]" />
                      <Label htmlFor="male" className="text-sm text-[#000000] cursor-pointer">
                        Male
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="female" className="border-[#d9d9d9] text-[#000000]" />
                      <Label htmlFor="female" className="text-sm text-[#000000] cursor-pointer">
                        Female
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* ID Card Upload */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium text-[#8c8c8c]">Upload your ID card</Label>

                  {uploadedFile ? (
                    <div className="border border-[#d9d9d9] rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getFileIcon(uploadedFile.type)}
                          <div>
                            <p className="text-sm font-medium text-[#000000]">{uploadedFile.name}</p>
                            <p className="text-xs text-[#8c8c8c]">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="text-[#ff3d00] hover:text-[#ff3d00] hover:bg-[#ff3d00]/10"
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer",
                        isDragOver ? "border-[#59d750] bg-[#59d750]/5" : "border-[#d9d9d9] hover:border-[#8c8c8c]",
                      )}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
                          <Upload size={24} className="text-[#8c8c8c]" />
                        </div>
                        <div>
                          <p className="text-sm text-[#8c8c8c] mb-1">Upload a picture for your ID card</p>
                          <p className="text-xs text-[#8c8c8c]">
                            Drag and drop or click to browse • PDF, JPG, PNG up to 5MB
                          </p>
                        </div>
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileInputChange}
                      />
                    </div>
                  )}
                </div>

                {/* Save Button - Mobile */}
                <div className="lg:hidden pt-4">
                  <Button onClick={handleSave} className="bg-[#59d750] text-white hover:bg-[#59d750]/90 w-full">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
