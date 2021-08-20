import React from 'react'

const Images = (props) => {
    return (
        <img className={props.css} alt={`img`} src={props.image}></img>
    )
}

export default Images
