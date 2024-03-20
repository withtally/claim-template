const errorMessages = {
  '-32002': 'Your MetaMask wallet is locked. Please unlock it to connect.',
  '4001': 'Connection to wallet canceled by user.',
  "User rejected the request.": 'Connection to wallet canceled by user.'
}

export const getErrorMessage = (errorCode: number, message?: string) => {
  const key = errorCode || message.split('\n')[0];
  console.log(key)
  return errorMessages[key] || 'Oops, something went wrong';
}