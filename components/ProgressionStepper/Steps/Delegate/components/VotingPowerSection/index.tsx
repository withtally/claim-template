import { FC, useMemo } from 'react'
import { Button, Tooltip } from '@chakra-ui/react'
import { OptimisedImage } from '~/components/Layout/OptimisedImage'
import { Delegate } from '~/types/delegate'
import { shortenAddress } from '../../../../../../libs/helpers/shortenAddress'
import cx from 'classnames'
import { getTextFromDictionary } from '~/utils/getTextFromDictionary'
import { useChainMissmatch } from '~/hooks/useChainMissmatch'
import useCustomToasters from '~/hooks/useToasters'
import { getChain } from '~/config/wagmi/getChain'
import { chainToUse } from '~/constants/site'

interface Props {
  selectedDelegate: Delegate | null
}

export const VotingPowerSection: FC<Props> = ({ selectedDelegate }) => {
  const isChainMissmatched = useChainMissmatch();
  const { warningToast } = useCustomToasters()
  const {chain} = getChain(chainToUse);
  const onDelegateClick = () => {
    if(isChainMissmatched){
      warningToast({title:"Wrong chain", description:`To claim and delegate tokens you have to use ${chain.name}. Please reconnect your wallet with this chain.`})
      return;
    }
  }

  const formatedStatementSummaryOrBio = useMemo(() => {
    const statementSummary = selectedDelegate?.statement?.statementSummary

    const bio = selectedDelegate?.account?.bio

    return statementSummary || bio
  }, [selectedDelegate])

  const displayName = useMemo(() => {
    if (!selectedDelegate) {
      return ''
    }
    return selectedDelegate?.account?.name || shortenAddress(selectedDelegate?.account?.address)
  }, [selectedDelegate])

  return (
    <form className="relative z-10 flex h-fit min-h-[75svh] w-full flex-col items-start rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md lg:sticky lg:top-[3svh] lg:max-w-[450px]">
      <h2 className="text-caption text-subheading mb-6 uppercase">{getTextFromDictionary('stepper_step2_votingPowerSection_title')}</h2>

      <div className="flex h-14 w-full items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
        <div className="inline-flex size-10 items-center justify-center rounded-full bg-blue-grey">
          <div className="gradient-background orange-blue-gradient size-6 max-h-6 min-h-6 min-w-6 max-w-6 overflow-hidden rounded-full xxs:relative xxs:z-0 xxs:opacity-100 xxs:blur-none" />
        </div>
        <span className="text-caption">6500.0</span>
      </div>

      <hr className="border-1 my-4 w-full" />

      {selectedDelegate ? (
        <>
          <Tooltip
            className="bg-blue-grey-lighter"
            label={selectedDelegate?.account?.address}
          >
            <div className="mb-6 flex h-14 w-full items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
              <OptimisedImage
                src={selectedDelegate?.account?.picture || '/img/icons/wallet-placeholder.png'}
                alt="wallet"
                className="size-10 max-h-10 min-h-10 min-w-10 max-w-10 overflow-hidden rounded-full"
                layout="cover"
              />
              <span className="text-caption truncate">{displayName}</span>
            </div>
          </Tooltip>

          <p className={cx('mb-6', { 'text-gray-400': !formatedStatementSummaryOrBio })}>
            {formatedStatementSummaryOrBio || 'No bio provided'}
          </p>

          <div className="flex w-full flex-1 items-end">
            <Button
              isLoading={false}
              className="w-full"
              onClick={onDelegateClick}
            >
              {getTextFromDictionary("stepper_step2_votingPowerSection_confirm")}
            </Button>
          </div>
        </>
      ) : (
        <p className="m-auto text-gray-400">{getTextFromDictionary("stepper_step2_delegate_chooseDelegate")}</p>
      )}
    </form>
  )
}
