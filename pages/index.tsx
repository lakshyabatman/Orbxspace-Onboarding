import type { NextPage } from 'next';
import Image from 'next/image';
import { Button, Spin } from 'antd';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const context = useContext(AppContext);
  const loading = context?.Loading;
  const router = useRouter();

  return (
    <div
      className="min-h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      <div className="container flex items-center justify-between w-full py-3 mx-auto">
        <Image
          src="/logo.png"
          alt="logo"
          width="200"
          height="100"
        />
        <div className="flex items-center justify-between">
          <Button
            type="default"
            className="mr-3"
            onClick={() => router.push('./forum')}
          >
            Community
          </Button>
          <Button type="default">
            <Link
              target="_blank"
              href="https://nonstop-heart-099.notion.site/Orbxspace-3f12dff90f0948c394acad61b4fce77d"
            >
              Documentation
            </Link>
          </Button>
        </div>
      </div>
      <div className="container flex mx-auto mt-10 ">
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
            src="/landingPage.svg"
            alt={''}
            width={600}
            height={450}
            className="absolute right-0 md:hidden lg:block h-96"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
