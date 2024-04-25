import { Button, ListItem, UnorderedList } from "@chakra-ui/react";
import cx from "classnames";
import { FC, useState } from "react";
import Container from "~/components/Layout/Container";
import { Input } from "~/components/Layout/Input";
import { UIconfig } from "~/config/UIconfig";
import useCustomToasters from "~/hooks/useToasters";
import { Address, ClaimStatusEnum } from "~/types/common";
import { useClaimContext } from "../../../../contexts/ClaimContext";

interface InitialScreenProps {}

const ClaimDeniedScreen: FC<InitialScreenProps> = () => {
  const [address, setAddress] = useState("");
  const [infoBlock, setInfoBlock] = useState<ClaimStatusEnum>(
    ClaimStatusEnum.UNKNOWN,
  );

  const { infoToast } = useCustomToasters();

  const handleCheckButtonClick = async () => {
    setInfoBlock(ClaimStatusEnum.UNKNOWN);
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
      infoToast({ title: "Please enter a valid ETH address" });
      setInfoBlock(ClaimStatusEnum.INVALID_ADDRESS);
      return;
    }
    const isAbleToClaim = await checkEligibilityOfAnotherWallet(
      address as Address,
    );
    setInfoBlock(isAbleToClaim);
  };

  const {
    claimStatus,
    checkEligibilityOfAnotherWallet,
    isCheckingEligibility,
  } = useClaimContext();

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
                        <span>{criteria.name}</span>
                      </ListItem>
                    ))}
                  </UnorderedList>
                )}

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
                <div className="flex flex-col gap-y-3 w-[500px]">
                  <Input
                    showCross
                    placeholder="Enter wallet address"
                    value={address}
                    onChange={setAddress}
                    isInvalid={
                      infoBlock === ClaimStatusEnum.NOT_ELIGIBLE ||
                      infoBlock === ClaimStatusEnum.ALREADY_CLAIMED ||
                      infoBlock === ClaimStatusEnum.INVALID_ADDRESS
                    }
                    isSuccess={infoBlock === ClaimStatusEnum.ELIGIBLE}
                  />

                  <div
                    className={cx(
                      "w-full overflow-hidden transition-[max-height,opacity,margin] duration-300",
                      {
                        "max-h-0 opacity-0":
                          infoBlock === ClaimStatusEnum.UNKNOWN,
                        "max-h-16 overflow-visible":
                          infoBlock !== ClaimStatusEnum.UNKNOWN,
                      },
                    )}
                  >
                    <InfoBlockBody eligibleStatus={infoBlock} />
                  </div>

                  <Button
                    size="md"
                    className="px-2 w-full"
                    px={8}
                    isLoading={isCheckingEligibility}
                    onClick={handleCheckButtonClick}
                    isDisabled={!address}
                  >
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

const InfoBlockBody: FC<{ eligibleStatus: ClaimStatusEnum }> = ({
  eligibleStatus,
}) => {
  const info = {
    [ClaimStatusEnum.ALREADY_CLAIMED]: (
      <p className="text-errorColor">
        Sorry, you already claimed tokens via this wallet
      </p>
    ),
    [ClaimStatusEnum.NOT_ELIGIBLE]: (
      <p className="text-errorColor">Sorry this wallet is not eligible</p>
    ),
    [ClaimStatusEnum.ELIGIBLE]: (
      <p className="text-green">This wallet is eligible. </p>
    ),
    [ClaimStatusEnum.INVALID_ADDRESS]: (
      <p className="text-errorColor">Please enter a valid ETH address. </p>
    ),
  };

  return info[eligibleStatus];
};

export default ClaimDeniedScreen;
