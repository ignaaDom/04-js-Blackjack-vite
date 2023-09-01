/**
 * Determina al ganador
 * @param {Array<Number>} puntosJugadores 
 */

export const determinarGanador = (puntosJugadores)=>{
    const [puntosMinimos,puntosComputadora] = puntosJugadores;

    setTimeout(()=>{
        if(puntosComputadora === puntosMinimos){
            alert('Nadie gana :(')
        } else if(puntosComputadora > 21){
            alert('Ganaste');
        }else if((puntosComputadora > puntosMinimos) || (puntosMinimos > 21)){
            alert('Ganó la computadora');
        }
    }, 100);
}