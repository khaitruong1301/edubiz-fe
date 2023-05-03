import './LayoutContent.css'
export default function LayoutContent(props) {
    const { children } = props;
    return (
        <div className='layout-content' style={{  backgroundImage: `url(${process.env.PUBLIC_URL + '/img/background.png'})` }}>{children}</div>
    )
}