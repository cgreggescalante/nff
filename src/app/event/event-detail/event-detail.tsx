import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  auth,
  CheckIsEventOwner,
  EventWithMetadata,
  registerUserForEvent,
} from '@shared-data';
import { LoadingWrapper } from '@shared-ui';
import { EventLeaderboard } from './event-leaderboard';
import { TeamLeaderboard } from './team-leaderboard';
import useAuth from '../../../providers/useAuth';
import { useEvent } from '../../../providers/queries';
import {
  Button,
  DialogContent,
  DialogTitle,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from '@mui/joy';
import { toast } from 'react-toastify';

export const EventDetail = () => {
  const { eventId } = useParams();

  if (!eventId) throw new Error('Event ID not provided');

  const authData = useAuth();

  const { data: event, isLoading } = useEvent(eventId);

  const [canEdit, setCanEdit] = useState<boolean>(false);

  useEffect(() => {
    if (authData.isAdmin) setCanEdit(true);
    else if (eventId && authData.userId) {
      CheckIsEventOwner(authData.userId, eventId)
        .then((isOwner) => {
          setCanEdit(isOwner);
        })
        .catch((error) => {
          console.error('Error while checking if user is event owner:', error);
        });
    } else {
      setCanEdit(false);
    }
  }, [authData, eventId]);

  return (
    <LoadingWrapper loading={isLoading}>
      {event && (
        <>
          <Typography level={'h2'}>{event.name}</Typography>
          <Link to={`/events/${eventId}/edit`} hidden={!canEdit}>
            <Button>Edit</Button>
          </Link>
          <Typography level={'body-md'}>{event.description}</Typography>
          <Typography level={'body-md'}>
            {event.entryRefs.length} Registered Users
          </Typography>
          <RegisterButton event={event} />
          <EventLeaderboard event={event} />
          <TeamLeaderboard event={event} />
        </>
      )}
    </LoadingWrapper>
  );
};

const RegisterButton = ({ event }: { event: EventWithMetadata }) => {
  if (event.registrationStart > new Date())
    return (
      <Typography level={'body-md'}>
        Registration opens {event.registrationStart.toDateString()}
      </Typography>
    );

  if (event.registrationEnd < new Date())
    return (
      <Typography level={'body-md'}>
        Registration is closed for this event
      </Typography>
    );

  if (auth.currentUser === null)
    return <Typography level={'body-md'}>Please login to register</Typography>;

  if (
    event.entryRefs.some((entryRef) =>
      entryRef.path.startsWith(`users/${auth.currentUser?.uid}`)
    )
  )
    return (
      <Typography level={'body-md'}>
        You are already registered for this event
      </Typography>
    );

  if (event.useGoals) return <RegisterForEventWithGoals event={event} />;

  return (
    <Button onClick={() => registerUserForEvent(event, auth.currentUser!.uid)}>
      Register Now
    </Button>
  );
};

const RegisterForEventWithGoals = ({ event }: { event: EventWithMetadata }) => {
  const [open, setOpen] = useState(false);

  const [goal, setGoal] = useState<number>(0);

  const register = () => {
    registerUserForEvent(event, auth.currentUser!.uid, goal)
      .then(() => setOpen(false))
      .catch((error) => {
        toast.error('Could not register for event');
      });
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Register Now</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <ModalClose />
          <DialogTitle>Register for Event</DialogTitle>
          <DialogContent>Please set a realistic goal.</DialogContent>
          <Input
            autoFocus
            required
            type={'number'}
            value={goal}
            onChange={(e) => setGoal(parseFloat(e.target.value))}
          />
          <Button onClick={register}>Register</Button>
        </ModalDialog>
      </Modal>
    </>
  );
};

export default EventDetail;
