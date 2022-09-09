import React, { useEffect } from "react";
import { collection, DocumentData, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase";

interface Props {}

export const Selections: React.FC<Props> = () => {
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const unSubscribe = async () => {
        // Create a reference to the cities collection
        const citiesRef = collection(db, "users");

        // Create a query against the collection.
        const q = query(citiesRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      };
      unSubscribe();
    }
  }, [user, db]);

  return <></>;
};
