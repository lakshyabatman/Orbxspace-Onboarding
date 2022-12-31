import React, { useState } from 'react';
import { LoadingOutlined, CameraOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Image from 'next/image';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const AvatarUpload = ({ setAvatar }: { setAvatar: (avatar: string | null) => void }) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
        setAvatar(url);
      });
    }
  };

  const uploadButton = (
    <div className="text-2xl bg-[#af5cd633] flex justify-center items-center w-24 h-24 rounded-full">
      {loading ? <LoadingOutlined /> : <CameraOutlined />}
    </div>
  );

  return (
    <div className="rounded-full">
      <Upload
        name="avatar"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="avatar"
            width="100"
            height="100"
          />
        ) : (
          uploadButton
        )}
      </Upload>
      <div>
        <p className="mt-2 font-light text-center">Add Photo</p>
      </div>
    </div>
  );
};
