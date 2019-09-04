import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: "",
      elapsedTime: "00:00:00"
    }
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.resetFields = this.resetFields.bind(this);
  }

  startTimer() {
    clearInterval(this.state.timer);
    this.setState({
      timer: setInterval(this.tick, 1000),
      start: moment()
    });
  }

  tick() {
    const timeDifference = moment().diff(this.state.start, 'seconds');
    const duration = moment().hour(0).minute(0).second(timeDifference).format('HH:mm:ss');
    this.setState({
      elapsedTime: duration
    });
  }

  stopTimer() {
    clearInterval(this.state.timer)
    this.setState({
      stop: moment().format("HH:mm:ss"),
      start: moment(this.state.start).format("HH:mm:ss"),
      date: moment().format('dddd MMMM Do YYYY')
    })
  }

  updateNote(e) {
    this.setState({
      note: e.target.value
    });
  }

  resetFields() {
    this.setState({
      elapsedTime: "00:00:00"
    });
  }

  render() {
    const {dispatch, submitEntry} = this.props;
    return (
      <div>
        <input value={this.state.note} placeholder="Enter note..." onChange={(e) => {this.updateNote(e)}}/>
        <p>{this.state.elapsedTime}</p>
        <button type="button" onClick={this.startTimer}>Start</button>
        <button type="button" onClick={this.stopTimer}>Stop</button>
        <button type="button" onClick={() => {dispatch(submitEntry(this.state.start, this.state.stop, this.state.note, this.state.elapsedTime, this.state.date));this.resetFields()}}>Submit</button>
      </div>
    )
  }
}

export default connect()(Stopwatch);