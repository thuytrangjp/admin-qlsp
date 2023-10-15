// hàm kiểm tra dữ liệu người dùng nhập vào có rỗng hay không
function kiemTraRong(value, idCanhBao, mess) {
    // kiểm tra xem tham số value có rỗng hay không
    var domTheSpan = getEle(idCanhBao);
    if (value == '') {
        // console.log('input này bị rỗng');
        // xuất hiện đoạn nội dung cảnh báo khi người dùng lỗi
        domTheSpan.innerHTML = mess;
        return false;
    } else {
        // console.log('input này bth');
        // nội dung rỗng vào thẻ span khi người dùng không còn lỗi
        domTheSpan.innerHTML = '';
        return true;
    }
}

// hàm giúp kiểm tra độ dài ký tự
function kiemTraDoDaiKyTu(value, min, max, idCanhBao, mess) {
    var domTheSpan = getEle(idCanhBao);
    // kiểm tra
    if (value.length < min || value.length > max) {
        // sai
        domTheSpan.innerHTML = mess;
        return false;
    } else {
        // đúng
        domTheSpan.innerHTML = '';
        return true;
    }
}

// hàm kiểm tra xem dữ liệu có phải là số hay không
function kiemTraSo(value, idCanhBao, mess) {
    var domTheSpan = getEle(idCanhBao);
    // regex kiểm tra số
    var regexNumber = /^\d+$/;
    // kiểm tra với regex
    var isValid = regexNumber.test(value);
    if (isValid) {
        // Đúng
        domTheSpan.innerHTML = '';
        return true;
    } else {
        // Sai
        domTheSpan.innerHTML = mess;
        return false;
    }
}