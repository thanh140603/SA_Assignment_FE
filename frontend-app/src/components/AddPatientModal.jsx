// src/components/AddPatientModal.jsx
import { useState, useEffect } from "react";
import axios from 'axios';

export default function AddPatientModal({ onClose, onSubmit, initialData }) {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    birthday: "",
    gender: "",
    faculty: "",
    disease: "",
    status: ""
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isValidText = (val) => /^[a-zA-Z0-9 ]{1,80}$/.test(val);
    if (!isValidText(form.lastName) || !isValidText(form.firstName)) {
      return alert("The first and last name must contain only letters/numbers and less than 80 characters!");
    }
  
    if (!form.birthday || new Date(form.birthday) > new Date()) {
      return alert("Invalid date of birth!");
    }
  
    const formattedBirthday = new Date(form.birthday).toISOString().split("T")[0];
  
    const newPatient = {
      id: initialData?.id,
      ...form,
      birthday: formattedBirthday 
    };
  
    try {
      if (initialData) {
        // Update
        await axios.put(`http://localhost:3000/api/patients/${initialData.id}`, newPatient);
      } else {
        // Add new
        await axios.post("http://localhost:3000/api/patients", newPatient);
      }
  
      onSubmit(newPatient);
      onClose();
    } catch (error) {
      console.log(newPatient);
      console.error("An error occurred when saving the patient:", error);
      alert("Unable to save the patient. Please try again.");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-10">
      <div className="bg-white p-6 rounded shadow-md w-[500px] relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✖</button>
        <h2 className="text-xl font-bold mb-4 text-center">{initialData ? "Edit Patient" : "New Patient"}</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="First name" value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="w-full border p-2 rounded" required />

          <input type="text" placeholder="Last name" value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="w-full border p-2 rounded" required />

          <input type="date" max={new Date().toISOString().split("T")[0]} value={form.birthday}
            onChange={(e) => setForm({ ...form, birthday: e.target.value })}
            className="w-full border p-2 rounded" required />

          <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
            className="w-full border p-2 rounded" required>
            <option value="">-- Select gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <select value={form.faculty} onChange={(e) => setForm({ ...form, faculty: e.target.value })}
            className="w-full border p-2 rounded" required>
            <option value="">-- Select Faculty ---</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Surgery">Surgery</option>
          </select>

          <select value={form.disease} onChange={(e) => setForm({ ...form, disease: e.target.value })}
            className="w-full border p-2 rounded" required>
            <option value="">-- Select a disease --</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>

          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full border p-2 rounded" required>
            <option value="">-- Status --</option>
            <option value="In treatment">In treatment</option>
            <option value="Cure">Cure</option>
            <option value="Medication">Medication</option>
          </select>

          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={onClose}
              className="bg-white border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
              Cancel
            </button>
            <button type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
