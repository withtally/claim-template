import {
  Input as ChakraInput,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { FC } from "react";
import { UIconfig } from "~/config/UIconfig";

interface Props {
  inputLeftElement?: any;
  placeholder: string;
  value?: string;
  onChange?: (newValue: string) => void;
  className?: string;
  inputGroupClassName?: string;
  isInvalid?: boolean;
  isSuccess?: boolean;

}

export const Input: FC<Props> = ({
  placeholder,
  inputLeftElement,
  value,
  onChange,
  className,
  inputGroupClassName,
  isInvalid,
  isSuccess
}) => {

  const successStyles = {
    borderColor: `${UIconfig.colors.selected} !important`,
    boxShadow: `0 0 0 1px ${UIconfig.colors.selected} !important`,
    _focus: {
      borderColor: `${UIconfig.colors.selected} !important`,
      boxShadow: `0 0 0 1px ${UIconfig.colors.selected} !important`,
    },
  }
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
        // TODO: change to error color
        errorBorderColor="crimson"
      />
    </InputGroup>
  );
};
