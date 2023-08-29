import _ from 'underscore';
import {crearDeck} from './usecases/crear-deck';
import { pedirCarta } from './usecases/pedir-carta';
import { valorCarta } from './usecases/valor-carta';

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

  // Turno: 0 = primer jugador
  // Tuero.lenght - 1 = computadora
  const acumularPuntos = (carta,turno)=>{
      puntosJugadores[turno] += valorCarta(carta);
      smalls[turno].innerText = puntosJugadores[turno];

      return puntosJugadores[turno];
  }

  const crearCarta = (carta,turno)=>{
      const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');

            divCartas[turno].append(imgCarta);
  }

  const determinarGanador = ()=>{
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

  //* Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {
      let puntosComputadora = 0;

      do{
          const carta = pedirCarta(deck);
          
          puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

          crearCarta(carta,puntosJugadores.length - 1);
      }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));


      determinarGanador();
  }

  //* Eventos
  botonPedir.addEventListener('click',()=>{
      const carta = pedirCarta(deck);
      
      const puntosJugador = acumularPuntos(carta, 0);

      crearCarta(carta,0);

      if(puntosJugador > 21){
          botonPedir.disabled = true;
          botonDetener.disabled = true;

          turnoComputadora(puntosJugador);
      }else if(puntosJugador === 21){
          botonPedir.disabled = true;
          botonDetener.disabled = true;
          turnoComputadora(puntosJugador);
      }
  });

  botonDetener.addEventListener('click',()=>{
      botonPedir.disabled   = true;
      botonDetener.disabled = true;
      turnoComputadora(puntosJugadores[0]);
  });

  botonNuevoJuego.addEventListener('click',()=>{
      inicializarJuego();
  });


  return {
     nuevoJuego: inicializarJuego
  };
})();

