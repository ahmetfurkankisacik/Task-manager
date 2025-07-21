'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'TODO' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  const createTask = () => {
    axios.post('http://localhost:8080/api/tasks', form)
      .then(() => {
        setForm({ title: '', description: '', status: 'TODO' });
        return axios.get('http://localhost:8080/api/tasks');
      })
      .then(res => setTasks(res.data));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8080/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t.id !== id)));
  };

  return (
    <main className="container mt-4">
      <h1 className="mb-4">Görev Takip Uygulaması</h1>

      <div className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Başlık"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Açıklama"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="form-control mb-2"
          value={form.status}
          onChange={e => setForm({ ...form, status: e.target.value })}
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="DONE">DONE</option>
        </select>
        <button className="btn btn-primary" onClick={createTask}>Görev Ekle</button>
      </div>

      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.title}</h5>
              <p className="mb-1">{task.description}</p>
              <span className="badge bg-info">{task.status}</span>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deleteTask(task.id)}>Sil</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
