import { Box, useToast, UseToastOptions } from '@chakra-ui/react'
import { RenderProps } from '@chakra-ui/toast/dist/toast.types'
import React from 'react'
import CrossIcon from '~/public/img/icons/cross.svg'
import { ToastIcon } from '~/hooks/useToasters/ToastIcon'

const SECOND = 1000;

const useCustomToasters = () => {
  const commonOptionsForToaster: Partial<UseToastOptions> = {
    duration: 10 * SECOND,
    isClosable: true,
    position: 'top-right',
    render(props: RenderProps): React.ReactNode {
      return <CustomToast {...props}/>;
    }
  }
  const errorToast = useToast({ status: 'error', ...commonOptionsForToaster})
  const successToast = useToast({ status: 'success', ...commonOptionsForToaster })
  const warningToast = useToast({ status: 'warning', ...commonOptionsForToaster })
  const infoToast = useToast({ status: 'info', ...commonOptionsForToaster })
  const loadingToast = useToast({ status: 'loading', ...commonOptionsForToaster })

  return {
    errorToast,
    successToast,
    warningToast,
    infoToast,
    loadingToast
  }
}

const CustomToast = (props: RenderProps) => {
  const { status, title, onClose } = props;
    return (
      <Box bg={`toastBg.${status}`} className='relative py-[12px] pl-[16px] px-[32px] rounded-[0.375rem]'>
        <div onClick={onClose} className='absolute top-[5px] right-[5px] cursor-pointer p-[3px]'>
          <CrossIcon className="text-black size-3"/>
        </div>
        <div className='flex items-center gap-x-3 font-bold text-black'>
          <ToastIcon status={status}/>
          {title}
        </div>
      </Box>
    )
}

export default useCustomToasters;




