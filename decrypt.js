document.getElementById("gohome").addEventListener("click", function () {
    window.location.href = "index.html"
})


document.getElementById("decrypt").addEventListener("click", function () {
    decrypt(getMsg())
})


function getMsg() {
    var msg = document.getElementById("msg")
    msg = msg.value
    return msg;

}
function getkeyAlphabeticLetters(str) {
    var firstTwo = str.slice(0, 2);
    var lastTwo = str.slice(-2);
    var result = firstTwo + lastTwo

    return result;
}
function sumOfAsciiValues(string) {
    var sum = 0;
    for (var i = 0; i < string.length; i++) {
        sum += string.charCodeAt(i);
    }
    return sum;
}

function decrypt(msg) {
    var keyChars = getkeyAlphabeticLetters(msg)
    var sumAsci = sumOfAsciiValues(keyChars) % 3
    // dependin on sumAsci 0 or 1 or 2 we do the algo
    switch (sumAsci) {
        case 0:
            var ciphertext = decrypt1(msg).slice(2, -2);
            break;
        case 1:
            var ciphertext = decrypt2(msg)
            break;
        case 2:
            var ciphertext = decrypt3(msg)
            break;
        default:
            var ciphertext = getMsg().slice(2, -2);
    }
    var cryptedMsg = document.getElementById("ciphertext")
    cryptedMsg.innerHTML = ciphertext

}
function decrypt1(msg) {
    var encryptedMsg = '';
    for (var i = 0; i < msg.length; i++) {
        // Shift each character by 2 ASCII values and concatenate it to the encrypted message
        encryptedMsg += String.fromCharCode(msg.charCodeAt(i) - 2);
    }

    return encryptedMsg
}

function decrypt2(msg) {
    var slicedMsg = msg.slice(2, -2); // Slice out the first two and last two characters
    var encryptedMsg = '';
    for (var i = 0; i < slicedMsg.length; i++) {
        if (i % 2 === 0) {
            encryptedMsg += String.fromCharCode(slicedMsg.charCodeAt(i) - 2);
        } else {
            encryptedMsg += String.fromCharCode(slicedMsg.charCodeAt(i) - 3);
        }
    }
    return encryptedMsg
}

function decrypt3(msg) {
    var slicedMsg = msg.slice(2, -2); // Slice out the first two and last two characters
    var encryptedMsg = '';
    for (var i = 0; i < slicedMsg.length; i++) {
        if (i % 2 === 0) {
            encryptedMsg += String.fromCharCode(slicedMsg.charCodeAt(i) + 2);
        } else {
            encryptedMsg += String.fromCharCode(slicedMsg.charCodeAt(i) - 2);
        }
    }
    return encryptedMsg

}


function copy() {
    ciphertext = document.getElementById('ciphertext').value;

    if (ciphertext === "") {
    } else {
        navigator.clipboard.writeText(ciphertext);
        var copyIcon = document.querySelector(".fa-copy")
        copyIcon.classList.remove("fa-copy")
        copyIcon.classList.add("fa-solid");
        copyIcon.classList.add("fa-clipboard-check");
        var durationInSeconds = 0.17; // Duration in seconds
        var durationInMilliseconds = durationInSeconds * 1000; // Convert to milliseconds
        setTimeout(function () {
            copyIcon.classList.remove("fa-clipboard-check");
            copyIcon.classList.add("fa-copy")
        }, durationInMilliseconds);
    }
}