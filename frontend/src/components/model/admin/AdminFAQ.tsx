import FAQForm from "../../ui/admin/FAQForm";
import FAQList from "../../ui/admin/FAQList";

const AdminFAQ = () => {

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="">
        <h3 className="bold">FAQ</h3>
      </div>

      <div className="flex flex-col md:flex-row mt-4 md:mt-8">
        <div className="flex-[1] p-2">
          <p className="text-zinc-500 text-[8px]">質問と回答を追加する</p>

          <div className="mt-4">
            <FAQForm question={""} answer={""} />
          </div>
        </div>

        <div className="flex-[1] p-2">
          <p className="text-zinc-500 text-[8px]">FAQリスト</p>
          <div className="mt-4">
            <FAQList />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminFAQ
