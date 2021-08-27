/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const URL_BASE = "https://platzi-avo.vercel.app";
const appNode = document.querySelector("#app");


let count = 0;

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);
  return newPrice;
}

//with asyn await 
async function fetchData() {
  try {
    const response = await fetch(`${URL_BASE}/api/avo`),
      responseJson = await response.json()
    const allItems = [];
    responseJson.data.forEach((item) => {
      // console.log(item.name);
      const image = document.createElement('img');
      image.src = `${URL_BASE}${item.image}`;
      image.className = 'card-image';

      const title = document.createElement('h3');
      title.textContent = item.name;
      // title.style.fontSize = '2rem'; //first form to add class
      title.className = 'card-title'; //second form to add class
      // title.className = 'text-2xl text-blue-600';  //third form to add class

      const price = document.createElement('p');
      price.textContent = formatPrice(item.price);
      price.className = 'card-price';

      const container = document.createElement('div');
      container.append(image, title, price);
      container.className = 'card';

      const newDiv = document.createElement('div');
      container.appendChild(newDiv);
      newDiv.append(title, price);
      newDiv.className = 'new-card';

      const signPlus = document.createElement('h6');
      signPlus.textContent = '+';
      signPlus.className = 'btn-signPlus';
      container.appendChild(signPlus);
      const negativeSign = document.createElement('h5');
      negativeSign.textContent = '-';
      negativeSign.className = 'btn-negativeSign';
      container.appendChild(negativeSign);

      const addBtn = document.createElement('div');
      container.appendChild(addBtn);
      addBtn.append(signPlus, negativeSign);
      addBtn.className = 'card-container_btns';


      //event listener
      container.addEventListener("click", (event) => {
        if (event.target.nodeName === 'IMG') {
          // count -= 1;
          // document.getElementById("shopping").innerHTML = count;

          const modal = document.createElement('div');
          modal.classList.add('modal');

          const child = document.createElement('div');
          child.classList.add('child');
          child.innerHTML = event;

          modal.appendChild(child);
          document.body.appendChild(modal);

          const title = document.createElement('h2');
          child.append(title);
          title.textContent = item.name;
          title.className = 'text-2xl blue-red-900 text-center'

          const titleDescription = document.createElement('p');
          child.append(titleDescription);
          titleDescription.textContent = 'Description:';
          titleDescription.className = 'text-1xl text-blue-800'

          const description = document.createElement('p');
          child.appendChild(description);
          description.textContent = item.attributes.description;
          description.className = 'text-justify text-blue-800'

          // create table indide to modal content
          const table = document.createElement('table');
          table.className = 'table';
          for (let i = 0; i < 1; i++) {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.className = 'th';
            th.textContent = 'Attributes';
            tr.appendChild(th);
            table.appendChild(tr);
            for (let j = 0; j < 1; j++) {
              const tr = document.createElement('tr');
              const shape = document.createElement('td');
              shape.textContent = 'Shape';
              shape.className = 'td'
              const td = document.createElement('td');
              td.textContent = item.attributes.shape;
              td.className = 'td';
              tr.appendChild(shape);
              tr.appendChild(td);
              table.appendChild(tr);
              for (let k = 0; k < 1; k++) {
                const tr = document.createElement('tr');
                const hardiness = document.createElement('td');
                hardiness.textContent = 'Hardiness';
                hardiness.className = 'td'
                const td = document.createElement('td');
                td.textContent = item.attributes.hardiness;
                td.className = 'td';
                tr.appendChild(hardiness);
                tr.appendChild(td);
                table.appendChild(tr);
                for (let l = 0; l < 1; l++) {
                  const tr = document.createElement('tr');
                  const taste = document.createElement('td');
                  taste.textContent = 'Taste';
                  taste.className = 'td'
                  const td = document.createElement('td');
                  td.textContent = item.attributes.taste;
                  td.className = 'td'
                  tr.appendChild(taste);
                  tr.appendChild(td);
                  table.appendChild(tr);
                }
              }
            }
          }
          child.appendChild(table);

          function removeModal() {
            const modal = document.querySelector('.modal');
            if (modal) {
              modal.remove();
            };
          };

          modal.addEventListener('click', event => {
            if (event.target.className === 'modal') {
              removeModal();
            };
          });
        };
        if (event.target.nodeName === "H5") {
          event.stopPropagation();
          count -= 1;
          document.getElementById("shopping").innerHTML = count;
        };
        if (event.target.nodeName === "H6") {
          event.stopPropagation();
          count += 1;
          document.getElementById("shopping").innerHTML = count;
        };
      })
      allItems.push(container);
    });
    appNode.append(...allItems);
  } catch (err) {
    console.log(err)
  };
};
fetchData();