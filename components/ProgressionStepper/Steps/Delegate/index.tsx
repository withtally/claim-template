import { ArrowUpIcon } from "@chakra-ui/icons";
import { Button, IconButton, Spinner } from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";
import Container from "~/components/Layout/Container";
import { DelegateCard } from "~/components/Layout/DelegateCard";
import { Input } from "~/components/Layout/Input";
import { Select } from "~/components/Layout/Select";
import { useGetDelegates } from "~/hooks/delegateStep/useGetDelegates";
import { useSortAndFilterDelegates } from "~/hooks/delegateStep/useSortAndFilterDelegates";
import { Proof } from "~/types/common";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";
import { useClaimContext } from "../../../../contexts/ClaimContext";
import SearchIcon from "../../../../public/img/icons/search.svg";
import { MobileMilterMenu } from "./components/MobileFilterMenu";
import { VotingPowerSection } from "./components/VotingPowerSection";

interface DelegateStepProps {
  onBack: () => void;
  onSubmit: () => void;
  proof: Proof | undefined;
}

const DelegateStep: FC<DelegateStepProps> = ({ onSubmit, proof }) => {
  const { delegates, isError, error, isFetched, isLoading } = useGetDelegates();
  const { selectedDelegate, onDelegateSelect, delegateToMyself } = useClaimContext();
  const [isScrollToTopVisible, setIsScrollToTopVisible] =
    useState<boolean>(false);

  const ref = useRef<HTMLDivElement | null>();

  const {
    processedDelegates,
    searchValue,
    canLoadMoreDelegates,
    focusAreasOptions,
    selectedArea,
    sortOptionValue,
    sortOptions,
    setSearchValue,
    setSelectedArea,
    setSortOptionValue,
    loadNextChunkOfDelegates,
  } = useSortAndFilterDelegates({
    delegates,
  });

  useEffect(() => {
    const scrollToTop = () => {
      if (ref?.current?.scrollTop > ref.current.scrollHeight / 3) {
        setIsScrollToTopVisible(true);
      } else {
        setIsScrollToTopVisible(false);
      }
    };
    ref?.current?.addEventListener("scroll", scrollToTop);
    return () => {
      ref?.current?.removeEventListener("scroll", scrollToTop);
    };
  }, []);


  return (
    <div className="inline snap-start transition-opacity">
      <section
        ref={ref}
        className=" mt-[64px] max-h-[calc(100svh-64px)] w-[100svw] overflow-auto"
      >
        <Container className="relative mb-[55px] mt-[3svh] max-w-[1920px]">
          <div className="relative mx-auto flex flex-col-reverse gap-10 lg:flex-row">
            {isScrollToTopVisible && (
              <IconButton
                isRound={true}
                size="sm"
                aria-label="scroll to top"
                icon={<ArrowUpIcon />}
                className="!fixed bottom-4 right-[20px] z-[15]"
                onClick={() => {
                  ref.current.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            )}

            {/* LEFT SIDE */}
            <div className="min-h-[1000px] h-[auto] w-full overflow-y-auto max-md:overflow-x-hidden rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md">
              <h2 className="mb-4 text-xl font-medium md:text-2xl xl:text-3xl">
                {getTextFromDictionary("stepper_step2_delegate_chooseDelegate")}
              </h2>
              <p className="text-md mb-4 text-gray-400 md:text-md xl:text-xl">
                {getTextFromDictionary("stepper_step2_delegate_paragraph1")}
                <br />
                <b>{getTextFromDictionary("stepper_step2_delegate_bold")}</b>
                {getTextFromDictionary("stepper_step2_delegate_paragraph2")}
                {getTextFromDictionary("stepper_step2_delegate_paragraph1")}
              </p>

              {/* --- */}
              <button
                className="mb-10 transition-colors hover:text-blue"
                onClick={()=> {delegateToMyself(onSubmit)}}
              >
                <span className="text-sm md:text-md xl:text-base">
                  <u>
                    {getTextFromDictionary(
                      "stepper_step2_delegate_delegateMyself",
                    )}
                  </u>
                </span>
              </button>
              {/* --- */}

              <div className="mb-10 flex flex-nowrap gap-4">
                <div className="flex-1 xl:basis-[40%]">
                  <Input
                    inputGroupClassName=""
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder={getTextFromDictionary(
                      "stepper_step2_delegate_searchPlaceholder",
                    )}
                    inputLeftElement={<SearchIcon className="size-4" />}
                    showCross
                  />
                </div>
                <div className="hidden xl:block  basis-[30%]">
                  <Select
                    value={selectedArea}
                    onChange={setSelectedArea}
                    options={focusAreasOptions}
                    placeholder="All Focus Areas"
                    className="truncate"
                  />
                </div>
                <div className="hidden xl:block basis-[30%]">
                  <Select
                    value={sortOptionValue}
                    onChange={setSortOptionValue}
                    options={sortOptions}
                    className="truncate"
                  />
                </div>
                <div className="xl:hidden">
                  <MobileMilterMenu
                    selectedArea={selectedArea}
                    setSelectedArea={setSelectedArea}
                    sortOptionValue={sortOptionValue}
                    setSortOptionValue={setSortOptionValue}
                    sortOptions={sortOptions}
                    FocusAreasOptions={focusAreasOptions}
                  />
                </div>
              </div>

              {/* DELEGATE CARDa container */}
              {isFetched && !isError && !isLoading && (
                <div className="flex flex-col">
                  {processedDelegates.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
                      {/* CARDS */}
                      {processedDelegates.map((delegate) => (
                        <DelegateCard
                          delegate={delegate}
                          isSelected={delegate.id === selectedDelegate?.id}
                          setSelectedDelegate={onDelegateSelect}
                          key={delegate.id}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="rounded-md border p-2 text-center">
                      No results found
                    </p>
                  )}

                  {canLoadMoreDelegates && (
                    <Button
                      size="md"
                      onClick={loadNextChunkOfDelegates}
                      className="mx-auto mt-10 w-[200px]"
                    >
                      Load more
                    </Button>
                  )}
                </div>
              )}

              {isLoading && (
                <div className="flex justify-center">
                  <Spinner size="xl" />
                </div>
              )}

              {isError && (
                <div className="rounded-md border p-2 text-center">
                  Can't fetch delegates
                </div>
              )}
            </div>
            {/* RIGHT SIDE */}
            <VotingPowerSection
              selectedDelegate={selectedDelegate}
              onSubmit={onSubmit}
              proof={proof}
            />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default DelegateStep;
