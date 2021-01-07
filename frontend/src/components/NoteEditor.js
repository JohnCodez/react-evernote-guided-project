import React, { Component } from 'react';

class NoteEditor extends Component {

  state = {
    title: this.props.note.title,
    body: this.props.note.body
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.handleSubmit(this.state)
    this.props.editModeStatusFalse()
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleBodyChange = (e) => {
    this.setState({
      body: e.target.value
    })
  }

  render() {
    return (
      <form className="note-editor" onSubmit={this.handleSubmit}>
        <input type="text" name="title" value={this.state.title} onChange={this.handleTitleChange} />
        <textarea name="body" value={this.state.body} onChange={this.handleBodyChange} />
        <div className="button-row">
          <input className="button" type="submit" value="Save" />
          <button type="button" onClick={this.props.editModeStatusFalse}>Cancel</button>
        </div>
      </form>
    );
  }
}

export default NoteEditor;
