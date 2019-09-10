const exampleEntries = {
  "Friday September 6th 2019 08:00:00": {
    start: "08:00:00",
    stop: "08:00:00",
    elapsedTime: "00:00:00",
    note: "Wake up",
    date: "Friday September 6th 2019",
    id: "Friday September 6th 2019 08:00:00"
  },
  "Friday September 6th 2019 08:25:14": {
    start: "08:00:30",
    stop: "08:25:14",
    elapsedTime: "00:24:44",
    note: "Eat breakfast",
    date: "Friday September 6th 2019",
    id: "Friday September 6th 2019 08:25:14"
  },
  "Friday September 6th 2019 08:40:10": {
    start: "08:25:15",
    stop: "08:40:10",
    elapsedTime: "00:14:55",
    note: "Shower",
    date: "Friday September 6th 2019",
    id: "Friday September 6th 2019 08:40:10"
  },
  "Friday September 6th 2019 16:30:00": {
    start: "09:00:00",
    stop: "16:30:00",
    elapsedTime: "08:30:00",
    note: "Work",
    date: "Friday September 6th 2019",
    id: "Friday September 6th 2019 16:30:00"
  },
  "Thursday October 31st 2019 10:01:12": {
    start: "10:00:00",
    stop: "10:01:12",
    elapsedTime: "00:01:12",
    note: "Wake up and realize you have no costume for Halloween",
    date: "Thursday October 31st 2019",
    id: "Thursday October 31st 2019 10:01:12"
  },
  "Thursday October 31st 2019 12:11:07": {
    start: "11:00:00",
    stop: "12:11:07",
    elapsedTime: "01:11:07",
    note: "Go to store, buy a red plaid shirt and a roll of paper towels",
    date: "Thursday October 31st 2019",
    id: "Thursday October 31st 2019 12:11:07"
  },
  "Thursday October 31st 2019 23:00:00": {
    start: "20:03:00",
    stop: "23:00:00",
    elapsedTime: "02:57:00",
    note: "Show up to Halloween party dressed as the Brawny Man. Impress your friends with your creativity and ability to forget national holidays",
    date: "Thursday October 31st 2019",
    id: "Thursday October 31st 2019 23:00:00"
  }
}

const entriesObj = (localStorage.getItem('stopwatch-log')) ? JSON.parse(localStorage.getItem('stopwatch-log')) : exampleEntries;

export const entries = (state = entriesObj, action) => {
  switch(action.type) {
    case "SUBMIT":
      let {start, stop, note, elapsedTime, date, id} = action;
      localStorage.setItem('stopwatch-log', JSON.stringify({...state, [id]: {start, stop, note, elapsedTime, date, id}}));
      return ({
          ...state,
          [id]: {
            start,
            stop,
            note,
            elapsedTime,
            date,
            id
          }
      });
    case "DELETE":
      let newState = {...state};
      delete newState[action.id];
      localStorage.setItem('stopwatch-log', JSON.stringify(newState));
      return newState;
    case "EDIT":
      newState = {...state};
      newState[action.id].note = action.note;
      localStorage.setItem('stopwatch-log', JSON.stringify(newState));
      return newState;
    default:
      return state;
  }
}

export const submitEntry = (start, stop, note, elapsedTime, date, id) => ({
  type: "SUBMIT",
  start,
  stop,
  note,
  elapsedTime,
  date,
  id
});

export const deleteEntry = (id) => ({
  type: "DELETE",
  id
});

export const editEntry = (id, note) => ({
  type: "EDIT",
  id,
  note
})