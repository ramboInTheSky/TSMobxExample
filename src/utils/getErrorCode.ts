
export const getErrorCode = (e: any) => {
    if (e.status === 403 || e.status === 401) {
        return 'You are not authorised to see this content, if the problem persists contact your Administrator.'
    }  if (e.message) {
        return e.message
    } else if (e.errorMessage) {
        return e.errorMessage
    } else {
        return 'Please try reload the page, if the problem persists contact your Administrator.'
    }
}
