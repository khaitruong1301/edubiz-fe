import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import httpServ from "../../services/http.service";

import { getDayName } from "../../utils/GenerateDay";
import { gerateDataSetChart } from "../../utils/GenerateDataSetChart";
import {
  setLabelChart,
  setStatisChartArr,
} from "../../redux/reducer/chartReducer";
import { disableSetLoading } from "../../constants/httpServContant";
import { DARK_MODE } from "../../constants/theme";

const Chart_User_Dashboard = React.memo(() => {
  const [activeIndexFitler, setActiveIndexFiler] = useState(0);
  const [activeChartIndex, setActiveChartIndex] = useState(0);

  const dispatch = useDispatch();
  const userInfor = useSelector((state) => state.authUser.userInfor);
  const theme = useSelector((state) => state.theme.theme);

  const { labelChart, statisChartArr } = useSelector((state) => state.chart);
  const labelChartRedux = labelChart;
  const statisChartRedux = statisChartArr;
  const statisArr = statisChartRedux.map((item) => {
    return { ...item };
  });
  const labeArr = [...labelChartRedux];
  const handleChangeFilter = (activeIndexFitler, activeChartIndex) => {
    let top = activeChartIndex === 1;
    httpServ
      .getStatisChartDashboard(userInfor?.id, activeIndexFitler, top, disableSetLoading)
      .then((res) => {
        let labels = getDayName(
          res.data.content[0].lstSoPhut.length,
          activeIndexFitler
        );

        dispatch(setStatisChartArr(res.data.content));
        dispatch(setLabelChart(labels));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    handleChangeFilter(activeIndexFitler, activeChartIndex);
  }, [activeIndexFitler, activeChartIndex]);

  const data = (canvas) => {
    if (statisArr.length) {
      return {
        labels: labeArr,
        datasets: gerateDataSetChart(statisArr, canvas, userInfor),
      };
    } else {
      return { labels: labeArr, datasets: [] };
    }
  };

  var options = {
    title: {
      display: true,
      text: "TITLE HERE",
      fontSize: 30,
    },
    legend: {
      position: "right",
      labels: {
        fontSize: 5,
      },
    },
    layout: {
      padding: 0,
      marggin: 0,
    },
    responsive: true,
    datasetStrokeWidth: 2,
    pointDotStrokeWidth: 4,
    scales: {
      xAxes: {
        display: true,

        title: {
          display: false,
        },
        grid: {
          display: false,
        },
        ticks: {

          color: theme == DARK_MODE ? "#ffffff" : "#000",


        },
      },
      yAxes: {
        title: {

        },
        grid: {
          color: theme == DARK_MODE ? "#ffffff" : "#88888822",

        },
        ticks: {
          min: 0, // it is for ignoring negative step.
          beginAtZero: true,
          stepSize: 20, // if i use this it always set it '1', which look very awkward if it have high value  e.g. '100'.
          padding: 10,
          fontSize: 30,
          color: theme == DARK_MODE ? "#ffffff" : "#000",


        },
        suggestedMin: 0,
        suggestedMax: 50,
        suggestedMax: Math.max(statisArr[0]) + 20,
      },
    },

    plugins: {
      legend: {
        padding: 0,
        align: "end",
        labels: {
          usePointStyle: true,
          fontSize: 16,
          padding: 15,
          boxWidth: 6,
          pointStyle: "circle",
          color: theme == DARK_MODE ? "#ffffff" : "#000"
        },
      },
      xAxes: {
        // labels: {
        color: theme == DARK_MODE ? "#ffffff" : "#000"
        // },
      },
    },
    interaction: {
      intersect: false,
    },
    radius: 0,
    tooltips: {
      yAlign: "bottom",
      xAlign: "bottom",
    },
  };
  const fillterTag = ["1 Tuần", "1 Tháng", "3 Tháng"];
  const fillterChartType = ["Bạn", "Top 5"];

  return (
    <div
      className="p-2 lg:p-3 h-full justify-between   flex flex-col space-y-2 relative w-full"
      data-tour="db-step-5"
    >
      <p className="  text-lg text-color-title text-center">Thống kê thời gian học</p>
      <div className="flex  justify-between flex-row-reverse   wful m-0 relative px-1 lg:px-3">
        <div className="rounded-3xl  bg-white space-x-2 p-1   ">
          <div className=" relative ">
            {fillterTag.map((tag, index) => {
              let textColor =
                index == activeIndexFitler ? "text-white" : "text-blue-theme";
              return (
                <button
                  onClick={() => {
                    setActiveIndexFiler(index);
                  }}
                  className={
                    "rounded-3xl w-16 lg:w-20 relative  z-10 text-center inline-block text-sm  py-1.5 h-full " +
                    textColor
                  }
                >
                  {tag}
                </button>
              );
            })}
            <span
              style={{
                zIndex: 1,
                transform: `translateX(${activeIndexFitler * 100}%)`,
              }}
              className="absolute left-0 top-0 w-16 lg:w-20 h-full  btn-theme rounded-3xl  transition ease-out duration-500 "
            ></span>
          </div>
        </div>
        <div className="rounded-3xl  bg-white space-x-2 p-1 ">
          <div className=" relative ">
            {fillterChartType.map((tag, index) => {
              let textColor =
                index == activeChartIndex ? "text-white" : "text-blue-theme";
              return (
                <button
                  onClick={() => {
                    setActiveChartIndex(index);
                  }}
                  className={
                    "rounded-3xl w-16 lg:w-20 relative  z-10 text-center inline-block text-sm  py-1.5 h-full " +
                    textColor
                  }
                >
                  {tag}
                </button>
              );
            })}
            <span
              style={{
                zIndex: 1,
                transform: `translateX(${activeChartIndex * 100}%)`,
              }}
              className="absolute left-0 top-0 w-16 lg:w-20 h-full  btn-theme rounded-3xl  transition ease-out duration-500 "
            ></span>
          </div>
        </div>
      </div>
      <div className="h-80  overflow-hidden w-full mx-auto max-w-lg 2xl:pb-2 transform   ">
        <Line
          data={data}
          options={options}
          className="h-full p-0 m-0 w-full "
          plugins={{}}
        />
      </div>
    </div>
  );
});
export default Chart_User_Dashboard;
