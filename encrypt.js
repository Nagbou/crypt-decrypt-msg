document.getElementById("gohome").addEventListener("click", function () {
    window.location.href = "index.html"
})

document.getElementById("encrypt").addEventListener("click", function () {
    encrypt(getMsg())
})

function getMsg() {
    var msg = document.getElementById("msg")
    msg = msg.value
    return msg;

}
function getRandomAlphabeticLetters() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
function sumOfAsciiValues(string) {
    var sum = 0;
    for (var i = 0; i < string.length; i++) {
        sum += string.charCodeAt(i);
    }
    return sum;
}

function encrypt(msg) {
    var keyChars = getRandomAlphabeticLetters()
    var sumAsci = sumOfAsciiValues(keyChars) % 3
    // dependin on sumAsci 0 or 1 or 2 we do the algo
    switch (sumAsci) {
        case 0:
            var ciphertext = keyChars[0] + keyChars[1] + crypt1(getMsg()) + keyChars[2] + keyChars[3]
            break;
        case 1:
            var ciphertext = keyChars[0] + keyChars[1] + crypt2(getMsg()) + keyChars[2] + keyChars[3]
            break;
        case 2:
            var ciphertext = keyChars[0] + keyChars[1] + crypt3(getMsg()) + keyChars[2] + keyChars[3]
            break;
        default:
            var ciphertext = keyChars[0] + keyChars[1] + getMsg() + keyChars[2] + keyChars[3]
    }
    var cryptedMsg = document.getElementById("ciphertext")
    cryptedMsg.innerHTML = ciphertext

}
function crypt1(msg) {
    var encryptedMsg = '';
    for (var i = 0; i < msg.length; i++) {
        // Shift each character by 2 ASCII values and concatenate it to the encrypted message
        encryptedMsg += String.fromCharCode(msg.charCodeAt(i) + 2);
    }
    return encryptedMsg;
}

function crypt2(msg) {
    var encryptedMsg = '';
    for (var i = 0; i < msg.length; i++) {
        if (i % 2 === 0) {
            encryptedMsg += String.fromCharCode(msg.charCodeAt(i) + 2);
        } else {
            encryptedMsg += String.fromCharCode(msg.charCodeAt(i) + 3);
        }
    }

    return encryptedMsg;
}

function crypt3(msg) {
    var encryptedMsg = '';
    for (var i = 0; i < msg.length; i++) {
        if (i % 2 === 0) {
            encryptedMsg += String.fromCharCode(msg.charCodeAt(i) - 2);
        } else {
            encryptedMsg += String.fromCharCode(msg.charCodeAt(i) + 2);
        }
    }
    return encryptedMsg;
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