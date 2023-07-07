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
      resultadoElement.innerHTML = "<p>No ingresó los datos requeridos</p>";
      return;
    } else if (monto <= 0 || plazo <= 0) {
      resultadoElement.innerHTML = "<p>El monto y el plazo deben ser mayores a cero.</p>";
      return;
    }
  
    let InteresAnual = 0.12;
    let InteresMensual = InteresAnual / 12;
    let cuotaMensual = monto * (InteresMensual / (1 - Math.pow(1 + InteresMensual, -plazo)));
  
  
    let prestamo = new Prestamo(nombre, monto, plazo, cuotaMensual.toFixed(2));
  
    prestamos.push(prestamo); 
  
    resultadoElement.innerHTML = `<p>El monto a pagar mensualmente es: $${cuotaMensual.toFixed(2)}</p>`;
  
    // Creamos una tabla con el historial de préstamos
    let tablaHTML = '<table><thead><tr><th>Nombre</th><th>Monto Solicitado</th><th>Plazo</th><th>Cuota Mensual</th></tr></thead><tbody>';
    prestamos.forEach(prestamo => {
      tablaHTML += `<tr><td>${prestamo.nombreCompleto}</td><td>${prestamo.montoSolicitado}</td><td>${prestamo.plazo}</td><td>${prestamo.cuotaMensual}</td></tr>`;
    });
    tablaHTML += '</tbody></table>';
  
    // Agregando la tabla al DOM
    document.getElementById("historial").innerHTML = tablaHTML;
  
    // Aca estaria guardando el historial de préstamos en localStorage como JSON
    localStorage.setItem("prestamos", JSON.stringify(prestamos));
  
    // Limpieza de valores de entrada 
    document.getElementById("nombre").value = "";
    document.getElementById("monto").value = "";
    document.getElementById("plazo").value = "";
  }
  
  function cargarHistorial() {
    const prestamosGuardados = localStorage.getItem("prestamos");
    if (prestamosGuardados) {
      const prestamos = JSON.parse(prestamosGuardados);
      let tablaHTML = '<table><thead><tr><th>Nombre</th><th>Monto Solicitado</th><th>Plazo</th><th>Cuota Mensual</th></tr></thead><tbody>';
      prestamos.forEach(prestamo => {
        tablaHTML += `<tr><td>${prestamo.nombreCompleto}</td><td>${prestamo.montoSolicitado}</td><td>${prestamo.plazo}</td><td>${prestamo.cuotaMensual}</td></tr>`;
      });
      tablaHTML += '</tbody></table>';
      document.getElementById("historial").innerHTML = tablaHTML;
    } else {
      document.getElementById("historial").innerHTML = "<p>No se encontró historial de préstamos.</p>";
    }
  }
  
  document.getElementById("simular").addEventListener("click", simularPrestamo);
