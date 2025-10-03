async function loadBooks() {
  const res = await fetch('data/books.csv');
  const csvText = await res.text();
  const { data } = Papa.parse(csvText, { header: true });

  const tabs = {
    all: data,
    reading: data.filter(b => b['Reading status'] === 'Reading'),
    done: data.filter(b => b['Reading status'] === 'Done')
  };

  function renderTab(tabName) {
    const container = document.getElementById('tab-content');
    container.innerHTML = '';

    let books = tabs[tabName];
    if(tabName === 'done') {
      const grouped = {};
      books.forEach(b => {
        const year = b['Read date'] ? new Date(b['Read date']).getFullYear() : 'Unknown';
        if(!grouped[year]) grouped[year] = [];
        grouped[year].push(b);
      });
      for(let year of Object.keys(grouped).sort((a,b)=>b-a)) {
        const h2 = document.createElement('h2');
        h2.textContent = year;
        container.appendChild(h2);

        grouped[year].forEach(b => {
          const p = document.createElement('p');
          p.textContent = `${b.Title} - ${b.Authors}`;
          container.appendChild(p);
        });
      }
    } else {
      books.forEach(b => {
        const p = document.createElement('p');
        p.textContent = `${b.Title} - ${b.Authors}`;
        container.appendChild(p);
      });
    }
  }

  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', e => renderTab(e.target.dataset.tab));
  });

  renderTab('all');
}

loadBooks();

