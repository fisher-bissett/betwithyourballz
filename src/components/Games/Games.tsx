import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";

import { Matchup } from "../Matchup/Matchup";
import { Sport } from "../../types/types";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

export const Games = () => {
  const mobile = useMediaQuery("(max-width:750px)");

  const url = "https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=football&league=nfl";
  const [data, setData] = useState<Sport>();
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    axios.get(url).then((res) => {
      setData(res.data.sports[0]);
    });
  }, []);

  if (error) {
    return <>Having trouble connecting, please try again later</>;
  }

  return (
    <>
      {data && user ? (
        <>
          <Grid container justifyContent="center">
            {data.leagues[0].events[0].weekText}
          </Grid>
          <Grid container padding={mobile ? "0" : "24px"} flexDirection="column">
            {data.leagues[0].events.map((event, idx) => (
              <Matchup key={idx} event={event} userId={user?.uid} />
            ))}
          </Grid>
        </>
      ) : (
        <div className="flex justify-center">
          <Box>
            <CircularProgress />
          </Box>
        </div>
      )}
    </>
  );
};
