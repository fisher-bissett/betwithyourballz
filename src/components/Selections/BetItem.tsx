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
import { Event } from "../../types/types";

interface Props {
  category: String;
  bet: String;
  matchup?: Event;
}

export const BetItem: React.FC<Props> = ({ category, bet, matchup }) => {
  const teamAbbr = bet.split(" ")[0];

  const selectedTeam = matchup?.competitors.find((competitor, idx) => {
    return competitor.abbreviation === teamAbbr;
  });

  const selectedTeamColor = matchup?.competitors.find((competitor, idx) => {
    return competitor.abbreviation === teamAbbr;
  })?.color;
  const selectedTeamAlternateColor = matchup?.competitors.find((competitor, idx) => {
    return competitor.abbreviation === teamAbbr;
  })?.alternateColor;
  return (
    <>
      <div className="flex flex-col text-center max-w-[300px]">
        <div className="text-3xl">{category}</div>
        <div
          style={{
            backgroundImage: `linear-gradient(to right, #${selectedTeamColor} , #${selectedTeamAlternateColor})`,
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
          }}
          className=" rounded-3xl bg-orange-300 p-4 shadow-[0_0_10px_rgba(0, 0, 0, 0.1)]"
        >
          <div className="text-white italic">{matchup?.name}</div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={matchup?.competitors[1].logo}
              style={{
                filter:
                  matchup?.competitors[1].abbreviation !== teamAbbr ? "grayscale(100%)" : "none"
              }}
            />
            <img
              src={matchup?.competitors[0].logo}
              style={{
                filter:
                  matchup?.competitors[0].abbreviation !== teamAbbr ? "grayscale(100%)" : "none"
              }}
            />
          </div>
          <div className="text-white">{bet}</div>
        </div>
      </div>
    </>
  );
};
