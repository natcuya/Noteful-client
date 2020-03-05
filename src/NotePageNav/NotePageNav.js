import React from 'react'
import CircleButton from '../CircleButton/CircleButton'
//navigation bar once note is clicked
//The sidebar should display the folder of the currently selected note as well as a "back" button.
export default function NotePageNav(props) {
    return (
//creates back button. eventhandler onClick goes back to history 
<div className='NotePageNav'>
<CircleButton
  tag='button'
  role='link'
  onClick={() => props.history.goBack()}
  className='NotePageNav__back-button'
>

  <br />
  Back
</CircleButton>
{props.folder && (
  <h3 className='NotePageNav__folder-name'>
    {props.folder.name}
  </h3>
)}
</div>
)
}

NotePageNav.defaultProps = {
    history: {
      goBack: () => {}
    }
  }