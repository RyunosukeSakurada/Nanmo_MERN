import { useState } from "react";
import DropdownMenu from "../../ui/admin/DropdownMenu";
import StoreTable from "./StoreTable";
import UserTable from "./UserTable";
import SuspendedTable from "./SuspendedTable";
import BlockedTable from "./BlocledTable";

const UserList = () => {
  const [currentTable, setCurrentTable] = useState("user"); 

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="bold">ユーザー管理</h3>
        <DropdownMenu onTableSelect={(table: "user" | "store" | "suspendeduser" | "blockeduser") => setCurrentTable(table)} />
      </div>
      {currentTable === "user" && <UserTable />}
      {currentTable === "store" && <StoreTable />}
      {currentTable === "suspendeduser" && <SuspendedTable />}
      {currentTable === "blockeduser" && <BlockedTable />}
    </div>
  )
}

export default UserList
