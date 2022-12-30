import { Button, Spin } from 'antd';
import { AppContext, NetworkType } from '../context/AppContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthPage = () => {
  const context = useContext(AppContext);
  const router = useRouter();
  const loading = context?.Loading;

  useEffect(() => {
    if (context?.currentUser) {
      router.push('/new');
    }
  }, [context?.currentUser]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <Spin
            tip="Loading"
            size="large"
          >
            <div className="text-center" />
          </Spin>
        </div>
      ) : (
        <div className="px-8 py-8 bg-white min-w-[720px]">
          <div className="text-center">
            <p className="text-5xl font-semibold text-[#69248A] mb-1">Connect to Orbis</p>
            <p className="text-[24px] font-light mb-8">With your wallet</p>
            <hr className="border-[#000000] mb-8" />
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <Button
              onClick={() => context?.connectWallet(NetworkType.Ethereum)}
              className="w-96 h-16 bg-[#B45008] text-white mb-4 text-3xl"
            >
              Metamask
            </Button>
            <Button
              onClick={() => {
                context?.connectWallet(NetworkType.Solana);
              }}
              className="w-96 h-16 bg-[#201191] text-white mb-4 text-3xl"
            >
              Phantom
            </Button>
            {/* <Button
            onClick={() => {
              console.log('metamask');
            }}
            className="w-96 h-16 bg-[#094296] text-white mb-4 text-3xl"
          >
            Wallet Connect
          </Button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
