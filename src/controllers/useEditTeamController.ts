import { useState } from 'react';
import {
  deleteTeam,
  EventWithMetadata,
  TeamWithMetaData,
  updateTeamName,
} from '@shared-data';
import { toast } from 'react-toastify';

interface EditTeamController {
  name: string;
  setName: (name: string) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  handleSubmit: () => void;
  handleDeleteTeam: () => void;
}

export default (
  event: EventWithMetadata,
  team: TeamWithMetaData
): EditTeamController => {
  const [name, setName] = useState<string>(team.name);

  const [show, setShow] = useState<boolean>(false);

  const handleSubmit = () => {
    updateTeamName(event.uid, team.uid, name)
      .then(() => {
        toast.success('Team name updated', { toastId: 'edit-team' });
      })
      .catch(() => {
        toast.error('Could not update team name', { toastId: 'edit-team' });
      });
  };

  const handleDeleteTeam = () => {
    deleteTeam(event.uid, team.uid).then(() => {
      setShow(false);
    });
  };

  return {
    name,
    setName,
    show,
    setShow,
    handleSubmit,
    handleDeleteTeam,
  };
};
