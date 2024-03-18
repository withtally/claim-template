import { Dispatch, FC, SetStateAction } from 'react'
import { OptimisedImage } from '~/components/Layout/OptimisedImage'
import { Delegate } from '~/types/delegate'
import { SelectedMark } from './components/SelectedMark'
import cx from 'classnames'

interface Props {
  delegate: Delegate;
  isSelected: boolean;
  setSelectedDelegate: Dispatch<SetStateAction<Delegate>>;
}

export const DelegateCard: FC<Props> = ({ delegate, isSelected, setSelectedDelegate }) => {
  return (
    <div
      className={cx(
        'relative rounded-md border-2 bg-blue-grey p-4 pt-10 cursor-pointer',
        { 'border-green/80': isSelected}
      )}
      onClick={() => setSelectedDelegate(delegate)}
    >
      {isSelected && <SelectedMark />}
      {/* WALLET DETAILS */}
      <div className="mb-6 flex flex-col items-center gap-x-4 md:flex-row">
        <OptimisedImage
          src={delegate?.account?.picture || '/img/icons/wallet-placeholder.png'}
          alt="wallet"
          className="mt-2 size-12 max-h-12 min-h-12 min-w-12 max-w-12 overflow-hidden rounded-full  "
          layout="cover"
        />
        <div className="flex max-w-[75%] flex-col">
          <h3 className="text-subheading mb-1 flex-grow truncate">{delegate?.account?.name}</h3>
          <p className="break-all text-xs text-gray-400">{delegate?.account?.address}</p>
        </div>
      </div>

      <p className={cx('mb-6', { 'text-gray-400': !delegate.account?.bio })}>
        {delegate.account?.bio || 'No bio provided'}
      </p>

      <div className="flex flex-wrap gap-2">
        <span
          className="whitespace-nowrap rounded-full border border-gray-600 p-2 text-xs text-gray-300"
        >
          {
            delegate.delegatorsCount > 0 
              ? `Trusted by ${delegate.delegatorsCount} accounts` 
              : 'No delegations to this account'
          }
        </span>
      </div>
    </div>
  )
}
