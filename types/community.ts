export interface ChannelInterface {
  name: string;
  type: 'chat' | 'feed';
}

export interface CommunityInterface {
  groupID: string | null;
  link: string | null;
  pfp: string | null;
  name: string;
  description: string | null;
  channels: ChannelInterface[];
}
