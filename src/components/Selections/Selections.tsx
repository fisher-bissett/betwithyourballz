import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";
import { Bet } from "../../types/bets";

interface Props {}

export const Selections: React.FC<Props> = () => {
  const [user, loading, error] = useAuthState(auth);

  const [userBets, setUserBets] = useState<Bet>();

  useEffect(() => {
    if (user) {
      const unSubscribe = async () => {
        // Create a reference to the users collection
        const usersRef = collection(db, "users");
        // Create a query against the collection.
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        let userDocId;
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          userDocId = doc.id;
        });

        const betsQuery = query(collection(db, "bets"), where("userId", "==", user.uid));
        const betsSnapshot = await getDocs(betsQuery);
        betsSnapshot.forEach((doc) => {
          setUserBets({
            favorite: doc.get("favorite"),
            underdog: doc.get("underdog"),
            over: doc.get("over"),
            under: doc.get("under"),
            userId: doc.get("userId"),
            weekNumber: doc.get("weekNumber")
          });
        });
      };
      unSubscribe();
    }
  }, [user, db]);

  const placeBet = async (userId: string) => {
    await addDoc(collection(db, "bets"), {
      favorite: "-2.5 KCC",
      underdog: "+2.5 BUF",
      over: "50",
      under: "52",
      userId: userId
    });
  };

  return (
    <>
      {user && (
        <div className="flex flex-col">
          <div>{user?.displayName}'s bets</div>
          <span>favorite {userBets?.favorite}</span>
          <span>underdog {userBets?.underdog}</span>
          <span>over {userBets?.over}</span>
          <span>under {userBets?.under}</span>
        </div>
      )}
    </>
  );
};
