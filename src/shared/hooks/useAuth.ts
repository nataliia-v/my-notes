import { useEffect, useState } from 'react';
import * as db from '../../firebase';

export const useAuth = () => {
  const [user, setUser] = useState<any>(null); // add user Type !!!
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return db.checkAuth((user: any) => {
      setLoading(false);
      setUser(user);
    });
  }, []);
  return { user, loading };
};
