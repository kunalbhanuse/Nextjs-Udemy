"use client";
import { Content } from "next/font/google";
import { NextResponse } from "next/server";
import React, { useState } from "react";
import toast from "react-hot-toast";

function NoteClient({ initialNote }) {
  const [notes, setNotes] = useState(initialNote);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      if (result.success) {
        setNotes([result.data, ...notes]);
        toast.success("Notes Created Successfuly ");
        setTitle("");
        setContent("");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating Note", error);
      toast.error("Something went Wrong");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();

      if (result.success) {
        setNotes(notes.filter((note) => note._id !== id));
        toast.success("Notes Deleted Succefully");
      }
    } catch (error) {
      console.error("error deleteing node", error);
      toast.error("Something Went wrong");
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const cancleEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const updateNote = async (id) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitle, content: editContent }),
      });

      const result = await response.json();
      console.log("this is Update", result);
      if (result.success) {
        toast.success("Notes Updated Succefully ");
        setNotes(notes.map((note) => (note._id === id ? result.data : note)));
        setEditingId(null);
        setEditTitle("");
        setEditContent("");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <div className="space-y-6 bg-white">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-600">
          Create New Note
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-400 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
            required
          />
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-400 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-3 py-3 bg-blue-600 rounded-2xl hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Creating... " : "Create Note"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">
            {" "}
            No Notes Yet. Create Your First Notes Above
          </p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
              {editingId === note._id ? (
                <>
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-3 border border-gray-400 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                      required
                    />

                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                      className="w-full p-3 border border-gray-400 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-blue-500 text-gray-800"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateNote(note._id)}
                      disabled={loading}
                      className="py-2 px-3 bg-green-500 hover:bg-green-600 rounded-md "
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={cancleEdit}
                      className="py-2 px-3 bg-blue-500 hover:bg-blue-600 rounded-md "
                    >
                      Cancle
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{note.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className=" py-1 px-3 rounded-2xl bg-blue-500 hover:bg-blue-700 text-sm  text-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className=" py-1 px-3 rounded-2xl bg-red-500 hover:bg-red-700 text-sm text-gray-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-shadow-gray-600 mb-2">{note.content}</p>
                  <p className="text-shadow-gray-600 mb-2">
                    Created:{" "}
                    {new Date(note.createdAt).toLocaleDateString("en-IN")}
                  </p>
                  {note.createdAt !== note.updatedAt && (
                    <p className="text-shadow-gray-600 mb-2">
                      Updated:
                      {new Date(note.updatedAt).toLocaleDateString("en-IN")}
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NoteClient;
