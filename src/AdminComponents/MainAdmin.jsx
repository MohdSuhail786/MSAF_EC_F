import React from 'react'
import CustomAdmin from './CustomAdmin'
import Admin from './Admin'

const MainAdmin = () => {
    return (
        <>
        { window.innerWidth > 480 && <Admin />}
        { window.innerWidth <= 480 && <CustomAdmin />}
        </>
    )
}

export default MainAdmin