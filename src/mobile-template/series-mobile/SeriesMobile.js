import CarouselLoTrinh from '../../components/CarouselLoTrinh/CarouselLoTrinh';
import { NavBar, TabMobile } from '../common';
import './SeriesMobile.css';
import AllSeries from './all-series/AllSeries';
import ListSeries from './list-series/ListSeries';
function SeriesMobile(props) {

    const tabs = [
        { title: 'Lộ trình của bạn', component: <ListSeries /> },
        { title: 'Tất cả lộ trình', component: <AllSeries /> }
    ]

    return (
        <>
            <NavBar title={props.title} isPrev={false}/>
            <div className='seriesmobile'>
                <TabMobile tabs={tabs} />
            </div>
        </>
    )
}

export default SeriesMobile;