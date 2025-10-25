import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { Radio, Typography } from '@/components/atoms';

interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
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

const RadioContainer = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  user-select: none;

  &:hover {
    .radio-label {
      color: ${theme.colors.primary.main};
    }
  }
`;

const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  error,
  disabled,
  size = 'md',
  name,
}) => {
  const handleChange = (optionValue: string) => {
    if (!disabled && onChange) {
      onChange(optionValue);
    }
  };

  return (
    <GroupContainer>
      {options.map((option) => (
        <RadioContainer key={option.value}>
          <Radio
            name={name}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            error={error}
            disabled={disabled || option.disabled}
            size={size}
          />
          <Typography
            variant="body1"
            color={disabled || option.disabled ? 'secondary' : 'primary'}
            className="radio-label"
          >
            {option.label}
          </Typography>
        </RadioContainer>
      ))}
    </GroupContainer>
  );
};

export default RadioGroup; 