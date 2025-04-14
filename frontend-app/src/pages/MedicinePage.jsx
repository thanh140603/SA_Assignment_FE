// src/pages/MedicinePage.jsx
import { useState } from "react";
import GenericTableManager from "../components/GenericTableManager";

const initialMedicines = [
  { id: "M001", name: "Paracetamol", type: "Tablet", dosage: "500mg" },
  { id: "M002", name: "Amoxicillin", type: "Capsule", dosage: "250mg" },
];

const medicineSchema = [
  { key: "id", label: "Mã thuốc" },
  { key: "name", label: "Tên thuốc" },
  { key: "type", label: "Dạng bào chế" },
  { key: "dosage", label: "Hàm lượng" },
];

export default function MedicinePage() {
  const [data, setData] = useState(initialMedicines);

  return (
    <GenericTableManager
      title="Quản lý thuốc"
      columns={medicineSchema}
      data={data}
      onSubmit={(updatedList) => setData(updatedList)}
    />
  );
}
