import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Button, Input } from "@chakra-ui/react";
import cx from "classnames";
import { FC } from "react";
import Container from "~/components/Layout/Container";
import CustomTooltip from "~/components/Layout/Tooltip";
import { UIconfig } from "~/config/UIconfig";
import { ClaimStatusEnum } from '~/types/common'

interface InitialScreenProps {}

// const mockedValue = ClaimStatusEnum.NOT_ELIGIBLE;
const mockedValue = ClaimStatusEnum.ALREADY_CLAIMED;

const ClaimDeniedScreen: FC<InitialScreenProps> = () => {
  return (
    <div className="inline snap-start transition-opacity ">
      <section className="mt-[64px]  h-[calc(100svh-64px)] w-[100svw] overflow-auto flex flex-col">
        <Container
          className={cx(
            "relative mt-[3svh] mb-[10px] max-w-[1920px] flex flex-col flex-1",
          )}
        >
          <div className="flex flex-1 items-center justify-center">
            <div
              className={cx(
                "flex flex-col relative z-10 mx-auto items-center justify-center rounded-2xl bg-blue-grey/70 p-4 backdrop-blur-md  md:p-6 md:max-w-[450px] max-w-[calc(100vw-32px)]",
              )}
            >
              <h3 className="flex-1 w-full text-subheading mb-1 text-center">
                {mockedValue === ClaimStatusEnum.NOT_ELIGIBLE
                  ? "Sorry you aren’t eligible"
                  : "Sorry you already claimed tokens"}
              </h3>
              <hr className="border-1 my-4 w-full" />
              <div
                className={cx(
                  "mb-4 flex w-full flex-grow flex-col items-start",
                )}
              >
                {mockedValue === ClaimStatusEnum.NOT_ELIGIBLE && (
                  <h3 className="text-caption">Eligibility Criteria:</h3>
                )}
                {mockedValue === ClaimStatusEnum.NOT_ELIGIBLE && (
                  <ul className="mb-6 text-caption inline-flex flex-col items-center uppercase">
                    {UIconfig.eligibilityCriterias.map((criteria, i) => (
                      <li
                        key={i}
                        className="flex gap-x-4 first:mt-2 items-center"
                      >
                        {/*<span>0{i + 1}</span>*/}
                        <span>{criteria.name}</span>
                        <CustomTooltip label={criteria.description}>
                          <InfoOutlineIcon />
                        </CustomTooltip>
                      </li>
                    ))}
                  </ul>
                )}
                {mockedValue === ClaimStatusEnum.ALREADY_CLAIMED && (
                  <>
                    <p className="mb-4">
                      You may try another wallet to claim and delegate tokens.
                    </p>
                    {/*<hr className="border-1 my-4 w-full" />*/}
                  </>
                )}
                <h2 className="text-caption text-[18px] mb-3 ">
                  Check another wallet for eligibility:
                </h2>
                <div className="flex flex-col sm:flex-row gap-y-3">
                  <Input placeholder="Enter wallet address" mr={2} />
                  <Button size="md" className="px-2" px={8}>
                    Check eligibility
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ClaimDeniedScreen;
