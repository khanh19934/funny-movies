import React, {useState} from "react";
import Linkify from "react-linkify";

import VideoPlayer from "../VideoPlayer/VideoPlayer.component"
import classNames from "classnames";
import {ReactComponent as ThumbUpLogo} from "../../assets/logo/thumb_up.svg"
import {ReactComponent as ThumbDownLogo} from "../../assets/logo/thumb_down.svg"

interface IProps {
    videoURL: string
    title: string
    sharedBy: {
        email: string
    }
    description: string

    onClickThumbUp(payload: any): any

    _id: string
    totalThumbUp: number
    totalThumbDown: number
    isThumbUpAlready: boolean
    isThumbDownAlready: boolean
    currentVideo: string

    handlePlayVideo(id: string): (e: any) => void

    onClickThumbDown(payload: any): any
}

const VideoItem: React.FC<IProps> = (props) => {
    const componentDecorator = (href, text, key) => (
        <a href={href} key={key} target="_blank" rel="noopener noreferrer">
            {text}
        </a>
    );

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleClickShowMore = () => {
        setIsOpen(!isOpen)
    }

    const onClickThumbUp = (videoId: string) => () => {
        props.onClickThumbUp(videoId)
    }

    const onClickThumbDown = (videoId: string) => () => {
        props.onClickThumbDown(videoId)
    }


    return (
        <React.Fragment>
            <div className={"col-xl-5 col-lg-6 col-md-12 col-sm-12"}>
                <VideoPlayer currentVideo={props.currentVideo} id={props._id} handlePlayVideo={props.handlePlayVideo}
                             videoURL={props.videoURL}/>
            </div>
            <div className=" col-xl-7 col-lg-6 col-md-12 col-sm-12 video-item" style={{fontSize: '12px'}}>
                <div id="wrapper">
                    <p className="video-item__title">{props.title}</p>
                    <div className={classNames('video-item__information', {'video-item__information--active': isOpen})}>
                        <Linkify componentDecorator={componentDecorator}>
                            <p>Shared By: {props.sharedBy.email}</p>
                            <div className="video-item__react-section">
                                <div className="video-item__icon mr-2" onClick={onClickThumbUp(props._id)}>
                                    <span className="number mr-1">{props.totalThumbUp}</span>
                                    <ThumbUpLogo width={15} height={15} fill={''} color={"blue"}/>
                                </div>

                                <div className="video-item__icon" onClick={onClickThumbDown(props._id)}>
                                    <ThumbDownLogo width={15} height={15} fill={''} color={"blue"}/>
                                    <span className="number ml-1">{props.totalThumbDown}</span>
                                </div>
                            </div>

                            <p>Description</p>

                            <p style={{whiteSpace: "pre-line"}}>{props.description}</p>
                        </Linkify>

                    </div>
                </div>

                <p onClick={handleClickShowMore} className="btn-toggle">Show {isOpen ? 'less' : 'more'}</p>

            </div>
        </React.Fragment>
    )
}

export default VideoItem