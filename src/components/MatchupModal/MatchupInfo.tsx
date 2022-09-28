import { useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import { Event } from "../../types/types";

interface Props {
  event: Event;
}

export const MatchupInfo: React.FC<Props> = ({ event }) => {
  const mobile = useMediaQuery("(max-width:750px)");
  return (
    <>
      {mobile ? (
        <div className="grid grid-rows-2 text-center h-full p-2 gap-3">
          <div className="flex flex-col text-white font-bold justify-end">
            <div className="italic font-extrabold text-s">{event.odds.overUnder}</div>
            <div className="">Over/Under</div>
          </div>
          <div className="flex flex-col text-white font-bold justify-end">
            <div className="italic font-extrabold text-s">{event.odds.details}</div>
            <div className="">Spread</div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};
