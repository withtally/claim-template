import { FC, useState } from 'react'
import Container from '~/components/Layout/Container'
import { useGetDelegates } from '~/hooks/delegateStep/useGetDelegates'
import { DelegateCard } from '~/components/Layout/DelegateCard'
import { Delegate } from '~/types/delegate'
import { VotingPowerSection } from './components/VotingPowerSection'
import { useDelegateSelector } from '~/hooks/delegateStep/useDelegateSelection'
import { Spinner } from '@chakra-ui/react'

interface DelegateStepProps {
  onBack: () => void
  onSubmit: () => void
}

const DelegateStep: FC<DelegateStepProps> = ({ onSubmit }) => {
  const { delegates, isError, error, isFetched, isLoading } = useGetDelegates()
  const { selectedDelegate, onDelegateSelect } = useDelegateSelector()

  return (
    <div className="inline snap-start transition-opacity">
      <section className="min-w-[100vw] max-h-[100vh] overflow-auto">
        <Container
          className='relative mt-[250px] mb-[250px] max-w-[1920px]'
          // className="flex h-svh items-center pb-[72px] pt-20 xxs:static xxs:px-4 md:px-6 md:pb-20 md:pt-16"
         >
          {/* <div className="mx-auto flex gap-x-10 overflow-auto"> */}
          <div className="relative mx-auto flex flex-col-reverse lg:flex-row gap-10">
            {/* LEFT SIDE */}
            <div className="h-[auto] w-full overflow-y-auto rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md">
              <h2 className="mb-4 text-xl font-medium md:text-3xl">Choose a Delegate</h2>
              <p className="text-md mb-4 text-gray-400 md:text-xl">
                Pick someone who you believe will be invested in growing the ecosystem.
                <br />
                <b>You will keep all of your tokens.</b> The delegate only gets the voting power alloted to your token
                value. You can keep voting power for yourself or redelegate at any time.
              </p>
              <button className="mb-10 transition-colors hover:text-blue ">
                <span className="text-sm md:text-base">
                  <u>I want to delegate to myself</u>
                </span>
              </button>
              {/* DELEGATE CARD */}
              {
                isFetched && !isError && (
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                  {/* CARDS */}
                  {delegates.map((delegate) => (
                    <DelegateCard
                      delegate={delegate}
                      isSelected={delegate.id === selectedDelegate?.id}
                      setSelectedDelegate={onDelegateSelect}
                      key={delegate.id}
                    />
                  ))}
                </div>
                )
              }

              {
                isLoading && (
                <div className='flex justify-center'>
                  <Spinner size='xl' />
                </div>
                )
              }

            </div>
            {/* RIGHT SIDE */}
            <VotingPowerSection selectedDelegate={selectedDelegate} />
          </div>
        </Container>
      </section>
    </div>
  )
}

export default DelegateStep
