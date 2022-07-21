// 2C -> two of clubs
// 2D -> two of diamons
// 2h -> two of hearts
// 2s -> two of spades
// todas las cartas valen los mismo por ejemplo 2C o 2D valen 2 puntos
// las cartas especiales J, Q, K valen 10 puntos
// el A vale 11 puntos
let deck = [];
const tipos = ["C", "D", "H", "S"];
const especiales = ["A", "J", "Q", "K"];

//referencias del html
const btnPedir = document.querySelector("#btnPedir");
const btnNuevo = document.querySelector("#btnNuevo");
const btnDetener = document.querySelector("#btnDetener");
const points = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");
//---------
let puntosJugador = 0,
  puntosComputadora = 0;

//funcion para crear una nueva varaja
const crearDeck = () => {
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
  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

//funcion para pedir una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }
  const carta = deck.pop();
  return carta;
};

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};
const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = pedirCarta();
    const imgCarta = document.createElement("img");
    puntosComputadora += valorCarta(carta);
    points[1].innerText = puntosComputadora;
    imgCarta.src = `./assets/cartas/${carta}.png`;
    imgCarta.classList.add("carta");
    divCartasComputadora.append(imgCarta);
    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
  setTimeout(() => {
    puntosComputadora === puntosMinimos
      ? alert("Empate, nadie gana")
      : puntosComputadora <= 21
      ? alert("Ha ganado la computadora")
      : puntosMinimos <= 21
      ? alert("Has ganado")
      : alert("Has perdido");
  }, 100);
};
const crearCarta = () => {};
//eventos
//callback funciom que se manda como argue¿mento
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();
  const imgCarta = document.createElement("img");
  puntosJugador += valorCarta(carta);
  points[0].innerText = puntosJugador;
  imgCarta.src = `./assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);
  if (puntosJugador > 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    alert('has ganado')
  }
});

btnDetener.addEventListener("click", () => {
  btnDetener.disabled = true;
  btnPedir.disabled = true;
  turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', ()=>{
    console.clear()
    deck = []
    crearDeck();
    points[0].innerHTML = 0
    points[1].innerHTML = 0
    puntosComputadora = 0;
    puntosJugador = 0;
    divCartasComputadora.innerHTML = ''
    divCartasJugador.innerHTML = ''
    btnDetener.disabled = false;
    btnPedir.disabled = false;
})