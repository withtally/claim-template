import { chakra } from "@chakra-ui/react";
import { useClaimContext } from "contexts/ClaimContext";
import Link from "next/link";
import { FC } from "react";
import Container from "~/components/Layout/Container";
import MobileNavBar from "~/components/Layout/MobileNavBar";
import { SocialIcon } from "~/components/Layout/Nav/Navbar/presets";
import { OptimisedImage } from "~/components/Layout/OptimisedImage";
import { UIconfig } from "~/config/UIconfig";
import { WalletConnector } from "../../WalletConnect/WalletConnectButton";

export const Links = () => {
  return (
    <>
      {UIconfig.navigation.map((nav, i) => (
        <chakra.li
          key={i}
          className="cursor-pointer transition-colors"
          _hover={{
            color: "primary.600",
          }}
        >
          <Link href={nav.url}>{nav.title}</Link>
        </chakra.li>
      ))}
    </>
  );
};

export const SocialButtons = () => {
  return (
    <>
      {UIconfig.socialMedia
        .filter((el) => el.url)
        .map((el, i) => (
          <Link key={i} href={el.url} target="_blank">
            <SocialIcon
              messenger={el.name}
              className="size-8 transition-colors hover:text-blue"
            />
          </Link>
        ))}
    </>
  );
};

const Navbar: FC = () => {
  const { isClaimStepperVisible, setIsClaimStepperVisible } = useClaimContext();

  const isLogoImage = UIconfig.logo.type === "text";
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b bg-navbar/70 backdrop-blur-lg">
      <nav>
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-x-20">
            <Link
              href="/"
              onClick={() => {
                if (!isClaimStepperVisible) return;
                setIsClaimStepperVisible(false);
              }}
            >
              {isLogoImage ? (
                <span className="cursor-pointer select-none text-2xl font-bold">
                  {UIconfig.logo.text}
                </span>
              ) : (
                <OptimisedImage
                  src={UIconfig.logo.img}
                  alt="wallet"
                  className="h-[80px] overflow-hidden"
                />
              )}
            </Link>
            <ul className="flex items-center gap-x-6 max-lg:hidden">
              <Links />
            </ul>
          </div>

          <div className="flex items-center gap-x-10 max-lg:hidden">
            <WalletConnector />

            <ul className="flex items-center gap-x-6">
              <SocialButtons />
            </ul>
          </div>
          <MobileNavBar />
        </Container>
      </nav>
    </header>
  );
};

export default Navbar;
