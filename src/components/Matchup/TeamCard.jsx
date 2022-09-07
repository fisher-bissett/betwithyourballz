import React from 'react';

export const TeamCard = ({competitors, date}) => {

  const sortedCompetitors = competitors.sort((a, b) => {
    if (a.homeAway < b.homeAway) return -1;
    if(a.homeAway > b.homeAway) return 1;  
    return 0;
  })

  const getTeamLogo = (team) => {
    const teamName = team.toLowerCase().replace(/ +/g, "-");
    return `../../assets/${teamName}.png`;
  }

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const gameCardStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: '18px',
    alignItems: 'center'
  }

  const logoStyle = {
    display: 'flex',
    padding: '2px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '16px',
    margin: '8px',
  }

  return (
    <>
    {sortedCompetitors.map((competitor, idx) => {
      return (
        <React.Fragment key={idx}>
        <div style={gameCardStyle} key={idx}>
          {idx === 0 ? (
            <>
              <div style={logoStyle}>
                <img className="h-14 w-fit" src={getTeamLogo(competitor.displayName)} alt={competitor.displayName} />
              </div>
              <div style={{display: 'flex', flexDirection: 'column', margin: '0 16px'}}>
                <div>{competitor.displayName}</div>
                <div style={{fontSize: '12px', color: 'gray'}}>{`${capitalizeFirstLetter(competitor.homeAway)} (${competitor.record}) `}</div>
              </div>
            </>
          ) : (
            <>
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end', margin: '0 16px'}}>
                <div>{competitor.displayName}</div>
                <div style={{fontSize: '12px', color: 'gray'}}>{`${capitalizeFirstLetter(competitor.homeAway)} (${competitor.record}) `}</div>
              </div>
              <div style={logoStyle}>
                <img className="h-14 w-fit" src={getTeamLogo(competitor.displayName)} alt={competitor.displayName} />
              </div>
            </>
          )}
        </div>
        {/* {idx === 0 && (
          <>
          <div>{date}</div>
          <div>at</div>
          </>
        )} */}
        </React.Fragment>
        )
    })}
    </>
  )
}
