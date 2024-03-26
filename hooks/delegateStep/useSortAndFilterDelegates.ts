import { useCallback, useEffect, useMemo, useState } from 'react'
import { Delegate } from '~/types/delegate'
import debounce from 'lodash.debounce'
import { FocusAreasEnum, SeekingDelegationEnum, SortOptionsEnum } from '~/types/FilterAndSortingOptions'
import { shuffleArray } from '../../libs/helpers/shuffleArray'

interface IParams {
  delegates: Delegate[] | undefined
}

export const useSortAndFilterDelegates = ({ delegates }: IParams) => {
  const amountOfDelegatesPerPage = 15
  // address search states
  const [searchValue, setSearchValue] = useState<string>('')
  const [debouncedSearchValue, setDebouncedSearchValue] = useState<string>('')
  // Focus Areas states
  const [selectedArea, setSelectedArea] = useState<FocusAreasEnum | ''>('')
  // Sort States
  const [sortOptionValue, setSortOptionValue] = useState<SortOptionsEnum>(SortOptionsEnum.VotingPower)
  // Pagination states
  const [amountOfDelegatesToShow, setAmountOfDelegatesToShow] = useState<number>(amountOfDelegatesPerPage)

  const handleDebouncedSearch = useCallback(
    debounce((newDebouncedAddress: string) => {
      setDebouncedSearchValue(newDebouncedAddress.trim())
    }, 1000),
    []
  )

  const loadNextChunkOfDelegates = useCallback(() => {
    setAmountOfDelegatesToShow((prevAmount) => prevAmount + amountOfDelegatesPerPage);
  }, [])

  // handles address change and sets new debounced address
  useEffect(() => {
    handleDebouncedSearch(searchValue)
  }, [searchValue])

  // select options ----
  const focusAreasOptions = useMemo(() => {
    return Object.values(FocusAreasEnum).map((option) => ({ value: option, text: option }))
  }, [])

  const seekingDelegatesOptions = useMemo(() => {
    return Object.values(SeekingDelegationEnum).map((option) => ({ value: option, text: option }))
  }, [])

  const sortOptions = useMemo(() => {
    return Object.values(SortOptionsEnum).map((option) => ({ value: option, text: `Sort by: ${option}` }))
  }, [])
  // select options ----

  // filter delegates
  const filteredDelegates = useMemo(() => {
    if (!delegates) {
      return []
    }

    const filteredDelegatesArr = delegates.filter((delegate) => {
      let searchValueMatches = true;
      let areasMatches = true
      let isSeekingDelegation = true

      if (debouncedSearchValue) {
        const addressMatches = delegate.account.address === debouncedSearchValue
        const ensMatches = delegate.account.ens === debouncedSearchValue;

        searchValueMatches = (addressMatches || ensMatches);
      }

      if (selectedArea) {
        if (delegate?.statement?.issues) {
          const foundIssue = delegate.statement.issues.find((issue) => issue.name === selectedArea)
          areasMatches = foundIssue ? true : false
        } else {
          areasMatches = false
        }
      }

      return searchValueMatches && areasMatches && isSeekingDelegation;
    })

    let sortedDelegatesArr = null

    switch (sortOptionValue) {
      case SortOptionsEnum.VotingPower:
        sortedDelegatesArr = filteredDelegatesArr
        break
      case SortOptionsEnum.ReceivedDelegations:
        sortedDelegatesArr = filteredDelegatesArr.sort((delegate1, delegate2) => {
          return delegate2.delegatorsCount - delegate1.delegatorsCount
        })
        break
      case SortOptionsEnum.Random:
        sortedDelegatesArr = shuffleArray(filteredDelegatesArr)
        break
      default:
        break
    }
    return sortedDelegatesArr
  }, [delegates, debouncedSearchValue, selectedArea, sortOptionValue])

  const paginatedDelegates = useMemo(() => {
    const paginatedDelegatesArr = [...filteredDelegates]

    paginatedDelegatesArr.length = amountOfDelegatesToShow > filteredDelegates.length
      ? filteredDelegates.length
      : amountOfDelegatesToShow;

    return paginatedDelegatesArr
  }, [amountOfDelegatesToShow, filteredDelegates])

  const canLoadMoreDelegates = useMemo(() => {
    return amountOfDelegatesToShow < filteredDelegates.length
  }, [filteredDelegates.length, amountOfDelegatesToShow])

  return {
    processedDelegates: paginatedDelegates,
    searchValue,
    canLoadMoreDelegates,
    selectedArea,
    focusAreasOptions,
    seekingDelegatesOptions,
    sortOptionValue,
    sortOptions,
    setSearchValue,
    setSelectedArea,
    setSortOptionValue,
    loadNextChunkOfDelegates,
  }
}
