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

  return (
    <>
      {/* {user && (
        <div className="flex flex-col">
          <div>{user?.displayName}'s bets</div>
          <span>favorite {userBets?.favorite}</span>
          <span>underdog {userBets?.underdog}</span>
          <span>over {userBets?.over}</span>
          <span>under {userBets?.under}</span>
        </div>
      )} */}

      {data && (
        <div className="p-8 flex flex-wrap gap-10">
          {userBets?.favorite ? (
            <BetItem
              bet={userBets.favorite}
              matchup={getMatchup(userBets.favorite)}
              category="Favorite"
            />
          ) : (
            <div className="flex flex-col text-center w-[300px]">
              <div className="text-3xl">Favorite</div>
              <div className="rounded-3xl bg-gray-200 w-[300px] h-[230px]" />
            </div>
          )}
          {userBets?.underdog ? (
            <BetItem
              bet={userBets.underdog}
              matchup={getMatchup(userBets.underdog)}
              category="Underdog"
            />
          ) : (
            <div className="flex flex-col text-center w-[300px]">
              <div className="text-3xl">Underdog</div>
              <div className="rounded-3xl bg-gray-200 w-[300px] h-[230px]" />
            </div>
          )}
          {userBets?.over ? (
            <BetItem
              bet={userBets.over}
              // matchup={getMatchup(userBets.underdog)}
              category="Over"
            />
          ) : (
            <div className="flex flex-col text-center w-[300px]">
              <div className="text-3xl">Over</div>
              <div className="rounded-3xl bg-gray-200 w-[300px] h-[230px]" />
            </div>
          )}
          {userBets?.under ? (
            <BetItem
              bet={userBets.under}
              // matchup={getMatchup(userBets.underdog)}
              category="Under"
            />
          ) : (
            <div className="flex flex-col text-center w-[300px]">
              <div className="text-3xl">Under</div>
              <div className="rounded-3xl bg-gray-200 w-[300px] h-[230px]" />
            </div>
          )}
          {/* <BetItem bet={userBets?.underdog ?? ""} matchup={""} category="Underdog" />
        <BetItem bet={userBets?.over ?? ""} matchup={""} category="Over" />
      <BetItem bet={userBets?.under ?? ""} matchup={""} category="Under" /> */}
        </div>
      )}
    </>
  );
};
