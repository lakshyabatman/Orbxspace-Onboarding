import { AvatarUpload } from '../components/AvatarUpload';

const NewPage = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      <div className="mb-12 text-center">
        <p className="text-5xl font-semibold text-[#69248A] mb-1">Create Your Community</p>
        <p className="text-[24px] font-light mb-8">Give your community an identity</p>
      </div>
      <AvatarUpload />
    </div>
  );
};

export default NewPage;
