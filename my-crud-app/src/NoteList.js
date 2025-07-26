import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteEditor from "./NoteEditor";
import { Button } from "react-bootstrap";

function NoteList() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const res = await axios.get("http://localhost:8888/api/notes");
    setNotes(res.data);
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:8888/api/notes/${id}`);
    loadNotes();
  };

  return (
    <div>
      <Button className="mb-2" onClick={() => setEditingNote({ title: "", content: "" })}>
        Add Note
      </Button>
      
      {editingNote && (
        <NoteEditor
          note={editingNote}
          onSave={() => {
            setEditingNote(null);
            loadNotes();
          }}
        />
      )}
      
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <strong>{note.title}</strong>
            {" "}
            <Button size="sm" variant="info" onClick={() => setEditingNote(note)}>Edit</Button>{" "}
            <Button size="sm" variant="danger" onClick={() => deleteNote(note.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
