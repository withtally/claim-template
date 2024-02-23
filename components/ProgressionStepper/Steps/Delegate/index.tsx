import { FC, useState } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import { OptimisedImage } from '~/components/Layout/OptimisedImage'
import TickIcon from '~/public/img/icons/tick.svg'

interface DelegateStepProps {
  onBack: () => void
  onSubmit: () => void
}

const DelegateStep: FC<DelegateStepProps> = ({ onSubmit }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const _onSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
    }, 3000)
  }

  return (
    <div className="inline snap-start transition-opacity">
      <section className="min-w-[100vw]">
        <Container className="flex h-svh items-center pb-[72px] pt-20 xxs:static xxs:px-4 md:px-6 md:pb-20 md:pt-16">
          <div className="mx-auto flex min-w-[1200px] gap-x-10">
            {/* LEFT SIDE */}
            <div className="h-[600px] w-full rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md">
              <h2 className="mb-4 text-3xl font-medium">Choose a Delegate</h2>
              <p className="mb-4 text-xl text-gray-400">
                Pick someone who you believe will be invested in growing the ecosystem.
                <br />
                <b>You will keep all of your tokens.</b> The delegate only gets the voting power alloted to your token
                value. You can keep voting power for yourself or redelegate at any time.
              </p>
              <button className="mb-10 transition-colors hover:text-blue">
                <span>
                  <u>I want to delegate to myself</u>
                </span>
              </button>
              {/* DELEGATE CARD */}
              <div className="grid grid-cols-2 gap-4">
                {/* CARD #1 */}
                <div className="relative rounded-md border-2 bg-blue-grey p-4 pt-10">
                  <div className="absolute right-2 top-2 inline-flex items-center gap-x-2 rounded bg-green/20 p-1 pb-1.5 text-xs text-green">
                    <TickIcon className="size-4" />
                    <span className="text-caption uppercase">Selected</span>
                  </div>
                  {/* WALLET DETAILS */}
                  <div className="mb-6 flex items-center gap-x-4">
                    <OptimisedImage
                      src="/img/icons/wallet-placeholder.png"
                      alt="wallet"
                      className="mt-2 size-12 max-h-12 min-h-12 min-w-12 max-w-12 overflow-hidden rounded-full"
                    />
                    <div>
                      <h3 className="text-subheading mb-1">nevergonnagiveyouup.eth</h3>
                      <p className="break-all text-xs text-gray-400">0x7C9Aa8714e50cF4B4497631Fdb2cADC98b4B9a6D</p>
                    </div>
                  </div>

                  <p className="mb-6">
                    Liquidity mining is an important part of the decentralization process of a DAO...
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {['🎗️ Public goods funding', '⛓️ Further decentralizing the chain'].map((item) => (
                      <span
                        key={item}
                        className="whitespace-nowrap rounded-full border border-gray-600 p-2 text-xs text-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT SIDE */}
            <form
              // onSubmit={(e) => {
              //   e.preventDefault()
              //   _onSubmit()
              // }}
              className="relative z-10 flex w-full max-w-[450px] flex-col items-start rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md"
              // className="xxs:bg-transparent xxs:backdrop-blur-none"
            >
              <h2 className="text-caption text-subheading mb-6 uppercase">Voting Power</h2>

              <div className="flex h-14 w-full items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-blue-grey">
                  <OptimisedImage
                    src="/img/icons/zksync-placeholder.png"
                    alt="wallet"
                    className="size-6 max-h-6 min-h-6 min-w-6 max-w-6 overflow-hidden rounded-full"
                  />
                </div>
                <span className="text-caption">6500.0</span>
              </div>

              <hr className="my-4 w-full border-gray-500" />
              <div className="mb-6 flex h-14 w-full items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
                <OptimisedImage
                  src="/img/icons/wallet-placeholder.png"
                  alt="wallet"
                  className="size-10 max-h-10 min-h-10 min-w-10 max-w-10 overflow-hidden rounded-full"
                />
                <span className="text-caption">Lindsey Winder</span>
              </div>

              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et viverra urna. Nulla facilisi. Donec ac
                nunc nec orci aliquam lobortis. Nullam nec nunc nec orci aliquam lobortis. Nullam nec nunc nec orci
                aliquam lobortis.
              </p>

              <div className="flex w-full flex-1 items-end">
                <Button
                  // type="submit"
                  isLoading={isSubmitting}
                  labelClassName="md:translate-x-0 translate-x-3"
                  className="w-full"
                >
                  Claim and Delegate
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default DelegateStep
