import { valorCarta } from "./index";

/**
 * Acumula los puntos de los jugadores
 * 
 * Turno: 0 = primer jugador
 * Turno.lenght - 1 = computadora
 * @param {String} carta 
 * @param {Number} turno 
 * @param {Array<Number>} puntosJugadores 
 * @param {NodeList} smalls 
 * @returns 
 */
export const acumularPuntos = (carta,turno,puntosJugadores,smalls)=>{
    puntosJugadores[turno] += valorCarta(carta);
    smalls[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno];
}