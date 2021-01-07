import React, { Component } from 'react';
import NoteEditor from './NoteEditor';
import NoteViewer from './NoteViewer';
import Instructions from './Instructions';

class Content extends Component {

  renderContent = () => {
    if (this.props.editStatus === true) {
      return <NoteEditor note={this.props.note} handleSubmit={this.props.handleSubmit} editModeStatusFalse={this.props.editModeStatusFalse} />;
    } else if (this.props.note.id) {
      return <NoteViewer note={this.props.note} onEditClick={this.props.handleEditClick} />;
    } else {
      return <Instructions />;
    }
  }

  render() {
    return (
      <div key={this.props.note.id} className='master-detail-element detail'>
        {this.renderContent()}
      </div>
    );
  }
}

export default Content;
