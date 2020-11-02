const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const object = {};

  for (const key of data.keys()) {
    object[key] = data.get(key);
  }

  const formData = {
    name: object.name,
    email: object.email,
    payment: object.payment,
    promotion: object.promotion || "Off",
    location: object.location,
  };

  const container = document.getElementById("formInfo");
  let output = `
    <h3>Form Data Entered:</h3>
    <table id="infoTable">
        <tr>
            <th>Key</th>
            <th>Value</th>
        </tr>
  `;

  Object.keys(formData).forEach((key) => {
    output =
      output +
      `
        <tr><td>${key}</td><td>${formData[key]}</td></tr>
      `;
  });
  container.innerHTML = output + "</table>";
});
