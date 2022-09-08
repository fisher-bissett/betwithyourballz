import React from 'react';
import { capitalizeFirstLetter } from '../../utils/helpers';

export const TeamInfo = ({team}) => {

  return (
    <div className="flex flex-col	rounded-2xl justify-center text-white font-semibold text-center items-center">
      <img className='h-40 w-fit' src={team.logo} />
      <span>{team.displayName}</span>
      <span className="italic text-xs">{`${capitalizeFirstLetter(team.homeAway)} (${team.record}) `}</span>
    </div>
  )
}
