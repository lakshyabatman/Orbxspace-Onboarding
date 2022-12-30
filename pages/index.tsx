import type { NextPage } from 'next';
import Image from 'next/image';
import { Button, Spin } from 'antd';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import Link from 'next/link';

const Home: NextPage = () => {
  const context = useContext(AppContext);
  const loading = context?.Loading;

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
        <div className="flex px-16 ">
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
              <Link href={context?.currentUser ? '/new' : '/auth'}>
                <Button
                  type="primary"
                  className="w-[200px] h-[60px] text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none"
                >
                  Get Started
                </Button>
              </Link>
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
      )}
    </div>
  );
};

export default Home;
