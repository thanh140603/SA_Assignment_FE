// src/components/ConfirmDialog.jsx
export default function ConfirmDialog({ title, message, onCancel, onConfirm }) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded shadow-md w-[400px] text-center">
          <h2 className="text-lg font-semibold mb-3">{title || "Xác nhận"}</h2>
          <p className="mb-6 text-gray-700">{message || "Bạn có chắc chắn muốn thực hiện thao tác này?"}</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-white border border-gray-400 rounded hover:bg-gray-100"
            >
              Huỷ
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    );
  }