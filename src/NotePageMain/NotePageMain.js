import React from 'react'
import Note from '../Note/Note'
import ApiContext from '../ApiContext'
import './NotePageMain.css'
import config from '../config';

export default class NotePageMain extends React.Component {
  state = {
    note: ''
  }
  static defaultProps = {
    match: {
      params: {}
    }
  }
  static contextType = ApiContext

  componentDidMount() {
    const { noteId } = this.props.match.params
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`)
      .then(res => {
        if(!res){
          return res.json().then(e=> Promise.reject(e));
        }
        return res.json();
      })
      .then(note => {
        this.setState({note})
      })
      .catch(error => {
        console.error({error})
      })
  }

  handleDeleteNote = noteId => {
    console.log('handledeletenote function')
    this.props.history.push(`/`)
  }

  render() {
    let note = this.state.note;
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.title}
          modified={note.modified}
          onDeleteNote={this.handleDeleteNote}
        />
        <div className='NotePageMain__content'>
          <p>{note.content}</p>
          {/* {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )} */}
        </div>
      </section>
    )
  }
}