"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// @ts-ignore: No types for 'react-places-autocomplete'
import PlacesAutocomplete from 'react-places-autocomplete'

// Extend Window interface for Google Maps API
declare global {
  interface Window {
    google: any;
  }
}
import { ProfileService, AstroInfoData } from "@/services/profileService"

interface AstroSectionProps {
  initialData?: Partial<AstroInfoData>
  onSubmit?: (data: AstroInfoData) => void
  onSuccess?: (data: AstroInfoData) => void
  onError?: (error: string) => void
  onValidate?: (isValid: boolean, errors: string[]) => void
  onValidationTrigger?: (triggerValidation: () => void) => void
  onDataGetter?: (getData: () => AstroInfoData) => void
}

// Rashi options from backend enum
const rashiOptions = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", 
  "Pisces", "Don't know"
]

// Nakshatra options from backend enum
const nakshatraOptions = [
  "Don't know", "Ashwini", "Bharani", "Kṛttikā", "Rohiṇī", 
  "Mṛgaśīrṣa", "Ārdrā", "Punarvasu", "Puṣya", "Aśleṣā", 
  "Maghā", "Pūrvaphalgunī", "Uttaraphalgunī", "Hastā", 
  "Chitrā", "Svāti", "Viśākhā", "Anurādhā", "Jyeṣṭhā", 
  "Mūla", "Pūrva Āṣāḍhā", "Uttarāṣāḍhā", "Śravaṇa", 
  "Dhaniṣṭhā", "Śatabhiṣā", "Pūrva Bhādrapadā", 
  "Uttara Bhādrapadā", "Revatī", "Other"
]

// Manglik options from backend enum
const manglikOptions = ["Don't know", "Yes", "No"]

// Community options from backend enum
const communityOptions = [
  "Don't Know", "Manai", "Telugu", "Chettiar", "Kuli", 
  "Maratha", "Kokanastha", "Adi", "AndhraAdi", "DharmiAdi", 
  "DravidaAdi", "Karnataka"
]

export function AstroSection({ initialData, onSubmit, onSuccess, onError, onValidate, onValidationTrigger, onDataGetter }: AstroSectionProps) {
  const [formData, setFormData] = useState<AstroInfoData>({
    date_of_birth: initialData?.date_of_birth || "",
    time_of_birth: initialData?.time_of_birth || "",
    birth_place: initialData?.birth_place || "",
    latitude: initialData?.latitude || "",
    longitude: initialData?.longitude || "",
    timeZone: initialData?.timeZone || 0,
    rashi: initialData?.rashi || "",
    nakshatra: initialData?.nakshatra || "",
    manglik: initialData?.manglik || "",
    community: initialData?.community || "",
    caste: initialData?.caste || "",
    gotra: initialData?.gotra || "",
  })

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<keyof AstroInfoData, string>>({
    date_of_birth: "",
    time_of_birth: "",
    birth_place: "",
    latitude: "",
    longitude: "",
    timeZone: "",
    rashi: "",
    nakshatra: "",
    manglik: "",
    community: "",
    caste: "",
    gotra: "",
  })
  const [showValidation, setShowValidation] = useState(false)

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }))
    }
  }, [initialData])

  // Validation function
  const validateForm = (data: AstroInfoData): { isValid: boolean; errors: string[]; fieldErrors: Record<keyof AstroInfoData, string> } => {
    const errors: string[] = []
    const fieldErrors: Record<keyof AstroInfoData, string> = {
      date_of_birth: "",
      time_of_birth: "",
      birth_place: "",
      latitude: "",
      longitude: "",
      timeZone: "",
      rashi: "",
      nakshatra: "",
      manglik: "",
      community: "",
      caste: "",
      gotra: "",
    }

    if (!data.date_of_birth) {
      errors.push("Date of birth is required")
      fieldErrors.date_of_birth = "Date of birth is required"
    } else {
      const birthDate = new Date(data.date_of_birth)
      const today = new Date()
      if (birthDate > today) {
        errors.push("Date of birth cannot be in the future")
        fieldErrors.date_of_birth = "Date of birth cannot be in the future"
      }
    }

    if (!data.time_of_birth) {
      errors.push("Time of birth is required")
      fieldErrors.time_of_birth = "Time of birth is required"
    } else if (!/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(data.time_of_birth)) {
      errors.push("Time of birth must be in HH:MM format")
      fieldErrors.time_of_birth = "Time of birth must be in HH:MM format"
    }

    if (!data.birth_place) {
      errors.push("Place of birth is required")
      fieldErrors.birth_place = "Place of birth is required"
    }

    if (!data.rashi) {
      errors.push("Rashi is required")
      fieldErrors.rashi = "Rashi is required"
    }

    if (!data.nakshatra) {
      errors.push("Nakshatra is required")
      fieldErrors.nakshatra = "Nakshatra is required"
    }

    if (!data.manglik) {
      errors.push("Manglik status is required")
      fieldErrors.manglik = "Manglik status is required"
    }

    if (!data.community) {
      errors.push("Community is required")
      fieldErrors.community = "Community is required"
    }

    return { isValid: errors.length === 0, errors, fieldErrors }
  }

  // Call onValidate whenever form data changes
  useEffect(() => {
    if (onValidate) {
      const validation = validateForm(formData)
      if (showValidation) {
        setFieldErrors(validation.fieldErrors)
      }
      onValidate(validation.isValid, validation.errors)
    }
  }, [formData, onValidate, showValidation])

  const handleChange = (field: keyof AstroInfoData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Function to get timezone from coordinates
  const getTimezone = async (latitude: number, longitude: number): Promise<number> => {
    const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
    const apiKey = 'AIzaSyBaw2eolMvHQq6Wkzh4HT77AnIg2Ud6ejc'; // Google API key
    const response = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`);
    const data = await response.json();

    if (data.status === 'OK') {
      const timezoneOffsetSeconds = data.rawOffset + data.dstOffset; // Total offset from UTC in seconds
      const timezoneOffsetHours = timezoneOffsetSeconds / 3600; // Convert to hours
      return timezoneOffsetHours;
    } else {
      console.error('Failed to fetch timezone:', data.status);
      return 0;
    }
  }

  // Handle location selection from Google Places Autocomplete
  const handleLocationSelect = async (value: string, placeId: string) => {
    // Update the display text
    setFormData(prev => ({
      ...prev,
      birth_place: value
    }));

    // Get detailed place information using Google Places API
    if (window.google && window.google.maps) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      
      service.getDetails(
        {
          placeId: placeId,
          fields: ['geometry', 'address_components', 'formatted_address']
        },
        async (place: any, status: any) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const latitude = place.geometry?.location?.lat() || 0;
            const longitude = place.geometry?.location?.lng() || 0;
            
            // Get timezone
            const timezone = await getTimezone(latitude, longitude);
            
            // Update form data with coordinates and timezone
            setFormData(prev => ({
              ...prev,
              latitude: latitude.toString(),
              longitude: longitude.toString(),
              timeZone: timezone
            }));

            console.log('Location data captured:', {
              birth_place: value,
              latitude,
              longitude,
              timezone
            });
          }
        }
      );
    }
  }

  const triggerValidation = () => {
    setShowValidation(true)
    const validation = validateForm(formData)
    setFieldErrors(validation.fieldErrors)
    // Also call onValidate to update parent's validation state
    if (onValidate) {
      onValidate(validation.isValid, validation.errors)
    }
  }

  // Expose triggerValidation and getData to parent component
  useEffect(() => {
    if (onValidationTrigger) {
      onValidationTrigger(triggerValidation)
    }
    if (onDataGetter) {
      onDataGetter(() => formData)
    }
  }, [onValidationTrigger, onDataGetter, formData])

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="date_of_birth">Date of Birth</Label>
            <Input
              id="date_of_birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              required
              className={fieldErrors.date_of_birth ? "border-red-500" : ""}
            />
            {fieldErrors.date_of_birth && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.date_of_birth}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="time_of_birth">Time of Birth</Label>
            <Input
              id="time_of_birth"
              type="time"
              value={formData.time_of_birth}
              onChange={(e) => handleChange("time_of_birth", e.target.value)}
              required
              className={fieldErrors.time_of_birth ? "border-red-500" : ""}
            />
            {fieldErrors.time_of_birth && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.time_of_birth}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="birth_place">Place of Birth</Label>
            <PlacesAutocomplete
              value={formData.birth_place}
              onChange={(value: string) => handleChange("birth_place", value)}
              onSelect={(value: string, placeId: string) => handleLocationSelect(value, placeId)}
              searchOptions={{ types: ['(cities)'] }}
              googleCallbackName="initPlaces"
            >
              {({ getInputProps, suggestions, getSuggestionItemProps, loading }: {
                getInputProps: any;
                suggestions: any[];
                getSuggestionItemProps: any;
                loading: boolean;
              }) => (
                <div className="relative">
                  <Input
                    {...getInputProps({
                      placeholder: 'Enter your place of birth',
                      className: `w-full rounded border border-solid border-[#dfe1e6] ${fieldErrors.birth_place ? "border-red-500" : ""}`,
                    })}
                  />
                  <div
                    className="autocomplete-dropdown-container"
                    style={{
                      maxHeight: '300px',
                      overflowY: 'auto',
                      background: '#fff',
                      border: '1px solid #dfe1e6',
                      zIndex: 1000,
                      position: 'absolute',
                      width: '100%',
                      top: '100%',
                      left: 0
                    }}
                  >
                    {loading && <div className="p-2">Loading...</div>}
                    {suggestions.map((suggestion: any) => (
                      <div
                        key={suggestion.placeId}
                        {...getSuggestionItemProps(suggestion, {
                          className: suggestion.active
                            ? 'suggestion-item--active p-2 bg-gray-100 cursor-pointer'
                            : 'suggestion-item p-2 cursor-pointer hover:bg-gray-50'
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            {fieldErrors.birth_place && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.birth_place}</p>
            )}
          </div>



          <div className="space-y-2">
            <Label htmlFor="timeZone">Time Zone</Label>
            <Input
              id="timeZone"
              type="number"
              value={formData.timeZone}
              onChange={(e) => handleChange("timeZone", parseInt(e.target.value) || 0)}
              placeholder="Auto-calculated from place selection"
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rashi">Rashi (Moon Sign)</Label>
            <Select
              value={formData.rashi}
              onValueChange={(value) => handleChange("rashi", value)}
              required
            >
              <SelectTrigger className={fieldErrors.rashi ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your rashi" />
              </SelectTrigger>
              <SelectContent>
                {rashiOptions.map((rashi) => (
                  <SelectItem key={rashi} value={rashi}>
                    {rashi}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.rashi && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.rashi}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="nakshatra">Nakshatra</Label>
            <Select
              value={formData.nakshatra}
              onValueChange={(value) => handleChange("nakshatra", value)}
              required
            >
              <SelectTrigger className={fieldErrors.nakshatra ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your nakshatra" />
              </SelectTrigger>
              <SelectContent>
                {nakshatraOptions.map((nakshatra) => (
                  <SelectItem key={nakshatra} value={nakshatra}>
                    {nakshatra}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.nakshatra && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.nakshatra}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="manglik">Manglik Status</Label>
            <Select
              value={formData.manglik}
              onValueChange={(value) => handleChange("manglik", value)}
              required
            >
              <SelectTrigger className={fieldErrors.manglik ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your manglik status" />
              </SelectTrigger>
              <SelectContent>
                {manglikOptions.map((manglik) => (
                  <SelectItem key={manglik} value={manglik}>
                    {manglik}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.manglik && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.manglik}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="community">Community</Label>
            <Select
              value={formData.community}
              onValueChange={(value) => handleChange("community", value)}
              required
            >
              <SelectTrigger className={fieldErrors.community ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your community" />
              </SelectTrigger>
              <SelectContent>
                {communityOptions.map((community) => (
                  <SelectItem key={community} value={community}>
                    {community}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.community && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.community}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="caste">Caste</Label>
            <Input
              id="caste"
              value={formData.caste}
              onChange={(e) => handleChange("caste", e.target.value)}
              placeholder="Enter your caste"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gotra">Gotra</Label>
            <Input
              id="gotra"
              value={formData.gotra}
              onChange={(e) => handleChange("gotra", e.target.value)}
              placeholder="Enter your gotra"
            />
          </div>
        </div>
      </Card>
    </div>
  )
} 