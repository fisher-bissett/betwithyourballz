import React from "react";
import { Grid, useMediaQuery } from "@mui/material";
import { format } from "date-fns";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { Competitor } from "../../types/types";

interface Props {
  competitors: Competitor[];
  date: Date;
  overUnder: number;
  spread: string;
}

export const TeamCard: React.FC<Props> = ({ competitors, date, overUnder, spread }) => {
  const mobile = useMediaQuery("(max-width:750px)");
  return (
    <Grid container fontSize="18px" alignItems="center" className={`flex-nowrap`}>
      {mobile ? (
        <Grid
          alignItems="center"
          className="gap-1"
          container
          flexDirection="column"
          item
          justifyContent="end"
          xs={4}
        >
          <MobileTeamSection competitor={competitors[1]} />
        </Grid>
      ) : (
        <Grid item container xs={4} justifyContent="start">
          <TeamSection competitor={competitors[1]} />
        </Grid>
      )}
      <Grid item container xs={4} justifyContent="center">
        <GameDetails date={date} overUnder={overUnder} spread={spread} competitors={competitors} />
      </Grid>
      {mobile ? (
        <Grid
          alignItems="center"
          className="gap-1"
          container
          flexDirection="column"
          item
          justifyContent="end"
          xs={4}
        >
          <MobileTeamSection competitor={competitors[0]} isHomeTeam />
        </Grid>
      ) : (
        <Grid item container xs={4} justifyContent="end">
          <TeamSection competitor={competitors[0]} isHomeTeam />
        </Grid>
      )}
    </Grid>
  );
};

const GameDetails: React.FC<Props> = ({ date, overUnder, spread, competitors }) => {
  const mobile = useMediaQuery("(max-width:750px)");
  const awayTeamColor = `${competitors[1].color}`;
  const homeTeamColor = `${competitors[0].color}`;
  return (
    <Grid item>
      <Grid container flexDirection="column" justifyContent="center" alignItems="center">
        <Grid
          className="text-white text-sm font-semibold bg-gradient-to-r from-gray-500 to-gray-700 rounded-3xl px-2 py-1"
          fontStyle="italic"
        >
          o/u: {overUnder}
        </Grid>
        <Grid className={`mt-2 ${mobile ? "text-xs" : "text-sm"} text-center`}>{`${format(
          new Date(date),
          "ccc PP"
        )}`}</Grid>
        <Grid className={`mb-2 ${mobile ? "text-xs" : "text-sm"} text-center`}>{`${format(
          new Date(date),
          "p"
        )} CT`}</Grid>
        <Grid
          className={`text-white text-sm font-semibold rounded-3xl px-2 py-1`}
          style={{
            backgroundImage: `linear-gradient(to right, #${awayTeamColor} , #${homeTeamColor})`
          }}
          fontStyle="italic"
        >
          {spread}
        </Grid>
      </Grid>
    </Grid>
  );
};

interface TeamSectionProps {
  competitor: Competitor;
  isHomeTeam?: boolean;
}

const TeamSection: React.FC<TeamSectionProps> = ({ competitor, isHomeTeam = false }) => {
  const logoStyle = {
    borderRadius: "16px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    display: "flex",
    margin: "0 16px",
    padding: "2px"
  };
  return (
    <>
      {isHomeTeam ? (
        <>
          <Grid item alignSelf="center">
            <Grid container flexDirection="column" justifyContent="center" textAlign="end">
              <Grid item>{competitor.displayName}</Grid>
              <Grid item style={{ fontSize: "12px", color: "gray" }}>{`${capitalizeFirstLetter(
                competitor.homeAway
              )} (${competitor.record}) `}</Grid>
            </Grid>
          </Grid>
          <Grid item style={logoStyle}>
            <img className="max-h-14 w-fit" src={competitor.logo} alt={competitor.displayName} />
          </Grid>
        </>
      ) : (
        <>
          <Grid item style={logoStyle}>
            <img className="max-h-14 w-fit" src={competitor.logo} alt={competitor.displayName} />
          </Grid>
          <Grid item alignSelf="center">
            <Grid container flexDirection="column" justifyContent="center">
              <Grid item>{competitor.displayName}</Grid>
              <Grid item style={{ fontSize: "12px", color: "gray" }}>{`${capitalizeFirstLetter(
                competitor.homeAway
              )} (${competitor.record}) `}</Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

const MobileTeamSection: React.FC<TeamSectionProps> = ({ competitor, isHomeTeam = false }) => {
  const logoStyle = {
    alignItems: "center",
    borderRadius: "16px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    height: "65px",
    justifyContent: "center",
    width: "65px"
  };
  return (
    <>
      <Grid item>
        <Grid container style={logoStyle}>
          <Grid item>
            <img className="max-h-14 w-fit" src={competitor.logo} alt={competitor.displayName} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container flexDirection="column" justifyContent="center" className="text-center">
          <Grid item className="text-xs">
            {competitor.displayName.split(" ")[competitor.displayName.split(" ").length - 1]}
          </Grid>
          <Grid item className="text-xs text-gray-400">{`(${competitor.record})`}</Grid>
        </Grid>
      </Grid>
    </>
  );
};
