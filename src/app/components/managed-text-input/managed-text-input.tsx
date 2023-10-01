import { ChangeEvent } from 'react';

/* eslint-disable-next-line */
export interface ManagedTextInputProps {
  value: string;
  setValue: (e: string) => void;
  label?: string;
}

export const ManagedTextInput = ({
  value,
  setValue,
  label,
}: ManagedTextInputProps) => {
  return (
    <>
      {label ? <label htmlFor={'input'}>{label}</label> : <></>}
      <input
        id={'input'}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </>
  );
};

export default ManagedTextInput;
