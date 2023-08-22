import { useState } from "react";
import AddAdminInput from "../../ui/admin/AddAdminInput"
import AdminTable, { Admin } from "./AdminTable"

const AddAdmin = () => {
  const [newAdmin, setNewAdmin] = useState<Admin | null>(null);

  const handleNewAdmin = (admin:Admin) => {
    setNewAdmin(admin);
  }

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="bold">Admin追加</h3>
      </div>

      <AddAdminInput onAdminAdded={handleNewAdmin} />
      <AdminTable newAdmin={newAdmin}  />
    </div>
  )
}

export default AddAdmin
