import React from 'react';
import Stopwatch from './Stopwatch';
import Log from './Log';
import moment from 'moment';
import {connect} from 'react-redux';
import {Dates} from './Dates.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedDate: moment().format('dddd MMMM Do YYYY')
    }
    this.filterEntriesByFocusedDate = this.filterEntriesByFocusedDate.bind(this)
    this.identifyDates = this.identifyDates.bind(this);
    this.setFocusedDate = this.setFocusedDate.bind(this);
  }

  setFocusedDate(e) {
    e.preventDefault()
    this.setState({
      focusedDate: e.target.innerText
    })
  }

  identifyDates() {
    const entries = Object.values(this.props.entries);
    const uniqueDates = [];
    entries.forEach((entry) => {
      if (!uniqueDates.includes(entry.date)) {
        uniqueDates.push(entry.date)
      } else {
          return;
      }});

    return uniqueDates;
  }

  filterEntriesByFocusedDate() {
    const entries = Object.values(this.props.entries);
    const filteredEntries = entries.filter((entry) => {
      return entry.date === this.state.focusedDate;
    });

    return filteredEntries;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="w-50 mx-auto mt-4">
          <h1 className="text-center mb-5">{this.state.focusedDate}</h1>
        </div>
        <div className="row">
          <div className="col-6 offset-3">
            <Stopwatch/>
            <Log entries={this.filterEntriesByFocusedDate()}/>
          </div>
          <div className="col-2">
            <Dates dates={this.identifyDates()} changeDate={this.setFocusedDate}/>
          </div>
        </div>
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