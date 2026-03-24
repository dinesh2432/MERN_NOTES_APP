import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./NotesComponents/Header";
import "./Home.css";
import { IoIosAddCircle } from "react-icons/io";
import { ImSad } from "react-icons/im";
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [message, setMessage] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, { withCredentials: true })
      .then((res) => {
        const notes = res.data.notes || [];   
        const user = res.data.user || {};     
        setMessage(notes);
        setFilteredNotes(notes);
        setName(user.name || 'User');         
      })
      .catch((err) => {
        toast.error("Unable to fetch notes!");
      });
  }, []);

  const handleAddNewTask = async () => {
    if (!newTaskTitle || !newTaskDescription || newTaskTitle.trim() === "" || newTaskDescription.trim() === "") {
      return toast.error("Enter both title and description!");
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/notes/add`, {
        title: newTaskTitle,
        description: newTaskDescription,
      }, { withCredentials: true, headers: { "Content-Type": "application/json" } });
      
      setMessage((prev) => [...prev, res.data.note]);
      setFilteredNotes((prev) => [...prev, res.data.note]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setIsModelOpen(false);
      toast.success(res.data.message || "Note added!");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to add note");
    }
  };

  const handleEditTask = async () => {
    if (!newTaskTitle || !newTaskDescription || newTaskTitle.trim() === "" || newTaskDescription.trim() === "") {
      return toast.error("Enter title and description");
    }

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${editId}`, {
        title: newTaskTitle,
        description: newTaskDescription,
      }, { withCredentials: true });
      
      toast.success("Notes edited successfully");
      
      setMessage(
        message.map((item) =>
          item._id === editId ? { ...item, title: newTaskTitle, description: newTaskDescription } : item
        )
      );

      setFilteredNotes(
        filteredNotes.map((item) =>
          item._id === editId ? { ...item, title: newTaskTitle, description: newTaskDescription } : item
        )
      );
      setNewTaskTitle("");
      setNewTaskDescription("");

      setIsModelOpen(false);
      setIsEditMode(false);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to edit note");
    }
  };

  const handleEdit = (id, title, description) => {
    setIsEditMode(true);
    setEditId(id);
    setNewTaskTitle(title);
    setNewTaskDescription(description);
    setIsModelOpen(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}/api/notes/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message || "Note deleted!");
        setMessage(message.filter((item) => item._id !== id));
        setFilteredNotes(filteredNotes.filter((item) => item._id !== id));
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || err.message || "Failed to delete note");
      });
  };

  const handleSearch = () => {
    const filtered = message.filter((item) => {
      return (
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredNotes(filtered);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setFilteredNotes(message);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setIsModelOpen(true);
  };

  const handleClose = () => {
    setIsModelOpen(false);
    setNewTaskTitle("");
    setNewTaskDescription("");
  };

  return (
    <div>
      <Header name={name} />

      <div className="searchtask">
        <input
          type="search"
          id="search"
          placeholder="search notes.."
          value={search}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch}>Search</button>
        <button
          style={{
            fontSize: '38px',
            padding: '2px 2px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          onClick={handleAdd}
        >
          <IoIosAddCircle />
        </button>
      </div>

      {isModelOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditMode ? "Edit Task" : "Add New Task"}</h2>
            <input
              type="text"
              name="title"
              placeholder="Enter title here..."
              required
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <input
              type="text"
              name="description"
              placeholder="Enter description here..."
              required
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
            />
            <button onClick={isEditMode ? handleEditTask : handleAddNewTask}>
              {isEditMode ? "Save Changes" : "Submit"}
            </button>
            <button type="button" onClick={handleClose}>Cancel</button>
          </div>
        </div>
      )}

      <div className="dashboard-wrapper">
        {filteredNotes.length === 0 ? (
          <p style={{ fontSize: '35px', fontFamily: "serif", color: 'red' }}>
            No notes found. <ImSad style={{ marginBottom: '-6px' }} />
          </p>
        ) : (
          filteredNotes.map((item) => (
            <div key={item._id} className="showtask">
              <h1 style={{ textTransform: "uppercase" }}>{item.title}</h1>
              <br />
              <h4>{item.description}</h4>
              <br />
              <button onClick={() => handleEdit(item._id, item.title, item.description)}>EDIT</button>
              <button onClick={() => handleDelete(item._id)}>DELETE</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
