let datiOriginali = [];

fetch("dati.json")
  .then(r => r.json())
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

  const giorno = document
    .getElementById("giornoFiltro")
    .value;

  const filtrati = datiOriginali.filter(item => {

    const matchNome =
      (item.Nome || "")
      .toLowerCase()
      .includes(testo);

    const matchGiorno =
      giorno === "" ||
      item.giorno === giorno;

    return matchNome && matchGiorno;

  });

  mostra(filtrati);

}

function mostra(lista) {

  const contenitore =
    document.getElementById("contenitore");

  contenitore.
