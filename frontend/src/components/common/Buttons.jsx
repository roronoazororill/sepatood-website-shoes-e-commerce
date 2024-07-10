
export const ButtonLight = ({ text, type }) => {
    return (
        <button type={type} className="btn btn--light">
            <span className="btn__inner">
                <span className="btn__slide"></span>
                <span className="btn__content">{text}</span>
            </span>
        </button>
    )
}

export const ButtonRed = ({ text, type }) => {
    return (
        <button type={type} className="btn btn--red">
            <span className="btn__inner">
                <span className="btn__slide"></span>
                <span className="btn__content">{text}</span>
            </span>
        </button>
    )
}
export const ButtonDark = ({ text, type }) => {
    return (
        <button type={type} className="btn btn--dark">
            <span className="btn__inner">
                <span className="btn__slide"></span>
                <span className="btn__content">{text}</span>
            </span>
        </button>
    )
}