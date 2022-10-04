import React, { useState } from 'react';
import { Caption, Container, Input } from './styles';

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
  height?: string;
  supportsMaxLength?: boolean;
  borderRadius?: '1rem' | '0.4rem';
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ value = '', height, onFocus, onBlur, borderRadius, supportsMaxLength, maxLength, ...restTextInputProps }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <>
        <Container
          height={height}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          supportsMaxLength={supportsMaxLength}
        >
          <Input ref={ref} value={value} maxLength={maxLength} borderRadius={borderRadius} {...restTextInputProps} />
        </Container>
        {supportsMaxLength && isFocused && (
          <Caption>
            {value.length}/{maxLength}
          </Caption>
        )}
      </>
    );
  }
);

export default TextInput;
