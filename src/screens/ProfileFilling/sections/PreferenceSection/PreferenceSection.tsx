"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { toast } from "sonner"

// Import constants
import {
  MARITAL_STATUS_OPTIONS,
  HEIGHT_OPTIONS,
  RELIGION_OPTIONS,
  LANGUAGES_OPTIONS,
  QUALIFICATIONS_OPTIONS,
  COMPANY_TYPE_OPTIONS,
  INCOME_OPTIONS,
  DIET_PREFERENCES_OPTIONS,
  MANGLIK_OPTIONS,
  FAMILY_CULTURE_OPTIONS,
  FAMILY_STATUS_OPTIONS,
  INITIATION_STATUS_OPTIONS,
  SPIRITUAL_AFFILIATION_OPTIONS
} from "@/common/constants/formOptions"

// Import services
import { ProfileService } from "@/services/profileService"

// Types based on backend interface
interface PreferenceData {
  preferred_marital_status?: string[]
  preferred_age_start?: number
  preferred_age_end?: number
  preferred_height_start?: string
  preferred_height_end?: string
  preferred_religion?: string
  preferred_caste?: string
  preferred_community?: string
  preferred_language?: string[]
  preferred_city_location?: string
  preferred_qualification?: string
  preferred_occupation?: string
  preferred_income?: string
  preferred_food?: string[]
  preferred_manglik_status?: string
  preferred_cultural_values?: string
  preferred_initiation_status?: string
  preferred_affiliation?: string[]
  preferred_no_of_children?: string
  preferred_partner_expectations?: string
}

interface PreferenceSectionProps {
  initialData?: Partial<PreferenceData>
  onSubmit?: (data: PreferenceData) => void
  onSuccess?: (data: PreferenceData) => void
  onError?: (error: string) => void
  onValidate?: (isValid: boolean, errors: string[]) => void
  onValidationTrigger?: (triggerValidation: () => void) => void
  onDataGetter?: (getData: () => PreferenceData) => void
}

export function PreferenceSection({ 
  initialData,
  onSubmit, 
  onSuccess, 
  onError, 
  onValidate, 
  onValidationTrigger, 
  onDataGetter 
}: PreferenceSectionProps) {
  const [formData, setFormData] = useState<PreferenceData>({
    preferred_marital_status: initialData?.preferred_marital_status || [],
    preferred_age_start: initialData?.preferred_age_start,
    preferred_age_end: initialData?.preferred_age_end,
    preferred_height_start: initialData?.preferred_height_start || "",
    preferred_height_end: initialData?.preferred_height_end || "",
    preferred_religion: initialData?.preferred_religion || "",
    preferred_caste: initialData?.preferred_caste || "",
    preferred_community: initialData?.preferred_community || "",
    preferred_language: initialData?.preferred_language || [],
    preferred_city_location: initialData?.preferred_city_location || "",
    preferred_qualification: initialData?.preferred_qualification || "",
    preferred_occupation: initialData?.preferred_occupation || "",
    preferred_income: initialData?.preferred_income || "",
    preferred_food: initialData?.preferred_food || [],
    preferred_manglik_status: initialData?.preferred_manglik_status || "",
    preferred_cultural_values: initialData?.preferred_cultural_values || "",
    preferred_initiation_status: initialData?.preferred_initiation_status || "",
    preferred_affiliation: initialData?.preferred_affiliation || [],
    preferred_no_of_children: initialData?.preferred_no_of_children || "",
    preferred_partner_expectations: initialData?.preferred_partner_expectations || ""
  })

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [showValidation, setShowValidation] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Update form data when initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData
      }))
    }
  }, [initialData])

  // Validation function based on backend validation rules
  const validateForm = (data: PreferenceData): { isValid: boolean; errors: string[]; fieldErrors: Record<string, string> } => {
    const errors: string[] = []
    const fieldErrors: Record<string, string> = {}

    // Age validation
    if (data.preferred_age_start !== undefined) {
      if (data.preferred_age_start < 18 || data.preferred_age_start > 100) {
        errors.push("Preferred age start must be between 18 and 100")
        fieldErrors.preferred_age_start = "Preferred age start must be between 18 and 100"
      }
    }

    if (data.preferred_age_end !== undefined) {
      if (data.preferred_age_end < 18 || data.preferred_age_end > 100) {
        errors.push("Preferred age end must be between 18 and 100")
        fieldErrors.preferred_age_end = "Preferred age end must be between 18 and 100"
      }
      
      if (data.preferred_age_start && data.preferred_age_end < data.preferred_age_start) {
        errors.push("Preferred age end must be greater than or equal to preferred age start")
        fieldErrors.preferred_age_end = "Preferred age end must be greater than or equal to preferred age start"
      }
    }

    // Height validation
    if (data.preferred_height_start && data.preferred_height_end) {
      const startValue = parseFloat(data.preferred_height_start)
      const endValue = parseFloat(data.preferred_height_end)
      if (!isNaN(startValue) && !isNaN(endValue) && endValue < startValue) {
        errors.push("Preferred height end must be greater than or equal to preferred height start")
        fieldErrors.preferred_height_end = "Preferred height end must be greater than or equal to preferred height start"
      }
    }

    // Caste validation
    if (data.preferred_caste && data.preferred_caste.length > 50) {
      errors.push("Preferred caste cannot exceed 50 characters")
      fieldErrors.preferred_caste = "Preferred caste cannot exceed 50 characters"
    }

    // Language validation
    if (data.preferred_language && data.preferred_language.length > 0) {
      const uniqueLanguages = new Set(data.preferred_language)
      if (uniqueLanguages.size !== data.preferred_language.length) {
        errors.push("Duplicate preferred languages are not allowed")
        fieldErrors.preferred_language = "Duplicate preferred languages are not allowed"
      }
    }

    // City location validation
    if (data.preferred_city_location && data.preferred_city_location.length > 100) {
      errors.push("Preferred city location cannot exceed 100 characters")
      fieldErrors.preferred_city_location = "Preferred city location cannot exceed 100 characters"
    }

    // Food validation
    if (data.preferred_food && data.preferred_food.length > 0) {
      const uniqueFoods = new Set(data.preferred_food)
      if (uniqueFoods.size !== data.preferred_food.length) {
        errors.push("Duplicate preferred food selections are not allowed")
        fieldErrors.preferred_food = "Duplicate preferred food selections are not allowed"
      }
    }

    // Affiliation validation
    if (data.preferred_affiliation && data.preferred_affiliation.length > 0) {
      const uniqueAffiliations = new Set(data.preferred_affiliation)
      if (uniqueAffiliations.size !== data.preferred_affiliation.length) {
        errors.push("Duplicate preferred affiliations are not allowed")
        fieldErrors.preferred_affiliation = "Duplicate preferred affiliations are not allowed"
      }
    }

    // Number of children validation
    if (data.preferred_no_of_children) {
      const pattern = /^[0-9]+$|^[0-9]+-[0-9]+$|^None$/
      if (!pattern.test(data.preferred_no_of_children)) {
        errors.push("Preferred number of children must be a number, range, or 'None'")
        fieldErrors.preferred_no_of_children = "Preferred number of children must be a number, range, or 'None'"
      }
      
      if (data.preferred_no_of_children.length > 20) {
        errors.push("Preferred number of children value is too long")
        fieldErrors.preferred_no_of_children = "Preferred number of children value is too long"
      }
    }

    // Partner expectations validation
    if (data.preferred_partner_expectations && data.preferred_partner_expectations.length > 500) {
      errors.push("Partner expectations cannot exceed 500 characters")
      fieldErrors.preferred_partner_expectations = "Partner expectations cannot exceed 500 characters"
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
      // For preferences, always consider valid since all fields are optional
      // Only show validation errors if there are actual format/range errors
      onValidate(true, validation.errors)
    }
  }, [formData, onValidate, showValidation])

  const handleChange = (field: keyof PreferenceData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleMultiSelectChange = (field: keyof PreferenceData, value: string) => {
    setFormData((prev) => {
      const currentValues = (prev[field] as string[]) || []
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value]
      
      return {
        ...prev,
        [field]: updatedValues
      }
    })
  }

  const removeMultiSelectValue = (field: keyof PreferenceData, value: string) => {
    setFormData((prev) => {
      const currentValues = (prev[field] as string[]) || []
      return {
        ...prev,
        [field]: currentValues.filter(v => v !== value)
      }
    })
  }

  const triggerValidation = () => {
    setShowValidation(true)
    const validation = validateForm(formData)
    setFieldErrors(validation.fieldErrors)
    // Also call onValidate to update parent's validation state
    // For preferences, always consider valid since all fields are optional
    if (onValidate) {
      onValidate(true, validation.errors)
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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <Card className="p-6">
        <div className="space-y-6">
          {/* Marital Status */}
          <div className="space-y-2">
            <Label htmlFor="preferred_marital_status">Preferred Marital Status</Label>
            <div className="space-y-2">
              <Select
                value=""
                onValueChange={(value) => handleMultiSelectChange("preferred_marital_status", value)}
              >
                <SelectTrigger className={fieldErrors.preferred_marital_status ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select preferred marital status" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MARITAL_STATUS_OPTIONS).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {formData.preferred_marital_status && formData.preferred_marital_status.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.preferred_marital_status.map((status) => (
                    <Badge key={status} variant="secondary" className="flex items-center gap-1">
                      {status}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeMultiSelectValue("preferred_marital_status", status)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              {fieldErrors.preferred_marital_status && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_marital_status}</p>
              )}
            </div>
          </div>

          {/* Age Range */}
          <div className="space-y-2">
            <Label>Preferred Age Range</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  type="number"
                  min="18"
                  max="100"
                  placeholder="Min age"
                  value={formData.preferred_age_start || ""}
                  onChange={(e) => handleChange("preferred_age_start", parseInt(e.target.value) || undefined)}
                  className={fieldErrors.preferred_age_start ? "border-red-500" : ""}
                />
                {fieldErrors.preferred_age_start && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_age_start}</p>
                )}
              </div>
              <div className="flex-1">
                <Input
                  type="number"
                  min="18"
                  max="100"
                  placeholder="Max age"
                  value={formData.preferred_age_end || ""}
                  onChange={(e) => handleChange("preferred_age_end", parseInt(e.target.value) || undefined)}
                  className={fieldErrors.preferred_age_end ? "border-red-500" : ""}
                />
                {fieldErrors.preferred_age_end && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_age_end}</p>
                )}
              </div>
            </div>
          </div>

          {/* Height Range */}
          <div className="space-y-2">
            <Label>Preferred Height Range</Label>
            <div className="flex gap-4">
              <div className="flex-1">
                <Select
                  value={formData.preferred_height_start || ""}
                  onValueChange={(value) => handleChange("preferred_height_start", value)}
                >
                  <SelectTrigger className={fieldErrors.preferred_height_start ? "border-red-500" : ""}>
                    <SelectValue placeholder="Min height" />
                  </SelectTrigger>
                  <SelectContent>
                    {HEIGHT_OPTIONS.map((height) => (
                      <SelectItem key={height.value} value={height.value}>
                        {height.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.preferred_height_start && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_height_start}</p>
                )}
              </div>
              <div className="flex-1">
                <Select
                  value={formData.preferred_height_end || ""}
                  onValueChange={(value) => handleChange("preferred_height_end", value)}
                >
                  <SelectTrigger className={fieldErrors.preferred_height_end ? "border-red-500" : ""}>
                    <SelectValue placeholder="Max height" />
                  </SelectTrigger>
                  <SelectContent>
                    {HEIGHT_OPTIONS.map((height) => (
                      <SelectItem key={height.value} value={height.value}>
                        {height.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.preferred_height_end && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_height_end}</p>
                )}
              </div>
            </div>
          </div>

          {/* Religion */}
          <div className="space-y-2">
            <Label htmlFor="preferred_religion">Preferred Religion</Label>
            <Select
              value={formData.preferred_religion || ""}
              onValueChange={(value) => handleChange("preferred_religion", value)}
            >
              <SelectTrigger className={fieldErrors.preferred_religion ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred religion" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(RELIGION_OPTIONS).map((religion) => (
                  <SelectItem key={religion} value={religion}>
                    {religion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.preferred_religion && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_religion}</p>
            )}
          </div>

          {/* Caste */}
          <div className="space-y-2">
            <Label htmlFor="preferred_caste">Preferred Caste</Label>
            <Input
              id="preferred_caste"
              value={formData.preferred_caste || ""}
              onChange={(e) => handleChange("preferred_caste", e.target.value)}
              placeholder="Enter preferred caste"
              maxLength={50}
              className={fieldErrors.preferred_caste ? "border-red-500" : ""}
            />
            {fieldErrors.preferred_caste && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_caste}</p>
            )}
          </div>

          {/* Language */}
          <div className="space-y-2">
            <Label htmlFor="preferred_language">Preferred Language</Label>
            <div className="space-y-2">
              <Select
                value=""
                onValueChange={(value) => handleMultiSelectChange("preferred_language", value)}
              >
                <SelectTrigger className={fieldErrors.preferred_language ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select preferred languages" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(LANGUAGES_OPTIONS).map((language) => (
                    <SelectItem key={language} value={language}>
                      {language}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {formData.preferred_language && formData.preferred_language.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.preferred_language.map((language) => (
                    <Badge key={language} variant="secondary" className="flex items-center gap-1">
                      {language}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeMultiSelectValue("preferred_language", language)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              {fieldErrors.preferred_language && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_language}</p>
              )}
            </div>
          </div>

          {/* City Location */}
          <div className="space-y-2">
            <Label htmlFor="preferred_city_location">Preferred City/Location</Label>
            <Input
              id="preferred_city_location"
              value={formData.preferred_city_location || ""}
              onChange={(e) => handleChange("preferred_city_location", e.target.value)}
              placeholder="Enter preferred city or location"
              maxLength={100}
              className={fieldErrors.preferred_city_location ? "border-red-500" : ""}
            />
            {fieldErrors.preferred_city_location && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_city_location}</p>
            )}
          </div>

          {/* Qualification */}
          <div className="space-y-2">
            <Label htmlFor="preferred_qualification">Preferred Qualification</Label>
            <Select
              value={formData.preferred_qualification || ""}
              onValueChange={(value) => handleChange("preferred_qualification", value)}
            >
              <SelectTrigger className={fieldErrors.preferred_qualification ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred qualification" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(QUALIFICATIONS_OPTIONS).map((qualification) => (
                  <SelectItem key={qualification} value={qualification}>
                    {qualification}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.preferred_qualification && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_qualification}</p>
            )}
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label htmlFor="preferred_occupation">Preferred Occupation</Label>
            <Select
              value={formData.preferred_occupation || ""}
              onValueChange={(value) => handleChange("preferred_occupation", value)}
            >
              <SelectTrigger className={fieldErrors.preferred_occupation ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred occupation" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(COMPANY_TYPE_OPTIONS).map((occupation) => (
                  <SelectItem key={occupation} value={occupation}>
                    {occupation}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.preferred_occupation && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_occupation}</p>
            )}
          </div>

          {/* Income */}
          <div className="space-y-2">
            <Label htmlFor="preferred_income">Preferred Income</Label>
            <Select
              value={formData.preferred_income || ""}
              onValueChange={(value) => handleChange("preferred_income", value)}
            >
              <SelectTrigger className={fieldErrors.preferred_income ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred income range" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(INCOME_OPTIONS).map((income) => (
                  <SelectItem key={income} value={income}>
                    {income}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.preferred_income && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_income}</p>
            )}
          </div>

          {/* Food Preferences */}
          <div className="space-y-2">
            <Label htmlFor="preferred_food">Preferred Food</Label>
            <div className="space-y-2">
              <Select
                value=""
                onValueChange={(value) => handleMultiSelectChange("preferred_food", value)}
              >
                <SelectTrigger className={fieldErrors.preferred_food ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select preferred food preferences" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(DIET_PREFERENCES_OPTIONS).map((food) => (
                    <SelectItem key={food} value={food}>
                      {food}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {formData.preferred_food && formData.preferred_food.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.preferred_food.map((food) => (
                    <Badge key={food} variant="secondary" className="flex items-center gap-1">
                      {food}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeMultiSelectValue("preferred_food", food)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              {fieldErrors.preferred_food && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_food}</p>
              )}
            </div>
          </div>

          {/* Manglik Status */}
          <div className="space-y-2">
            <Label htmlFor="preferred_manglik_status">Preferred Manglik Status</Label>
            <Select
              value={formData.preferred_manglik_status || ""}
              onValueChange={(value) => handleChange("preferred_manglik_status", value)}
            >
              <SelectTrigger className={fieldErrors.preferred_manglik_status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred manglik status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(MANGLIK_OPTIONS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.preferred_manglik_status && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_manglik_status}</p>
            )}
          </div>

          {/* Cultural Values */}
          <div className="space-y-2">
            <Label htmlFor="preferred_cultural_values">Preferred Cultural Values</Label>
            <Select
              value={formData.preferred_cultural_values || ""}
              onValueChange={(value) => handleChange("preferred_cultural_values", value)}
            >
              <SelectTrigger className={fieldErrors.preferred_cultural_values ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred cultural values" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(FAMILY_CULTURE_OPTIONS).map((culture) => (
                  <SelectItem key={culture} value={culture}>
                    {culture}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.preferred_cultural_values && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_cultural_values}</p>
            )}
          </div>

          {/* Initiation Status */}
          <div className="space-y-2">
            <Label htmlFor="preferred_initiation_status">Preferred Initiation Status</Label>
            <Select
              value={formData.preferred_initiation_status || ""}
              onValueChange={(value) => handleChange("preferred_initiation_status", value)}
            >
              <SelectTrigger className={fieldErrors.preferred_initiation_status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select preferred initiation status" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(INITIATION_STATUS_OPTIONS).map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.preferred_initiation_status && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_initiation_status}</p>
            )}
          </div>

          {/* Affiliation */}
          <div className="space-y-2">
            <Label htmlFor="preferred_affiliation">Preferred Affiliation</Label>
            <div className="space-y-2">
              <Select
                value=""
                onValueChange={(value) => handleMultiSelectChange("preferred_affiliation", value)}
              >
                <SelectTrigger className={fieldErrors.preferred_affiliation ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select preferred affiliations" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(SPIRITUAL_AFFILIATION_OPTIONS).map((affiliation) => (
                    <SelectItem key={affiliation} value={affiliation}>
                      {affiliation}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {formData.preferred_affiliation && formData.preferred_affiliation.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.preferred_affiliation.map((affiliation) => (
                    <Badge key={affiliation} variant="secondary" className="flex items-center gap-1">
                      {affiliation}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeMultiSelectValue("preferred_affiliation", affiliation)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
              {fieldErrors.preferred_affiliation && (
                <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_affiliation}</p>
              )}
            </div>
          </div>

          {/* Number of Children */}
          <div className="space-y-2">
            <Label htmlFor="preferred_no_of_children">Preferred Number of Children</Label>
            <Input
              id="preferred_no_of_children"
              value={formData.preferred_no_of_children || ""}
              onChange={(e) => handleChange("preferred_no_of_children", e.target.value)}
              placeholder="e.g., 2, 1-3, or None"
              maxLength={20}
              className={fieldErrors.preferred_no_of_children ? "border-red-500" : ""}
            />
            {fieldErrors.preferred_no_of_children && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_no_of_children}</p>
            )}
          </div>

          {/* Partner Expectations */}
          <div className="space-y-2">
            <Label htmlFor="preferred_partner_expectations">Partner Expectations</Label>
            <Textarea
              id="preferred_partner_expectations"
              value={formData.preferred_partner_expectations || ""}
              onChange={(e) => handleChange("preferred_partner_expectations", e.target.value)}
              placeholder="Describe your partner expectations..."
              maxLength={500}
              rows={4}
              className={fieldErrors.preferred_partner_expectations ? "border-red-500" : ""}
            />
            {fieldErrors.preferred_partner_expectations && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.preferred_partner_expectations}</p>
            )}
            <p className="text-sm text-gray-500">
              {formData.preferred_partner_expectations?.length || 0}/500 characters
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
} 