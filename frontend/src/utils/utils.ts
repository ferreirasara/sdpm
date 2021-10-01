export const getMessageFromError = (error: any) => {
  return error?.response?.data?.message ? error?.response?.data?.message : error.message
}