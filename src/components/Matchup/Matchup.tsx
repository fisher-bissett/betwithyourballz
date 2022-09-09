import React, { useState } from "react";
import styled from "styled-components";
import { Event } from "../../types/types";

import { TeamCard } from "./TeamCard";
import { MatchupModal } from "../MatchupModal/MatchupModal";

const StyledMatchupCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  margin: 16px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

interface Props {
  event: Event;
}

export const Matchup: React.FC<Props> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* <a href={`${event.link}`} target="_blank" rel="noreferrer" style={{color: 'black', textDecoration: 'none'}}> */}
      <StyledMatchupCard onClick={() => setIsOpen(true)}>
        <TeamCard
          competitors={event.competitors}
          date={event.date}
          overUnder={event.odds.overUnder}
          spread={event.odds.details}
        />
      </StyledMatchupCard>
      <MatchupModal event={event} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};
