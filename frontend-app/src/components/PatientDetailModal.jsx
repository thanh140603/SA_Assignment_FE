// src/components/PatientDetailModal.jsx
export default function PatientDetailModal({ patient, onClose, onEdit }) {
    if (!patient) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-[600px] relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-500">✖</button>
          <h2 className="text-xl font-bold mb-4 text-center">Patient's Details</h2>
  
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="font-semibold">Patient ID</p>
              <p className="mb-3">{patient.id}</p>
              <p className="font-semibold">Họ</p>
              <p className="mb-3">{patient.lastName}</p>
              <p className="font-semibold">Tên</p>
              <p className="mb-3">{patient.firstName}</p>
              <p className="font-semibold">Ngày sinh</p>
              <p className="mb-3">{patient.birthday}</p>
            </div>
  
            <div>
              <p className="font-semibold">Giới tính</p>
              <p className="mb-3">{patient.gender}</p>
              <p className="font-semibold">Khoa</p>
              <p className="mb-3">{patient.faculty}</p>
              <p className="font-semibold">Bệnh</p>
              <p className="mb-3">{patient.disease}</p>
              <p className="font-semibold">Trạng thái</p>
              <p className="mb-3">{patient.status}</p>
            </div>
          </div>
  
          <div className="flex justify-end gap-4 pt-6">
            <button
              onClick={onClose}
              className="bg-white border border-gray-400 px-4 py-2 rounded hover:bg-gray-100"
            >
              Return
            </button>
            <button
              onClick={() => {
                onEdit(patient);
                onClose();
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    );
  }
  