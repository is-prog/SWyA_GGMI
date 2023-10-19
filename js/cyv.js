
function lonCifrar() {
    document.getElementById("cesarDiv").style.display = "block";
    document.getElementById("viggenereDiv").style.display = "none";
}

function lonDescifrar() {
    document.getElementById("cesarDiv").style.display = "none";
    document.getElementById("viggenereDiv").style.display = "block";
}

const desplazamiento = document.getElementById("desplazamiento");
const desplaza = document.getElementById("desplazamiento2");
const texto = document.getElementById("texto1");
const textodes = document.getElementById("texto2");
const textoCifrado = document.getElementById("cifrado");
const textoDescifrado = document.getElementById("descifrado");  

// Crea una función para cifrar y descifrar
function cifrado() {
    const textoIngresado = texto.value;
    const valorDesplazamiento = parseInt(desplazamiento.value);

    textoCifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);

        if (valorEntero >= 97 && valorEntero <= 122) {
            valorEntero = ((valorEntero - 97 + valorDesplazamiento) % 26) + 97;
        }

        let cifrado = String.fromCharCode(valorEntero);
        return mayus ? cifrado.toUpperCase() : cifrado;
    }).join('');
}

    
function descifrado() {
    const textoIngresado = textodes.value;
    const valorDesplazamiento = parseInt(desplaza.value);
    textoDescifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        if (valorEntero >= 97 && valorEntero <= 122) {
            valorEntero = ((valorEntero - 97 - valorDesplazamiento + 26) % 26) + 97;
        }
        let descifrado = String.fromCharCode(valorEntero);
        return mayus ? descifrado.toUpperCase() : descifrado; 
    }).join('');
}


texto.addEventListener("input", cifrado);
desplazamiento.addEventListener("input", cifrado);

textodes.addEventListener("input", descifrado);
desplaza.addEventListener("input", descifrado);

var viggenere = viggenere || (function () {

    var doStuff = function (txt, desp, action) {
        var replace = (function () {
            var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            var l = abc.length;

            return function (c) {
                var i = abc.indexOf(c.toLowerCase());
                if (i != -1) {
                    var pos = i;
                    if (action) {
                        // cifrar
                        pos += desp;
                        pos = (pos >= l) ? pos - l : pos;
                    } else {
                        // descifrar
                        pos -= desp;
                        pos = (pos < 0) ? l + pos : pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        // expresión regular
        // ig significa global
        var re = /([a-z])/ig;
        return String(txt).replace(re, function (match) {
            return replace(match);
        });
    };

    return {
        encode: function (txt, desp) {
            return doStuff(txt, desp, true);
        },
        decode: function (txt, desp) {
            return doStuff(txt, desp, false);
        }
    };
})();

function longitudCifrar() {
    camposVacios();
    var texto = document.getElementById("texto1").value;
    var clave = document.getElementById("txtClave").value;
    if (clave.length > texto.length) {
        alert("La clave no puede ser mayor al texto a cifrar");
    } else {
        codificar(texto, clave);
    }
}

function longitudDescifrar() {
    camposVacios();
    var texto = document.getElementById("texto1").value;
    var clave = document.getElementById("txtClave").value;
    if (clave.length > texto.length) {
        alert("La clave no puede ser mayor al texto a cifrar");
    } else {
        decodificar(texto, clave);
    }
}

function codificar(texto, clave) {
    var resultado = "";
    var indiceClave = 0;
    var charATexto = texto.split('');

    for (var i = 0; i < charATexto.length; i++) {
        var des = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charATexto[i];

        resultado += viggenere.encode(charTexto, (des >= 26) ? des % 26 : des);
        indiceClave++;
        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }
    }
    document.getElementById("res").value = resultado;
}

function decodificar(texto, clave) {
    var resultado = "";
    var indiceClave = 0;
    var charATexto = texto.split('');

    for (var i = 0; i < charATexto.length; i++) {
        var des = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charATexto[i];

        resultado += viggenere.decode(charTexto, (des >= 26) ? des % 26 : des);
        indiceClave++;
        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }
    }
    document.getElementById("res").value = resultado;
}

function obIndiceClave(reco) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(reco.toLowerCase());
}

function camposVacios() {
    var texto = document.getElementById("texto1").value;
    var clave = document.getElementById("txtClave").value;
    if (texto === "") {
        alert("Ingrese un texto para cifrar");
    }
    if (clave === "") {
        alert("Ingrese una clave para cifrar");
    }
}

function colocar() {
    // copiar texto
    var copiar = document.getElementById("res").value;
    document.getElementById("texto1").value = copiar;
}

function reiniciar() {
    document.getElementById("texto1").value = "";
    document.getElementById("txtClave").value = "";
    document.getElementById("res").value = "";
}
