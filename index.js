const inputEncriptar = document.getElementById("input-encriptar");
const buttonEncriptar = document.getElementById("boton-encriptar");
const buttonDesencriptar = document.getElementById("boton-desencriptar");
const cajaTextoEncriptado = document.querySelector(".caja-texto-encriptado");

console.log(cajaTextoEncriptado)
console.log("Hola" === "hola")

const encriptarLetra = (letra) => {
    if(letra === "a") return "ai";
    else if(letra === "e") return "enter";
    else if(letra === "i") return "imes";
    else if(letra === "o") return "ober";
    else if(letra === "u") return "ufat";
    else return letra;
};

const validarMinusculas = (texto) => {
    const textoMinuscula = texto.toLowerCase();
    return texto === textoMinuscula;
};

const validarTildes = (arrayLetras) => {
    return arrayLetras.every(letra => {
        return ["á", "é", "í", "ó", "ú"].every(letraTilde => letraTilde !== letra)
    });
}

const desencriptarTexto = (objeto, texto) => {
    Object.keys(objeto).forEach((item) => {
        if(texto.includes(item)) {
            texto = texto.replaceAll(item, objeto[item])
        }
    });

    return texto;
};

const objetoDesencriptación = {
    "ai": "a",
    "enter": "e",
    "imes": "i",
    "ober": "o",
    "ufat": "u"
};

const mostrarResultado = (valorInput) => {
    cajaTextoEncriptado.innerText = "";

    const elementoP = document.createElement("p");
    elementoP.innerText = valorInput;
    elementoP.classList.add("texto-encriptado");

    const elementoButton = document.createElement("button");
    elementoButton.innerText = "Copiar en el Input";
    elementoButton.classList.add("boton");
    elementoButton.id = "boton-copiar";

    cajaTextoEncriptado.append(elementoP);
    cajaTextoEncriptado.append(elementoButton);

    elementoButton.addEventListener("click", () => {
        inputEncriptar.value = valorInput;
    });
};

// ENCRIPTAR MENSAJE
buttonEncriptar.addEventListener("click", () => {
    const valorInputEncriptar = inputEncriptar.value;

    if(!valorInputEncriptar) return alert("No ha ingresado ningún texto");
    if(!validarMinusculas(valorInputEncriptar)) return alert("El texto debe contener solo minúsculas.");
    
    const arrayLetras = valorInputEncriptar.split("");
    
    if(!validarTildes(arrayLetras)) return alert("El texto no puede tener acentos.");

    const nuevoArrayLetras = arrayLetras.map(letra => encriptarLetra(letra));
    const valorInputEncriptado = nuevoArrayLetras.join("");

    mostrarResultado(valorInputEncriptado);
});

// DESENCRIPTAR MENSAJE
buttonDesencriptar.addEventListener("click", () => {
    let valorInputDesencriptar = inputEncriptar.value;

    if(!valorInputDesencriptar) return alert("No ha ingresado ningún texto");
    if(!validarMinusculas(valorInputDesencriptar)) return alert("El texto debe contener solo minúsculas.");

    const arrayLetras = valorInputDesencriptar.split("");
    
    if(!validarTildes(arrayLetras)) return alert("El texto no puede tener acentos.");

    const valorInputDesencriptado = desencriptarTexto(objetoDesencriptación, valorInputDesencriptar)

    mostrarResultado(valorInputDesencriptado);
});