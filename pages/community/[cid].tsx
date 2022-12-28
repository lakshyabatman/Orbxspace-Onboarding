import { Input } from 'antd';
import { useRouter } from 'next/router';

const CommunityPage = () => {
  const router = useRouter();
  const { cid } = router.query;

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      <div className="mb-12 text-center">
        <p className="text-5xl font-semibold text-[#69248A] mb-1">Your Community is Ready</p>
        <p className="text-[24px] font-light mb-8">
          Place this code inside the html tag we’ve provided and setup your community forum
        </p>
      </div>
      <div className="w-[720px]">
        <div className="w-full mt-12 mb-1">
          <p className="text-left">Group ID</p>
        </div>
        <div className="w-full">
          <div className="flex items-center px-8 w-full h-16 bg-white border border-gray-300 rounded-md text-[20px] text-gray-400">
            <p>{cid}</p>
          </div>
        </div>
        <div className="w-full mt-12 mb-1">
          <p className="text-left">Link</p>
        </div>
        <div className="w-full">
          <div className="flex items-center px-8 w-full h-16 bg-white border border-gray-300 rounded-md text-[20px] text-gray-400">
            <p>{cid}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
