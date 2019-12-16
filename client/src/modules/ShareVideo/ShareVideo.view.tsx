import React, {useState, useEffect} from "react";
import {Input, Label, Form, Button, Alert} from "reactstrap"

import {getYoutubeIdFromURL} from "../../utils/common.util"
import {getYoutubeVideoDetail, shareYoutubeVideo} from "../../services/shareMovie.service";

const ShareVideoPage: React.FC = () => {
    const [isValid, setIsValid] = useState<boolean>(false)
    const [youtubeId, setYoutubeId] = useState<string>('')
    const [youtubeURL, setYoutubeURL] = useState<string>('')
    const [isOpenAlert, setIsOpenAlert] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setIsOpenAlert(false)
        }, 2000)
    }, [isOpenAlert])

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const youTubeId = getYoutubeIdFromURL(event.target.value)
        if (youTubeId) {
            setIsValid(true)
            setYoutubeId(youTubeId)
            setYoutubeURL(event.target.value)
            return
        }
        setIsValid(false)
    }
    const handleOnSubmit = async () => {
        const {title, description} = await getYoutubeVideoDetail(youtubeId)
        await shareYoutubeVideo({title, description, videoURL: youtubeURL})
        setIsOpenAlert(true)
        setYoutubeURL('')
    }
    return (
        <div style={{paddingTop: '56px'}}>
            <Alert color="success" isOpen={isOpenAlert}>
                Your video shared successful !
            </Alert>
            <div className="share-video-page">
                <Form>
                    <fieldset>
                        <legend>
                            Share a Youtube movie
                        </legend>
                        <div>
                            <div className="container mb-4">
                                <div className="row mb-3">
                                    <div className="col-sm-3">
                                        <Label style={{marginTop: '6px'}} for="exampleEmail">Youtube URL</Label>
                                    </div>
                                    <div className="col-sm-7">
                                        <Input value={youtubeURL} onChange={handleOnChange} type="email" name="email"
                                               id="exampleEmail"
                                               placeholder="Enter your youtube URL"/>
                                        {!isValid && <span>Your Youtube URL is not valid</span>}
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-sm-7 offset-sm-3">
                                        <Button onClick={handleOnSubmit} disabled={!isValid} block
                                                color="primary">Share</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </Form>
            </div>
        </div>

    )
}

export default ShareVideoPage