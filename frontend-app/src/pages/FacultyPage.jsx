// src/pages/FacultyPage.jsx
import { useState } from "react";
import GenericTableManager from "../components/GenericTableManager";

const initialFaculties = [
  { id: "F001", name: "Cardiology", description: "Khoa tim mạch" },
  { id: "F002", name: "Neurology", description: "Khoa thần kinh" },
];

const facultySchema = [
  { key: "id", label: "Mã khoa" },
  { key: "name", label: "Tên khoa" },
  { key: "description", label: "Mô tả" },
];

export default function FacultyPage() {
  const [data, setData] = useState(initialFaculties);

  return (
    <GenericTableManager
      title="Quản lý khoa"
      columns={facultySchema}
      data={data}
      onSubmit={(updatedList) => setData(updatedList)}
    />
  );
}