import cx from 'classnames'
import { FC, useState } from 'react'
import StepForm from '~/components/ProgressionStepper/StepForm'
import { stepItems } from '~/components/ProgressionStepper/Steps/Initial/presets'
import InfoIcon from '~/public/img/icons/info.svg'
import TickIcon from '~/public/img/icons/tick.svg'
import { getTextFromDictionary } from '~/utils/getTextFromDictionary'
import { UIconfig } from '~/config/UIconfig'
import Container from '~/components/Layout/Container'
import { Button, Input, Tooltip } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

interface InitialScreenProps {
}

const NotEligibleScreen: FC<InitialScreenProps> = () => {

  return (
    <div className="inline snap-start transition-opacity">
      <section className="min-w-[100vw]">
        <Container
          className={cx(
            "flex h-screen items-center pb-[72px] pt-20 xxs:static xxs:px-4 md:px-6 md:pb-20 md:pt-16",
          )}
        >
          <div
            className={cx(
              "relative z-10 mx-auto flex max-h-[calc(100svh)] flex-col items-center justify-center rounded-2xl bg-blue-grey/70 p-4 backdrop-blur-md md:max-h-[calc(100vh-160px)]  md:p-6 xl:max-h-[calc(100vh-260px)]",
            )}
          >
            <div className="flex items-center gap-x-4 min-w-full overflow-hidden pb-[10px] border-b">
              <h3 className="flex-1 w-full text-subheading mb-1 text-center">
                Sorry you aren’t eligible
              </h3>
            </div>
            <div
              className={cx("my-4 flex w-full flex-grow flex-col items-start")}
            >
              <h3 className="text-caption">Eligibility Criteria:</h3>
              <ul className="mb-6 text-caption inline-flex flex-col items-center uppercase">
                {UIconfig.eligibilityCriterias.map((criteria, i) => (
                  <li key={i} className="flex gap-x-4 first:mt-2 items-center">
                    {/*<span>0{i + 1}</span>*/}
                    <span>{criteria.name}</span>
                    <Tooltip label={criteria.description}>
                      <InfoOutlineIcon/>
                    </Tooltip>
                  </li>
                ))}
              </ul>
              <h2  className="text-caption text-[18px] mb-3 ">
                Check another wallet for eligibility:
              </h2>
              <div className="flex flex-col sm:flex-row gap-y-3">
                <Input
                  placeholder="Enter wallet address"
                  mr={2}
                />
                <Button size="md" className="px-2" px={8}>
                  Check eligibility
                </Button>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}

export default NotEligibleScreen
