const button = document.getElementById("lookup");

button.addEventListener("click", () => {
  const user = document.getElementById("user").value;
  if (!!user) {
    fetch("https://api.github.com/users/" + user)
      .then((rsp) => rsp.json())
      .then((response) => {
        const avatar_url = response.avatar_url;
        response = {
          Name: response.name,
          Blog: response.blog,
          Created: response.created_at,
        };
        console.log(response);
        // Render image
        const imageContainer = document.getElementById("picture");
        removeChild(imageContainer);
        const image = document.createElement("img");
        image.setAttribute("id", "avatar");
        image.setAttribute("src", avatar_url);
        imageContainer.appendChild(image);

        // Render table
        const table = document.getElementById("details");
        removeChild(table);

        Object.keys(response).forEach((key) => {
          const row = document.createElement("tr");
          const cell1 = document.createElement("td");
          cell1.appendChild(document.createTextNode(key));
          row.appendChild(cell1);
          const cell2 = document.createElement("td");
          cell2.appendChild(document.createTextNode(response[key]));
          row.appendChild(cell2);
          table.appendChild(row);
        });
      })
      .catch((error) => console.log(error));
  }
});

function removeChild(ele) {
  ele.childNodes.forEach((node) => {
    ele.removeChild(node);
  });
}
