import React from 'react'
import './NotefulForm.css'
export default function NotefulForm(props) {
    const { className, ...otherProps } = props
        return (
//action of # indicates that the form stays on the same page, simply suffixing the url with a #
            <form className={['Noteful-form',className].join(' ')}
                action='#'
                {...otherProps}
            />
        )
}