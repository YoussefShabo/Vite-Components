// src/components/TiptapEditor.js
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useCallback } from "react";
import TextStyle from "@tiptap/extension-text-style";
import db from "../../firebase";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";

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
    extensions: [StarterKit, TextStyle],
    content: "<h1>Hello World! 🌎</h1>",
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      debouncedSave(content);
    },
  });
  console.log("Initial Editor Content:", "<h1>Hello World! 🌎</h1>");

  useEffect(() => {
    const loadContent = async () => {
      try {
        const docRef = doc(db, "documents", "ERMvGTY9LeMQ8VMj0Pfe");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          if (editor) {
            editor.commands.setContent(data.content);
            console.log("Loaded Content from Firestore:", data.content);
          }
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    };

    if (editor) {
      loadContent();
    }
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  return <div>{editor && <EditorContent editor={editor} />}</div>;
};

export default TiptapEditor;
