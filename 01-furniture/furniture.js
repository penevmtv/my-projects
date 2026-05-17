function solve() {
  const [addedTextArea, buyedTextArea] = document.getElementById('exercise').querySelectorAll('textarea');
  const [generateBtn, buyBtn] = document.getElementById('exercise').querySelectorAll('button');
  const tbodyRef = document.querySelector('.table > tbody');

  async function loadInitialData() {
    try {
      const response = await fetch('furniture.json');
      const data = await response.json();
      addedTextArea.value = JSON.stringify(data, null, 2);
    } catch (error) {
      console.warn('Unable to load furniture.json', error);
    }
  }
  loadInitialData();

  generateBtn.addEventListener('click', generate);
  buyBtn.addEventListener('click', buy);

  function generate() {
    let inputArray;
    try {
      inputArray = JSON.parse(addedTextArea.value);
    } catch {
      return;
    }

    if (!Array.isArray(inputArray) || inputArray.length === 0 || !inputArray.every(item => typeof item === 'object' && item !== null)) return;

    inputArray.forEach(furnitureObj => {
      const newTr = document.createElement('tr');

      appendTd('img', furnitureObj.img, newTr);
      appendTd('p', furnitureObj.name, newTr);
      appendTd('p', furnitureObj.price, newTr);
      appendTd('p', furnitureObj.decFactor, newTr);
      appendTd('input', undefined, newTr);

      tbodyRef.appendChild(newTr);
    })
    addedTextArea.value = '';
  }

  function buy() {
    const allTr = tbodyRef.querySelectorAll('tr');
    const checked = {
      names: [],
      totalPrice: 0,
      sumDecFactor: 0,
      avgDecFac() {
        return this.names.length > 0 ? this.sumDecFactor / this.names.length : 0;
      }
    }
    allTr.forEach(tr => {
      const allTd = tr.querySelectorAll('td');
      const checkbox = allTd[4].querySelector('input[type="checkbox"]');
      if (!checkbox.checked) return;
      checked.names.push(allTd[1].querySelector('p').textContent);
      checked.totalPrice += Number(allTd[2].querySelector('p').textContent);
      checked.sumDecFactor += Number(allTd[3].querySelector('p').textContent);
    });
    if (checked.names.length === 0) return;
    buyedTextArea.value = `Bought furniture: ${checked.names.join(', ')}\nTotal price: ${checked.totalPrice.toFixed(2)}\nAverage decoration factor: ${checked.avgDecFac().toFixed(2)}`;
  }

  function appendTd(tag, value, parent) {
    const newTd = document.createElement('td');

    const tagsObj = {
      img() {
        const newImg = document.createElement('img');
        newImg.src = value;
        newTd.appendChild(newImg);
      },
      p() {
        const newP = document.createElement('p');
        newP.textContent = value;
        newTd.appendChild(newP);
      },
      input() {
        const newInput = document.createElement('input');
        newInput.type = 'checkbox';
        newTd.appendChild(newInput);
      }
    }
    tagsObj[tag]();
    parent.appendChild(newTd);
  }
}
solve();
