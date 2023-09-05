import styles from './help.module.scss';
import { Button } from "react-bootstrap";

const Help = () =>
  <div className={styles['container']}>
    <h1>Welcome to Help!</h1>
    <Button>Primary</Button>
    <Button variant={'secondary'}>Secondary</Button>
    <Button variant={'success'}>Success</Button>
    <Button variant={'warning'}>Warning</Button>
    <Button variant={'danger'}>Danger</Button>
    <Button variant={'info'}>Info</Button>
  </div>

export default Help;
