import React from "react";
import Registed_User_Avatar from "../Registed_User_Avatar/Registed_User_Avatar";
import LazyLoad from "react-lazyload";

function Registed_Users_Bar({ dsAvatar, totalUser }) {
  return (
    <div className="flex w-full h-8 lg:h-9 items-center space-x-1">
      <div className="flex space-x-1 lg:space-x-1.5 w-full flex-wrap h-full overflow-hidden ">
        {dsAvatar.map((item) => {
          return (
            <LazyLoad once={true}>
              <div className=" h-8 lg:h-10  w-8 lg:w-10 flex-shrink-0">
                <Registed_User_Avatar src_img={item} />;
              </div>
            </LazyLoad>
          );
        })}
      </div>
      <span className="text-white bg-purple-900 rounded-full px-3 lg:px-4 py-1 text-base lg:text-lg font-medium flex-shrink-0 ">
        +{totalUser}
      </span>
    </div>
  );
}

export default Registed_Users_Bar = React.memo(Registed_Users_Bar);
