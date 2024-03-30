import { Input as ChakraInput, InputGroup, InputLeftElement } from '@chakra-ui/react'
import { FC } from 'react'

interface Props {
  inputLeftElement?: any
  placeholder: string
  value?: string
  onChange?: (newValue: string) => void
  className?: string
  inputGroupClassName?: string
}

export const Input: FC<Props> = ({
  placeholder,
  inputLeftElement,
  value,
  onChange,
  className,
  inputGroupClassName,
}) => {
  return (
    <InputGroup className={inputGroupClassName}>
      {inputLeftElement && <InputLeftElement>{inputLeftElement}</InputLeftElement>}
      <ChakraInput
        value={value}
        className={className}
        placeholder={placeholder}
        onChange={(e) => {
          onChange && onChange(e.target.value)
        }}
        // TODO: change to error color
        errorBorderColor="crimson"
      />
    </InputGroup>
  )
}
