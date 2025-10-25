export interface ValidationResult {
    isValid: boolean;
    error: string;
  }
  
  export const validateMobileNumber = (number: string): ValidationResult => {
    // Check if empty
    if (!number) {
      return { isValid: false, error: 'Mobile number is required' };
    }
  
    // Check if contains only numbers
    if (!/^\d+$/.test(number)) {
      return { isValid: false, error: 'Mobile number should contain only digits' };
    }
  
    // Check length
    if (number.length !== 10) {
      return { isValid: false, error: 'Mobile number should be 10 digits' };
    }
  
    // Check if starts with valid Indian prefix
    if (!/^[6-9]/.test(number)) {
      return { isValid: false, error: 'Mobile number should start with 6, 7, 8, or 9' };
    }
  
    return { isValid: true, error: '' };
  };