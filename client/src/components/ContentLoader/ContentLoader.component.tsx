import React from "react"
import ContentLoader from "react-content-loader"

const CustomLoader = () => (
    <ContentLoader
        height={200}
        width={600}
        speed={4}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="13" y="17" rx="0" ry="0" width="190" height="160"/>
        <rect x="226" y="18" rx="0" ry="0" width="323" height="19"/>
        <rect x="225" y="48" rx="0" ry="0" width="319" height="10"/>
        <rect x="225" y="87" rx="0" ry="0" width="319" height="10"/>
        <rect x="225" y="66" rx="0" ry="0" width="319" height="10"/>
        <rect x="225" y="110" rx="0" ry="0" width="272" height="10"/>
        <rect x="225" y="130" rx="0" ry="0" width="272" height="10"/>
        <rect x="225" y="151" rx="0" ry="0" width="272" height="10"/>
    </ContentLoader>
)

export default CustomLoader