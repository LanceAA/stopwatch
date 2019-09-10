import React from 'react';

export const Dates = (props) => {
  const dateList = props.dates.map((date, key) => {
    return (<a href="#" className="list-group-item text-decoration-none" key={key} onClick={(e) => {props.changeDate(e)}}>{date}</a>);
  })
  return (
    <div id="dates-container" className="">
      <h4>Dates</h4>
      <ul className="list-group">
        {dateList}
      </ul>
    </div>
  );
}