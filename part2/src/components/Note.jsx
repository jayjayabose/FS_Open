const Note = ({ note, onToggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <>
      <li className={note.important ? 'important' : ''} key={note.id}>
        {/* notice function definition invocked callback passing id */}
        {note.content} <button onClick={() => onToggleImportance(note.id)}>{label}</button>
      </li>
    </>
  );
};

export default Note;
