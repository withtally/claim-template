import { FC } from "react";
import { Address } from "~/types/common";
import { OptimisedImage } from "../OptimisedImage";

interface Props {
  picture?: string;
  name: string;
  address: Address;
  title?: string;
}

export const SelectedDelegateBlock: FC<Props> = ({
  name,
  address,
  picture,
  title,
}) => {
  return (
    <div className="mb-2 md:mb-4 w-full">
      {title && (
        <span className="text-caption mb-2 block text-xs uppercase">
          {title}
        </span>
      )}
      <div className="grid grid-cols-[40px_minmax(9px,_1fr)] gap-x-4 h-14 w-full rounded-full bg-blue-grey-lighter pl-2 pr-6 items-center">
        <OptimisedImage
          src={picture || "/img/icons/wallet-placeholder.png"}
          alt="wallet"
          className="size-10 max-h-10 min-h-10 min-w-10 max-w-10 overflow-hidden rounded-full"
          layout="cover"
        />
        <div className="shrink flex-grow">
          <div className="text-caption truncate">{name}</div>
          <div className="text-gray-300 truncate text-[12px]">{address}</div>
        </div>
      </div>
    </div>
  );
};
