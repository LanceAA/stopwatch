import React from 'react';

export const Dates = (props) => {
  const dateList = props.dates.map((date, key) => {
    return (<li key={key}>{date}</li>);
  })
  return (
    <div>
      <ul>
        {dateList}
      </ul>
    </div>
  );
}