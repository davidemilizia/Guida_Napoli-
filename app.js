let datiOriginali = [];

fetch("dati.json")
  .then(r => r.json())
  .then(dati => {

    datiOriginali = dati.filter(item =>
      item.Nome &&
      item.Nome.trim() !== ""
    );

    mostra(datiOriginali);

    document
      .getElementById("search")
      .addEventListener("input", cerca);
  });

function cerca() {

  const testo = document
    .getElementById("search")
    .value
    .toLowerCase();

  const filtrati = datiOriginali.filter(item =>
    (item.Nome || "")
      .toLowerCase()
      .includes(testo)
  );

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

        <p>${item.Descrizione || ""}</p>

        <p><strong>${item.Categoria || ""}</strong></p>

        <p>📍 ${item.Zona || ""}</p>

        <p>📅 Giorno ${item.giorno || ""}</p>

        <p>💰 ${item.Costo || ""}</p>
      </div>
    `;
  });

}
