import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Checkbox, Typography } from '@/components/atoms';

interface CheckboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  error?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  name: string;
}

const GroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  user-select: none;

  &:hover {
    .checkbox-label {
      color: ${theme.colors.primary.main};
    }
  }
`;

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value = [],
  onChange,
  error,
  disabled,
  size = 'md',
  name,
}) => {
  const handleChange = (optionValue: string) => {
    if (!disabled && onChange) {
      const newValue = value.includes(optionValue)
        ? value.filter((v) => v !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    }
  };

  return (
    <GroupContainer>
      {options.map((option) => (
        <CheckboxContainer key={option.value}>
          <Checkbox
            name={name}
            checked={value.includes(option.value)}
            onChange={() => handleChange(option.value)}
            error={error}
            disabled={disabled || option.disabled}
            size={size}
          />
          <Typography
            variant="body1"
            color={disabled || option.disabled ? 'secondary' : 'primary'}
            className="checkbox-label"
          >
            {option.label}
          </Typography>
        </CheckboxContainer>
      ))}
    </GroupContainer>
  );
};

export default CheckboxGroup; 