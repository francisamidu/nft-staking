interface Asset {
  tokenId: string | number;
  owner: string;
  createdAt: number | string;
  userAvatar: string;
  username: string;
  price: string | number;
}

export default Asset;
