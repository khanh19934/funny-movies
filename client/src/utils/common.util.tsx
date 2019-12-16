const getYoutubeIdFromURL = (url: string): any => {
    const regexForYoutubeUrl = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\v(?:i)?=))([^#\\?]+).*/
    const matched =  url.match(regexForYoutubeUrl)
    if(matched) {
        return matched[1]
    }
    return ""
}

export {getYoutubeIdFromURL}