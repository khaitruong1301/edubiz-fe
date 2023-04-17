export const dinhDangTien = (num) => {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')

}

export const cutString = (str,length = 45) => {
    if (str.length > length) {
        return str.substring(0, length - 1) + "...";
    }
    return str;
}