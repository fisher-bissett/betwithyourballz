import React from "react";
import { Grid } from "@mui/material";
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
  return (
    <Grid container fontSize="18px" alignItems="center" className="my-1">
      <Grid item container xs={4}>
        <TeamSection competitor={competitors[1]} />
      </Grid>
      <Grid item container xs={4} justifyContent="center">
        <GameDetails date={date} overUnder={overUnder} spread={spread} competitors={competitors} />
      </Grid>
      <Grid item container xs={4} justifyContent="end">
        <TeamSection competitor={competitors[0]} isHomeTeam />
      </Grid>
    </Grid>
  );
};

const GameDetails: React.FC<Props> = ({ date, overUnder, spread, competitors }) => {
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
        <Grid className="my-2 text-sm text-center">{`${format(
          new Date(date),
          "ccc PPp"
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
    display: "flex",
    padding: "2px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "16px",
    margin: "0 16px"
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
