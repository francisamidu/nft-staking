import { IAsset } from ".";

interface Asset extends IAsset {
  checked?: boolean;
  image: string;
  title: string;
  staked?: boolean;
}
export default Asset;
