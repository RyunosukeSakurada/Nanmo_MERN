import AdminOrderList from "../../ui/admin/AdminOrderList"

const AdminOrder = () => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="">
        <h3 className="bold">取引履歴</h3>

        <AdminOrderList />
      </div>
    </div>
  )
}

export default AdminOrder
