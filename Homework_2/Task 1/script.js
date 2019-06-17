function onClickB1() {
    window.location.href = "http://www.google.com";
}

function onClickB2() {
    document.body.innerHTML = '';
}

function CheckName() {
    var name = prompt("Please enter name", "");
    if (name == null || name == "") {
        alert('No Value');
        return;
    }
    if (hasNumber(name)) {
        alert('Reversed Name: ' + reverseString(name));
    } else {
        alert('Your Name with mixed case: ' + mixCaseString(name));
    }
}

function hasNumber(str) {
    return /\d/.test(str);
}

function reverseString(str){
    return str.split("").reverse().join("");
}

function mixCaseString(str) {
    var tmp = '';
    for (var i = 0; i < str.length; ++i) {
        let c = str[i];
        if (i % 2 == 0) {
            tmp = tmp + c.toUpperCase();
        } else {
            tmp = tmp + c.toLowerCase();
        }
    }
    return tmp;
}