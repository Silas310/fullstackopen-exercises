import Note from './Note';

function NoteList({ notesToShow, toggleImportanceOf }) {
  return (
    <ul>
      {notesToShow.map( (note) => (
        <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
        />
      ))}
    </ul>
  );
}

export default NoteList;