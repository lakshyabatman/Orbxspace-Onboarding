import { createContext, useEffect, useState } from 'react';
import { Orbis } from '@orbisclub/orbis-sdk';

export enum NetworkType {
  Ethereum = 'ethereum',
  Solana = 'solana',
}

export enum ChannelType {
  CHAT = 'chat',
  FEED = 'feed',
}

export interface UserConnectionResponse {
  status: number;
  did: string;
  details: {
    did: number;
    metadata: {
      address: string;
    };
    profile: {
      username: string | null;
      description: string | null;
      pfp: string | null;
    } | null;
  };
  result: string;
}

export interface CreateChannelRequest {
  pfp?: string;
  name: string;
  description: string;
  type: ChannelType;
}

export interface Profile {
  did: string;
  address: string;
  details: {
    profile: {
      username: string | null;
      description: string | null;
      pfp: string | null;
    } | null;
    metadata: {
      address: string;
      chain: string;
      ensName: string | null;
    };
  };
  count_followers: number;
  count_following: number;
  last_activity_timestamp: number;
}

declare global {
  interface Window {
    ethereum: any;
    phantom: any;
  }
}

interface IAppContext {
  Loading: boolean;
  currentUser: Profile | null;
  connectWallet: (network: NetworkType) => Promise<void>;
  getOnboardigDetails: () => { groupId: string; code: string };
  createGroupWithChannels: (
    name: string,
    php: string,
    description: string,
    createChannelRequest: CreateChannelRequest[]
  ) => Promise<void>;
}

export const AppContext = createContext<IAppContext | null>(null);

const AppProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [orbis, setOrbis] = useState(new Orbis());

  const [currentUser, setCurrentUser] = useState<Profile | null>(null);

  const [Loading, setLoading] = useState(false);

  const [currentNetwork, setCurrentNetwork] = useState<NetworkType | null>(null);

  const [groupId, setGroupId] = useState<string | null>(null);

  const isConnected = async () => {
    let res = await orbis.isConnected();
    if (res.status != 200) return false;
    await getProfile(res.did);
    if ((res.details.metadata.chain as String).includes('solana')) {
      setCurrentNetwork(NetworkType.Solana);
    } else {
      setCurrentNetwork(NetworkType.Ethereum);
    }
    return true;
  };

  const getProfile = async (did: string) => {
    try {
      setLoading(true);
      let res = await orbis.getProfile(did);
      if (res.status != 200) {
        throw new Error(res.error);
      }
      setCurrentUser({
        ...res.data,
      });
    } catch (err: any) {
      console.error(err);
      //   openNotification(err.message ?? err);
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    isConnected();
  }, []);

  const createGroupWithChannels = async (
    name: string,
    pfp: string,
    description: string,
    createChannelRequest: CreateChannelRequest[]
  ) => {
    try {
      setLoading(true);
      let res = await orbis.createGroup({
        pfp,
        name,
        description,
      });
      if (res.status == 200) {
        const group = res.doc;
        for (let createChannel of createChannelRequest) {
          const res = await orbis.createChannel(group, {
            group_id: group,
            pfp: createChannel.pfp,
            name: createChannel.name,
            description: createChannel.description,
            type: createChannel.type,
          });
          if (res.status != 200) {
            throw new Error(res.error);
          }
        }
        setGroupId(group);
        console.log('Group with channels are created!');
      } else {
        throw new Error(res.error);
      }
    } catch (err) {
      // display notification
    } finally {
      setLoading(false);
    }
  };

  const getOnboardigDetails = () => {
    if (!groupId) throw new Error('Group should be created first');

    return {
      groupId: groupId,
      code:
        '<div id="orbis-framework" data-app-context=' +
        groupId +
        '></div>' +
        '\n<script src="https://orbis-framework.s3.amazonaws.com/main.js"></script>',
    };
  };

  const connectWallet = async (network: NetworkType) => {
    try {
      setLoading(true);
      let res: UserConnectionResponse = await orbis.connect_v2({
        provider: network == NetworkType.Solana ? window.phantom?.solana : window.ethereum,
        chain: network.toString(),
      });
      if (res.status != 200) {
        throw new Error(res.result);
      }
      await getProfile(res.did);
    } catch (err: any) {
      console.error(err);
      //   openNotification(err.message ?? err);

      // error handle
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        Loading,
        currentUser,
        getOnboardigDetails,
        connectWallet,
        createGroupWithChannels,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
