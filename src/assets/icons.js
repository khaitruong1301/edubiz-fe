import Lottie from "lottie-react";
import coin_lottie from "./lottie_json/18089-gold-coin.json";
// import dollar_lottie from "./lottie_json/24490-dollar-coin-shining.json";

import img_heart from "./img/heart_heath_2.png";
export let icons = {
  dashboard: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  ),
  luyenTap: <i className="fa fa-code text-lg block px-1 "></i>,
  loTrinh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
      />
    </svg>
  ),
  duAn: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  chungNhan: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path d="M12 14l9-5-9-5-9 5 9 5z" />
      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
      />
    </svg>
  ),
  taoCV: <i className="fa fa-file-invoice text-lg block px-2"></i>,
  gioiThieuBanBe: <i className="fa fa-user-plus text-lg block px-1"></i>,
  filter_loTrinh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="white"
      role="img"
      className="icon filter-icon icon-14"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 6C0 5.17157 0.671573 4.5 1.5 4.5H22.5C23.3284 4.5 24 5.17157 24 6C24 6.82843 23.3284 7.5 22.5 7.5H1.5C0.671573 7.5 0 6.82843 0 6ZM3 12C3 11.1716 3.67157 10.5 4.5 10.5H19.5C20.3284 10.5 21 11.1716 21 12C21 12.8284 20.3284 13.5 19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12ZM7.5 16.5C6.67157 16.5 6 17.1716 6 18C6 18.8284 6.67157 19.5 7.5 19.5H16.5C17.3284 19.5 18 18.8284 18 18C18 17.1716 17.3284 16.5 16.5 16.5H7.5Z"
      ></path>
    </svg>
  ),
  gridView: <i className="fa fa-th "></i>,
  listView: <i className="fa fa-list"></i>,
  dailyTask: <i className="fa fa-dumbbell text-lg block px-2"></i>,
  question: <i className="fa fa-question-circle  text-lg block px-2"></i>,
  task: <i className="fas fa-tasks  text-lg block px-2"></i>,
};

export let iconsLanguage = {
  angular: (
    <span className=" bg-white h-full w-full rounded-full flex justify-center items-center">
      <i className="fab fa-angular text-red-600 text-2xl"></i>
    </span>
  ),
  java: (
    <span className=" bg-white h-full w-full rounded-full flex justify-center items-center">
      <i className="fab  fa-java text-red-600 text-2xl"></i>
    </span>
  ),
  react: (
    <span className=" bg-gray-800 h-full w-full rounded-full flex justify-center items-center">
      <i className="fab fa-react text-blue-600 text-2xl"></i>
    </span>
  ),
  js: (
    <span className=" bg-gray-800 h-full w-full rounded-full flex justify-center items-center">
      <i className="fab fa-js text-green-700 text-2xl"></i>
    </span>
  ),
  nodeJs: (
    <span className=" bg-gray-800 h-full w-full rounded-full flex justify-center items-center">
      <i className="fab fa-node-js text-green-700 text-2xl"></i>
    </span>
  ),
  git: (
    <span className=" bg-gray-800 h-full w-full rounded-full flex justify-center items-center">
      <i className="fab fa-git text-white text-xl"></i>
    </span>
  ),
  html: (
    <span className=" bg-red-400 h-full w-full rounded-full flex justify-center items-center">
      <i className="fab fa-html5 text-white text-2xl"></i>
    </span>
  ),
  css: (
    <span className=" bg-blue-500 h-full w-full rounded-full flex justify-center items-center">
      <i className="fab fa-css3 text-white text-xl"></i>
    </span>
  ),
};
export const iconXp = (
  <div
    data-v-3d9e1b30=""
    className="w-6 h-6  svg-icon_xp transform translate-x-1 mr-2"
  >
    <svg
      className="w-full h-full overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24  24"
    >
      <g fill="none" fill-rule="evenodd">
        <g fill="none" fill-rule="evenodd">
          <path fill="#2995CD" d="M22 15l-10 9-10-9L12 0z"></path>
          <path fill="#50B5E9" d="M4.6 14.7l7.4-3v9.6z"></path>
          <path fill="#1F709A" d="M12 11.7l7.4 3-7.4 6.6z" opacity=".25"></path>
          <path fill="#FFF" d="M12 11.7V3.6l7.4 11.1z" opacity=".25"></path>
          <path fill="#FFF" d="M4.6 14.7L12 3.6v8.1z" opacity=".5"></path>
          <path
            fill="#FFF"
            d="M7.2 14.3L12 7.2l4.8 7.1-4.8 4.3z"
            opacity=".5"
          ></path>
        </g>
      </g>
    </svg>
  </div>
);

export const iconCoin = (
  <Lottie animationData={coin_lottie} style={{ width: 50, height: 50 }} />
);
// export const iconDollar = (
//   <Lottie animationData={dollar_lottie} style={{ width: 25, height: 25 }} />
// );
export const iconTichCuc = (
  <img src={img_heart} className="w-8 h-8 m-0 object-fit" alt="" />
);
export const iconVatPham = <i className="fa fa-user-shield"></i>;
export const iconThongBao = {
  baiTap: <i className="fa fa-book text-lg text-purple-theme "></i>,
  // dollar: (
  //   <Lottie animationData={dollar_lottie} style={{ width: 25, height: 25 }} />
  // ),
  xp: iconXp,
};
