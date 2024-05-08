import { ListItem, UnorderedList } from "@chakra-ui/react";
import cx from "classnames";
import { FC } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import Container from "~/components/Layout/Container";
import { UIconfig } from "~/config/UIconfig";
import { ClaimStatusEnum, Proof } from "~/types/common";
import { useClaimContext } from "../../../../contexts/ClaimContext";
import { CheckAnotherWallet } from "./components/CheckAnotherWallet";

interface Props {
  proof: Proof | undefined;
}

const ClaimDeniedScreen: FC<Props> = ({ proof }) => {
  const { claimStatus } = useClaimContext();

  return (
    <div className="inline snap-start transition-opacity">
      <section className="mt-[64px] h-[calc(100svh-64px)] w-[100svw] overflow-auto flex flex-col">
        <Container
          className={cx(
            "relative mt-[3svh] mb-[10px] max-w-[1920px] flex flex-col flex-1",
          )}
        >
          <div className="flex flex-1 items-center justify-center">
            <div
              className={cx(
                "flex flex-col relative z-10 mx-auto items-center justify-center rounded-2xl bg-blue-grey/70 p-4 backdrop-blur-md md:p-6 w-full max-w-[800px] mb-10",
              )}
            >
              <h3 className="flex-1 w-full text-subheading mb-1 text-center">
                {claimStatus === ClaimStatusEnum.NOT_ELIGIBLE
                  ? "Sorry you aren’t eligible"
                  : "Sorry you have already claimed tokens"}
              </h3>

              <hr className="border-1 my-4 w-full" />

              <div className={cx("flex w-full flex-grow flex-col items-start")}>
                {claimStatus === ClaimStatusEnum.NOT_ELIGIBLE && (
                  <h3 className="text-caption">Eligibility Criteria:</h3>
                )}
                {claimStatus === ClaimStatusEnum.NOT_ELIGIBLE && (
                  <UnorderedList className="mb-6 text-caption inline-flex flex-col items-start gap-y-2 list-disc marker:text-blue">
                    {UIconfig.eligibilityCriterias.map((criteria, i) => (
                      <ListItem
                        key={i}
                        className="gap-x-4 first:mt-2 items-center"
                      >
                        <span>{criteria}</span>
                      </ListItem>
                    ))}
                  </UnorderedList>
                )}

                {claimStatus === ClaimStatusEnum.ALREADY_CLAIMED && (
                  <AvailableTokensBlock
                    useXsTitle
                    amount={proof?.amount}
                    title="You have received"
                  />
                )}

                <hr className="border-1 my-4 w-full" />

                {claimStatus === ClaimStatusEnum.ALREADY_CLAIMED && (
                  <>
                    <p className="mb-4 text-caption">
                      You may try another wallet to claim and delegate tokens.
                    </p>
                  </>
                )}
                <h2 className="text-caption text-[18px] mb-3 ">
                  Check another wallet for eligibility:
                </h2>
                <CheckAnotherWallet />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ClaimDeniedScreen;
