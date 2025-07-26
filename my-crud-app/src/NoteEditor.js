import React, { useState } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";
import { Button, Form } from "react-bootstrap";

function NoteEditor({ note, onSave }) {
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  const saveNote = async () => {
    console.log("Saving:", note.id, title, content);
    try {
      if (note.id != null) { // safe check: edit mode
        await axios.put(`http://localhost:8888/api/notes/${note.id}`, { title, content });
      } else { // add mode
        await axios.post(`http://localhost:8888/api/notes`, { title, content });
      }
      onSave();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  return (
    <div className="mb-3">
      <Form.Control
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-2"
      />
      <Editor
        height="200px"
        defaultLanguage="markdown"
        value={content}
        onChange={(val) => setContent(val || "")}
      />
      <Button onClick={saveNote} className="mt-2">Save</Button>
    </div>
  );
}

export default NoteEditor;
