import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Typography } from '@/components/atoms';

interface FormFieldProps {
  label?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
`;

const RequiredMark = styled.span`
  color: ${theme.colors.error.main};
  margin-left: ${theme.spacing.xs};
`;

const FormField: React.FC<FormFieldProps> = ({ label, error, required, children }) => {
  return (
    <FieldContainer>
      {label && (
        <LabelContainer>
          <Typography variant="body2" color="primary">
            {label}
          </Typography>
          {required && <RequiredMark>*</RequiredMark>}
        </LabelContainer>
      )}
      {children}
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
    </FieldContainer>
  );
};

export default FormField; 