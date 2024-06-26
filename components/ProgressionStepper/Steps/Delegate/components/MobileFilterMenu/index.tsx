import { Button, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import FilterIcon from '../../../../../../public/img/icons/filter-icon.svg'
import { FC } from 'react'
import { SortOptionsEnum } from '~/types/FilterAndSortingOptions'

interface Props {
  selectedArea: string
  setSelectedArea: (value: any) => void
  sortOptionValue: SortOptionsEnum
  setSortOptionValue: (value: any) => void
  FocusAreasOptions: { value: string; text: string }[]
  sortOptions: { value: SortOptionsEnum; text: string }[]
}

export const MobileMilterMenu: FC<Props> = ({
  selectedArea,
  setSelectedArea,
  sortOptionValue,
  setSortOptionValue,
  FocusAreasOptions,
  sortOptions,
}) => {
  return (
    <Menu closeOnSelect={true} placement="bottom-end">
      <MenuButton
        size={'md'}
        variant="secondary"
        borderRadius="5px"
        className="max-xsm:w-full"
        textAlign="start"
        as={Button}
        rightIcon={<FilterIcon className="size-3 ml-2" />}
      >Filter</MenuButton>
      <MenuList>
        <MenuOptionGroup
          value={selectedArea}
          title="Issues"
          type="radio"
          onChange={setSelectedArea}
        >
          <MenuItemOption value="">All Focus Areas</MenuItemOption>

          {FocusAreasOptions.map(({ text, value }) => (
            <MenuItemOption
              key={value}
              value={value}
            >
              {text}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
        <MenuDivider />

        <MenuOptionGroup
          value={sortOptionValue}
          title="Sort by"
          type="radio"
          onChange={setSortOptionValue}
        >
          {sortOptions.map(({ text, value }) => (
            <MenuItemOption
              key={value}
              value={value}
            >
              {text}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  )
}
