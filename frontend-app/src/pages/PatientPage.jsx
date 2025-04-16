import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import axios from 'axios';
import AddPatientModal from "../components/AddPatientModal";
import ConfirmDialog from "../components/ConfirmDialog";
import PatientDetailModal from "../components/PatientDetailModal";

const ITEMS_PER_PAGE = 10;

export default function PatientPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState({firstName: "", lastName: "", birthday: "", gender: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [confirmData, setConfirmData] = useState(null);
  const [viewingPatient, setViewingPatient] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/api/patients")
      .then(response => {
        console.log(response.data);
        const patientsWithFormattedBirthday = response.data.map(patient => ({
          ...patient,
          birthday: new Date(patient.birthday).toISOString().split("T")[0]  
        })).sort((a, b) => b.id - a.id);
        setPatients(patientsWithFormattedBirthday);
      })
      .catch(error => console.error("❌ Lỗi khi lấy danh sách bệnh nhân:", error));
  }, []);
  
  // Lọc danh sách bệnh nhân
  const filtered = patients.filter(p =>
    (search.firstName === "" || (p.firstName || "").toLowerCase().includes(search.firstName.trim().toLowerCase())) &&
    (search.lastName === "" || (p.lastName || "").toLowerCase().includes(search.lastName.trim().toLowerCase())) &&
    (search.birthday === "" || (p.birthday || "").includes(search.birthday.trim())) &&
    (search.gender === "" || (p.gender || "").toLowerCase().includes(search.gender.trim().toLowerCase()))
  );
  
  // Tính tổng số trang
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const displayed = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <div className="border border-blue-300 shadow-md rounded-lg bg-white p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700 text-center flex-grow">Patient Management</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
          >
            <FaPlus /> Add Patient
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead className="bg-blue-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">First Name</th>
                <th className="border border-gray-300 px-4 py-2">Last Name</th>
                <th className="border border-gray-300 px-4 py-2">Birthday</th>
                <th className="border border-gray-300 px-4 py-2">Gender</th>
                <th className="border border-gray-300 px-4 py-2 text-center">Function</th>
              </tr>
              <tr className="bg-white">
                {Object.keys(search).map(key => (
                  <td key={key} className="border border-gray-200 px-2 py-1">
                    <input
                      onChange={(e) => setSearch({ ...search, [key]: e.target.value })}
                      className="w-full border border-gray-300 px-2 py-1 rounded"
                    />
                  </td>
                ))}
                <td className="border border-gray-200"></td>
              </tr>
            </thead>
            <tbody>
              {displayed.map((p, i) => (
                <tr
                  key={i}
                  className="text-center border hover:bg-blue-50 transition-colors"
                >
                  <td className="border px-4 py-2">{p.firstName}</td>
                  <td className="border px-4 py-2">{p.lastName}</td>
                  <td className="border px-4 py-2">{p.birthday}</td>
                  <td className="border px-4 py-2">{p.gender}</td>
                  <td className="border px-4 py-2 flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-opacity-80" onClick={() => setViewingPatient(p)}><FaEye /></button>
                    <button className="text-yellow-500 hover:text-opacity-80" onClick={() => { setEditingPatient(p); setShowModal(true); }}><FaEdit /></button>
                    <button className="text-red-500 hover:text-opacity-80" onClick={() => {
                      setConfirmData({
                        title: "Xoá bệnh nhân",
                        message: `Bạn có chắc muốn xoá bệnh nhân ${p.id}?`,
                        onConfirm: async () => {
                          try {
                            // Gọi API để xóa bệnh nhân từ backend
                            await axios.delete(`http://localhost:3000/api/patients/${p.id}`);
                            
                            // Cập nhật danh sách bệnh nhân sau khi xóa
                            setPatients(patients.filter(patient => patient.id !== p.id));
                            setConfirmData(null); // Đóng modal xác nhận
                          } catch (error) {
                            console.error("❌ Errors when deleting patients:", error);
                            alert("Patients cannot be deleted. Please try again.");
                          }
                        },
                      });
                    }}><FaTrash /></button>
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

        {/* Pagination */}
        <div className="flex gap-2 mt-6 justify-center">
          <button onClick={() => handlePageClick(1)} className="border rounded px-2">&laquo;</button>
          <button onClick={() => handlePageClick(currentPage - 1)} className="border rounded px-2">&lt;</button>
          {Array.from({ length: Math.min(3, totalPages) }, (_, idx) => {
            const page = Math.max(1, currentPage - 1) + idx;
            return (
              <button
                key={page}
                onClick={() => handlePageClick(page)}
                className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-white'}`}
              >
                {page}
              </button>
            );
          })}
          <button onClick={() => handlePageClick(currentPage + 1)} className="border rounded px-2">&gt;</button>
          <button onClick={() => handlePageClick(totalPages)} className="border rounded px-2">&raquo;</button>
        </div>
      </div>

      {/* Modals */}
      {showModal && (
        <AddPatientModal
          initialData={editingPatient}
          onClose={() => {
            setShowModal(false);
            setEditingPatient(null);
          }}
          onSubmit={(patientData) => {
            if (editingPatient) {
              setPatients(prev => prev.map(p => (p.id === patientData.id ? patientData : p)));
            } else {
              setPatients(prev => [patientData, ...prev]);
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
