import { useCallback, useState } from 'react'
import { Delegate } from '~/types/delegate'

export const useDelegateSelector = () => {
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(null)

  const onDelegateSelect = useCallback((delegate: Delegate) => {
    setSelectedDelegate(delegate)
  }, [])

  return { selectedDelegate, onDelegateSelect }
}
