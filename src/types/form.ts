export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea' | 'date' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    custom?: (value: any) => boolean | string;
  };
}

export interface FormSection {
  id: string;
  title: string;
  fields: FormField[];
}

export interface FormData {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface FormState {
  data: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  isValid: boolean;
}

export type FormFieldProps = {
  field: FormField;
  value: any;
  onChange: (name: string, value: any) => void;
  error?: string;
};

export interface FormSectionProps {
  section: FormSection;
  data: FormData;
  errors: FormErrors;
  onChange: (name: string, value: any) => void;
};
