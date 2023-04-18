export const Mark_Video = (stringName) => {
  return setInterval(() => {
    let video = document.getElementsByClassName("water-mark-wrapper")[0];
    var ran = Math.floor(Math.random() * 9);
    video.style.position = "relative";
    let style = "";

    if (video) {
      var listWaterMark = document.getElementsByClassName("water-mark ");
      var warterMark = null;
      if (listWaterMark.length === 0) {
        warterMark = document.createElement("h3");
        warterMark.className = "water-mark display-1";
        warterMark.innerHTML = stringName;
        video.insertAdjacentElement("beforeend", warterMark);
        warterMark.style.display = "block";
        warterMark.style.background = "none";
        warterMark.style.zIndex = "99999999999";
        warterMark.style.position = "absolute";
        warterMark.style.fontSize = "1rem";
        warterMark.style.backgroundColor = "rgba(82,95,118,.6)";

        warterMark.style.padding = "15px";
        warterMark.style.margin = "0";
        warterMark.style.transform = "none";
        warterMark.style.lineHeight = "0";
        warterMark.style.color = "#fff";
        warterMark.style.width = "auto";
        warterMark.style.height = "auto";
        warterMark.style.bottom = "unset";
        warterMark.style.left = "unset";
        warterMark.style.top = "0";
        warterMark.style.right = "0";
      } else {
        warterMark = document.getElementsByClassName("water-mark")[0];
        warterMark.className = "water-mark display-1";
        warterMark.innerHTML = stringName;

        style =
          "display:block !important ; visibility:visible !important ; opacity:0.2 !important ;background: none !important; z-index:99999999999 !important; position:absolute !important; font-size: 1rem !important; background-color: rgba(82,95,118,.6) !important; padding:15px !important; margin:0 !important; transform:none !important; line-height:0 !important; color: #fff !important; width:auto !important; height:auto !important; clip-path:none !important;";

        switch (ran) {
          case 1:
            {
              //goc trai tren
              style +=
                " bottom:unset !important; left:0 !important; top:0 !important; right:unset !important;";
            }
            break;
          case 2:
            {
              //goc phai tren
              style +=
                " bottom:unset !important; left:unset !important; top:0 !important; right:0 !important;";
            }
            break;
          case 3:
            {
              //goc trai duoi
              style +=
                " bottom:30px !important; left:0 !important; top:unset !important; right:unset !important;";
            }
            break;
          case 4:
            {
              //goc phai duoi
              style +=
                " bottom:30px !important; left:unset !important; top:unset !important; right:0 !important;";
            }
            break;
          case 5:
            {
              //tren giua
              style +=
                " bottom:unset !important; left:40% !important; top:unset !important; right:unset !important;";
            }
            break;
          case 6:
            {
              //phai giua
              style +=
                " bottom:unset !important; left:unset !important; top:50% !important; right:0 !important;";
            }
            break;
          case 7:
            {
              //trai giua
              style +=
                " bottom:unset !important; left:0 !important; top:50% !important; right:unset !important;";
            }
            break;
          case 8:
            {
              //duoi giua
              style +=
                " bottom:30px !important; left:50% !important; top:unset !important; right:unset !important;";
            }
            break;
          case 9:
            {
              // giua
              style +=
                " bottom:unset !important; left:40% !important; top:40% !important; right:unset !important;";
            }
            break;
          default: {
            //goc trai tren
            style +=
              " bottom:unset !important; left:0 !important; top:0 !important; right:unset !important;";
          }
        }
        warterMark.setAttribute("style", style);
      }
    }
  }, 30000);
};
