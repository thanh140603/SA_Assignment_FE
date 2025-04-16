// src/components/GenericTableManager.jsx
import { useState } from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import ConfirmDialog from "./ConfirmDialog";

export default function GenericTableManager({ title, columns, data, onSubmit }) {
  const [entries, setEntries] = useState(data);
  const [search, setSearch] = useState({});
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [viewing, setViewing] = useState(null);

  const handleSave = (item) => {
    const updated = editing
      ? entries.map((e) => (e.id === item.id ? item : e))
      : [item, ...entries];
    setEntries(updated);
    onSubmit(updated);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (item) => {
    setConfirmData({
      title: "Xác nhận xoá",
      message: `Bạn có chắc muốn xoá mục '${item.id}'?`,
      onConfirm: () => {
        const filtered = entries.filter((e) => e.id !== item.id);
        setEntries(filtered);
        onSubmit(filtered);
        setConfirmData(null);
      },
    });
  };

  const filtered = entries.filter((entry) =>
    columns.every((col) =>
      (search[col.key] || "") === "" ||
      (entry[col.key] || "").toLowerCase().includes(search[col.key].toLowerCase())
    )
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FaPlus /> Thêm mới
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded">
        <table className="w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="p-2 border-r border-gray-300 text-left">{col.label}</th>
              ))}
              <th className="p-2 border-gray-300 text-center">Chức năng</th>
            </tr>
            <tr className="bg-white text-sm">
              {columns.map((col) => (
                <td key={col.key} className="p-2 border-r border-gray-200">
                  <input
                    className="w-full border border-gray-300 px-2 py-1 rounded"
                    placeholder={`Tìm ${col.label}`}
                    onChange={(e) => setSearch({ ...search, [col.key]: e.target.value })}
                  />
                </td>
              ))}
              <td></td>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, idx) => (
              <tr
                key={idx}
                className="text-center border-t hover:bg-blue-50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="p-2 border-r border-gray-200">{entry[col.key]}</td>
                ))}
                <td className="flex justify-center items-center gap-3 p-2">
                  <button className="text-blue-500" onClick={() => setViewing(entry)}><FaEye /></button>
                  <button className="text-yellow-500" onClick={() => { setEditing(entry); setShowForm(true); }}><FaEdit /></button>
                  <button className="text-red-500" onClick={() => handleDelete(entry)}><FaTrash /></button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="text-center py-4 text-gray-500">
                  Không có dữ liệu phù hợp
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px] relative">
            <button onClick={() => { setShowForm(false); setEditing(null); }} className="absolute top-2 right-2 text-gray-500">✖</button>
            <h2 className="text-xl font-bold mb-4 text-center">{editing ? "Cập nhật" : "Thêm mới"}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = Object.fromEntries(new FormData(e.target));
                handleSave({ id: editing?.id || formData.id, ...formData });
              }}
              className="space-y-3"
            >
              {columns.map((col) => (
                <div key={col.key}>
                  <input
                    type="text"
                    name={col.key}
                    defaultValue={editing ? editing[col.key] : ""}
                    placeholder={col.label}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end gap-4 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="bg-white border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
                  Huỷ
                </button>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewing && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-[500px] relative">
            <button onClick={() => setViewing(null)} className="absolute top-2 right-2 text-gray-500">✖</button>
            <h2 className="text-xl font-bold mb-4 text-center">Chi tiết</h2>
            <div className="space-y-2">
              {columns.map((col) => (
                <div key={col.key}>
                  <p className="text-sm text-gray-600 font-medium">{col.label}</p>
                  <p className="text-base">{viewing[col.key]}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {confirmData && (
        <ConfirmDialog
          title={confirmData.title}
          message={confirmData.message}
          onCancel={() => setConfirmData(null)}
          onConfirm={confirmData.onConfirm}
        />
      )}
    </div>
  );
}