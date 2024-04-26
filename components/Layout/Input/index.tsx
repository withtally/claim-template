import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { FC } from "react";
import { UIconfig } from "~/config/UIconfig";
import Cross from "../../../public/img/icons/cross.svg";

interface Props {
  inputLeftElement?: any;
  placeholder: string;
  value?: string;
  onChange?: (newValue: string) => void;
  className?: string;
  inputGroupClassName?: string;
  isInvalid?: boolean;
  isSuccess?: boolean;
  showCross?: boolean;
}

export const Input: FC<Props> = ({
  placeholder,
  inputLeftElement,
  value,
  onChange,
  className,
  inputGroupClassName,
  isInvalid,
  isSuccess,
  showCross,
}) => {
  const successStyles = {
    borderColor: `${UIconfig.colors.selected} !important`,
    boxShadow: `0 0 0 1px ${UIconfig.colors.selected} !important`,
    _focus: {
      borderColor: `${UIconfig.colors.selected} !important`,
      boxShadow: `0 0 0 1px ${UIconfig.colors.selected} !important`,
    },
  };

  return (
    <InputGroup className={inputGroupClassName}>
      {inputLeftElement && (
        <InputLeftElement>{inputLeftElement}</InputLeftElement>
      )}
      <ChakraInput
        value={value}
        className={className}
        placeholder={placeholder}
        isInvalid={isInvalid}
        sx={isSuccess && successStyles}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
        errorBorderColor={UIconfig.modal.errorColor}
      />

      {showCross && value && (
        <InputRightElement>
          <button
            onClick={() => onChange("")}
            className=" rounded p-2 hover:bg-black hover:bg-opacity-20"
          >
            <Cross className="size-3" />
          </button>
        </InputRightElement>
      )}
    </InputGroup>
  );
};
