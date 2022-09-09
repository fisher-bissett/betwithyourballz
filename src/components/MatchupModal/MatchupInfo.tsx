import React, { useState } from "react";
import { Event } from "../../types/types";

interface Props {
  event: Event;
}

export const MatchupInfo: React.FC<Props> = ({ event }) => {
  return (
    <div className="grid grid-cols-2 text-center h-full p-2">
      <div className="flex flex-col text-white font-bold justify-end">
        <div className="italic font-extrabold text-2xl">{event.odds.details}</div>
        <div className="">Spread</div>
      </div>
      <div className="flex flex-col text-white font-bold justify-end">
        <div className="italic font-extrabold text-2xl">{event.odds.overUnder}</div>
        <div className="">Over/Under</div>
      </div>
    </div>
  );
};
