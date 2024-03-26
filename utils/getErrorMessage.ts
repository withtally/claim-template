const errorMessages = {
  '-32002': 'Your MetaMask wallet is locked. Please unlock it to connect.',
  '4001': 'Connection to wallet canceled by user.',
  "User rejected the request.": 'Connection to wallet canceled by user.'
}

export const showErrorMessage = ({errorCode, message, toast} : {errorCode: number, message?: string, toast: any}) => {
  const key = errorCode || message?.split('\n')[0];
  if(key === 4001 || key === "User rejected the request." || key === undefined){
    return
  }
  if(!toast) return;
  toast({title: errorMessages[key] || 'Oops! Something went wrong. Try again later.'})
}