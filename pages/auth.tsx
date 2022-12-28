import { Button } from 'antd';

const AuthPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      <div className="px-8 py-8 bg-white min-w-[720px]">
        <div className="text-center">
          <p className="text-5xl font-semibold text-[#69248A] mb-1">Connect to Orbis</p>
          <p className="text-[24px] font-light mb-8">With your wallet</p>
          <hr className="border-[#000000] mb-8" />
        </div>
        <div className="flex flex-col items-center justify-center py-8">
          <Button
            onClick={() => {
              console.log('metamask');
            }}
            className="w-96 h-16 bg-[#B45008] text-white mb-4 text-3xl"
          >
            Metamask
          </Button>
          <Button
            onClick={() => {
              console.log('metamask');
            }}
            className="w-96 h-16 bg-[#201191] text-white mb-4 text-3xl"
          >
            Phantom
          </Button>
          <Button
            onClick={() => {
              console.log('metamask');
            }}
            className="w-96 h-16 bg-[#094296] text-white mb-4 text-3xl"
          >
            Wallet Connect
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
