class Prestamo {
    constructor(nombreCompleto, montoSolicitado, plazo, cuotaMensual) {
        this.nombreCompleto = nombreCompleto;
        this.montoSolicitado = montoSolicitado;
        this.plazo = plazo;
        this.cuotaMensual = cuotaMensual;
    }
}

const prestamos = [];

function simularPrestamo() {
    const resultadoElement = document.getElementById("resultado");

    let nombre = document.getElementById("nombre").value;
    let monto = document.getElementById("monto").value;
    let plazo = document.getElementById("plazo").value;

    if (!nombre || !monto || !plazo) {
        resultadoElement.textContent = "No ingresó los datos requeridos";
        return;
    } else if (monto <= 0 || plazo <= 0) {
        resultadoElement.textContent = "El monto y el plazo deben ser mayores a cero.";
        return;
    }

    let InteresAnual = 0.12;
    let InteresMensual = InteresAnual / 12;
    let cuotaMensual = monto * (InteresMensual / (1 - Math.pow(1 + InteresMensual, -plazo)));

    // Instancia de la clase Prestamo
    let prestamo = new Prestamo(nombre, monto, plazo, cuotaMensual.toFixed(2));

    prestamos.push(prestamo); // objeto agregado

    resultadoElement.textContent = "El monto a pagar mensualmente es: $" + cuotaMensual.toFixed(2);

    console.table(prestamos);

    // Aca estaria guardando el historial de préstamos en localStorage como JSON
    localStorage.setItem("prestamos", JSON.stringify(prestamos));

    // Limpiando valores de entrada 
    document.getElementById("nombre").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("plazo").value = "";
}

function cargarHistorial() {
    const prestamosGuardados = localStorage.getItem("prestamos");
    if (prestamosGuardados) {
        const prestamos = JSON.parse(prestamosGuardados);
        console.table(prestamos);
    } else {
        console.log("No se encontró historial de préstamos.");
    }
}

document.getElementById("simular").addEventListener("click", simularPrestamo);

