import { pedirCarta,crearCarta,determinarGanador, acumularPuntos} from "./index";

/**
 * Turno de la computadora
 * @param {Numbre} puntosMinimos puntos minimos que la computadora necesita para ganar 
 * @param {Array<String>} deck 
 * @param {Array<Number>} puntosJugadores
 * @param {NodeList} divCartas
 * @param {NodeList} smalls
 */
export const turnoComputadora = (puntosMinimos,deck = [],puntosJugadores,divCartas,smalls) => {
    if(!puntosMinimos) throw new Error('Puntos minimos son necesarios');

    let puntosComputadora = 0;

    do{
        const carta = pedirCarta(deck);
        
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1,puntosJugadores,smalls);

        crearCarta(divCartas,carta,puntosJugadores.length - 1);
    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


    determinarGanador(puntosJugadores);
}
