import AddAdminInput from "../../ui/admin/AddAdminInput"
import AdminTable from "./AdminTable"

const AddAdmin = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="bold">Admin追加</h3>
      </div>

      <AddAdminInput />
      <AdminTable />
    </div>
  )
}

export default AddAdmin
