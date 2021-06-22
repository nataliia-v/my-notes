import { useEffect, useState } from 'react';
import { getUserNotes } from '../firebase';
import { atom, useRecoilState } from 'recoil';
import { loggedUser } from '../App';

// export const getUserNotes = async (userId: string) => {
//   const snapshot = await db
//     .collection('notes')
//     .where('author', '==', userId)
//     .get();
//   return snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
// };

export const useNotes = () => {
  const notesAtom = atom({
    key: 'notes',
    default: [],
  });
  const [, setNotes] = useRecoilState(notesAtom);
  const [user] = useRecoilState(loggedUser);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // setNotes(getUserNotes())
  //   //
  //   // getUserNotes(user.uid).then((data) => setNotes( data ));
  //   // setIsLoading(false)
  // }, [])
};
