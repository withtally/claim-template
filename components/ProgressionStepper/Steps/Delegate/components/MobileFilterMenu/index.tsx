import { IconButton, Menu, MenuButton, MenuDivider, MenuItemOption, MenuList, MenuOptionGroup } from '@chakra-ui/react'
import FilterIcon from '../../../../../../public/img/icons/filter-icon.svg'
import { FC } from 'react'
import { FocusAreasEnum, SeekingDelegationEnum, SortOptionsEnum } from '~/types/FilterAndSortingOptions'

interface Props {
  selectedArea: FocusAreasEnum | ''
  setSelectedArea: (value: any) => void
  seekingDelegationValue: SeekingDelegationEnum | ''
  setSeekingDelegation: (value: any) => void
  sortOptionValue: SortOptionsEnum
  setSortOptionValue: (value: any) => void
  FocusAreasOptions: { value: FocusAreasEnum; text: FocusAreasEnum }[]
  seekingDelegatesOptions: { value: SeekingDelegationEnum; text: SeekingDelegationEnum }[]
  sortOptions: { value: SortOptionsEnum; text: string }[]
}

export const MobileMilterMenu: FC<Props> = ({
  selectedArea,
  setSelectedArea,
  seekingDelegationValue,
  setSeekingDelegation,
  sortOptionValue,
  setSortOptionValue,
  FocusAreasOptions,
  seekingDelegatesOptions,
  sortOptions,
}) => {
  return (
    <Menu closeOnSelect={false}>
      <MenuButton
        size={'md'}
        variant="secondary"
        as={IconButton}
        icon={<FilterIcon className="size-3" />}
      />
      <MenuList>
        <MenuOptionGroup
          value={seekingDelegationValue}
          title="Seeking Delegations"
          type="radio"
          onChange={setSeekingDelegation}
        >
          <MenuItemOption value="">All Delegates</MenuItemOption>
          {seekingDelegatesOptions.map(({ text, value }) => (
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
