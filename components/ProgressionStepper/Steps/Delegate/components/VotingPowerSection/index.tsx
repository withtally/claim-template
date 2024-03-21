import { FC, useMemo } from 'react'
import { Button } from '@chakra-ui/react'
import { OptimisedImage } from '~/components/Layout/OptimisedImage'
import { Delegate } from '~/types/delegate'
import cx from 'classnames'

interface Props {
  selectedDelegate: Delegate | null
}

export const VotingPowerSection: FC<Props> = ({ selectedDelegate }) => {
  const formatedStatementSummaryOrBio = useMemo(() => {
    const statementSummary = selectedDelegate?.statement?.statementSummary

    const bio = selectedDelegate?.account?.bio

    return statementSummary || bio
  }, [selectedDelegate])

  return (
    <form
      className="relative z-10 flex max-h-[600px] w-full flex-col items-start rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md lg:sticky lg:top-20 lg:max-w-[450px]"
      // className="xxs:bg-transparent xxs:backdrop-blur-none"
    >
      <h2 className="text-caption text-subheading mb-6 uppercase">Voting Power</h2>

      <div className="flex h-14 w-full items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
        <div className="inline-flex size-10 items-center justify-center rounded-full bg-blue-grey">
          <div className="gradient-background orange-blue-gradient size-6 max-h-6 min-h-6 min-w-6 max-w-6 overflow-hidden rounded-full xxs:relative xxs:z-0 xxs:opacity-100 xxs:blur-none" />
        </div>
        <span className="text-caption">6500.0</span>
      </div>

      <hr className="my-4 w-full border-gray-500" />

      {selectedDelegate ? (
        <>
          <div className="mb-6 flex h-14 w-full items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
            <OptimisedImage
              src={selectedDelegate?.account?.picture || '/img/icons/wallet-placeholder.png'}
              alt="wallet"
              className="size-10 max-h-10 min-h-10 min-w-10 max-w-10 overflow-hidden rounded-full"
              layout="cover"
            />
            <span className="text-caption truncate">{selectedDelegate.account.name}</span>
          </div>

          <p className={cx('mb-6', { 'text-gray-400': !formatedStatementSummaryOrBio })}>
            {formatedStatementSummaryOrBio || 'No bio provided'}
          </p>

          <div className="flex w-full flex-1 items-end">
            <Button
              // type="submit"
              isLoading={false}
              className="w-full"
            >
              Claim and Delegate
            </Button>
          </div>
        </>
      ) : (
        <p className="m-auto text-gray-400">Choose a Delegate</p>
      )}
    </form>
  )
}
