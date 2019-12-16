import io from "socket.io-client"
import React, {useEffect, useState, useRef} from 'react'

import VideoItem from "../../components/VideoItem/VideoItem.component";
import ContentLoader from "../../components/ContentLoader/ContentLoader.component"
import {getMovieList, IMovieList} from "../../services/shareMovie.service"
import {getAccessToken} from "../../services/localStorage.service";

const HomePage: React.FC = () => {

    const [movieList, setMovieList] = useState<IMovieList[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [currentVideo, setCurrentVideo] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [loadMoreLoading, setLoadMoreLoading] = useState<boolean>(false)
    const token = getAccessToken();

    const {current: socket} = useRef(io('http://localhost:5000', {query: `auth_token=${token}`}));

    useEffect(() => {
        (async () => {
            const res = await getMovieList()
            setMovieList(res.videoList)
            setCurrentPage(res.page)
            setHasMore(res.hasMore)
            setLoading(false)

        })()
    }, [])

    useEffect(() => {
        socket.open()
        socket.on('THUMB_UP_RESPONSE', data => {
            setMovieList(prev => prev.map(item => {
                if (item._id === data._id) {
                    return data
                }
                return item
            }))
        })

        socket.on('THUMB_DOWN_RESPONSE', data => {
            setMovieList(prev => prev.map(item => {
                if (item._id === data._id) {
                    return data
                }
                return item
            }))
        })

        return () => {
            socket.close()
        }
    }, [])

    useEffect(() => {

        const handleOnScrollEvent = async () => {
            const videoList: HTMLElement | any = document.getElementById('videoList')
            if (window.scrollY + window.innerHeight === videoList.clientHeight + videoList.offsetTop && hasMore) {
                setLoadMoreLoading(true)
                const res = await getMovieList(currentPage + 1)
                setLoadMoreLoading(false)
                setMovieList(prevState => prevState.concat(res.videoList))
                setCurrentPage(currentPage + 1)
                setHasMore(res.hasMore)
            }
        }
        window.addEventListener('scroll', handleOnScrollEvent)

        return () => {
            window.removeEventListener('scroll', handleOnScrollEvent)
        }
    }, [hasMore])


    const handlePressThumbUp = (videoId: any) => {
        socket.emit('THUMB_UP', {videoId})
    }

    const handlePressThumbDown = (videoId: any) => {
        socket.emit('THUMB_DOWN', {videoId})
    }

    const handlePlayVideo = (id) => (e) => {
        setCurrentVideo(id)
    }

    return (
        <div className="container-fluid  pb-4 home__container" style={{paddingTop: '76px'}} id="videoList">
            <div className="container">
                {
                    loading ?
                        (
                            <div className="bg-white">
                                <ContentLoader/>
                            </div>
                        ) : (
                            <React.Fragment>
                                {movieList.map((movies) => (
                                    <div key={movies._id} className="row bg-white pt-3 pl-1 pr-1 pb-3 mb-4">
                                        <VideoItem currentVideo={currentVideo} handlePlayVideo={handlePlayVideo}
                                                   onClickThumbDown={handlePressThumbDown}
                                                   onClickThumbUp={handlePressThumbUp} {...movies}/>
                                    </div>))}
                                {loadMoreLoading && (
                                    <div className="bg-white">
                                        <ContentLoader/>
                                    </div>
                                )}
                            </React.Fragment>
                        )


                }
            </div>
        </div>

    )
}

export default HomePage
