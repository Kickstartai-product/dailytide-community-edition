import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { TSession } from '@/interfaces';

const useUserSession = () => {
  const { data: nextAuthSession, status } = useSession();
  const [sessionData, setSessionData] = useState<TSession>({ session: null, status: 'loading' });

  const fetchSession = async () => {
    const serverSession = await JSON.parse(localStorage.getItem('session') || '{}');

    setSessionData({
      session: nextAuthSession || serverSession,
      status: nextAuthSession?.user || serverSession?.user ? 'authenticated' : 'unauthenticated',
    });
  };

  useEffect(() => {
    fetchSession();
  }, [status]);

  return sessionData;
};

export { useUserSession };
