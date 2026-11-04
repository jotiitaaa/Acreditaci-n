
// FORMULARIO DE CONTACTO

const formulario = document.getElementById("formularioContacto");

const estadoFormulario = document.getElementById("estadoFormulario");


// ESCUCHAR EL ENVIO DEL FORMULARIO

formulario.addEventListener("submit", function(event) {

    // Evitar que la página se recargue
    event.preventDefault();


    // Obtener los valores ingresados

    const nombre = document.getElementById("nombre").value.trim();

    const email = document.getElementById("email").value.trim();

    const telefono = document.getElementById("telefono").value.trim();

    const asunto = document.getElementById("asunto").value.trim();

    const mensaje = document.getElementById("mensaje").value.trim();


    // VALIDACIONES

    if (nombre === "" || email === "" || asunto === "" || mensaje === "") {

        estadoFormulario.textContent = "Completá todos los campos obligatorios.";

        return;
    }


    // Validar correo electrónico

    const expresionEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionEmail.test(email)) {

        estadoFormulario.textContent = "Ingresá un correo electrónico válido.";

        return;
    }


    // Validar longitud del mensaje

    if (mensaje.length < 10) {

        estadoFormulario.textContent = "El mensaje debe tener al menos 10 caracteres.";

        return;
    }


    // Confirmar que los datos son válidos

   estadoFormulario.textContent = "Enviando consulta...";

fetch("http://localhost:3000/api/consultas", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nombre,
        email,
        telefono,
        asunto,
        mensaje
    })
})
.then(response => response.json())
.then(data => {
    estadoFormulario.textContent = data.mensaje;

    if (data.id) {
        formulario.reset();
    }
})
.catch(error => {
    console.error("Error:", error);
    estadoFormulario.textContent =
        "No se pudo enviar la consulta. Intentá nuevamente.";
});

});
