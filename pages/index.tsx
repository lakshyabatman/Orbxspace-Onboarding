import type { NextPage } from 'next';
import Image from 'next/image';
import { Button } from 'antd';

const Home: NextPage = () => {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      <div></div>
      <div className="flex px-16 ">
        {/* Add text on left and image on right */}
        <div className="flex flex-col justify-between w-[530px]">
          <div>
            <h1 className="text-8xl font-semibold leading-[106px] text-[#69248A] mb-4">
              Bootstrap your Web3 Community
            </h1>
            <span className="text-[32px] font-light">
              Get your community up and running in a few clicks using Orbis
            </span>
          </div>
          <div className="mt-8">
            <Button
              type="primary"
              className="w-[200px] h-[60px] text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none"
            >
              Get Started
            </Button>
          </div>
        </div>
        <div className="ml-32">
          <Image
            src="/forum.svg"
            alt={''}
            width={639}
            height={554}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
