import _ from 'underscore';

import { crearDeck,pedirCarta,valorCarta,crearCarta,turnoComputadora,acumularPuntos} from './usecases/index';
/*
 * 2C = Two of Clubs   (Tréboles)
 * 2H = Two of Hearts  (Corazones)
 * 2D = Two of Diamons (Diamantes)
 * 2S = Two of Sword   (Espadas)
*/

const modulo = (() => {
  'use strict'

  let deck         = [];
  const tipos      = ['C','D','H','S'],
        especiales = ['A','J','Q','K'];

  let puntosJugadores = [];

  //* Referencias del html
  const botonPedir      = document.querySelector("#btnPedir"),
        botonDetener    = document.querySelector('#btnDetener'),
        botonNuevoJuego = document.querySelector('#btnNuevo'),
        smalls = document.querySelectorAll('small'),
        divCartas = document.querySelectorAll('.divCartas');


  
  const inicializarJuego = (numJugadores = 2) =>{
      deck = crearDeck(tipos,especiales);

      puntosJugadores = [];

      for(let i = 0; i < numJugadores;i++){
          puntosJugadores.push(0);
      }

      smalls.forEach(elem => elem.innerText = 0);
      divCartas.forEach(elem => elem.innerHTML = '');

      botonPedir.disabled = false;
      botonDetener.disabled = false;
  }

  //* Eventos
  botonPedir.addEventListener('click',()=>{
      const carta = pedirCarta(deck);
      
      const puntosJugador = acumularPuntos(carta, 0,puntosJugadores,smalls);

      crearCarta(divCartas,carta,0);

      if(puntosJugador > 21){
          botonPedir.disabled = true;
          botonDetener.disabled = true;

          turnoComputadora(puntosJugador,deck,puntosJugadores,divCartas,smalls);
      }else if(puntosJugador === 21){
          botonPedir.disabled = true;
          botonDetener.disabled = true;
          turnoComputadora(puntosJugador,deck,puntosJugadores,divCartas,smalls);
      }
  });

  botonDetener.addEventListener('click',()=>{
      botonPedir.disabled   = true;
      botonDetener.disabled = true;
      turnoComputadora(puntosJugadores[0],deck,puntosJugadores,divCartas,smalls);
  });

  botonNuevoJuego.addEventListener('click',()=>{
      inicializarJuego();
  });


  return {
     nuevoJuego: inicializarJuego
  };
})();

