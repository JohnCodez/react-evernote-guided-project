import React, { Component } from 'react';
import NoteList from './NoteList';

class Sidebar extends Component {

  render() {
    return (
      <div className='master-detail-element sidebar'>
        <h2 className='box-text'>Oldest</h2><input id='checkbox' type='checkbox' checked={this.props.madeFirst} onClick={this.props.onFirstClick} />
        <h2 className='box-text'>Newest</h2><input id='checkbox' type='checkbox' checked={this.props.madeLast} onClick={this.props.onLastClick} />
        <h2 className='box-text'>Alphabetically</h2><input id='checkbox' type='checkbox' checked={this.props.alphabetically} onClick={this.props.onAlphClick} />
        <NoteList notes={this.props.notes} onNoteClick={this.props.onNoteClick} />
        <button onClick={this.props.onNewClick} >New</button>
      </div>
    );
  }
}

export default Sidebar;
