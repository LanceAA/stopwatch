import React from 'react';
import {connect} from 'react-redux';
import {deleteEntry, editEntry} from './reducers.js';

class Log extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      elmToEdit: "",
      editText: ""
    }
    this.editItem = this.editItem.bind(this);
    this.setEditText = this.setEditText.bind(this);
  }

  editItem(id, note) {
    const {dispatch} = this.props;
    if (this.state.elmToEdit === id) {
      dispatch(editEntry(this.state.elmToEdit, this.state.editText));
      this.setState({
        elmToEdit: "",
        editText: ""
      });
    } else {
      this.setState({
        elmToEdit: id,
        editText: note
      });
    }
  }

  setEditText(e) {
    this.setState({
      editText: e.target.value
    });
  }

  checkKey(e) {
    const {dispatch} = this.props;
    if (e.key === "Escape") {
      this.setState({
        elmToEdit: "",
        editText: ""
      });
    }
    if (e.key === "Enter") {
      dispatch(editEntry(this.state.elmToEdit, this.state.editText));
      this.setState({
        elmToEdit: "",
        editText: ""
      });
    }
  }

  render() {
    const {dispatch} = this.props;
    const entries = this.props.entries.map((entry, key) => {
      const {start, stop, note, elapsedTime, id} = entry;
      const noteElm = (this.state.elmToEdit === id) ? <input className="form-control" autoFocus value={this.state.editText} onKeyUp={(e) => {this.checkKey(e)}} onChange={(e) => {this.setEditText(e)}}/> : <p className="m-0 text-break">{note}</p>;
      return (
        <div className="row hoverable border rounded ml-0 mr-0 mb-2" key={key}>
          <div className="col-1 text-center light-gray-bg">
            <p className="m-0">{start} <br/> - <br/> {stop}</p>
            <button className="edit-btn btn btn-lg btn-secondary" onClick={() => {this.editItem(id, note)}} type="button"><i className="fas fa-2x fa-edit"></i></button>
          </div>
          <div className="col-10 d-flex justify-content-center text-center flex-column">
            {noteElm}
          </div>
          <div className="col-1 light-gray-bg d-flex justify-content-center text-center flex-column">
            <p className="m-0">{elapsedTime}</p>
            <button className="delete-btn btn btn-lg btn-secondary" type="button" onClick={() => {dispatch(deleteEntry(id))}}><i className="fas fa-2x fa-trash-alt"></i></button>
          </div>
        </div>
      )
    })
    return (
      <div>
        {entries}
      </div>
    )
  }
}

export default connect()(Log);