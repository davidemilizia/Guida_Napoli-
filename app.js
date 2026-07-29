let datiOriginali = [];

fetch("dati.json")
  .then(response => response.json())
  .then(dati => {

    datiOriginali = dati.filter(item =>
      item.Nome &&
      item.Nome !== "" &&
      item.Nome !== "[Text]"
    );

    mostra(datiOriginali);

    document
      .getElementById("search")
      .addEventListener("input", cerca);

    document
      .getElementById("giornoFiltro")
      .addEventListener("change", cerca);
    document
    .getElementById("categoriaFiltro")
    .addEventListener("change", cerca);
  })
  .catch(error => {
    console.error(error);
  });

function cerca() {

  const testo =
    document.getElementById("search")
    .value
    .toLowerCase();

  const giorno =
    document.getElementById("giornoFiltro")
    .value;

  const categoria =
    document.getElementById("categoriaFiltro")
    .value;

  const filtrati = datiOriginali.filter(item => {

    const matchNome =
      (item.Nome || "")
      .toLowerCase()
      .includes(testo);

    const matchGiorno =
      giorno === "" ||
      String(item.giorno).trim() === giorno;

    const matchCategoria =
      categoria === "" ||
      (item.Categoria || "").trim() === categoria;

    return matchNome &&
           matchGiorno &&
           matchCategoria;

  });

  mostra(filtrati);

}


function mostra(lista) {

  const contenitore =
    document.getElementById("contenitore");

  contenitore.innerHTML = "";

  lista.forEach(item => {

    let miniatura = "";

    if (item["Immagine 1"]) {
      miniatura =
        `<img class="miniatura"
              src="${item["Immagine 1"]}"
          d-link"
        href="dettaglio.html?id=${item._ComputedKey}"
      >

        <div class="card">

          ${miniatura}

          <h3>${item.Nome || ""}</h3>

          <p>${item.Descrizione || ""}</p>

          <p>
            <strong>${item.Categoria || ""}</strong>
          </p>

          <p>📍 ${item.Zona || ""}</p>

          <p>📅 Giorno ${item.giorno || ""}</p>

        </div>

      </a>
    `;

  });

}
