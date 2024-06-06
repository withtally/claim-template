import { FC } from "react";

interface Props {
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
}

export const FormHeader: FC<Props> = ({
  isSuccess,
  isError,
  isLoading
}) => {
  return (
    <h2 className="w-full text-center text-xl font-bold xs:text-2xl">
      {isLoading && <span>Claim in progress</span>}
      {isError && <span>Claim error</span>}
      {isSuccess && <span>Claim initiated</span>}
    </h2>
  );
};
