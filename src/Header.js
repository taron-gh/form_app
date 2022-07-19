

export default function Header( {heading, description} ) {
    return (
        <div>
            <h1>{heading}</h1>
            {description ? <h3>{description}</h3> : null}
        </div>
    )
}