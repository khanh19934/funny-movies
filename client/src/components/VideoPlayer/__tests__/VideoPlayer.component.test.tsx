import "@testing-library/jest-dom/extend-expect";
// import React from "react";
// import {render, fireEvent} from "@testing-library/react"

import {testSnapshots} from "../../../utils/test.util"
import VideoPlayer from "../VideoPlayer.component";

describe('Video Player', () => {
    const props = {
        videoURL: '',
        _id: '',
        currentVideo: '',
        handlePlayVideo: (id: string) => (e: any) => {
        },
    }
    testSnapshots(VideoPlayer, [
        {
            description: 'Video Player Snapshot',
            props
        }
    ])
})