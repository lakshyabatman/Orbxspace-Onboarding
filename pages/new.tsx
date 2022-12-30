import { NextPage } from 'next';
import { Dropdown, Button, Input } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { AvatarUpload } from '../components/AvatarUpload';
import { newCommunityInterface } from '../types/newCommunity';
import { PlusCircleOutlined, DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { AppContext, ChannelType } from '../context/AppContext';

const { TextArea } = Input;

const NewPage: NextPage = () => {
  const context = useContext(AppContext);
  const router = useRouter();

  const [avatar, setAvatar] = useState<string | null>(null);
  const [formData, setFormData] = useState<newCommunityInterface | null>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!context?.currentUser) {
      router.push('/auth');
    }
    const data = localStorage.getItem('formData');
    if (data) {
      setFormData(JSON.parse(data));
    } else {
      setFormData({
        name: '',
        description: '',
        pfp: '',
        channels: [
          {
            name: '',
            type: ChannelType.CHAT,
          },
        ],
      });
    }
  }, []);

  useEffect(() => {
    formData && setFormData({ ...formData, pfp: avatar });
  }, [avatar]);

  const createCommunity = async () => {
    console.log(formData)
    await context?.createGroupWithChannels(formData?.name ?? '', formData?.pfp ?? '', formData?.description ?? '', formData?.channels?.map((channel) => {
      return {
        pfp: '',
        name: channel.name,
        description: '',
        type: channel.type as ChannelType,
      };
    }) ?? [])
    localStorage.removeItem('formData');
    router.push('/community');
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        background: 'linear-gradient(51.28deg, #CFFAD6 34.21%, #F3E7F9 68.88%)',
      }}
    >
      {!formData && (
        <div className="flex flex-col items-center justify-center">
          <div className="w-32 h-32 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          <p className="text-2xl font-semibold text-[#69248A] mt-4">Loading...</p>
        </div>
      )}

      {step === 0 && formData && (
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
            value={formData.name}
          />
          <Button
            type="primary"
            className="w-96 h-12 text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none"
            onClick={() => {
              formData.name !== '' ? setStep(1) : alert('Please enter a name');
              localStorage.setItem('formData', JSON.stringify(formData));
            }}
          >
            Next
          </Button>
        </>
      )}
      {step === 1 && formData && (
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
            autoSize={{ minRows: 12, maxRows: 15 }}
            className="w-full mb-12"
            value={formData.description || ''}
          />
          <Button
            type="primary"
            className="w-96 h-12 text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none mx-auto"
            onClick={() => {
              formData.description !== '' ? setStep(2) : alert('Please enter a description');
              localStorage.setItem('formData', JSON.stringify(formData));
            }}
          >
            Next
          </Button>
        </div>
      )}
      {step === 2 && formData && (
        <div className="flex flex-col w-[720px]">
          <div className="mb-12 text-center">
            <p className="text-5xl font-semibold text-[#69248A] mb-1">Create Channels</p>
            <p className="text-[24px] font-light mb-8">Setup your community channels</p>
          </div>
          <div className="mb-8">
            {formData.channels.map((channel, index) => (
              <div className="flex mb-4 align-middle">
                <div className="w-full mr-12">
                  <div className="mb-1">
                    <p className="text-left">Channel Name</p>
                  </div>
                  <Input
                    placeholder="Eg. Crypto Club"
                    onChange={(e) => {
                      const newChannels = formData.channels;
                      newChannels[index].name = e.target.value;
                      setFormData({ ...formData, channels: newChannels });
                    }}
                    value={channel.name}
                    className="h-12 mb-4 border-none "
                  />
                </div>
                <div className="w-56">
                  <p className="mb-1 text-left">Channel Type</p>
                  <Dropdown
                    menu={{
                      items: [
                        {
                          key: 'chat',
                          label: 'Chat',
                          onClick: () => {
                            const newChannels = formData.channels;
                            newChannels[index].type = 'chat';
                            setFormData({ ...formData, channels: newChannels });
                          },
                        },
                        {
                          key: 'feed',
                          label: 'Feed',
                          onClick: () => {
                            const newChannels = formData.channels;
                            newChannels[index].type = 'feed';
                            setFormData({ ...formData, channels: newChannels });
                          },
                        },
                      ],
                    }}
                    className="w-full h-12 border-none"
                  >
                    <div className="flex items-center justify-between w-full h-12 px-4 bg-white border-none rounded-md">
                      {channel.type === 'chat' ? 'Chat' : 'Feed'}
                      <DownOutlined />
                    </div>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
          <div className="w-full">
            <Button
              type="text"
              className="flex items-center"
              icon={<PlusCircleOutlined />}
              onClick={() => {
                if (formData.channels[formData.channels.length - 1].name === '') {
                  alert('Please fill the previous channel');
                  return;
                }
                setFormData({ ...formData, channels: [...formData.channels, { name: '', type: 'chat' }] });
              }}
            >
              Add Channel
            </Button>
          </div>
          <Button
            type="primary"
            className="w-96 h-12 text-[24px] bg-gradient-to-r from-[#EF88D2] to-[#AF5CD6] border-none mx-auto mt-12"
            onClick={() => {
              formData.channels.length > 0 ? createCommunity() : alert('Please add a channel');
              localStorage.setItem('formData', JSON.stringify(formData));
            }}
          >
            Create Community
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewPage;
