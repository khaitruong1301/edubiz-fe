import { BorderBox } from "../../common";
import './DashboardContent.css'
import DashboardChart from "./dashboard-chart/DashboardChar";
import DashboardListLession from "./dashboard-list-lession/DashboardListLession";
import DashboardListSeries from "./dashboard-list-series/DashboardListSeries";
export default function DashboardContent() {
    return (
        <div className="dashboard-content pt-2">
            <BorderBox title="Thống kê thời gian học">
                <div className="dashboard-content_wrapper">
                    <DashboardChart />
                </div>
            </BorderBox>
            <br />
            <BorderBox title="Khóa đang học">
                <div className="dashboard-content_wrapper">
                    <DashboardListLession />
                </div>
            </BorderBox>
            <br />
            <BorderBox title="Lộ trình của bạn">
                <div className="dashboard-content_wrapper">
                    <DashboardListSeries />
                </div>
            </BorderBox>
        </div>
    )
}