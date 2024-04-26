import { FC } from 'react'
import TickIcon from '~/public/img/icons/tick.svg'

export const SelectedMark: FC = () => {
  return (
    <div className="absolute right-2 top-2 inline-flex items-center gap-x-2 rounded bg-green/20 p-1 pb-1.5 text-xs text-green">
      <TickIcon className="size-3" />
      {/* <span className="text-caption uppercase">Selected</span> */}
    </div>
  )
}
