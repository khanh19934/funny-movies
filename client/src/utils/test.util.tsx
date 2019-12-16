import React from 'react'
import {render} from "@testing-library/react"

interface ISnapshotConfig {
    props?: object
    description: string
}

const singleSnapTest = (asFragment: any, description: string) => {
    test(description, () => {
        expect(asFragment()).toMatchSnapshot()
    })
}
const testSnapshots = (Component: any, configs: ISnapshotConfig[]) => {
    describe('snapshots', () => {
        configs.forEach(config => {
            const { props = {}, description } = config
            const {asFragment} = render(<Component {...props} />)
            singleSnapTest(asFragment, description)
        })
    })
}

export { singleSnapTest, testSnapshots }