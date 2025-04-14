// src/pages/PatientPage.jsx
import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddPatientModal from "../components/AddPatientModal";
import ConfirmDialog from "../components/ConfirmDialog";
import PatientDetailModal from "../components/PatientDetailModal";



const mockPatients = Array.from({ length: 23 }, (_, i) => ({
  id: `BN${1023 - i}`,
  lastName: `Nguyen`,
  firstName: `Van A${i}`,
  birthday: `200${i % 10}-09-0${(i % 5) + 1}`,
  gender: i % 2 === 0 ? "Nam" : "Nữ",
}));

const ITEMS_PER_PAGE = 5;

export default function PatientPage() {
  const [patients, setPatients] = useState(mockPatients);
  const [search, setSearch] = useState({ id: "", lastName: "", firstName: "", birthday: "", gender: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [confirmData, setConfirmData] = useState(null); // { title, message, onConfirm }
  const [viewingPatient, setViewingPatient] = useState(null);



  const filtered = patients.filter(p =>
    p.id.toLowerCase().includes(search.id.toLowerCase()) &&
    p.lastName.toLowerCase().includes(search.lastName.toLowerCase()) &&
    p.firstName.toLowerCase().includes(search.firstName.toLowerCase()) &&
    p.birthday.includes(search.birthday) &&
    p.gender.toLowerCase().includes(search.gender.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPagination = () => {
    const pages = [];

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`px-3 py-1 border ${i === currentPage ? 'bg-blue-500 text-white' : ''}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex gap-2 mt-4 justify-center">
        <button onClick={() => handlePageClick(1)}>{`<<`}</button>
        <button onClick={() => handlePageClick(currentPage - 1)}>{`<`}</button>
        {pages}
        <button onClick={() => handlePageClick(currentPage + 1)}>{`>`}</button>
        <button onClick={() => handlePageClick(totalPages)}>{`>>`}</button>
      </div>
    );
  };

  return (
    <div>
      {/* Mục 1: Tiêu đề */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Hospital Management System</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded"
        >
          <FaPlus /> Add Patient
        </button>
      </div>

      {/* Mục 2: Bảng bệnh nhân */}
      <div className="overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th>ID</th>
              <th>Họ</th>
              <th>Tên + lót</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Chức năng</th>
            </tr>
            <tr className="text-sm bg-white">
              <td><input onChange={(e) => setSearch({ ...search, id: e.target.value })} className="w-full border px-2" /></td>
              <td><input onChange={(e) => setSearch({ ...search, lastName: e.target.value })} className="w-full border px-2" /></td>
              <td><input onChange={(e) => setSearch({ ...search, firstName: e.target.value })} className="w-full border px-2" /></td>
              <td><input onChange={(e) => setSearch({ ...search, birthday: e.target.value })} className="w-full border px-2" /></td>
              <td><input onChange={(e) => setSearch({ ...search, gender: e.target.value })} className="w-full border px-2" /></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {displayed.map((p, i) => (
              <tr key={i} className="text-center border">
                <td>{p.id}</td>
                <td>{p.lastName}</td>
                <td>{`${p.firstName}`}</td>
                <td>{p.birthday}</td>
                <td>{p.gender}</td>
                <td className="flex justify-center gap-2 py-2">
                  <button
                    className="text-blue-500"
                    onClick={() => setViewingPatient(p)}
                  >
                    <FaEye />
                  </button>


                  <button
                    className="text-yellow-500"
                    onClick={() => {
                      setEditingPatient(p);
                      setShowModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="text-red-500"
                    onClick={() => {
                      setConfirmData({
                        title: "Xoá bệnh nhân",
                        message: `Bạn có chắc muốn xoá bệnh nhân ${p.id}?`,
                        onConfirm: () => {
                          setPatients(patients.filter(patient => patient.id !== p.id));
                          setConfirmData(null);
                        }
                      });
                    }}
                  >
                    <FaTrash />
                  </button>

                </td>
              </tr>
            ))}
            {displayed.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {renderPagination()}

      {showModal && (
        <AddPatientModal
          initialData={editingPatient}
          onClose={() => {
            setShowModal(false);
            setEditingPatient(null);
          }}
          onSubmit={(patientData) => {
            if (editingPatient) {
              setPatients((prev) =>
                prev.map((p) => (p.id === patientData.id ? patientData : p))
              );
            } else {
              setPatients((prev) => [patientData, ...prev]);
            }
            setShowModal(false);
            setEditingPatient(null);
          }}
        />
      )}

      {confirmData && (
        <ConfirmDialog
          title={confirmData.title}
          message={confirmData.message}
          onCancel={() => setConfirmData(null)}
          onConfirm={confirmData.onConfirm}
        />
      )}

      {viewingPatient && (
        <PatientDetailModal
          patient={viewingPatient}
          onClose={() => setViewingPatient(null)}
          onEdit={(patient) => {
            setViewingPatient(null);
            setEditingPatient(patient);
            setShowModal(true);
          }}
        />
      )}
    </div>
  );
}
