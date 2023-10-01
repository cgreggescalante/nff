import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

/* eslint-disable-next-line */
export interface TimedAlertProps {
  message: string;
  duration: number;
  show: boolean;
  setShow: (value: boolean) => void;
}

export const TimedAlert = ({
  message,
  duration,
  show,
  setShow,
}: TimedAlertProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (show) timer = setTimeout(() => setShow(false), duration);
    return () => clearTimeout(timer);
  }, [duration, show, setShow]);

  return (
    <>
      {show && (
        <Alert variant={'success'} dismissible onClose={() => setShow(false)}>
          {message}
        </Alert>
      )}
    </>
  );
};

export default TimedAlert;
