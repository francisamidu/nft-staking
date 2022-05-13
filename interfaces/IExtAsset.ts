import { IAsset } from ".";

interface Asset extends IAsset {
  checked?: boolean;
  image: string;
  name: string;
  staked?: boolean;
}
export default Asset;
