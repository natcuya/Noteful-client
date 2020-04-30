import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import AddFolder from '../AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'
import Error from '../Error/Error'
import './App.css';

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        console.log('component mount');
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});

            })
            .catch(error => {
                console.error({error});
            });
    }
    handleAddNote = note => {
        const newNotesArr = this.state.notes.slice();
        newNotesArr.push(note);
        this.setState({
          notes: newNotesArr
        });
      }
    
      handleAddFolder = folder => {
        const newFolderArr = this.state.folders.slice();
        newFolderArr.push(folder);
        this.setState({
          folders: newFolderArr
        });
      }
   handleDeleteNote = noteId => {
      console.log( this.state.notes)
      this.setState({
          notes: this.state.notes.filter(note => note.id !== noteId)
       });
      console.log( this.state.notes)
   };

    renderNavRoutes() {
        return (
            <Error>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/notes/:noteId" component={NotePageNav} />
            </Error>
        );
    }

    renderMainRoutes() {
        return (
            <Error>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/notes/:noteId" component={NotePageMain} />
                <Route path="/add-folder" component={AddFolder} />
                <Route path="/add-note" component={AddNote} />
            </Error>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote
        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}                        
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;