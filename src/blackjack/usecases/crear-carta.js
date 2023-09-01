/**
 * Muestra la carta en el div
 * @param {NodoHTML} divCartas Div donde se encuentra el espacio para mostrar las cartas
 * @param {String} carta Carta seleccionada
 * @param {Number} turno Turno del jugador
 */

export const crearCarta = (divCartas,carta,turno)=>{
    const imgCarta = document.createElement('img');
          imgCarta.src = `../../../assets/cartas/${carta}.png`;
          imgCarta.classList.add('carta');

          divCartas[turno].append(imgCarta);
}