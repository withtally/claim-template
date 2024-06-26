import cx from "classnames";
import { FC, useState } from "react";
import { AvailableTokensBlock } from "~/components/Layout/AvailableTokensBlock";
import StepForm from "~/components/ProgressionStepper/StepForm";
import { stepItems } from "~/components/ProgressionStepper/Steps/Initial/presets";
import InfoIcon from "~/public/img/icons/info.svg";
import TickIcon from "~/public/img/icons/tick.svg";
import { Proof } from "~/types/common";
import { getTextFromDictionary } from "~/utils/getTextFromDictionary";

interface InitialScreenProps {
  onSubmit: () => void;
  proof: Proof | undefined;
}

const InitialScreen: FC<InitialScreenProps> = ({ onSubmit, proof }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const _onSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit();
    }, 100);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 200);
  };

  return (
    <div className="inline snap-start transition-opacity">
      <StepForm
        isLoading={isSubmitting}
        title={getTextFromDictionary("site_title")}
        buttonText={getTextFromDictionary("stepper_step1_confirm")}
        onSubmit={onSubmit}
      >
        <ul className="mb-6">
          <li className="border-b py-4 first:border-t">
            <AvailableTokensBlock
              amount={proof?.amount}
              title="You will receive"
            />
          </li>

          {stepItems.map(({ title, description }, i) => (
            <li key={title} className="border-b py-4 first:border-t">
              <div
                className={cx(
                  "mb-2 flex items-center justify-between transition-colors",
                  {
                    "text-green": i === 0 && isSubmitting,
                  },
                )}
              >
                <h3 className="text-caption inline-flex items-center gap-x-4 uppercase">
                  <span>{i + 1}</span>
                  <span>{title}</span>
                </h3>
                {i === 0 && isSubmitting && <TickIcon className="size-4" />}
              </div>
              <p className="text-gray-400">{description}</p>
            </li>
          ))}
        </ul>
        <p className="w-full text-center">
          You will need to approve{" "}
          <b>
            {getTextFromDictionary("stepper_step1_amountOfActions")} actions
          </b>{" "}
          in your wallet.
        </p>
        <div
          className={cx(
            "w-full overflow-hidden transition-[max-height,opacity,margin] duration-500",
            {
              "max-h-0 opacity-0": !isSubmitting,
              "my-4 max-h-16 overflow-visible": isSubmitting,
            },
          )}
        >
          <div className="flex w-full items-center gap-x-2 rounded-md bg-blue-grey-lighter p-4 text-xs">
            <InfoIcon className="size-4 text-white" />
            <div>
              <p>{getTextFromDictionary("stepper_step1_progressInfo")}</p>
              <span className="text-gray-400">
                {getTextFromDictionary("stepper_step1_progress")}
              </span>
            </div>
          </div>
        </div>
      </StepForm>
    </div>
  );
};

export default InitialScreen;
