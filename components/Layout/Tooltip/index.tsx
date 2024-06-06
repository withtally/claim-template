import { useDisclosure } from "@chakra-ui/hooks";
import { Tooltip } from "@chakra-ui/react";
import React, { FC, ReactElement } from "react";

interface Props {
  label: string;
  children: ReactElement;
}

const CustomTooltip: FC<Props> = ({ label, children }) => {
  const { isOpen, onOpen, onToggle, onClose } = useDisclosure();

  return (
    <Tooltip label={label} isOpen={isOpen} className="bg-blue-grey-lighter">
      {React.cloneElement(children, {
        onMouseEnter: onOpen,
        onMouseLeave: onClose,
        onClick: onToggle,
      })}
    </Tooltip>
  );
};

export default CustomTooltip;
