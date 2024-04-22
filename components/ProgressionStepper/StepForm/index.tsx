import cx from "classnames";
import { FC, ReactNode } from "react";
import { Button } from "@chakra-ui/react";
import Container from "~/components/Layout/Container";

interface StepFormProps {
  title?: string | ReactNode;
  errorText?: string;
  buttonText: string;
  isLoading?: boolean;
  disableOverflow?: boolean;
  onBack?: () => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  containerClassName?: string;
  scrollContainerClassName?: string;
  className?: string;
  children?: ReactNode;
}

const StepForm: FC<StepFormProps> = ({
                                       title,
                                       errorText,
                                       buttonText = "Continue",
                                       isLoading,
                                       disableOverflow,
                                       onBack,
                                       onSubmit,
                                       containerClassName,
                                       scrollContainerClassName,
                                       className,
                                       children
                                     }) => (
  <section className="min-w-[100vw]">
    <Container
      className={cx(
        "flex h-screen items-center pb-[72px] pt-20 xxs:static xxs:px-4 md:px-6 md:pb-20 md:pt-16",
        containerClassName
      )}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        className={cx(
          "relative z-10 mx-auto flex max-h-[calc(100svh-150px)] w-full max-w-[calc(100vw-32px)] flex-col items-center justify-center rounded-2xl bg-blue-grey/70 p-4 pt-4 backdrop-blur-md md:max-h-[calc(100vh-160px)] md:max-w-[450px] md:p-6 xl:max-h-[calc(100vh-260px)]",
          className,
          {
            "overflow-hidden": !disableOverflow
          }
        )}
      >
        {title && (
          <h2 className="text-center text-xl font-bold xs:text-2xl">
            <span>{title}</span>
          </h2>
        )}
        <div
          className={cx("my-4 flex w-full flex-grow flex-col items-start", scrollContainerClassName, {
            "overflow-y-auto": !disableOverflow
          })}
        >
          {children}
        </div>
        {errorText && <p className="mb-4 text-center text-[red]/60">{errorText}</p>}
        <div
          className={cx("grid w-full gap-x-4 gap-y-2", {
            "grid-cols-1 md:grid-cols-2": onBack
          })}
        >
          {onBack && (
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={isLoading}
              onClick={onBack}
              // labelClassName="md:translate-x-0 -translate-x-3"
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            isLoading={isLoading}
            // labelClassName="md:translate-x-0 translate-x-3"
            className="w-full"
          >
            {buttonText}
          </Button>
        </div>
      </form>
    </Container>
  </section>
);

export default StepForm;
