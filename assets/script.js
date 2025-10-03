async function loadBooks() {
  try {
    const res = await fetch('data/books.csv');
    const csvText = await res.text();

    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      transformHeader: h => h.trim() // BOM 제거 및 공백 제거
    });

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

        Object.keys(grouped).sort((a,b) => b-a).forEach(year => {
          const h2 = document.createElement('h2');
          h2.textContent = year;
          container.appendChild(h2);

          grouped[year].forEach(b => {
            const title = b['Title'] || '제목 없음';
            const authors = b['Authors'] || '저자 없음';
            const p = document.createElement('p');
            p.textContent = `${title} - ${authors}`;
            container.appendChild(p);
          });
        });
      } else {
        books.forEach(b => {
          const title = b['Title'] || '제목 없음';
          const authors = b['Authors'] || '저자 없음';
          const p = document.createElement('p');
          p.textContent = `${title} - ${authors}`;
          if(tabName === 'reading') p.classList.add('reading');
          container.appendChild(p);
        });
      }

      document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
      document.querySelector(`.tabs button[data-tab="${tabName}"]`).classList.add('active');
    }

    document.querySelectorAll('.tabs button').forEach(btn => {
      btn.addEventListener('click', e => renderTab(e.target.dataset.tab));
    });

    renderTab('all');

  } catch (error) {
    console.error('Bookshelf 로딩 중 오류 발생:', error);
    const container = document.getElementById('tab-content');
    container.textContent = '책 정보를 불러오는 중 오류가 발생했습니다.';
  }
}

loadBooks();

