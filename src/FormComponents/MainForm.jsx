import React from 'react'
import Form from './Form'
import CustomForm from './CustomForm'

const MainForm = () => {
    
    return (
        <>
        { window.innerWidth > 480 && <CustomForm />}
        { window.innerWidth <= 480 && <CustomForm />}
        </>
    )
}

export default MainForm