import { Button } from "@chakra-ui/react";
import { FC } from "react";
import Container from "~/components/Layout/Container";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import { UIconfig } from "~/config/UIconfig";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";

interface HeaderProps {
  onClick: () => void;
}

const Header: FC<HeaderProps> = ({ onClick }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-end pr-40">
        <OptimisedImage
          src={UIconfig.backgroundImage.deckstop}
          alt=""
          layout="cover"
          className="w-[600px] overflow-hidden rounded-md"
        />
      </div>
      <Container className="flex h-svh min-h-[600px] flex-col items-start justify-center pt-16">
        <header className="flex flex-col items-start gap-y-6">
          <h1 className="text-display-m">
            {getTextFromDictionary("site_title")}{" "}
            {getTextFromDictionary("home_siteType")}
          </h1>
          <p className="text-title text-gray-400">
            {getTextFromDictionary("home_checkEligibility")}
          </p>
          <Button onClick={onClick}>Check eligibility</Button>
        </header>
      </Container>
    </section>
  );
};

export default Header;
