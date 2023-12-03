// script.js
const areaInicialM2 = 59300000 * 10000; // Área inicial en metros cuadrados (59.3 millones de hectáreas convertidas a m²)
const tasaDeforestacionM2 = 123517 * 10000; // Tasa de deforestación anual en metros cuadrados
const segundosEnUnAño = 365 * 24 * 60 * 60; // Total de segundos en un año
const perdidaPorSegundoM2 = tasaDeforestacionM2 / segundosEnUnAño; // Pérdida por segundo en m²

function formatearNumero(numero) {
    let numeroConDecimales = numero.toFixed(2).replace('.', ',');
    return numeroConDecimales.replace(/\d(?=(\d{3})+\,)/g, '$&.');
}

function calcularAreaActualM2() {
    const ahora = new Date();
    const inicioDelAño = new Date(ahora.getFullYear(), 0, 1);
    const segundosTranscurridos = (ahora - inicioDelAño) / 1000;
    const perdidaAcumuladaM2 = segundosTranscurridos * perdidaPorSegundoM2;
    return Math.max(areaInicialM2 - perdidaAcumuladaM2, 0);
}

function actualizarRelojM2() {
    let areaActualM2 = calcularAreaActualM2();

    setInterval(() => {
        areaActualM2 -= perdidaPorSegundoM2;
        if (areaActualM2 < 0) areaActualM2 = 0;
        document.getElementById('reloj-deforestacion').innerText = formatearNumero(areaActualM2) + ' m²';
    }, 1000); // Actualiza cada segundo
}

if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', actualizarRelojM2);
} else {
    actualizarRelojM2();
}
