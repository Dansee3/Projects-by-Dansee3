window.onload = function () {
  autocomplete.init();
};

class Autocomplete {
  input = null;
  autoCompleteList = null;
  init() {
    this.input = document.querySelector('.input');
    this.autoCompleteList = document.querySelector('.auto-complete-list');

    this.input.addEventListener('input', (e) => {
      this.removeAllListItems();
      this.fetchTickers();
    });
  }
  fetchTickers() {
    if (!this.input.value) return;

    fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.input.value}&apikey=G73D5S7FRO4CO6B5`,
    )
      .then((response) => response.json())
      .then((data) => this.parseData(data));
  }
  parseData(data) {
    console.log(data);

    if (!data.bestMatches) return;

    data.bestMatches.forEach((element) => {
      console.log(element);
      const name = element['1. symbol'] + ' ' + element['2. name'];
      const li = this.makeListItem(name);
      this.autoCompleteList.appendChild(li);
    });
  }
  makeListItem(data) {
    const li = document.createElement('li');
    li.classList.add('list-item');
    li.innerHTML = data;
    return li;
  }
  removeAllListItems() {
    this.autoCompleteList.innerHTML = '';
  }
}

const autocomplete = new Autocomplete();
