import React from 'react'
import { Link } from 'react-router-dom'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { getNotesForFolder } from '../NoteHelpers'
import './NoteListMain.css'
import config from '../config';


export default class NoteListMain extends React.Component {
  state = {
    notes: []
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext;

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/notes`)
      .then(notes => {
        if(!notes.ok) {
          return notes.json().then(e => Promise.reject(e));
        }
        return notes.json()
      })
      .then(notesRes => {
        this.setState({notes: notesRes})
      })
      .catch(error => {
        console.error({error})
      })
  }

  handleDeleteNote = noteId => {
    this.props.history.push(`/`)
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    });
  }

  render() {
    const { folderId } = this.props.match.params
    const notes = this.state.notes
    const notesForFolder = getNotesForFolder(notes, folderId)
    return (
      <section className='NoteListMain'>
        <ul>
          {notesForFolder.map(note =>
            <li key={note.id}>
              <Note
                id={note.id}
                name={note.title}
                modified={note.modified}
                date_created={note.date_created}
                onDeleteNote={this.handleDeleteNote}
              />
            </li>
          )}
        </ul>
        <div className='NoteListMain__button-container'>
          <CircleButton
            tag={Link}
            to='/add-note'
            type='button'
            className='NoteListMain__add-note-button'
          >
            <br />
            Note
          </CircleButton>
        </div>
      </section>
    )
  }
}