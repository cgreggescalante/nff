import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';

/* eslint-disable-next-line */
export interface ManagedTextInputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
  setValue: (e: string) => void;
  label?: string;
}

export const ManagedTextInput = ({
  value,
  setValue,
  label,
  ...props
}: ManagedTextInputProps) => (
  <>
    {label && <label htmlFor={'input'}>{label}</label>}
    <input
      {...props}
      id={'input'}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  </>
);
