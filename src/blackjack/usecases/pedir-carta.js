
/**
 * Esta funcion me permite tomar una carta
 * @param {Array<String>} deck Ejemplo: ['5D','1C','10S'...]
 * @returns {String} Retorna la ultima carta del deck
 */
export const pedirCarta = (deck) => {
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    return deck.pop();
}