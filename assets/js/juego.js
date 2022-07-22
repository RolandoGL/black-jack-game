// 2C -> two of clubs
// 2D -> two of diamons
// 2h -> two of hearts
// 2s -> two of spades
// todas las cartas valen los mismo por ejemplo 2C o 2D valen 2 puntos
// las cartas especiales J, Q, K valen 10 puntos
// el A vale 11 puntos

//funcion autoinvocada, praton modulo
const miModulo = (() => {
  "use strict";
  let deck = [];
  let puntosJugadores = [];
    // puntosJugador = 0,
    // puntosComputadora = 0;
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];
  //referencias del html
  const btnPedir = document.querySelector("#btnPedir"),
    btnNuevo = document.querySelector("#btnNuevo"),
    btnDetener = document.querySelector("#btnDetener"),
    points = document.querySelectorAll("small"),
    divCartasJugadores = document.querySelectorAll('.divCartas');
  //funcion para crear una nueva varaja
  const crearDeck = () => {
    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }
    for (let tipo of tipos) {
      for (let especial of especiales) {
        deck.push(especial + tipo);
      }
    }
    return _.shuffle(deck);
  };
  const inicializarJuego = (numJugadores = 2 ) => {
    deck = crearDeck();
    puntosJugadores = []
    for(let i = 0; i < numJugadores; i++){
      puntosJugadores.push(0)
    }
    points.forEach(element => element.innerText = 0)
    divCartasJugadores.forEach(element => element.innerHTML = "")
    btnDetener.disabled = false;
    btnPedir.disabled = false;
  };
  //funcion para pedir una carta
  const pedirCarta = () => (deck.length === 0) ?  "No hay cartas en el deck" : deck.pop();

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
  };

  const acumulaPuntos = ( turno, carta )=>{
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    points[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno]
  }
  const crearCarta = (carta, turno)=>{
    const imgCarta = document.createElement("img");
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasJugadores[turno].append(imgCarta);
  }
  const turnoComputadora = (puntosMinimos) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumulaPuntos( puntosJugadores.length - 1, carta);
      crearCarta(carta, puntosJugadores.length - 1)
      if (puntosMinimos > 21) {
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
    determinarGanador();
  };
  const determinarGanador = ()=>{
    const [puntosMinimos, puntosComputadora] = puntosJugadores
    setTimeout(() => {
      puntosComputadora === puntosMinimos
        ? alert("Empate, nadie gana")
        : puntosComputadora <= 21
        ? alert("Ha ganado la computadora")
        : puntosMinimos <= 21
        ? alert("Has ganado")
        : alert("Has perdido");
    }, 100);
  }
  //eventos
  //callback funciom que se manda como argue¿mento
  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    const puntosJugador = acumulaPuntos(0, carta);
    crearCarta(carta, 0) 
    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      alert("has ganado");
    }
  });

  btnDetener.addEventListener("click", () => {
    btnDetener.disabled = true;
    btnPedir.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });

  btnNuevo.addEventListener("click", () => {
    inicializarJuego();
     
  });
   return {
    nuevoJuego: inicializarJuego
   }
})();
