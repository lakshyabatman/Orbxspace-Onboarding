import { AppContext, ChannelType } from '../context/AppContext';
import { useContext, useEffect, useState } from 'react';
import { CopyBlock, a11yLight, atomOneLight } from 'react-code-blocks';
import { Spin } from 'antd';
import { useRouter } from 'next/router';

const CommunityPage = () => {
  const context = useContext(AppContext);

  const router = useRouter()
  
  
  const loading = context?.Loading;


  const [group, setGroup] = useState<{groupId: string, code: string} | null>(null);

  useEffect(() => {
    try {
      const g = context?.getOnboardigDetails();
      setGroup(g ?? null)
    }catch(e) {
      router.push("/")
    }
  })
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      {loading ? (
        <Spin
          size="large"
          tip={'Loading'}
        />
      ) : (
        <>
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
                <p>{group?.groupId}</p>
              </div>
            </div>
            <div className="w-full mt-12 mb-1">
              <p className="text-left">Code</p>
            </div>
            <div className="w-full">
              <CopyBlock
                text={group?.code ?? ''}
                language="html"
                theme={atomOneLight}
                wrapLongLines={true}
                showLineNumbers={false}
                codeBlock
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommunityPage;
