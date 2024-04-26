import cx from "classnames";
import { FC, memo } from "react";
import { convertTokensAmount } from "../../../libs/helpers/convertTokensAmount";

interface Props {
  amount: string;
  title?: string;
  useXsTitle?: boolean;
}

export const AvailableTokensBlock: FC<Props> = memo(
  ({ title, amount, useXsTitle }) => {
    return (
      <div className="w-full">
        {title && (
          <span
            className={cx("text-caption mb-2 block uppercase", {
              "text-xs": useXsTitle,
            })}
          >
            {title}
          </span>
        )}

        <div className="flex h-14 items-center gap-x-4 rounded-full bg-blue-grey-lighter px-2">
          <div className="inline-flex size-10 items-center justify-center rounded-full bg-blue-grey">
            <div className="gradient-background orange-blue-gradient size-6 | min-h-6 min-w-6 max-w-6 overflow-hidden rounded-full xxs:relative xxs:z-0 xxs:opacity-100 xxs:blur-none" />
          </div>
          <span className="text-caption">{convertTokensAmount(amount)}</span>
        </div>
      </div>
    );
  },
);
