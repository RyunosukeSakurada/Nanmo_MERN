import AccentButton from "../../ui/global/AccentButton";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface StoreApprovalRequestProps {
  storeId?: string; 
  approved?: boolean;
  requestDeclined?:boolean;
}

const StoreApprovalRequest: React.FC<StoreApprovalRequestProps> = ({ storeId,approved,requestDeclined }) => {
  
  const details = [
    { title: "1. 商品の掲載・販売", description: "当サービス上で、売れ残ってしまった商品を割引価格で掲載し、多くの顧客に販売することができます。" },
    { title: "2. フードロス削減の一翼", description: "食品廃棄を減少させる貴重なパートナーとして、サステナブルな食環境の実現に貢献します。" },
    { title: "3. 専用ダッシュボードの利用", description: "商品の売上、フィードバック等、店舗運営に関する重要な情報を一目で確認することができます。" },
  ];

  const sentRequestSuccess = () => toast.success('承認申請が送信されました', 
    {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );

  const sentRequestfailed = () => toast.error('申請に失敗しました。再試行してください。', 
    {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );

  const alreadyRequested = () => toast.warning('もう申請済みです',
    {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    }
  );


  const handleSubmit = async () => {
    try {
      if (!storeId) {
        throw new Error('店舗IDが不明です。');
      }
  
      //店舗承認申請がすでに送信されているかを確認
      const checkResponse = await fetch(`http://localhost:4000/api/user/checkapproval/${storeId}`);
      const checkData = await checkResponse.json();
  
      if (!checkResponse.ok) {
        if (checkResponse.status === 404) {
          throw new Error('指定された店舗が見つかりませんでした。');
        } else {
          throw new Error('店舗承認申請のチェックに失敗しました。');
        }
      }
  
      if (checkData.requested) {
        alreadyRequested();
        return;
      }
  
      //店舗承認申請をする
      const response = await fetch(`http://localhost:4000/api/user/requestapproval/${storeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      const responseData = await response.json();
  
      if (response.status !== 200) {
        if (response.status === 400 && responseData.message === "承認申請はすでに送信されています") {
          alreadyRequested();
        } else {
          throw new Error('店舗承認申請の送信に失敗しました。');
        }
      } else {
        sentRequestSuccess();
      }
  
    } catch (error) {
      console.error(error); 
      sentRequestfailed();
    }
  }
  
  return (
    <div className="bg-white p-4 rounded-lg">
      <ToastContainer />
        <div className="">
          <h3 className="bold">店舗承認申請</h3>
          {approved ? (
            <>
              <p className="text-center my-16 text-zinc-500">すでに承認申請済みです</p>
            </>
          ) : 
          (
            <>
              <div className="mt-12 px-4">
                <p className="text-[12px] md:text-base">Q. 承認申請とは?</p>
                <p className="mt-4 text-justify text-[8px] md:text-[12px]">A. 私たちのサービスの主な目的は、まだ食べられるのに売れ残り、廃棄の危機に瀕している食品をお客様にお得にお届けすることです。このような商品の取り扱いには、食品の安全性と品質を常に最前線に保つ責任が伴います。私たちはお客様に安全で品質の高い商品を提供するため、参加するすべての店舗様が当サービスの基準と価値観を共有していることを確認するための店舗申請を設けています。これは、私たちの共通の目的に向けて一緒に歩んでいくための第一歩です。</p>
              </div>
              <div className="mt-12 px-4">
                <p className="text-[12px] md:text-base">Q.申請が承認されたら、何ができるの？</p>
                {details.map((detail, index) => (
                  <div key={index} className="mt-4 text-justify text-[8px] md:text-[12px]">
                    <h2 className="text-[8px] md:text-[12px]">{detail.title}</h2>
                    <ul>
                      <li className="text-[8px] md:text-[12px]">{detail.description}</li>
                    </ul>
                  </div>
                ))}
              </div>
      
              <div className="mt-12">
                {requestDeclined ? (
                  <>
                    <p className="text-[8px] text-red-500 text-center">承認申請が却下されました。再度申請してください。質問がございましたらお問い合わせください。</p>
                  </>
                  ) : (<></>)
                }
                <div className="flex justify-center">
                  <AccentButton onClick={handleSubmit}>承認申請する</AccentButton>
                </div>
              </div>
            </>
          )}
        </div>
    </div>
  )
}

export default StoreApprovalRequest
