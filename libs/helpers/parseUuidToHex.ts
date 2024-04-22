import { parse } from "uuid";
import { bytesToHex } from "viem";

export const parseUuidToHex = (uuid: string) => {
  const bytesArray = parse(uuid);
  const hexId = bytesToHex(bytesArray);

  return hexId;
}