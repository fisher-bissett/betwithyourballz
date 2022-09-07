import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import styled from 'styled-components';

import { TeamCard } from './TeamCard';

const StyledGameCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    border-radius: 16px;
    margin: 16px;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      background-color: rgba(0,0,0,0.03);
    }
`

export const GamesCard = () => {

  const mobile = useMediaQuery('(max-width:750px)');
  
  const [data, setData] = useState();
  
  const url = `https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=football&league=nfl`;
  
  useEffect(() => {
    axios.get(url).then(res => {
       setData(res.data.sports[0])
    })
   }, [url])

  return (
      <>
      {data ? (
        <>
          <Grid container justifyContent='center'>{data.leagues[0].events[0].weekText}</Grid>
          <Grid container padding={mobile ? '0' : '24px'} flexDirection='column'>
            {data.leagues[0].events.map((event, idx) => {
              return (
                <a href={`${event.link}`} target="_blank" rel="noreferrer" style={{color: 'black', textDecoration: 'none'}} key={idx}>
                  <StyledGameCard>
                      <TeamCard competitors={event.competitors} date={event.summary}/>
                      {/* time: {event.date}<br /> 
                      spread: {event.odds.details} <br />
                    Over/Under: {event.odds.overUnder} <br /> */}
                  </StyledGameCard>
                </a>
              )
            })}
            </Grid>
        </>
      ) : <>loading</>}
      </>
  );
}
