import useUser from '../../providers/useUser';

export const UserSummary = () => {
  const user = useUser();

  if (!user) {
    return null;
  }

  return `${user.firstName} ${user.lastName}`;
};
