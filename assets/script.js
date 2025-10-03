document.getElementById("csvFile").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    processCSV(text);
  };
  reader.readAsText(file, "UTF-8");
});

function processCSV(text) {
  const rows = text.split("\n").map(r => r.split("\t"));
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

