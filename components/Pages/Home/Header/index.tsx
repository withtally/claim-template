import { Button } from "@chakra-ui/react";
import { FC } from "react";
import Container from "~/components/Layout/Container";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import { UIconfig } from "~/config/UIconfig";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";

interface HeaderProps {
  onClick: () => void;
  areDataFetched: boolean;
  isCheckingEligibility: boolean;
}

const Header: FC<HeaderProps> = ({
  onClick,
  areDataFetched,
  isCheckingEligibility,
}) => {
  const isLoading = !areDataFetched || isCheckingEligibility;

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-end 2xl:pr-40 max-xsm:hidden mt-[64px] max-h-[calc(100svh-64px)]">
        <OptimisedImage
          src={UIconfig.backgroundImage.deckstop}
          alt=""
          layout="cover"
          className="w-[40vw] max-w-[600px] overflow-hidden rounded-md "
        />
      </div>
      <Container className="flex h-svh min-h-[600px] flex-col items-start justify-center pt-16">
        <header className="min-w-full flex flex-col items-center xsm:items-start gap-y-3 md:gap-y-4 lg:gap-y-6 ">
          <h1 className="text-display-m">
            {getTextFromDictionary("site_title")}{" "}
            {getTextFromDictionary("home_siteType")}
          </h1>
          <p className="text-title text-gray-400">
            {getTextFromDictionary("home_checkEligibility")}
          </p>
          <Button
            onClick={onClick}
            isLoading={isLoading}
            className="!min-w-[200px]"
          >
            {getTextFromDictionary("home_checkEligibilityButton")}
          </Button>
        </header>
      </Container>
    </section>
  );
};

export default Header;
