import React, {useEffect, useState} from "react";
import YouTube from "react-youtube";
import LazyLoad from 'react-lazy-load';

import {getYoutubeIdFromURL} from "../../utils/common.util";

interface IProps {
    videoURL: string;
    id: string;
    currentVideo: string

    handlePlayVideo(id: string): (e: any) => void
}

const VideoPlayer: React.FC<IProps> = ({videoURL, handlePlayVideo, currentVideo, id}) => {

    const [playerControl, setPlayerControl] = useState<any>(null)
    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        if (currentVideo !== id && ready) {
            playerControl.pauseVideo()
        }
    }, [currentVideo, ready])

    const handleOnReady = (event) => {
        setPlayerControl(event.target)
        setReady(true)
    }

    return (
        <LazyLoad>
            <YouTube onReady={handleOnReady} onPlay={handlePlayVideo(id)} videoId={getYoutubeIdFromURL(videoURL)}
                     opts={{
                         height: '345', width: '420', playerVars: {}
                     }}
            />
        </LazyLoad>
    )
}

export default VideoPlayer