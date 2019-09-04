import React from 'react';
import Stopwatch from './Stopwatch';
import {connect} from 'react-redux';
import {submitEntry} from './reducers'
import {Dates} from './Dates.js';
import moment from 'moment';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedDate: moment().format('dddd MMMM Do YYYY')
    }
    this.filterEntriesByFocusedDates = this.filterEntriesByFocusedDates.bind(this)
    this.identifyDates = this.identifyDates.bind(this);
  }

  identifyDates() {
    const entries = [...this.props.entries];
    let uniqueDates = [];
    entries.forEach((entry) => {
      if (!uniqueDates.includes(entry.date)) {
        uniqueDates.push(entry.date)
      } else {
          return;
      }});

    return uniqueDates;
  }

  filterEntriesByFocusedDates() {
    const entries = [...this.props.entries];
    let filteredEntries = entries.filter((entry) => {
      return entry.date === this.state.focusedDate;
    });

    return filteredEntries;
  }

  render() {
    console.log(this.props)
    console.log('break')
    return (
      <div>
        <Stopwatch submitEntry={submitEntry}/>
        <Dates dates={this.identifyDates()}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    entries: state
  }
}

export default connect(mapStateToProps)(App);