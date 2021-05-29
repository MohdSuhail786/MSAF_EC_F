import React from 'react'
import CustomAdmin from './CustomAdmin'

const MainAdmin = () => {
    return (
        <>
        { window.innerWidth > 480 && <CustomAdmin />}
        { window.innerWidth <= 480 && <CustomAdmin />}
        </>
    )
}

export default MainAdmin