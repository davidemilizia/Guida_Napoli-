let datiOriginali = [];

fetch("dati.json")
  .then(response => response.json())
  .then(dati => {

    datiOriginali = dati.filter(item =>
      item.Nome &&
      item.Nome.trim() !== "" &&
      item.Nome !== "[Text]"
    );

    mostra(datiOriginali);

    document
      .getElementById("search")
      .addEventListener("input", cerca);

    document
      .getElementById("giornoFiltro")
      .addEventListener("change", cerca);

  });

function cerca() {

  const testo = document
    .getElementById("search")
    .value
    .toLowerCase();

  const giornoSelezionato = document
    .getElementById("giornoFiltro")
    .value;

  const filtrati = datiOriginali.filter(item => {

    const matchNome =
      (item.Nome || "")
        .toLowerCase()
        .includes(testo);

    const matchGiorno =
      giornoSelezionato === "" ||
      String(item.giorno).trim() === giornoSelezionato;

    return matchNome && matchGiorno;

  });

  mostra(filtrati);

}

function mostra(lista) {

  const contenitore =
    document.getElementById("contenitore");

  contenitore.innerHTML = "";

  lista.forEach(item => {

    contenitore.innerHTML += `
      <div class="card">

        <h3>${item.Nome || ""}</h3>

    
