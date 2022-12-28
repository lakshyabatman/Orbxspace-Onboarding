export interface newCommunityInterface {
  pfp: string | null;
  name: string;
  description: string | null;
  channels: ChannelInterface[];
}

export interface ChannelInterface {
  name: string;
  type: 'chat' | 'feed';
}
