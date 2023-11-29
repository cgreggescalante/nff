import { ManagedTextInputProps } from './managed-text-input';
import { useState } from 'react';

interface ManagedDateInputProps {
  value: Date;
  setValue: (e: Date) => void;
  label?: string;
}

export const ManagedDateInput = ({
  value,
  setValue,
  label,
}: ManagedDateInputProps) => (
  <>
    {label && <label htmlFor={'input'}>{label}</label>}
    <input
      id={'input'}
      type={'date'}
      value={value.toISOString().slice(0, 10)}
      onChange={(e) => setValue(new Date(e.target.value))}
    />
  </>
);
