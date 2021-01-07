import React, { Component, Fragment } from 'react';
import Search from './Search';
import Sidebar from './Sidebar';
import Content from './Content';

class NoteContainer extends Component {

  state = {
    notes: [],
    clickedNote: {}, 
    search: '',
    editStatus: false,
    checkBoxFirst: '',
    checkBoxLast: 'checked',
    checkBoxAlphabetically: ''
  }

  editModeStatusFalse = () => {
    this.setState({
      editStatus: false
    })
  }

  handleEditClick = () => {
    this.setState({
      editStatus: true
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/api/v1/notes')
    .then(r => r.json())
    .then(allNotes => this.setState({
      notes: allNotes
    }))
  }

  handleNoteClick = (id) => {
    let clickedNote = this.state.notes.find(note => note.id === id)
    this.setState({
      clickedNote: clickedNote
    })
    this.editModeStatusFalse()
  }

  handleSubmit = (note) => {

    fetch(`http://localhost:3000/api/v1/notes/${this.state.clickedNote.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: note.title,
        body: note.body,
      })
    })
      .then(response => response.json())
      .then(newNote => {
        this.componentDidMount()
        this.setState({
          clickedNote: newNote
        })
      })
  }

  handleNewClick = () => {
    fetch('http://localhost:3000/api/v1/notes/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        title: 'Title',
        body: 'Content'
      })
    })
    .then(r => r.json())
    .then(newNote => {
      this.componentDidMount()
      this.setState({
        clickedNote: newNote
      })
    })
  }

  handleSearch = (e) => {
    this.setState({
      search: e.target.value
    })
  }

  mathces = () => {
    const result = this.state.notes.filter(note => {return note.title.toLowerCase().includes(this.state.search.toLowerCase())
    })
    if (this.state.checkBoxLast === 'checked'){
      return result.concat().reverse();
    } else if (this.state.checkBoxAlphabetically === 'checked') {
      return result.sort((a,b) => a.title.localeCompare(b.title))
    } else {
      return result
    }
    
  }

  handleFirstClick = () => {
    this.setState({
      checkBoxAlphabetically: '',
      checkBoxLast: '',
      checkBoxFirst: 'checked'
    })
  }

  handleLastClick = () => {
    this.setState({
      checkBoxAlphabetically: '',
      checkBoxLast: 'checked',
      checkBoxFirst: ''
    })
  }

  handleAlphClick = () => {
    this.setState({
      checkBoxAlphabetically: 'checked',
      checkBoxLast: '',
      checkBoxFirst: ''
    })
  }


  render() {
    return (
      <Fragment>
        <Search search={this.handleSearch} value={this.state.search} />
        <div className='container'>
          <Sidebar notes={this.mathces()} onNoteClick={this.handleNoteClick} onNewClick={this.handleNewClick} madeFirst={this.state.checkBoxFirst} madeLast={this.state.checkBoxLast} alphabetically={this.state.checkBoxAlphabetically} onFirstClick={this.handleFirstClick} onLastClick={this.handleLastClick} onAlphClick={this.handleAlphClick} />
          <Content note={this.state.clickedNote} handleSubmit={this.handleSubmit} editStatus={this.state.editStatus} editModeStatusFalse={this.editModeStatusFalse} handleEditClick={this.handleEditClick} />
        </div>
      </Fragment>
    );
  }
}

export default NoteContainer;
