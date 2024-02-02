// src/components/TiptapEditor.js
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useCallback } from "react";
import TextStyle from "@tiptap/extension-text-style";
import db from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const TiptapEditor = () => {
  const saveContent = async (content) => {
    try {
      await addDoc(collection(db, "documents"), { content });
      console.log("Document auto-saved");
    } catch (error) {
      console.error("Error saving document: ", error);
    }
  };

  // Debounce function setup
  const debouncedSave = useCallback(
    debounce((content) => saveContent(content), 5000),
    []
  );

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      // Add more extensions here
    ],
    content: "<p>Hello World! 🌎</p>",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      debouncedSave(content);
    },
  });

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return <div>{editor && <EditorContent editor={editor} />}</div>;
};

export default TiptapEditor;
