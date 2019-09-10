import React from 'react';
import moment from 'moment';
import {submitEntry} from './reducers';
import {connect} from 'react-redux';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      note: "",
      elapsedTime: "00:00:00",
      timerRunning: false,
      playWasPressed: false
    }
    this.startTimer = this.startTimer.bind(this);
    this.tick = this.tick.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.updateNote = this.updateNote.bind(this);
    this.resetFields = this.resetFields.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    const {dispatch} = this.props;
    const {start, stop, note, elapsedTime, date, id} = this.state;
    
    if (this.state.playWasPressed && !this.state.timerRunning) {
      dispatch(submitEntry(start, stop, note, elapsedTime, date, id));
      this.resetFields();
    } else if (!this.state.playWasPressed && !this.state.timerRunning) {
      this.setState({
        stop: moment().format("HH:mm:ss"),
        start: moment().format("HH:mm:ss"),
        date: moment().format('dddd MMMM Do YYYY'),
        id: moment().format('dddd MMMM Do YYYY HH:mm:ss'),
      }, () => {dispatch(submitEntry(this.state.start, this.state.stop, this.state.note, this.state.elapsedTime, this.state.date, this.state.id));this.resetFields();});
    }
  }

  startTimer() {
    clearInterval(this.state.timer);
    this.setState({
      timer: setInterval(this.tick, 1000),
      start: moment(),
      timerRunning: true,
      playWasPressed: true
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
    if (this.state.timerRunning) {
      this.setState({
        stop: moment().format("HH:mm:ss"),
        start: moment(this.state.start).format("HH:mm:ss"),
        date: moment().format('dddd MMMM Do YYYY'),
        id: moment().format('dddd MMMM Do YYYY HH:mm:ss'),
        timerRunning: false,
      });
    }
  }

  updateNote(e) {
    this.setState({
      note: e.target.value
    });
  }

  resetFields() {
    this.setState({
      elapsedTime: "00:00:00",
      note: "",
      playWasPressed: false
    });
  }

  render() {
    return (
      <div className="mb-4">
        <div className="card">
          <div className="card-body">
            <input className="form-control mt-3 mb-3" value={this.state.note} placeholder="Enter note..." onChange={(e) => {this.updateNote(e)}}/>
            <h2 className="card-text text-center mb-2">{this.state.elapsedTime}</h2>
          </div>
          <div className="card-footer">
            <div className="d-flex justify-content-around mb-4 mt-3">
              <button className="btn btn-success w-25" type="button" onClick={this.startTimer}><i className="fas fa-play"></i></button>
              <button className="btn btn-danger w-25" type="button" onClick={this.stopTimer}><i className="fas fa-stop"></i></button>
            </div>
            <button className="btn btn-block btn-secondary font-weight-bold" type="button" onClick={this.submit}>Submit</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(Stopwatch);