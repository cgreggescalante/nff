import useAuth from '../providers/useAuth';
import { useEffect, useState } from 'react';
import { updateProfile } from 'firebase/auth';
import { toast } from 'react-toastify';

interface EditProfileController {
  displayName: string;
  setDisplayName: (displayName: string) => void;
  edited: boolean;
  saveChanges: () => void;
}

export default (): EditProfileController => {
  const { user } = useAuth();

  const [displayName, setDisplayName] = useState<string>(
    user?.displayName || ''
  );

  const [edited, setEdited] = useState<boolean>(false);

  useEffect(() => {
    setEdited(displayName !== user?.displayName);
  }, [displayName, user]);

  const saveChanges = () => {
    if (!user) return;
    updateProfile(user, { displayName })
      .then(() => {
        toast.success('User details updated successfully');
        setEdited(false);
      })
      .catch((error) => {
        console.error('Error while updating user details:', error);
        toast.error('Failed to update user details');
      });
  };

  return {
    displayName,
    setDisplayName,
    edited,
    saveChanges,
  };
};
