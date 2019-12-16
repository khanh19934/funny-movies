import "@testing-library/jest-dom/extend-expect";
import {testSnapshots} from "../../../utils/test.util"

import ContentLoader from "../ContentLoader.component"

describe('ContentLoader Component', () => {
    testSnapshots(ContentLoader, [{
        description: 'ContentLoader snapshot'
    }])
})