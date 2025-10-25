"use client"

import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  SPIRITUAL_AFFILIATION_OPTIONS,
  CHANTING_ROUNDS_OPTIONS,
  TEMPLE_VISIT_OPTIONS,
  SPIRITUALITY_ROLE_OPTIONS,
  INITIATION_STATUS_OPTIONS,
  FOUR_REGULATIVE_PRINCIPLES_OPTIONS,
  EKADASHI_OPTIONS,
  PARENT_PRACTICE_KRISHNA_OPTIONS,
  BOOKS_NAMES_OPTIONS,
  ASSOCIATED_TYPE_OPTIONS,
  ATTENDED_SEMINAR_OPTIONS
} from "@/common/constants/formOptions"

interface SpiritualData {
  affiliated_with_spiritual_organization: string
  other_organization_details: {
    other_organization_name: string
    affiliated_duration: number
    sadhana_time: number
  }
  iskcon_affiliation_details: {
    practicing_time_period: number
    chanting_rounds: string
    temple_visit: string
    spirituality_role: string
    initiated: string
    initiation_details: {
      initiation_name: string
      spiritual_master: string
    }
    four_regulative_principles: string
    ekadashi_fasting: string
    parents_practice_krishna: string
    book_read: string[]
    iskcon_associated: string
    temple_attended_associated_type: string
    seminar: string
    specific_spiritual_goals: string
    spiritual_mentor: string
    temple_services: string
    department_name: string
    designation_name: string
    roles_and_experiences: string
  }
}

interface SpiritualSectionProps {
  initialData?: Partial<SpiritualData>
  onSubmit?: (data: SpiritualData) => void
  onSuccess?: (data: SpiritualData) => void
  onError?: (error: string) => void
  onValidate?: (isValid: boolean, errors: string[]) => void
  onValidationTrigger?: (triggerValidation: () => void) => void
  onDataGetter?: (getData: () => SpiritualData) => void
}



export function SpiritualSection({ initialData, onSubmit, onSuccess, onError, onValidate, onValidationTrigger, onDataGetter }: SpiritualSectionProps) {
  const [formData, setFormData] = useState<SpiritualData>({
    affiliated_with_spiritual_organization: initialData?.affiliated_with_spiritual_organization || "",
    other_organization_details: {
      other_organization_name: initialData?.other_organization_details?.other_organization_name || "",
      affiliated_duration: initialData?.other_organization_details?.affiliated_duration || 0,
      sadhana_time: initialData?.other_organization_details?.sadhana_time || 0
    },
    iskcon_affiliation_details: {
      practicing_time_period: initialData?.iskcon_affiliation_details?.practicing_time_period || 0,
      chanting_rounds: initialData?.iskcon_affiliation_details?.chanting_rounds || "",
      temple_visit: initialData?.iskcon_affiliation_details?.temple_visit || "",
      spirituality_role: initialData?.iskcon_affiliation_details?.spirituality_role || "",
      initiated: initialData?.iskcon_affiliation_details?.initiated || "",
      initiation_details: {
        initiation_name: initialData?.iskcon_affiliation_details?.initiation_details?.initiation_name || "",
        spiritual_master: initialData?.iskcon_affiliation_details?.initiation_details?.spiritual_master || ""
      },
      four_regulative_principles: initialData?.iskcon_affiliation_details?.four_regulative_principles || "",
      ekadashi_fasting: initialData?.iskcon_affiliation_details?.ekadashi_fasting || "",
      parents_practice_krishna: initialData?.iskcon_affiliation_details?.parents_practice_krishna || "",
      book_read: initialData?.iskcon_affiliation_details?.book_read || [],
      iskcon_associated: initialData?.iskcon_affiliation_details?.iskcon_associated || "",
      temple_attended_associated_type: initialData?.iskcon_affiliation_details?.temple_attended_associated_type || "",
      seminar: initialData?.iskcon_affiliation_details?.seminar || "",
      specific_spiritual_goals: initialData?.iskcon_affiliation_details?.specific_spiritual_goals || "",
      spiritual_mentor: initialData?.iskcon_affiliation_details?.spiritual_mentor || "",
      temple_services: initialData?.iskcon_affiliation_details?.temple_services || "",
      department_name: initialData?.iskcon_affiliation_details?.department_name || "",
      designation_name: initialData?.iskcon_affiliation_details?.designation_name || "",
      roles_and_experiences: initialData?.iskcon_affiliation_details?.roles_and_experiences || ""
    }
  })

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
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

  // Validation function based on backend validation rules
  const validateForm = (data: SpiritualData): { isValid: boolean; errors: string[]; fieldErrors: Record<string, string> } => {
    const errors: string[] = []
    const fieldErrors: Record<string, string> = {}

    // Spiritual affiliation is always required
    if (!data.affiliated_with_spiritual_organization) {
      errors.push("Spiritual organization affiliation is required")
      fieldErrors.affiliated_with_spiritual_organization = "Spiritual organization affiliation is required"
      return { isValid: false, errors, fieldErrors }
    }

    // Define ISKCON-related affiliations
    const iskconAffiliations = [
      SPIRITUAL_AFFILIATION_OPTIONS.ISKCON,
      SPIRITUAL_AFFILIATION_OPTIONS.ISKCON_BANGALORE,
      SPIRITUAL_AFFILIATION_OPTIONS.GAUDIYA_VAISHNAVA
    ]

    // Define non-ISKCON affiliations that need other organization details
    const nonIskconAffiliations = [
      SPIRITUAL_AFFILIATION_OPTIONS.ART_OF_LIVING,
      SPIRITUAL_AFFILIATION_OPTIONS.BRAHMA_KUMARIS,
      SPIRITUAL_AFFILIATION_OPTIONS.CHINMAYA_MISSION,
      SPIRITUAL_AFFILIATION_OPTIONS.ISHA_FOUNDATION,
      SPIRITUAL_AFFILIATION_OPTIONS.MADHVA,
      SPIRITUAL_AFFILIATION_OPTIONS.SRI_VAISHNAVA,
      SPIRITUAL_AFFILIATION_OPTIONS.SRI_SRI_GROUP,
      SPIRITUAL_AFFILIATION_OPTIONS.OTHERS
    ]

    // Validation for non-ISKCON affiliations (other organization details)
    if (nonIskconAffiliations.includes(data.affiliated_with_spiritual_organization as any)) {
      if (!data.other_organization_details.other_organization_name) {
        errors.push("Organization name is required for non-ISKCON affiliations")
        fieldErrors.other_organization_name = "Organization name is required for non-ISKCON affiliations"
      }
      
      // Duration and sadhana time are optional but should be non-negative if provided
      if (data.other_organization_details.affiliated_duration < 0) {
        errors.push("Affiliated duration cannot be negative")
        fieldErrors.affiliated_duration = "Affiliated duration cannot be negative"
      }
      
      if (data.other_organization_details.sadhana_time < 0) {
        errors.push("Sadhana time cannot be negative")
        fieldErrors.sadhana_time = "Sadhana time cannot be negative"
      }
    }

    // Validation for ISKCON-related affiliations
    if (iskconAffiliations.includes(data.affiliated_with_spiritual_organization as any)) {
      // Required fields for ISKCON affiliations
      if (!data.iskcon_affiliation_details.chanting_rounds) {
        errors.push("Chanting rounds are required")
        fieldErrors.chanting_rounds = "Chanting rounds are required"
      }
      
      if (!data.iskcon_affiliation_details.temple_visit) {
        errors.push("Temple visit frequency is required")
        fieldErrors.temple_visit = "Temple visit frequency is required"
      }
      
      if (!data.iskcon_affiliation_details.spirituality_role) {
        errors.push("Spirituality role is required")
        fieldErrors.spirituality_role = "Spirituality role is required"
      }
      
      if (!data.iskcon_affiliation_details.initiated) {
        errors.push("Initiation status is required")
        fieldErrors.initiated = "Initiation status is required"
      }
      
      if (!data.iskcon_affiliation_details.four_regulative_principles) {
        errors.push("Four regulative principles adherence is required")
        fieldErrors.four_regulative_principles = "Four regulative principles adherence is required"
      }
      
      if (!data.iskcon_affiliation_details.ekadashi_fasting) {
        errors.push("Ekadashi fasting observance is required")
        fieldErrors.ekadashi_fasting = "Ekadashi fasting observance is required"
      }
      
      if (!data.iskcon_affiliation_details.parents_practice_krishna) {
        errors.push("Parents' Krishna consciousness practice is required")
        fieldErrors.parents_practice_krishna = "Parents' Krishna consciousness practice is required"
      }
      
      if (!data.iskcon_affiliation_details.temple_attended_associated_type) {
        errors.push("Temple association type is required")
        fieldErrors.temple_attended_associated_type = "Temple association type is required"
      }
      
      if (!data.iskcon_affiliation_details.seminar) {
        errors.push("Seminar attendance is required")
        fieldErrors.seminar = "Seminar attendance is required"
      }

      // Practicing time period should be non-negative if provided
      if (data.iskcon_affiliation_details.practicing_time_period < 0) {
        errors.push("Practicing time period cannot be negative")
        fieldErrors.practicing_time_period = "Practicing time period cannot be negative"
      }

      // If initiated is "Yes", initiation details are required
      if (data.iskcon_affiliation_details.initiated === "Yes") {
        if (!data.iskcon_affiliation_details.initiation_details.initiation_name) {
          errors.push("Initiation name is required when initiated is Yes")
          fieldErrors.initiation_name = "Initiation name is required when initiated is Yes"
        }
        if (!data.iskcon_affiliation_details.initiation_details.spiritual_master) {
          errors.push("Spiritual master name is required when initiated is Yes")
          fieldErrors.spiritual_master = "Spiritual master name is required when initiated is Yes"
        }
      }

      // Optional fields validation (length checks)
      if (data.iskcon_affiliation_details.specific_spiritual_goals && 
          data.iskcon_affiliation_details.specific_spiritual_goals.length > 500) {
        errors.push("Spiritual goals description cannot exceed 500 characters")
        fieldErrors.specific_spiritual_goals = "Spiritual goals description cannot exceed 500 characters"
      }

      if (data.iskcon_affiliation_details.temple_services) {
        if (data.iskcon_affiliation_details.temple_services.length > 200) {
          errors.push("Temple services description cannot exceed 200 characters")
          fieldErrors.temple_services = "Temple services description cannot exceed 200 characters"
        } else if (data.iskcon_affiliation_details.temple_services.length < 3) {
          errors.push("Temple services description must be at least 3 characters if provided")
          fieldErrors.temple_services = "Temple services description must be at least 3 characters if provided"
        }
      }

      if (data.iskcon_affiliation_details.roles_and_experiences && 
          data.iskcon_affiliation_details.roles_and_experiences.length > 500) {
        errors.push("Roles and experiences cannot exceed 500 characters")
        fieldErrors.roles_and_experiences = "Roles and experiences cannot exceed 500 characters"
      }
    }

    // For "No" affiliation, no additional validation is required
    // All other fields are optional

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

  const handleChange = (field: string, value: any, nestedField?: string) => {
    setFormData((prev) => {
      if (nestedField) {
        return {
          ...prev,
          [field]: {
            ...(prev[field as keyof SpiritualData] as any),
            [nestedField]: value
          }
        }
      }
      return {
        ...prev,
        [field]: value,
      }
    })
  }

  const handleBookChange = (book: string) => {
    const currentBooks = formData.iskcon_affiliation_details.book_read
    const updatedBooks = currentBooks.includes(book)
      ? currentBooks.filter(b => b !== book)
      : [...currentBooks, book]
    
    handleChange("iskcon_affiliation_details", {
      ...formData.iskcon_affiliation_details,
      book_read: updatedBooks
    })
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
            <Label htmlFor="affiliated_with_spiritual_organization">Spiritual Organization Affiliation</Label>
            <Select
              value={formData.affiliated_with_spiritual_organization}
              onValueChange={(value) => handleChange("affiliated_with_spiritual_organization", value)}
              required
            >
              <SelectTrigger className={fieldErrors.affiliated_with_spiritual_organization ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your spiritual organization" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(SPIRITUAL_AFFILIATION_OPTIONS).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.affiliated_with_spiritual_organization && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.affiliated_with_spiritual_organization}</p>
            )}
          </div>

          {/* Show other organization details for non-ISKCON affiliations */}
          {[
            SPIRITUAL_AFFILIATION_OPTIONS.ART_OF_LIVING,
            SPIRITUAL_AFFILIATION_OPTIONS.BRAHMA_KUMARIS,
            SPIRITUAL_AFFILIATION_OPTIONS.CHINMAYA_MISSION,
            SPIRITUAL_AFFILIATION_OPTIONS.ISHA_FOUNDATION,
            SPIRITUAL_AFFILIATION_OPTIONS.MADHVA,
            SPIRITUAL_AFFILIATION_OPTIONS.SRI_VAISHNAVA,
            SPIRITUAL_AFFILIATION_OPTIONS.SRI_SRI_GROUP,
            SPIRITUAL_AFFILIATION_OPTIONS.OTHERS
          ].includes(formData.affiliated_with_spiritual_organization as any) && (
            <>
              <div className="space-y-2">
                <Label htmlFor="other_organization_name">Organization Name</Label>
                <Input
                  id="other_organization_name"
                  value={formData.other_organization_details.other_organization_name}
                  onChange={(e) => handleChange("other_organization_details", {
                    ...formData.other_organization_details,
                    other_organization_name: e.target.value
                  })}
                  placeholder="Enter organization name"
                  required
                  className={fieldErrors.other_organization_name ? "border-red-500" : ""}
                />
                {fieldErrors.other_organization_name && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.other_organization_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="affiliated_duration">Duration of Affiliation (Years)</Label>
                <Input
                  id="affiliated_duration"
                  type="number"
                  min="0"
                  value={formData.other_organization_details.affiliated_duration || ""}
                  onChange={(e) => handleChange("other_organization_details", {
                    ...formData.other_organization_details,
                    affiliated_duration: parseInt(e.target.value) || 0
                  })}
                  placeholder="0"
                  className={fieldErrors.affiliated_duration ? "border-red-500" : ""}
                />
                {fieldErrors.affiliated_duration && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.affiliated_duration}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sadhana_time">Sadhana Time (Years)</Label>
                <Input
                  id="sadhana_time"
                  type="number"
                  min="0"
                  value={formData.other_organization_details.sadhana_time || ""}
                  onChange={(e) => handleChange("other_organization_details", {
                    ...formData.other_organization_details,
                    sadhana_time: parseInt(e.target.value) || 0
                  })}
                  placeholder="0"
                  className={fieldErrors.sadhana_time ? "border-red-500" : ""}
                />
                {fieldErrors.sadhana_time && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.sadhana_time}</p>
                )}
              </div>
            </>
          )}

          {/* Show ISKCON details for ISKCON-related affiliations */}
          {[
            SPIRITUAL_AFFILIATION_OPTIONS.ISKCON,
            SPIRITUAL_AFFILIATION_OPTIONS.ISKCON_BANGALORE,
            SPIRITUAL_AFFILIATION_OPTIONS.GAUDIYA_VAISHNAVA
          ].includes(formData.affiliated_with_spiritual_organization as any) && (
            <>
              <div className="space-y-2">
                <Label htmlFor="practicing_time_period">Practicing Time Period (Years)</Label>
                <Input
                  id="practicing_time_period"
                  type="number"
                  min="0"
                  value={formData.iskcon_affiliation_details.practicing_time_period || ""}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    practicing_time_period: parseInt(e.target.value) || 0
                  })}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chanting_rounds">Daily Chanting Rounds</Label>
                <Select
                  value={formData.iskcon_affiliation_details.chanting_rounds}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    chanting_rounds: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.chanting_rounds ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your daily chanting rounds" />
                  </SelectTrigger>
                  <SelectContent>
                    {CHANTING_ROUNDS_OPTIONS.map((rounds: string) => (
                      <SelectItem key={rounds} value={rounds}>
                        {rounds}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.chanting_rounds && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.chanting_rounds}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="temple_visit">Temple Visit Frequency</Label>
                <Select
                  value={formData.iskcon_affiliation_details.temple_visit}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    temple_visit: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.temple_visit ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your temple visit frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    {TEMPLE_VISIT_OPTIONS.map((visit: string) => (
                      <SelectItem key={visit} value={visit}>
                        {visit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.temple_visit && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.temple_visit}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="spirituality_role">Role of Spirituality in Life</Label>
                <Select
                  value={formData.iskcon_affiliation_details.spirituality_role}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    spirituality_role: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.spirituality_role ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select spirituality's role in your life" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPIRITUALITY_ROLE_OPTIONS.map((role: string) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.spirituality_role && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.spirituality_role}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="initiated">Initiated</Label>
                <Select
                  value={formData.iskcon_affiliation_details.initiated}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    initiated: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.initiated ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your initiation status" />
                  </SelectTrigger>
                  <SelectContent>
                    {INITIATION_STATUS_OPTIONS.map((status: string) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.initiated && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.initiated}</p>
                )}
              </div>

              {formData.iskcon_affiliation_details.initiated === "Yes" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="initiation_name">Initiation Name</Label>
                    <Input
                      id="initiation_name"
                      value={formData.iskcon_affiliation_details.initiation_details.initiation_name}
                      onChange={(e) => handleChange("iskcon_affiliation_details", {
                        ...formData.iskcon_affiliation_details,
                        initiation_details: {
                          ...formData.iskcon_affiliation_details.initiation_details,
                          initiation_name: e.target.value
                        }
                      })}
                      placeholder="Enter your initiation name"
                      required
                      className={fieldErrors.initiation_name ? "border-red-500" : ""}
                    />
                    {fieldErrors.initiation_name && (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.initiation_name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spiritual_master">Spiritual Master</Label>
                    <Input
                      id="spiritual_master"
                      value={formData.iskcon_affiliation_details.initiation_details.spiritual_master}
                      onChange={(e) => handleChange("iskcon_affiliation_details", {
                        ...formData.iskcon_affiliation_details,
                        initiation_details: {
                          ...formData.iskcon_affiliation_details.initiation_details,
                          spiritual_master: e.target.value
                        }
                      })}
                      placeholder="Enter your spiritual master's name"
                      required
                      className={fieldErrors.spiritual_master ? "border-red-500" : ""}
                    />
                    {fieldErrors.spiritual_master && (
                      <p className="text-sm text-red-600 mt-1">{fieldErrors.spiritual_master}</p>
                    )}
                  </div>
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="four_regulative_principles">Four Regulative Principles</Label>
                <Select
                  value={formData.iskcon_affiliation_details.four_regulative_principles}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    four_regulative_principles: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.four_regulative_principles ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your adherence to regulative principles" />
                  </SelectTrigger>
                  <SelectContent>
                    {FOUR_REGULATIVE_PRINCIPLES_OPTIONS.map((principle: string) => (
                      <SelectItem key={principle} value={principle}>
                        {principle}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.four_regulative_principles && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.four_regulative_principles}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="ekadashi_fasting">Ekadashi Fasting</Label>
                <Select
                  value={formData.iskcon_affiliation_details.ekadashi_fasting}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    ekadashi_fasting: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.ekadashi_fasting ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your Ekadashi observance" />
                  </SelectTrigger>
                  <SelectContent>
                    {EKADASHI_OPTIONS.map((ekadashi: string) => (
                      <SelectItem key={ekadashi} value={ekadashi}>
                        {ekadashi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.ekadashi_fasting && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.ekadashi_fasting}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parents_practice_krishna">Parents Practice Krishna Consciousness</Label>
                <Select
                  value={formData.iskcon_affiliation_details.parents_practice_krishna}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    parents_practice_krishna: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.parents_practice_krishna ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your parents' practice status" />
                  </SelectTrigger>
                  <SelectContent>
                    {PARENT_PRACTICE_KRISHNA_OPTIONS.map((practice: string) => (
                      <SelectItem key={practice} value={practice}>
                        {practice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.parents_practice_krishna && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.parents_practice_krishna}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Books Read</Label>
                <div className="space-y-2">
                  {BOOKS_NAMES_OPTIONS.map((book: string) => (
                    <div key={book} className="flex items-center space-x-2">
                      <Checkbox
                        id={book}
                        checked={formData.iskcon_affiliation_details.book_read.includes(book)}
                        onCheckedChange={() => handleBookChange(book)}
                      />
                      <Label htmlFor={book} className="text-sm">
                        {book}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="iskcon_associated">ISKCON Association</Label>
                <Input
                  id="iskcon_associated"
                  value={formData.iskcon_affiliation_details.iskcon_associated}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    iskcon_associated: e.target.value
                  })}
                  placeholder="Enter your ISKCON association details"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temple_attended_associated_type">Temple Association Type</Label>
                <Select
                  value={formData.iskcon_affiliation_details.temple_attended_associated_type}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    temple_attended_associated_type: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.temple_attended_associated_type ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your temple association type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ASSOCIATED_TYPE_OPTIONS.map((type: string) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.temple_attended_associated_type && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.temple_attended_associated_type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seminar">Attended Seminars</Label>
                <Select
                  value={formData.iskcon_affiliation_details.seminar}
                  onValueChange={(value) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    seminar: value
                  })}
                  required
                >
                  <SelectTrigger className={fieldErrors.seminar ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your seminar attendance" />
                  </SelectTrigger>
                  <SelectContent>
                    {ATTENDED_SEMINAR_OPTIONS.map((seminar: string) => (
                      <SelectItem key={seminar} value={seminar}>
                        {seminar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.seminar && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.seminar}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="specific_spiritual_goals">Specific Spiritual Goals</Label>
                <Input
                  id="specific_spiritual_goals"
                  value={formData.iskcon_affiliation_details.specific_spiritual_goals}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    specific_spiritual_goals: e.target.value
                  })}
                  placeholder="Enter your specific spiritual goals"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="spiritual_mentor">Spiritual Mentor</Label>
                <Input
                  id="spiritual_mentor"
                  value={formData.iskcon_affiliation_details.spiritual_mentor}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    spiritual_mentor: e.target.value
                  })}
                  placeholder="Enter your spiritual mentor's name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="temple_services">Temple Services</Label>
                <Input
                  id="temple_services"
                  value={formData.iskcon_affiliation_details.temple_services}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    temple_services: e.target.value
                  })}
                  placeholder="Enter your temple services"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department_name">Department Name</Label>
                <Input
                  id="department_name"
                  value={formData.iskcon_affiliation_details.department_name}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    department_name: e.target.value
                  })}
                  placeholder="Enter your department name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation_name">Designation Name</Label>
                <Input
                  id="designation_name"
                  value={formData.iskcon_affiliation_details.designation_name}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    designation_name: e.target.value
                  })}
                  placeholder="Enter your designation name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roles_and_experiences">Roles and Experiences</Label>
                <Input
                  id="roles_and_experiences"
                  value={formData.iskcon_affiliation_details.roles_and_experiences}
                  onChange={(e) => handleChange("iskcon_affiliation_details", {
                    ...formData.iskcon_affiliation_details,
                    roles_and_experiences: e.target.value
                  })}
                  placeholder="Enter your roles and experiences"
                />
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
} 