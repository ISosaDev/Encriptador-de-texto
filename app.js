

let textoUsuario = document.getElementById('formulario');// Referencia al input donde el usuario ingresa el texto
let resultado = document.getElementById('resultado'); // Referencia al textarea donde se mostrará el resultado
const textoNoEncontrado = document.getElementById('texto_no_encontrado'); // Referencia al elemento que indica que no se encontró texto
const caracteresNoPermitidos = /[^a-z ]/; // Expresión regular para validar que solo se ingresen letras minúsculas sin acentos


// Objeto con las claves de encriptación/desencriptación
const clavesTexto = {
  a: 'ai',
  e: 'enter',
  i: 'imes',
  o: 'ober',
  u: 'ufat',
  
};

// Función para validar la entrada del usuario y actualizar la interfaz
function validarEntradaUsuario(event) {
  const valor = event.target.value; // Obtiene el valor actual del input
  // Utiliza la expresión regular para verificar si hay caracteres no permitidos
  if (caracteresNoPermitidos.test(valor)) { 
    alert('Solo se permiten minúsculas sin acentos.'); // Si se encuentran caracteres no permitidos, muestra una alerta
    event.target.value = valor.replace(caracteresNoPermitidos, ''); // Elimina los caracteres no permitidos del valor y actualiza el input
    event.target.setSelectionRange(event.target.value.length, event.target.value.length);// Coloca el cursor al final del texto
  } else {
    // Si el input es válido, actualizamos el contenido del textarea
    resultado.textContent = valor;
  };
  textoNoEncontrado.style.display = valor.trim() ? 'none' : 'block'; // Muestra u oculta el contenido de "texto no encontrado" según corresponda
  return
};

// Asocia la función de validación al evento 'input' del elemento de entrada
textoUsuario.addEventListener('input', validarEntradaUsuario);

// Función para encriptar el texto
function encriptarMensaje(){
  const texto = textoUsuario.value.toLowerCase();  // Obtiene el texto a encriptar en minúsculas 
  
  // Utiliza una expresión regular para reemplazar cada vocal por su correspondiente sustitución
  const textoEncriptado = texto.replace(/[aeiou]/g, match => clavesTexto[match]);
  resultado.textContent = textoEncriptado;// Actualiza el elemento de resultado con el texto encriptado
  
};

// Función para desencriptar el texto
function desencriptarMensaje(){
  const texto = textoUsuario.value.toLowerCase(); // Obtiene el texto a desencriptar en minúsculas
  // Invertimos el objeto clavesTexto para la desencriptación
  const clavesDesencriptacion = Object.fromEntries(
    Object.entries(clavesTexto).map(([key, value]) => [value, key])
  );
  // Reemplaza las secuencias encriptadas en el texto por las vocales originales
  const textoDesencriptado = texto.replace(/(ai|enter|imes|ober|ufat)/g, match => clavesDesencriptacion[match]);
  resultado.textContent = textoDesencriptado; // Muestra el texto desencriptado en el textarea resultado
  
};


function copiarTexto() {
  // Selecciona el elemento con id "resultado" para copiar su contenido
  let textoCopia = document.getElementById('resultado');
  
  // Establece el rango de selección para asegurar que se copie todo el texto
  textoCopia.select();
  textoCopia.setSelectionRange(0, 99999); // Para dispositivos móviles

  // Copia el texto seleccionado al portapapeles del navegador
  navigator.clipboard.writeText(textoCopia.value);
};






