import "@testing-library/jest-dom/extend-expect";
// import React from "react";
// import {render, fireEvent} from "@testing-library/react"

import {testSnapshots} from "../../../utils/test.util"
import VideoItem from "../VideoItem.component";

describe('Video Item Component', () => {
    const props = {
        videoURL: '',
        title: '',
        sharedBy: {
            email: ''
        },
        description: '',
        onClickThumbUp: (payload: any): any => {
        },
        _id: '',
        totalThumbUp: 0,
        totalThumbDown: 0,
        isThumbUpAlready: false,
        isThumbDownAlready: true,
        currentVideo: '',
        handlePlayVideo: (id: string) => (e: any) => {
        },
        onClickThumbDown: (payload: any): any => {
        }
    }
    testSnapshots(() => VideoItem, [
        {
            description: 'Video item snapshot',
            props
        }
    ])
})

