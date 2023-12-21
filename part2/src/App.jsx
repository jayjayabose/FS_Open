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
    (async () => {
      let response = await axios.get('http://localhost:3001/notes');
      setNotes(response.data);
    })();
  }, []);

  function addNote(event) {
    event.preventDefault();
    const newNoteObj = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };
    // setNotes(notes.concat(newNoteObj));

    axios
      .post('http://localhost:3001/notes', newNoteObj) // post writes to database
      .then((response) => {
        console.log(response);
        setNewNote('');
        setNotes(notes.concat(response.data)); // update state (not from the datbase)
      });
  }

  function handleNoteChange(event) {
    event.preventDefault();
    setNewNote(event.target.value);
  }

  function toggleImportance(id) {
    // find the note in state: array of notes
    const note = notes.find((note) => note.id === id);

    // create a new note with toggled importnace
    const newNoteObj = {
      ...note,
      important: !note.important,
    };

    // update the database
    axios
      .put(`http://localhost:3001/notes/${id}`, newNoteObj)
      .then((response) => {
        console.log(response);
        // then update state
        // create a new array. never mutate state
        const newNotes = notes.map((note) => {
          if (note.id === id) {
            return newNoteObj;
          }
          return note;
        });
        setNotes(newNotes);
      });
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
          <Note note={note} onToggleImportance={toggleImportance} />
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
