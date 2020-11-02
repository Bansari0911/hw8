let paintings = null;
const cells = [1, 2, 3];

fetch(
  "https://raw.githubusercontent.com/bpesquet/thejsway/master/resources/paintings.json"
)
  .then((rsp) => rsp.json())
  .then((response) => {
    const table = document.getElementById("paintings");
    response.forEach((item) => {
      const row = document.createElement("tr");
      Object.keys(item).forEach((key) => {
        const cell = document.createElement("td");
        cell.appendChild(document.createTextNode(item[key]));
        row.appendChild(cell);
      });
      table.appendChild(row);
    });
  })
  .catch((error) => console.log(error));
