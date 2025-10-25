"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MultiSelect } from "@/components/ui/multi-select"
import { X } from "lucide-react"
import { 
  GENDER_OPTIONS, 
  MARITAL_STATUS_OPTIONS, 
  LANGUAGES_OPTIONS, 
  HEIGHT_OPTIONS, 
  HEALTH_CONDITION_OPTIONS, 
  DISABILITY_OPTIONS, 
  RELIGION_OPTIONS, 
  ETHNICITY_OPTIONS 
} from "@/common/constants/formOptions"

interface BasicInfoData {
  gender: string
  marital_status: string
  mother_tongue: string
  languages_known: string[]
  height: string
  weight: number
  health_disease_disability: string
  religion: string
  ethnicity: string
}

interface BasicInfoSectionProps {
  initialData?: Partial<BasicInfoData>
  onSubmit?: (data: BasicInfoData) => void
  onSuccess?: (data: BasicInfoData) => void
  onError?: (error: string) => void
  onValidate?: (isValid: boolean, errors: string[]) => void
  onValidationTrigger?: (triggerValidation: () => void) => void
  onDataGetter?: (getData: () => BasicInfoData) => void
}

// Using constants from formOptions

export function BasicInfoSection({ initialData, onSubmit, onSuccess, onError, onValidate, onValidationTrigger, onDataGetter }: BasicInfoSectionProps) {
  const [formData, setFormData] = useState<BasicInfoData>({
    gender: initialData?.gender || "",
    marital_status: initialData?.marital_status || "",
    mother_tongue: initialData?.mother_tongue || "",
    languages_known: initialData?.languages_known || [],
    height: initialData?.height || "",
    weight: initialData?.weight || 0,
    health_disease_disability: initialData?.health_disease_disability || "",
    religion: initialData?.religion || "",
    ethnicity: initialData?.ethnicity || "",
  })

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<keyof BasicInfoData, string>>({
    gender: "",
    marital_status: "",
    mother_tongue: "",
    languages_known: "",
    height: "",
    weight: "",
    health_disease_disability: "",
    religion: "",
    ethnicity: "",
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
  const validateForm = (data: BasicInfoData): { isValid: boolean; errors: string[]; fieldErrors: Record<keyof BasicInfoData, string> } => {
    const errors: string[] = []
    const fieldErrors: Record<keyof BasicInfoData, string> = {
      gender: "",
      marital_status: "",
      mother_tongue: "",
      languages_known: "",
      height: "",
      weight: "",
      health_disease_disability: "",
      religion: "",
      ethnicity: "",
    }

    if (!data.gender) {
      errors.push("Gender is required")
      fieldErrors.gender = "Gender is required"
    }
    if (!data.marital_status) {
      errors.push("Marital status is required")
      fieldErrors.marital_status = "Marital status is required"
    }
    if (!data.mother_tongue) {
      errors.push("Mother tongue is required")
      fieldErrors.mother_tongue = "Mother tongue is required"
    }
    if (!data.languages_known || data.languages_known.length === 0) {
      errors.push("At least one language is required")
      fieldErrors.languages_known = "At least one language is required"
    }
    if (!data.height) {
      errors.push("Height is required")
      fieldErrors.height = "Height is required"
    }
    if (!data.weight || data.weight <= 0) {
      errors.push("Weight is required and must be greater than 0")
      fieldErrors.weight = "Weight is required and must be greater than 0"
    }
    if (!data.health_disease_disability) {
      errors.push("Health status is required")
      fieldErrors.health_disease_disability = "Health status is required"
    }
    if (!data.religion) {
      errors.push("Religion is required")
      fieldErrors.religion = "Religion is required"
    }
    if (!data.ethnicity) {
      errors.push("Ethnicity is required")
      fieldErrors.ethnicity = "Ethnicity is required"
    }

    return { isValid: errors.length === 0, errors, fieldErrors }
  }

  // Only call onSubmit when explicitly triggered (not on every form change)
  // This will be called by the parent component when Next is clicked

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

  const handleChange = (field: keyof BasicInfoData, value: string | number | string[]) => {
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
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={formData.gender}
              onValueChange={(value) => handleChange("gender", value)}
              required
            >
              <SelectTrigger className={fieldErrors.gender ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((gender) => (
                  <SelectItem key={gender} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.gender && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.gender}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="marital_status">Marital Status</Label>
            <Select
              value={formData.marital_status}
              onValueChange={(value) => handleChange("marital_status", value)}
              required
            >
              <SelectTrigger className={fieldErrors.marital_status ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your marital status" />
              </SelectTrigger>
              <SelectContent>
                {MARITAL_STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.marital_status && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.marital_status}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="mother_tongue">Mother Tongue</Label>
            <Select
              value={formData.mother_tongue}
              onValueChange={(value) => handleChange("mother_tongue", value)}
              required
            >
              <SelectTrigger className={fieldErrors.mother_tongue ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your mother tongue" />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES_OPTIONS.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.mother_tongue && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.mother_tongue}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="languages_known">Languages Known</Label>
            <MultiSelect
              options={LANGUAGES_OPTIONS.map(lang => ({ value: lang, label: lang }))}
              selected={formData.languages_known}
              onSelectionChange={(selected) => handleChange("languages_known", selected)}
              placeholder="Select languages you know"
              className={fieldErrors.languages_known ? "border-red-500" : ""}
            />
            {fieldErrors.languages_known && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.languages_known}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="height">Height</Label>
            <Select
              value={formData.height}
              onValueChange={(value) => handleChange("height", value)}
              required
            >
              <SelectTrigger className={fieldErrors.height ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your height" />
              </SelectTrigger>
              <SelectContent>
                {HEIGHT_OPTIONS.map((height) => (
                  <SelectItem key={height.value} value={height.value}>
                    {height.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.height && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.height}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input
              id="weight"
              type="number"
              value={formData.weight || ""}
              onChange={(e) => handleChange("weight", parseInt(e.target.value) || 0)}
              placeholder="Enter your weight in kg"
              min="1"
              max="999"
              required
              className={fieldErrors.weight ? "border-red-500" : ""}
            />
            {fieldErrors.weight && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.weight}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="health_disease_disability">Health Status</Label>
            <Select
              value={formData.health_disease_disability}
              onValueChange={(value) => handleChange("health_disease_disability", value)}
              required
            >
              <SelectTrigger className={fieldErrors.health_disease_disability ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your health status" />
              </SelectTrigger>
              <SelectContent>
                {[...HEALTH_CONDITION_OPTIONS, ...DISABILITY_OPTIONS].map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.health_disease_disability && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.health_disease_disability}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="religion">Religion</Label>
            <Select
              value={formData.religion}
              onValueChange={(value) => handleChange("religion", value)}
              required
            >
              <SelectTrigger className={fieldErrors.religion ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your religion" />
              </SelectTrigger>
              <SelectContent>
                {RELIGION_OPTIONS.map((religion) => (
                  <SelectItem key={religion} value={religion}>
                    {religion}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.religion && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.religion}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ethnicity">Ethnicity</Label>
            <Select
              value={formData.ethnicity}
              onValueChange={(value) => handleChange("ethnicity", value)}
              required
            >
              <SelectTrigger className={fieldErrors.ethnicity ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your ethnicity" />
              </SelectTrigger>
              <SelectContent>
                {ETHNICITY_OPTIONS.map((ethnicity) => (
                  <SelectItem key={ethnicity} value={ethnicity}>
                    {ethnicity}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.ethnicity && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.ethnicity}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
} 