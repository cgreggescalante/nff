import { FormControl, FormControlProps } from 'react-bootstrap';

export interface ManagedFormControlProps extends FormControlProps {
  value: any;
  setValue: (value: any) => void;
}

export function ManagedFormControl({
  value,
  setValue,
  ...props
}: ManagedFormControlProps) {
  return (
    <FormControl
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
