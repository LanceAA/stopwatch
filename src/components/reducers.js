export const entries = (state = [], action) => {
  switch(action.type) {
    case "SUBMIT":
      const {start, stop, note, elapsedTime, date} = action;
      return ([
        ...state,
        {
          start,
          stop,
          note,
          elapsedTime,
          date
        }
      ]);
    default:
      return state;
  }
}

export const submitEntry = (start, stop, note, elapsedTime, date) => ({
  type: "SUBMIT",
  start,
  stop,
  note,
  elapsedTime,
  date
})