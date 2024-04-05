import { FC } from "react";
import Container from "~/components/Layout/Container";
import { useGetDelegates } from "~/hooks/delegateStep/useGetDelegates";
import { DelegateCard } from "~/components/Layout/DelegateCard";
import { VotingPowerSection } from "./components/VotingPowerSection";
import { useDelegateSelector } from "~/hooks/delegateStep/useDelegateSelection";
import { Button, Spinner } from "@chakra-ui/react";
import SearchIcon from "../../../../public/img/icons/search.svg";
import { Input } from "~/components/Layout/Input";
import { useSortAndFilterDelegates } from "~/hooks/delegateStep/useSortAndFilterDelegates";
import { Select } from "~/components/Layout/Select";
import { MobileMilterMenu } from "./components/MobileFilterMenu";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";

interface DelegateStepProps {
  onBack: () => void;
  onSubmit: () => void;
}

const DelegateStep: FC<DelegateStepProps> = ({ onSubmit }) => {
  const { delegates, isError, error, isFetched, isLoading } = useGetDelegates();
  const { selectedDelegate, onDelegateSelect } = useDelegateSelector();
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
    loadNextChunkOfDelegates
  } = useSortAndFilterDelegates({
    delegates
  });

  return (
    <div className="inline snap-start transition-opacity">
      <section className="mt-[64px] max-h-[calc(100svh-64px)] min-w-[100vw] overflow-auto">
        <Container className="relative mb-[55px] mt-[80px] max-w-[1920px]">
          <div className="relative mx-auto flex flex-col-reverse gap-10 lg:flex-row">
            {/* LEFT SIDE */}
            <div
              className="min-h-[1000px] h-[auto] w-full overflow-y-auto rounded-2xl bg-blue-grey/70 p-6 backdrop-blur-md">
              <h2 className="mb-4 text-xl font-medium md:text-2xl xl:text-3xl">Choose a Delegate</h2>
              <p className="text-md mb-4 text-gray-400 md:text-md xl:text-xl">
                {/*Pick someone who you believe will be invested in growing the ecosystem.*/}
                {/*<br />*/}
                {/*<b>You will keep all of your tokens.</b> The delegate only gets the voting power alloted to your token*/}
                {/*value. You can keep voting power for yourself or redelegate at any time.*/}
                {getTextFromDictionary("stepper_step2_delegate_paragraph1")}
                <br />
                <b>{getTextFromDictionary("stepper_step2_delegate_bold")}</b>
                {getTextFromDictionary("stepper_step2_delegate_paragraph2")}
                {getTextFromDictionary("stepper_step2_delegate_paragraph1")}
                <br />
              </p>
              <button className="mb-10 transition-colors hover:text-blue ">
                <span className="text-sm md:text-md xl:text-base">
                  <u>{getTextFromDictionary("stepper_step2_delegate_delegateMyself")}</u>
                </span>
              </button>

              <div className="mb-10 flex flex-nowrap gap-4">
                <div className="flex-1 xl:basis-[40%]">
                  <Input
                    inputGroupClassName=""
                    value={searchValue}
                    onChange={setSearchValue}
                    placeholder={getTextFromDictionary("stepper_step2_delegate_searchPlaceholder")}
                    inputLeftElement={<SearchIcon className="size-4" />}
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
                    <p className="rounded-md border p-2 text-center">No results found</p>
                  )}

                  {canLoadMoreDelegates && (
                    <Button
                      onClick={loadNextChunkOfDelegates}
                      className="mx-auto mt-10 w-full"
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

              {isError && <div className="rounded-md border p-2 text-center">Can't fetch delegates</div>}
            </div>
            {/* RIGHT SIDE */}
            <VotingPowerSection selectedDelegate={selectedDelegate} />
          </div>
        </Container>
      </section>
    </div>
  );
};

export default DelegateStep;
