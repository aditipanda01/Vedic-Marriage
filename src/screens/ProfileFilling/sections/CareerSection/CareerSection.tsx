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

interface CareerData {
  employed: boolean
  company_type: string
  company_name: string
  occupation: string
  income: string
  job_location: string
  working_period: number
  total_working_period: number
  ed_qualification: string
  ed_institution: string
  ed_other_qualification: string
}

interface CareerSectionProps {
  initialData?: Partial<CareerData>
  onSubmit?: (data: CareerData) => void
  onSuccess?: (data: CareerData) => void
  onError?: (error: string) => void
  onValidate?: (isValid: boolean, errors: string[]) => void
  onValidationTrigger?: (triggerValidation: () => void) => void
  onDataGetter?: (getData: () => CareerData) => void
}

// Company type options from backend enum
const companyTypeOptions = {
  PRIVATE_COMPANY: "Private Company",
  GOVERNMENT_PUBLIC_SECTOR: "Government / Public Sector",
  DEFENSE_CIVIL_SERVICES: "Defense / Civil Services",
  BUSINESS_SELF_EMPLOYED: "Business / Self Employed",
  NOT_WORKING: "Not Working"
}

// Income options from backend enum
const incomeOptions = {
  UPTO_INR_1_LAKH: "Upto INR 1 Lakh",
  INR_1_LAKH_TO_2_LAKH: "INR 1 Lakh to 2 Lakh",
  INR_2_LAKH_TO_4_LAKH: "INR 2 Lakh to 4 Lakh",
  INR_4_LAKH_TO_7_LAKH: "INR 4 Lakh to 7 Lakh",
  INR_7_LAKH_TO_10_LAKH: "INR 7 Lakh to 10 Lakh",
  INR_10_LAKH_TO_15_LAKH: "INR 10 Lakh to 15 Lakh",
  INR_15_LAKH_TO_20_LAKH: "INR 15 Lakh to 20 Lakh",
  INR_20_LAKH_TO_30_LAKH: "INR 20 Lakh to 30 Lakh",
  INR_30_LAKH_TO_50_LAKH: "INR 30 Lakh to 50 Lakh",
  INR_50_LAKH_TO_75_LAKH: "INR 50 Lakh to 75 Lakh",
  INR_75_LAKH_TO_1_CRORE: "INR 75 Lakh to 1 Crore",
  INR_1_CRORE_ABOVE: "INR 1 Crore & above",
  NOT_APPLICABLE_OR_NOT_WORKING: "Not applicable or not working",
  KEEP_THIS_PRIVATE: "Keep this private"
}

// Qualification options from backend enum
const qualificationOptions = {
  POST_DOCTORAL_AND_ABOVE: "Post Doctoral and above",
  DOCTORATE: "Doctorate",
  MASTER: "Master",
  BACHELOR: "Bachelor",
  HONOURS: "Honours",
  ASSOCIATE: "Associate",
  DIPLOMA: "Diploma",
  HIGHER_SECONDARY_EDUCATION: "Higher Secondary Education",
  SECONDARY_EDUCATION: "Secondary Education",
  LESS_THAN_HIGH_SCHOOL: "Less than high school",
  NO_FORMAL_EDUCATION: "No formal education",
  BE_BTECH: "B.E / B.Tech",
  BSC: "B.Sc",
  OTHERS: "Others"
}

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

export function CareerSection({ initialData, onSubmit, onSuccess, onError, onValidate, onValidationTrigger, onDataGetter }: CareerSectionProps) {
  const [formData, setFormData] = useState<CareerData>({
    employed: initialData?.employed || false,
    company_type: initialData?.company_type || "",
    company_name: initialData?.company_name || "",
    occupation: initialData?.occupation || "",
    income: initialData?.income || "",
    job_location: initialData?.job_location || "",
    working_period: initialData?.working_period || 0,
    total_working_period: initialData?.total_working_period || 0,
    ed_qualification: initialData?.ed_qualification || "",
    ed_institution: initialData?.ed_institution || "",
    ed_other_qualification: initialData?.ed_other_qualification || "",
  });

  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<keyof CareerData, string>>({
    employed: "",
    company_type: "",
    company_name: "",
    occupation: "",
    income: "",
    job_location: "",
    working_period: "",
    total_working_period: "",
    ed_qualification: "",
    ed_institution: "",
    ed_other_qualification: "",
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
  const validateForm = (data: CareerData): { isValid: boolean; errors: string[]; fieldErrors: Record<keyof CareerData, string> } => {
    const errors: string[] = []
    const fieldErrors: Record<keyof CareerData, string> = {
      employed: "",
      company_type: "",
      company_name: "",
      occupation: "",
      income: "",
      job_location: "",
      working_period: "",
      total_working_period: "",
      ed_qualification: "",
      ed_institution: "",
      ed_other_qualification: "",
    }

    // Education fields are always required
    if (!data.ed_qualification) {
      errors.push("Educational qualification is required")
      fieldErrors.ed_qualification = "Educational qualification is required"
    }
    if (!data.ed_institution) {
      errors.push("Educational institution is required")
      fieldErrors.ed_institution = "Educational institution is required"
    }

    // Employment fields are required only if employed
    if (data.employed) {
      if (!data.company_type) {
        errors.push("Company type is required")
        fieldErrors.company_type = "Company type is required"
      }
      if (!data.company_name) {
        errors.push("Company name is required")
        fieldErrors.company_name = "Company name is required"
      }
      if (!data.occupation) {
        errors.push("Occupation is required")
        fieldErrors.occupation = "Occupation is required"
      }
      if (!data.income) {
        errors.push("Income is required")
        fieldErrors.income = "Income is required"
      }
      if (!data.job_location) {
        errors.push("Job location is required")
        fieldErrors.job_location = "Job location is required"
      }
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

  const handleChange = (field: keyof CareerData, value: string | number | boolean) => {
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
            <Label htmlFor="employed">Are you currently employed?</Label>
            <Select
              value={formData.employed ? "yes" : "no"}
              onValueChange={(value) => handleChange("employed", value === "yes")}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.employed && (
            <>
              <div className="space-y-2">
                <Label htmlFor="company_type">Company Type</Label>
                <Select
                  value={formData.company_type}
                  onValueChange={(value) => handleChange("company_type", value)}
                  required
                >
                  <SelectTrigger className={fieldErrors.company_type ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select company type" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(companyTypeOptions).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.company_type && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.company_type}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleChange("company_name", e.target.value)}
                  placeholder="Enter your company name"
                  required
                  className={fieldErrors.company_name ? "border-red-500" : ""}
                />
                {fieldErrors.company_name && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.company_name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="occupation">Occupation</Label>
                <Select
                  value={formData.occupation}
                  onValueChange={(value) => handleChange("occupation", value)}
                  required
                >
                  <SelectTrigger className={fieldErrors.occupation ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    {occupationOptions.map((occupation: string) => (
                      <SelectItem key={occupation} value={occupation}>
                        {occupation}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.occupation && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.occupation}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">Annual Income</Label>
                <Select
                  value={formData.income}
                  onValueChange={(value) => handleChange("income", value)}
                  required
                >
                  <SelectTrigger className={fieldErrors.income ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select your annual income" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(incomeOptions).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldErrors.income && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.income}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="job_location">Job Location</Label>
                <PlacesAutocomplete
                  value={formData.job_location}
                  onChange={(value: string) => handleChange("job_location", value)}
                  onSelect={(value: string) => handleChange("job_location", value)}
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
                          placeholder: 'Enter your job location',
                          className: `w-full rounded border border-solid border-[#dfe1e6] ${fieldErrors.job_location ? "border-red-500" : ""}`,
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
                {fieldErrors.job_location && (
                  <p className="text-sm text-red-600 mt-1">{fieldErrors.job_location}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="working_period">Current Job Experience (Years)</Label>
                  <Input
                    id="working_period"
                    type="number"
                    min="0"
                    value={formData.working_period || ""}
                    onChange={(e) => handleChange("working_period", parseInt(e.target.value) || 0)}
                    placeholder="0"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="total_working_period">Total Work Experience (Years)</Label>
                  <Input
                    id="total_working_period"
                    type="number"
                    min="0"
                    value={formData.total_working_period || ""}
                    onChange={(e) => handleChange("total_working_period", parseInt(e.target.value) || 0)}
                    placeholder="0"
                    required
                  />
                </div>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="ed_qualification">Highest Educational Qualification</Label>
            <Select
              value={formData.ed_qualification}
              onValueChange={(value) => handleChange("ed_qualification", value)}
              required
            >
              <SelectTrigger className={fieldErrors.ed_qualification ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your highest qualification" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(qualificationOptions).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldErrors.ed_qualification && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.ed_qualification}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ed_institution">Educational Institution</Label>
            <Input
              id="ed_institution"
              value={formData.ed_institution}
              onChange={(e) => handleChange("ed_institution", e.target.value)}
              placeholder="Enter your educational institution"
              required
              className={fieldErrors.ed_institution ? "border-red-500" : ""}
            />
            {fieldErrors.ed_institution && (
              <p className="text-sm text-red-600 mt-1">{fieldErrors.ed_institution}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ed_other_qualification">Other Qualifications</Label>
            <Input
              id="ed_other_qualification"
              value={formData.ed_other_qualification}
              onChange={(e) => handleChange("ed_other_qualification", e.target.value)}
              placeholder="Enter any other qualifications"
            />
          </div>
        </div>
      </Card>
    </div>
  );
} 