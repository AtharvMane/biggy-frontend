import React from 'react'
import { Link } from 'react-router-dom'
const FourZeroFour = () => {
    return (
        <div style={{transform:"translateY(750%)"}}>
            404 Not found <Link to="/restaurants">Return to MainPage</Link>
        </div>
    )
}

export default FourZeroFour
