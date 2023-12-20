import { useState, useEffect } from 'react';
import Note from './components/Note';
import axios from 'axios';
/*


map over Array to generate an array of HTML elements that will be rendered
Form Submit
Controled Form Elements: (i) state (ii) onChnage eventHandler that updates state
Filter displayed <li> based on importance
 - useState to hold showAll boolean
 - local varaible notesToShow is calculated on each render

*/

function App(props) {
  let [notes, setNotes] = useState([]);
  let [newNote, setNewNote] = useState('a new note ...');
  let [showAllNotes, setShowAllNotes] = useState(true);
  const notesToShow = showAllNotes
    ? notes
    : notes.filter((note) => note.important);

  // useEffect(() => {
  //   console.log('effect');
  //   axios.get('http://localhost:3001/notes').then((response) => {
  //     console.log('promise fulfilled')
  //     setNotes(response.data);
  //     console.log(dbNotes);
  //   });
  // }, []);

  useEffect(() => {
    // async function getNotes() {
    //   let response = await axios.get('http://localhost:3001/notes');
    //   setNotes(response.data)
    // }
    // getNotes();
    (async () => {
      let response = await axios.get('http://localhost:3001/notes');
      setNotes(response.data)
    })()
    // getNotes();
  },[]);



  function addNote(event) {
    event.preventDefault();
    const newNoteObj = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };
    setNotes(notes.concat(newNoteObj));
    setNewNote('add another note ...');
  }

  function handleNoteChange(event) {
    event.preventDefault();
    setNewNote(event.target.value);
  }

  return (
    <>
      <h1>notes!</h1>
      <div>
        <button onClick={() => setShowAllNotes(!showAllNotes)}>
          show {showAllNotes ? 'all' : 'important'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note note={note} />
        ))}
        {/* {notes.map(note => <li key={note.id}>{note.content}</li>)} */}

        {/* the output is an array of <li> tags
          [
            <li>HTML is easy</li>,
            <li>Browser can execute only JavaScript</li>,
            <li>GET and POST are the most important methods of HTTP protocol</li>,
          ]
          */}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </>
  );
}

export default App;
