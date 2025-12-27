import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline from "@tiptap/extension-underline";
import DOMPurify from "dompurify";

const API = "/api/notes";

export default function App() {
  const [notes, setNotes] = useState([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
    ],
    content: "",
  });

  useEffect(() => {
    fetch(API)
      .then((r) => r.json())
      .then(setNotes)
      .catch(console.error);
  }, []);

  /* ======================
     GUARDAR NOTA
     ====================== */
  const saveNote = async () => {
    if (!editor) return;

    const html = editor.getHTML();
    const clean = DOMPurify.sanitize(html);

    if (!clean.trim()) return;

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: clean }),
    });

    const note = await res.json();
    setNotes([note, ...notes]);
    editor.commands.clearContent();
  };

  if (!editor) return null;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Notas</h1>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>

        {["red", "blue", "green", "orange", "purple"].map((c) => (
          <button
            key={c}
            style={{ color: c }}
            onClick={() => editor.chain().focus().setColor(c).run()}
          >
            A
          </button>
        ))}
      </div>

      {/* EDITOR */}
      <EditorContent editor={editor} style={styles.editor} />

      <button onClick={saveNote} style={styles.save}>
        Guardar nota
      </button>

      {/* NOTAS */}
      <div style={styles.notes}>
        {notes.map((n) => (
          <div
            key={n.id}
            style={styles.note}
            dangerouslySetInnerHTML={{ __html: n.content }}
          />
        ))}
      </div>
    </div>
  );
}

/* ======================
   ESTILOS
   ====================== */
const styles = {
  container: {
    maxWidth: "900px",
    margin: "auto",
    padding: "20px",
    background: "#1e1e1e",
    color: "#eaeaea",
    minHeight: "100vh",
    fontFamily: "system-ui, sans-serif",
  },
  title: {
    background: "#0d5c63",
    padding: "6px 14px",
    borderRadius: "6px",
    display: "inline-block",
  },
  toolbar: {
    display: "flex",
    gap: "6px",
    marginBottom: "10px",
  },
  editor: {
    background: "#fff",
    color: "#000",
    padding: "10px",
    borderRadius: "6px",
    minHeight: "150px",
  },
  save: {
    marginTop: "10px",
    padding: "8px 16px",
    background: "#0d5c63",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  notes: {
    marginTop: "30px",
    display: "grid",
    gap: "12px",
  },
  note: {
    background: "#2b2b2b",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #444",
  },
};
