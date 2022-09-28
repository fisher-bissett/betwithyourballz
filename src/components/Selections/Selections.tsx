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
import { BetItem } from "./BetItem";
import axios from "axios";
import { Sport } from "../../types/types";
import { CircularProgress } from "@mui/material";

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
          // console.log(doc.id, " => ", doc.data());
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

  const url = "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=football&league=nfl";
  const [data, setData] = useState<Sport>();

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data.sports[0]);
    });
  }, []);

  const getMatchup = (bet: String) => {
    const teamAbbr = bet.split(" ")[0];

    if (data) {
      const matchup = data.leagues[0].events.find((item, idx) => {
        return item.shortName.includes(teamAbbr);
      });
      return matchup;
    }
  };

  return <div className="text-center">Coming soon!</div>;
};
