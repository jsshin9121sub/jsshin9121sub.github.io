// CSV 파일 fetch 후 파싱
async function loadBooks() {
  try {
    const res = await fetch("books/books.csv");
    const text = await res.text();
    processCSV(text);
  } catch (err) {
    console.error("책 목록 불러오기 실패:", err);
    document.getElementById("tab-content").textContent = "책 목록을 불러올 수 없습니다.";
  }
}

function processCSV(text) {
  const rows = text.trim().split("\n").map(r => r.split("\t"));
  const headers = rows[0];
  const books = rows.slice(1).map(r => {
    const obj = {};
    headers.forEach((h, i) => (obj[h.trim()] = r[i]?.trim() || ""));
    return obj;
  });

  const all = books;
  const reading = books.filter(b => b["Reading status"] === "Reading");
  const done = books.filter(b => b["Reading status"] === "Done");

  const tabContent = document.getElementById("tab-content");

  function render(list) {
    tabContent.innerHTML = "";
    list.forEach(b => {
      const p = document.createElement("p");
      p.textContent = `${b["Title"] || "제목 없음"} - ${b["Authors"] || "저자 없음"} (${b["Read date"] || ""})`;
      if (b["Reading status"] === "Reading") p.classList.add("reading");
      tabContent.appendChild(p);
    });
  }

  render(all);

  const buttons = document.querySelectorAll(".tab-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (btn.dataset.tab === "all") render(all);
      else if (btn.dataset.tab === "reading") render(reading);
      else if (btn.dataset.tab === "done") render(done);
    });
  });
}

// 초기 로드
loadBooks();

