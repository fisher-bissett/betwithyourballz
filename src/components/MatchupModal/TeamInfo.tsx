import { useMediaQuery } from "@mui/material";
import React from "react";
import { Competitor } from "../../types/types";
import { capitalizeFirstLetter } from "../../utils/helpers";

interface Props {
  team: Competitor;
}

export const TeamInfo: React.FC<Props> = ({ team }) => {
  const mobile = useMediaQuery("(max-width:750px)");
  return (
    <div className="flex flex-col	rounded-2xl justify-center text-white font-semibold text-center items-center">
      <img className={`${mobile ? "h-20" : "h-40"} ${mobile ? "w-20" : "w-fit"}`} src={team.logo} />
      <span className={`${mobile ? "text-xs" : ""}`}>
        {mobile
          ? team.displayName.split(" ")[team.displayName.split(" ").length - 1]
          : team.displayName}
      </span>
      <span className="italic text-xs">{`${capitalizeFirstLetter(team.homeAway)} (${
        team.record
      }) `}</span>
    </div>
  );
};
