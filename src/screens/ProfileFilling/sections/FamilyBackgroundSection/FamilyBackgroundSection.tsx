"use client"

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// @ts-ignore: No types for 'react-places-autocomplete'
import PlacesAutocomplete from 'react-places-autocomplete'

// Extend Window interface for Google Maps API
declare global {
  interface Window {
    google: any;
  }
}

interface FamilyData {
  father_name: string
  mother_name: string
  father_occupation: string
  mother_occupation: string
  family_culture: string
  family_location: string
  family_status: string
  brother_count: number
  sister_count: number
}

interface FamilyBackgroundSectionProps {
  initialData?: Partial<FamilyData>
  onSubmit?: (data: FamilyData) => void
  onSuccess?: (data: FamilyData) => void
  onError?: (error: string) => void
  onValidate?: (isValid: boolean, errors: string[]) => void
  onValidationTrigger?: (triggerValidation: () => void) => void
  onDataGetter?: (getData: () => FamilyData) => void
}

// Family culture options from backend enum
const familyCultureOptions = [
  "Traditional",
  "Modern",
  "Mix of traditional and modern",
  "Liberal",
  "Spiritual",
  "Other"
]

// Family status options from backend enum
const familyStatusOptions = [
  "Lower class",
  "Lower-middle class",
  "Middle class",
  "Upper-middle class",
  "Upper class",
  "Affluent",
  "Other"
]

// Occupation options from backend enum (first 50 for dropdown)
const occupationOptions = [
  "3D Modeler",
  "Academic Advisor",
  "Accountant",
  "Accounts Officer",
  "Actor",
  "Actuary",
  "Acupuncturist",
  "Adjunct Professor",
  "Advocate",
  "Aerospace Engineer",
  "Agricultural Economist",
  "Agriculture",
  "Agronomist",
  "Air Traffic Controller",
  "Airline Pilot",
  "Animal Scientist",
  "Animator",
  "Architect",
  "Architectural Technologist",
  "Art Director",
  "Art Therapist",
  "Artist",
  "Assistant",
  "Assistant Commissioner",
  "Astronomer",
  "Audiologist",
  "Auditor",
  "Author",
  "Ayurvedic Doctor",
  "Backend Developer",
  "Baker",
  "Banker",
  "Barista",
  "Biologist",
  "Biomedical Engineer",
  "Botanist",
  "Brand Manager",
  "Budget Analyst",
  "Business Analyst",
  "Business Development Executive",
  "Business and Management",
  "Career Counselor",
  "Carpenter",
  "Ceramicist",
  "Chef",
  "Chemical Engineer",
  "Chemist",
  "Child Welfare Worker",
  "Chiropractor",
  "City Planner"
]

export function FamilyBackgroundSection({ initialData, onSubmit, onSuccess, onError, onValidate, onValidationTrigger, onDataGetter }: FamilyBackgroundSectionProps) {
  const [formData, setFormData] = useState<FamilyData>({
    father_name: initialData?.father_name || "",
    mother_name: initialData?.mother_name || "",
    father_occupation: initialData?.father_occupation || "",
    mother_occupation: initialData?.mother_occupation || "",
    family_culture: initialData?.family_culture || "",
    family_location: initialData?.family_location || "",
    family_status: initialData?.family_status || "",
    brother_count: initialData?.brother_count || 0,
    sister_count: initialData?.sister_count || 0,
  });

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<keyof FamilyData, string>>({
    father_name: "",
    mother_name: "",
    father_occupation: "",
    mother_occupation: "",
    family_culture: "",
    family_location: "",
    family_status: "",
    brother_count: "",
    sister_count: "",
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
  const validateForm = (data: FamilyData): { isValid: boolean; errors: string[]; fieldErrors: Record<keyof FamilyData, string> } => {
    const errors: string[] = []
    const fieldErrors: Record<keyof FamilyData, string> = {
      father_name: "",
      mother_name: "",
      father_occupation: "",
      mother_occupation: "",
      family_culture: "",
      family_location: "",
      family_status: "",
      brother_count: "",
      sister_count: "",
    }

    if (!data.father_name) {
      errors.push("Father's name is required")
      fieldErrors.father_name = "Father's name is required"
    }
    if (!data.mother_name) {
      errors.push("Mother's name is required")
      fieldErrors.mother_name = "Mother's name is required"
    }
    if (!data.father_occupation) {
      errors.push("Father's occupation is required")
      fieldErrors.father_occupation = "Father's occupation is required"
    }
    if (!data.mother_occupation) {
      errors.push("Mother's occupation is required")
      fieldErrors.mother_occupation = "Mother's occupation is required"
    }
    if (!data.family_culture) {
      errors.push("Family culture is required")
      fieldErrors.family_culture = "Family culture is required"
    }
    if (!data.family_location) {
      errors.push("Family location is required")
      fieldErrors.family_location = "Family location is required"
    }
    if (!data.family_status) {
      errors.push("Family status is required")
      fieldErrors.family_status = "Family status is required"
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

  const handleChange = (field: keyof FamilyData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
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
            <Label htmlFor="father_name">Father&apos;s Name</Label>
            <Input
              id="father_name"
              value={formData.father_name}
              onChange={(e) => handleChange("father_name", e.target.value)}
              placeholder="Enter your father's name"
              required
              className={fieldErrors.father_name ? "border-red-500" : ""}
            />
            {fieldErrors.father_name && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.father_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mother_name">Mother&apos;s Name</Label>
            <Input
              id="mother_name"
              value={formData.mother_name}
              onChange={(e) => handleChange("mother_name", e.target.value)}
              placeholder="Enter your mother's name"
              required
              className={fieldErrors.mother_name ? "border-red-500" : ""}
            />
            {fieldErrors.mother_name && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.mother_name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="father_occupation">Father&apos;s Occupation</Label>
            <Select
              value={formData.father_occupation}
              onValueChange={(value) => handleChange("father_occupation", value)}
              required
            >
              <SelectTrigger className={fieldErrors.father_occupation ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your father's occupation" />
              </SelectTrigger>
              <SelectContent>
                {occupationOptions.map((occupation) => (
                  <SelectItem key={occupation} value={occupation}>
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.father_occupation && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.father_occupation}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mother_occupation">Mother&apos;s Occupation</Label>
            <Select
              value={formData.mother_occupation}
              onValueChange={(value) => handleChange("mother_occupation", value)}
              required
            >
              <SelectTrigger className={fieldErrors.mother_occupation ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your mother's occupation" />
              </SelectTrigger>
              <SelectContent>
                {occupationOptions.map((occupation) => (
                  <SelectItem key={occupation} value={occupation}>
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.mother_occupation && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.mother_occupation}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="family_culture">Family Culture</Label>
            <Select
              value={formData.family_culture}
              onValueChange={(value) => handleChange("family_culture", value)}
              required
            >
              <SelectTrigger className={fieldErrors.family_culture ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your family culture" />
              </SelectTrigger>
              <SelectContent>
                {familyCultureOptions.map((culture) => (
                  <SelectItem key={culture} value={culture}>
                    {culture}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.family_culture && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.family_culture}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="family_location">Family Location</Label>
            <PlacesAutocomplete
              value={formData.family_location}
              onChange={(value: string) => handleChange("family_location", value)}
              onSelect={(value: string) => handleChange("family_location", value)}
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
                      placeholder: 'Enter your family location',
                      className: `w-full rounded border border-solid border-[#dfe1e6] ${fieldErrors.family_location ? "border-red-500" : ""}`,
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
            {fieldErrors.family_location && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.family_location}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="family_status">Family Status</Label>
            <Select
              value={formData.family_status}
              onValueChange={(value) => handleChange("family_status", value)}
              required
            >
              <SelectTrigger className={fieldErrors.family_status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your family's economic status" />
              </SelectTrigger>
              <SelectContent>
                {familyStatusOptions.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.family_status && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.family_status}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="brother_count">Number of Brothers</Label>
              <Input
                id="brother_count"
                type="number"
                min="0"
                value={formData.brother_count || ""}
                onChange={(e) => handleChange("brother_count", parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sister_count">Number of Sisters</Label>
              <Input
                id="sister_count"
                type="number"
                min="0"
                value={formData.sister_count || ""}
                onChange={(e) => handleChange("sister_count", parseInt(e.target.value) || 0)}
                placeholder="0"
                required
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 