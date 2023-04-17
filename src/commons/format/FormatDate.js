
//dinh dang DD/MM/YYYY hh:mm:ss
export const dinhDangNgay = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = gg + "/" + mm + "/" + aaaa;

    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

}

//dinh dang ngay de so sanh (MM/DD/YYYY)
export const dinhDangNgayCheck = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = mm + "/" + gg + "/" + aaaa;



    return cur_day

}

//dinh dang DD/MM/YYYY
export const dinhDangTheoNgay = (inputdate) => {
    var date = new Date(inputdate);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = gg + "/" + mm + "/" + aaaa;



    return cur_day

}

// tinh so ngay giua 2 date

export const tinhSoNgay = (date1, date2) => {
    const diffTime = date1 - date2;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

//tinh so thang

export const tinhSoThang = (date1, date2) => {
    var months;
    months = (date2.getFullYear() - date1.getFullYear()) * 12;
    months -= date1.getMonth();
    months += date2.getMonth();
    return months <= 0 ? 0 : months;
}