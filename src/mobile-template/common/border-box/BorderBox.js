import './BorderBox.css'
function BorderBox({ children, title }) {

    return (
        <div className="border-box">
            <div className="border-box-wrapper">
                <div className="border-box-title">{title}</div>
                {
                    children
                }
            </div>
        </div>
    )
}

export default BorderBox;