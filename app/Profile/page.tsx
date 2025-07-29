"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Menu, Camera, Save, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { SidebarContent } from "@/components/layout/Sidebar"
import { getUserByGuestId, updateUser } from "../all-listings/Listing"
import { useRouter } from "next/navigation"
import LogoLoader from "@/components/logo-loader"
import CalenderYearly from "@/components/ui/CalenderYearly"
import { detectCountryFromPhone, validatePhoneForCountry } from "@/lib/phoneValidation"
import SmartPhoneInput from "@/components/ui/SmartPhoneInput"


export default function Component() {
  const { toast } = useToast()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [firstName, setFirstName] = useState("Mohamed")
  const [lastName, setLastName] = useState("Hany")
  const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(new Date(1990, 5, 20))
  const [phoneNumber, setPhoneNumber] = useState("282573812")
  const [phoneError, setPhoneError] = useState<string>("")
  const [countryCode, setCountryCode] = useState("+20")
  const [gender, setGender] = useState("male")
  const [profileImage, setProfileImage] = useState<string>("/Dufltpofile.png?height=200&width=200")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const guestId = localStorage.getItem("GuestyId")
  const [isSaving, setIsSaving] = useState(false)
  const [initialState, setInitialState] = useState({
    firstName: "Mohamed",
    lastName: "Hany",
    dateOfBirth: new Date(1990, 5, 20),
    phoneNumber: "282573812",
    countryCode: "+20",
    gender: "male",
    profileImage: "/Dufltpofile.png?height=200&width=200",
  })
  const [isFormTouched, setIsFormTouched] = useState(false)

  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await getUserByGuestId(guestId)

        if (response.success && response.data) {
          const userData = response.data
          const newFirstName = userData.firstName || ""
          const newLastName = userData.lastName || ""
          const birthday = userData.birthday ? new Date(userData.birthday) : undefined
          const newGender = userData.gender || "male"

          // Clean phone number - remove country code and formatting

       let newPhoneNumber = ""
let newCountryCode = "+44" // fallback

if (userData.phone && userData.phone.trim()) {
  const { countryCode, nationalNumber } = detectCountryFromPhone(userData.phone)
  newPhoneNumber = nationalNumber
  newCountryCode = countryCode
}

          setFirstName(newFirstName)
          setLastName(newLastName)
          setDateOfBirth(birthday)
   setPhoneNumber(newPhoneNumber)
          setCountryCode(newCountryCode)
          setGender(newGender)

          let newProfileImage = "/Dufltpofile.png?height=200&width=200"
          // Handle the nested picture structure from your API
          if (userData.picture && userData.picture.url) {
            if (typeof userData.picture.url === "string") {
              newProfileImage = userData.picture.url
            } else if (userData.picture.url.url) {
              if (typeof userData.picture.url.url === "string") {
                newProfileImage = userData.picture.url.url
              } else if (userData.picture.url.url.url) {
                newProfileImage = userData.picture.url.url.url
              }
            }
          }

          setProfileImage(newProfileImage)

          setInitialState({
            firstName: newFirstName,
            lastName: newLastName,
            dateOfBirth: birthday || new Date(),
            phoneNumber: newPhoneNumber,
            countryCode: newCountryCode,
            gender: newGender,
            profileImage: newProfileImage,
          })

          toast({
            title: "Profile loaded successfully",
            description: "Your profile information has been retrieved.",
            duration: 3000,
          })
        }
      } catch (err) {
        console.error("Error fetching user data:", err)
        setError("Failed to load user data. Please try again.")
        toast({
          variant: "destructive",
          title: "Failed to load profile",
          description: "There was an error loading your profile data. Please try again.",
          duration: 5000,
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (guestId) {
      fetchUserData()
    }
  }, [guestId, toast])

  const checkIfFormTouched = () => {
    const hasChanges =
      firstName !== initialState.firstName ||
      lastName !== initialState.lastName ||
      dateOfBirth?.getTime() !== initialState.dateOfBirth.getTime() ||
      phoneNumber !== initialState.phoneNumber ||
      countryCode !== initialState.countryCode ||
      gender !== initialState.gender ||
      profileImage !== initialState.profileImage

    setIsFormTouched(hasChanges)
  }

  // Call checkIfFormTouched whenever any field changes
  useEffect(() => {
    checkIfFormTouched()
  }, [firstName, lastName, dateOfBirth, phoneNumber, countryCode, gender, profileImage])

  const handleFirstNameChange = (value: string) => {
    setFirstName(value)
  }

  const handleLastNameChange = (value: string) => {
    setLastName(value)
  }

  const handleDateChange = (date: Date | undefined) => {
    setDateOfBirth(date)
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
    // Validate the phone number with country-specific rules
    const validationError = validatePhoneForCountry(value, countryCode)
    setPhoneError(validationError)
  }

  const handleCountryCodeChange = (code: string) => {
    setCountryCode(code)
    // Re-validate phone number with new country
    if (phoneNumber) {
      const validationError = validatePhoneForCountry(phoneNumber, code)
      setPhoneError(validationError)
    }
  }

  const handleGenderChange = (value: string) => {
    setGender(value)
  }

  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"]
      if (!allowedTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload only image files (JPG, PNG ,JPEG).",
          duration: 4000,
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been changed successfully.",
          duration: 3000,
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteProfileImage = () => {
    setProfileImage("/Dufltpofile.png?height=200&width=200")
    toast({
      title: "Profile picture removed",
      description: "Your profile picture has been reset to default.",
      duration: 3000,
    })
  }

  const handleSave = async () => {
    // Validate phone number before saving
    const phoneValidationError = validatePhoneForCountry(phoneNumber, countryCode)
    if (phoneValidationError) {
      toast({
        variant: "destructive",
        title: "Cannot save profile",
        description: phoneValidationError,
        duration: 4000,
      })
      return
    }

    try {
      setIsSaving(true)
      toast({
        title: "Saving profile...",
        description: "Please wait while we update your information.",
        duration: 0,
      })

      const userDetails = {
        guestId: guestId,
        firstName: firstName,
        lastName: lastName,
        birthday: dateOfBirth ? dateOfBirth.toISOString().split("T")[0] : undefined,
        picture: profileImage !== "/Dufltpofile.png?height=200&width=200" ? { url: profileImage } : null,
        phone: phoneNumber ? `${countryCode} ${phoneNumber}` : "",
        gender: gender,
      }

    
      const response = await updateUser(userDetails)

      if (response.success) {
        setInitialState({
          firstName,
          lastName,
          dateOfBirth: dateOfBirth || new Date(),
          phoneNumber,
          countryCode,
          gender,
          profileImage,
        })
        setIsFormTouched(false)

        toast({
          title: "Profile saved successfully! ✨",
          description: "Your profile information has been updated.",
          duration: 4000,
          className: "border-green-200 bg-green-50",
        })
      } else {
        throw new Error(response.message || "Failed to save profile")
      }
    } catch (error: any) {
      console.error("Error saving profile:", error)
      toast({
        variant: "destructive",
        title: "Failed to save profile",
        description: error.message || "An unexpected error occurred. Please try again.",
        duration: 6000,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const router = useRouter()

  useEffect(() => {
    const isAuth = localStorage.getItem("access_token") || localStorage.getItem("session")
    if (!isAuth) {
      router.push("/")
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex h-screen bg-white">
        <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
          <SidebarContent />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <LogoLoader />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-white">
        <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
          <SidebarContent />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <p className="text-red-500 mb-4 text-lg font-medium">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex h-screen bg-white">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-64 bg-[#000000] text-white flex-col">
          <SidebarContent />
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
              {isFormTouched && (
                <Button
                  onClick={handleSave}
                  disabled={isSaving || !!phoneError}
                  className="bg-[#59d750] hover:bg-[#59d750]/90 transition-all duration-200 disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <div className=" flex items-center">
                      <Save size={16} className="mr-2" />
                      Save
                    </div>
                  )}
                </Button>
              )}
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
                      src={
                        profileImage && profileImage !== "/Dufltpofile.png?height=200&width=200"
                          ? profileImage
                          : `https://ui-avatars.com/api/?name=${firstName}&background=%23ededed`
                      }
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
                      className="text-[#8c8c8c] border-[#d9d9d9] hover:bg-[#f5f5f5] w-full bg-transparent"
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
                        onChange={(e) => handleFirstNameChange(e.target.value)}
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
                        onChange={(e) => handleLastNameChange(e.target.value)}
                        className="border-[#d9d9d9] focus:border-[#59d750] focus:ring-[#59d750]"
                      />
                    </div>
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <CalenderYearly onDateChange={handleDateChange} initialDate={dateOfBirth} />
                    <p className="text-xs text-[#8c8c8c]">
                      {dateOfBirth ? `Selected: ${dateOfBirth.toLocaleDateString()}` : "No date selected"}
                    </p>
                  </div>

                  {/* Smart Phone Number Input */}
                  <SmartPhoneInput
                    value={phoneNumber}
                    countryCode={countryCode}
                    onPhoneChange={handlePhoneChange}
                    onCountryChange={handleCountryCodeChange}
                    error={phoneError}
                  />

                  {/* Gender */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-[#8c8c8c]">Gender</Label>
                    <RadioGroup value={gender} onValueChange={handleGenderChange} className="flex gap-6">
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

                  {/* Save Button - Mobile */}
                  {isFormTouched && (
                    <div className="lg:hidden pt-4">
                      <Button
                        onClick={handleSave}
                        disabled={isSaving || !!phoneError}
                        className="bg-[#59d750] text-white hover:bg-[#59d750]/90 w-full transition-all duration-200 disabled:opacity-50"
                      >
                        {isSaving ? (
                          <>
                            <Loader2 size={16} className="mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save size={16} className="mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
