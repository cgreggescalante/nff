import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import React, { ReactNode, useEffect, useState } from 'react';
import { CheckIsEventOwner } from '@shared-data';
import useAuth from '../providers/useAuth';

interface EventOwnerRouteProps {
  children: ReactNode;
}

export const EventOwnerRoute = ({ children }: EventOwnerRouteProps) => {
  const { eventId } = useParams();

  if (!eventId) throw new Error('Event ID not provided');

  const { loading: authLoading, isAdmin, userId } = useAuth();
  const navigate = useNavigate();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!authLoading && userId)
      CheckIsEventOwner(userId, eventId).then((isOwner) => {
        setIsOwner(isOwner);
        setLoading(false);
      });
    else if (!authLoading) setLoading(false);
  }, [authLoading, eventId, navigate, userId]);

  if ((loading || authLoading) && !isAdmin) return;

  if (isOwner || isAdmin) return children;
  else {
    toast.error('Permission denied.', { toastId: 'eventOwnerRoute' });
    return <Navigate to={`/events/${eventId}`} replace />;
  }
};
