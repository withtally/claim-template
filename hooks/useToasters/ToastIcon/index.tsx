import { AlertStatus } from "@chakra-ui/alert";
import { CheckCircleIcon, InfoIcon, WarningIcon } from "@chakra-ui/icons";
import { Spinner } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  className?: string;
  status: AlertStatus;
}

export const ToastIcon: FC<Props> = ({ status }) => {
  switch (status) {
    case "warning":
    case "error":
      return <WarningIcon boxSize="20px" color="black" />;
    case "info":
      return <InfoIcon boxSize="20px" color="black" />;
    case "success":
      return <CheckCircleIcon boxSize="20px" color="black" />;
    case "loading":
      return (
        <Spinner size="sm" color="black" className="!h-[20px] !w-[20px]" />
      );
    default:
      break;
  }
};
