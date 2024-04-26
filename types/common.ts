export interface Metadata {
  favicon: {
    url: string;
  };
  globalSeo: {
    siteName: string;
    titleSuffix: string;
    fallbackSeo: {
      title: string;
      image: {
        url: string;
      };
      description: string;
    };
  };
}

export type Address = `0x${string}`;

export interface Proof {
  proof: string[];
  amount: string;
}

export enum ClaimStatusEnum {
  ELIGIBLE = "Eligible",
  NOT_ELIGIBLE = "Not eligible",
  ALREADY_CLAIMED = "Already claimed",
  UNKNOWN = "Unknown",
  INVALID_ADDRESS = 'Invalid address'
}
