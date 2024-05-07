import { Select as ChakraSelect } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  value: string;
  placeholder?: string;
  options: { value: string; text: string }[];
  className?: string;
  onChange?: (newValue: any) => void;
}

export const Select: FC<Props> = ({
  value,
  className,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <ChakraSelect
      className={className}
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
      placeholder={placeholder}
      value={value}
    >
      {options.map((optionItem) => (
        <option key={optionItem.value} value={optionItem.value}>
          {optionItem.text}
        </option>
      ))}
    </ChakraSelect>
  );
};
