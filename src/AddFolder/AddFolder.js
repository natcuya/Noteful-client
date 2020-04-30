import React, {Component} from 'react'
import ValidationError from '../ValidationError/ValidationError'
import config from '../config';
import ApiContext from '../ApiContext';
import './AddFolder.css'

class AddFolder extends Component {

  static contextType = ApiContext

  constructor(props) {
    super(props)
    this.state={
      folderName: {
        value: '',
        touched: false
      }
    }
  }

  updateFolderName(name) {
    this.setState({folderName: {value: name, touched: true}})
  }

  handleSubmit(event) {
    event.preventDefault();
    const folder = {
      name: event.target['folder-name'].value
    }
  //  const { folderName } = this.state;
   // const folderToAdd = {
   //   title: folderName.value
  //  }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder)
    })
    .then(response => {
      if(!response.ok){
        return response.json().then(e=>Promise.reject(e))
      }
      return response.json()
    })
    .then((res) => {
        console.log(folder);
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
     // const newArray = this.context.folders
     // newArray.push(res)
    //  this.context.folders = newArray
     // console.log('right before addfolder pushes to landing')
    //  this.props.history.push('/')
    })
    .catch(error => {
      console.error(error)
    })
  }

  validateFolderName() {
    const name = this.state.folderName.value.trim();
    if(name.length === 0) {
      return 'Folder name is required'
    } else if (name.length > 20) {
      return 'Folder name must be less 20 characters'
    }
  }

  render() {
    const folderNameError = this.validateFolderName();
    return (
      <section>
        <form className="add-folder" onSubmit={event => this.handleSubmit(event)}>
          <h2>Create Folder</h2>
          <div className="form-group">
            <label htmlFor="folder-name">
              Name
            </label>
            <input type="text" className="folder-input" name="folder-name" id="folder-name" onChange={e => this.updateFolderName(e.target.value)}>
            </input>
            {this.state.folderName.touched && <ValidationError message={folderNameError} />}
            <button type="submit" className="add-folder-button" disabled={this.validateFolderName()}>Add Folder</button>
          </div>
        </form>
      </section>
    )
  }
}

export default AddFolder