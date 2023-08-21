export function validar(input){
    //accedemos al dataset que es el atributo que empieza con data- en html y accedemos a la propiedad tipo que es la que definimis en html y l epudsimos un valor
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    //verificamos que la propiedad validity y valid de nuestro elemento html sea verdadedo
    if(input.validity.valid){
        //si sí accedemosal padre y le quitamos la clase css que le da estilo de invalido
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML=""
    }else{
        //si no le agregamos la clase
        input.parentElement.classList.add("input-container--invalid")
        console.log(input.parentElement.querySelector(".input-message-error").innerHTML);
        input.parentElement.querySelector(".input-message-error").innerHTML =
          mostrarMensajeDeError(tipoDeInput, input);

    }
}

const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacío",
    typeMismatch: "El correo no es válido",
  },
  password: {
    valueMissing: "El campo contraseña no puede estar vacío",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "Este campo no puede estar vacío",
    customError: "Debes tener al menos 18 años de edad",
  },
  numero: {
    valueMissing: "Este campo no pude estar vacío",
    patternMismatch: "El formato requerido es: XXXXXXXXXX 10 números",
  },
  direccion: {
    valueMissing: "El campo dirección no pude estar vacío",
    patternMismatch: "La dirección debe contener entre 10 y 40 caracteres",
  },
  ciudad: {
    valueMissing: "El campo ciudad no pude estar vacío",
    patternMismatch: "La ciudad debe contener entre 4 y 30 caracteres",
  },
  estado: {
    valueMissing: "El campo estado no pude estar vacío",
    patternMismatch: "El estado debe contener entre 4 y 30 caracteres",
  },
};

const tiposDeErrores = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "customError",
];

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = ''
    tiposDeErrores.forEach(error=>{
        if(input.validity[error]){
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje=mensajesDeError[tipoDeInput][error]
        }
    })
    return mensaje
}

const validadores={
    nacimiento: (input)=>{validarNacimiento(input)}
}
function validarNacimiento(input){
    const fecha = new Date(input.value)
    let mensaje = ""
    if (!mayorDeEdad(fecha)){
        mensaje="Debes tener al menos 18 años de edad"
    }
    input.setCustomValidity(mensaje);
}
function mayorDeEdad(fechaCliente){    
    const fechaActual = new Date()
    //le añadimos 18 años a la fecha del cliente y verificamos que eso sea menor a la fecha actual 
    const fechaCliente18 = new Date(fechaCliente.getUTCFullYear() + 18, fechaCliente.getUTCMonth(), fechaCliente.getUTCDate())
    return (fechaCliente18<=fechaActual)
}