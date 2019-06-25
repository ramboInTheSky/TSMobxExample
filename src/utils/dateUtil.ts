export const getDateTimeString = (date?: string) => {
    if (date) {
        const dateObj = new Date(date)
        if (dateObj.toString() !== 'Invalid Date') {
            return `${dateObj.toDateString()}, ${dateObj.toLocaleTimeString().substring(0, 5)}`
        }
        return dateObj.toString()
    }
    return 'The Future'
}

