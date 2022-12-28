import { Button, Input } from 'antd';
import { useEffect, useState } from 'react';
import { AvatarUpload } from '../components/AvatarUpload';
import { newCommunityInterface } from '../types/newCommunity';

const { TextArea } = Input;

const NewPage = () => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState<newCommunityInterface>({
    name: '',
    description: '',
    pfp: '',
    channels: [],
  });
  const [step, setStep] = useState(0);

  useEffect(() => {
    setFormData({ ...formData, pfp: avatar });
  }, [avatar]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      {step === 0 && (
        <>
          <div className="mb-12 text-center">
            <p className="text-5xl font-semibold text-[#69248A] mb-1">Create Your Community</p>
            <p className="text-[24px] font-light mb-8">Give your community an identity</p>
          </div>
          <AvatarUpload setAvatar={setAvatar} />
          <div className="mt-12 mb-1 w-96">
            <p className="text-left">Community Name</p>
          </div>
          <Input
            placeholder="Eg. Crypto Club"
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
            className="h-12 mb-12 border-none w-96"
          />
          <Button
            type="primary"
            className="w-96 h-12 text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none"
            onClick={() => {
              formData.name !== '' ? setStep(1) : alert('Please enter a name');
            }}
          >
            Next
          </Button>
        </>
      )}
      {step === 1 && (
        <div className="flex flex-col w-[720px]">
          <div className="mb-12 text-center">
            <p className="text-5xl font-semibold text-[#69248A] mb-1">Introduce Your Community</p>
            <p className="text-[24px] font-light">Welcome people to your community space </p>
          </div>
          <div className="mb-1 w-96">
            <p className="text-left">Introduce your community</p>
          </div>
          <TextArea
            placeholder="Eg. Crypto Club"
            onChange={(e) => {
              setFormData({ ...formData, description: e.target.value });
            }}
            autoSize={{ minRows: 12, maxRows: 6 }}
            className="w-full mb-12"
          />
          <Button
            type="primary"
            className="w-96 h-12 text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none mx-auto"
            onClick={() => {
              formData.description !== '' ? setStep(1) : alert('Please enter a description');
              console.log(formData);
            }}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewPage;
