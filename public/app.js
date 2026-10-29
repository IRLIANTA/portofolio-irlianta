// ====== EDIT DI SINI ======
const C = {
  name: "Irlianta Rizkiawan",
  roles: ["Full-Stack Web Developer", "UI/UX Design", "GIS Specialist & Technician", "Data Science", "Microsoft Excel Specialist", "Design Graphic", "Editing Video", "Fotograph", "Social Media Specialist"],
  loc: "West Kalimantan · Indonesia",
  email: "irliantar@gmail.com",
  about:
    "Lulusan S1 Teknik Informatika Universitas Muhammadiyah Pontianak yang memiliki kombinasi keahlian teknis mendalam di bidang pengembangan perangkat lunak, analisis data, sistem informasi geografis (GIS), serta kreativitas dalam bidang multimedia dan desain visual. Berorientasi pada solusi berbasis teknologi dengan kemampuan adaptasi yang tinggi untuk menyelesaikan berbagai tantangan proyek digital maupun industri.",
  tech: ["Full-Stack Web Developer", "UI/UX Design", "GIS Specialist & Technician", "Data Science", "Microsoft Excel Specialist", "Design Graphic", "Editing Video", "Fotograph", "Social Media Specialist"],
};
// Data contoh (dipakai bila API belum disetel)
const S = {
  experience: [
    {
      title: "Fullstack Web Developer",
      subtitle: "Nama Perusahaan",
      period: "2025 · 6 bulan",
      description: "Deskripsi singkat pengalaman kerja.",
      tags: "Laravel,Vue,MySQL",
    },
    {
      title: "Data Science Intern",
      subtitle: "MSIB Batch 7",
      period: "2024 · 5 bulan",
      description: "Deskripsi singkat pengalaman.",
      tags: "Python,ML",
    },
  ],
  achievement: [{ title: "Judul prestasi", subtitle: "Penyelenggara", period: "2025" }],
  project: [
    {
      title: "WebGIS Kerentanan",
      subtitle: "Fullstack",
      description: "Sistem informasi geografis berbasis web.",
      tags: "Laravel,Leaflet,PostgreSQL",
    },
    {
      title: "Toko Sepatu",
      subtitle: "Fullstack",
      description: "Web toko dengan alur order dan booking.",
      tags: "Laravel,Tailwind",
    },
  ],
  certificate: [{ title: "Nama sertifikat", subtitle: "Penerbit · 2025" }],
};
// ==========================
const $ = (s) => document.querySelector(s),
  esc = (s) =>
    String(s ?? "").replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
    );
$("#logo").textContent = C.name.toUpperCase() + " / PORTFOLIO";
$("#nm").textContent = C.name;
$("#loc").textContent = C.loc;
$("#fn").textContent = C.name;
$("#yr").textContent = new Date().getFullYear();
$("#em").textContent = C.email;
$("#em").href = "mailto:" + C.email;
$("#tech").innerHTML = C.tech.map((t) => `<span>${t}</span>`).join("");
$("#ab").innerHTML = C.about
  .split(" ")
  .map((w) => `<span>${w}</span>`)
  .join(" ");
const M = (o) => $("#menu").classList.toggle("open", !!o);
// typing
let ri = 0,
  ci = 0,
  del = 0;
(function ty() {
  const r = C.roles[ri];
  ci += del ? -1 : 1;
  $("#role").textContent = r.slice(0, ci);
  let d = del ? 35 : 80;
  if (!del && ci == r.length) {
    del = 1;
    d = 1600;
  } else if (del && !ci) {
    del = 0;
    ri = (ri + 1) % C.roles.length;
    d = 400;
  }
  setTimeout(ty, d);
})();
// data
const get = async (t) => {
  try {
    const r = await fetch("/api/items?type=" + t);
    if (!r.ok) throw 0;
    const d = await r.json();
    if (Array.isArray(d) && d.length) return d;
  } catch (e) {}
  return S[t];
};
const tg = (s) =>
  (s || "")
    .split(",")
    .filter(Boolean)
    .map((x) => `<span>${esc(x.trim())}</span>`)
    .join("");
const bg = (u) => (u ? `style="background-image:url('${esc(u)}')"` : "");
function rv() {
  const io = new IntersectionObserver(
    (e) => e.forEach((x) => x.isIntersecting && x.target.classList.add("in")),
    { threshold: 0.12 },
  );
  document.querySelectorAll(".rv:not(.in)").forEach((e) => io.observe(e));
}
function hov() {
  document.querySelectorAll("a,button,.cc,.pc,.xc").forEach((e) => {
    e.onmouseenter = () => cur.classList.add("h");
    e.onmouseleave = () => cur.classList.remove("h");
  });
}
(async () => {
  const [x, a, p, c] = await Promise.all(
    ["experience", "achievement", "project", "certificate"].map(get),
  );
  $("#track").innerHTML = x
    .map(
      (e, i) =>
        `<article class="xc"><div class="t"><span class="mono" style="color:#777">${String(i + 1).padStart(2, "0")} · ${esc(e.subtitle)}</span><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p><div class="tags">${tg(e.tags)}</div><span class="mono" style="color:#777">${esc(e.period)}</span></div><div class="iw"><div class="i" style="width:100%;height:100%;${e.image ? `background-image:url('${esc(e.image)}')` : ""}"></div></div></article>`,
    )
    .join("");
  $("#ach").innerHTML = a
    .map(
      (e) =>
        `<a class="ar rv" ${e.link ? `href="${esc(e.link)}" target="_blank"` : ""}><span class="mono">${esc(e.period)}</span><b>${esc(e.title)}</b><i>${esc(e.subtitle)}</i></a>`,
    )
    .join("");
  $("#pj").innerHTML = p
    .map(
      (e) =>
        `<a class="pc rv" ${e.link ? `href="${esc(e.link)}" target="_blank"` : ""}><div class="im"><div ${bg(e.image)}></div></div><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p><div class="tags">${tg(e.tags)}</div></a>`,
    )
    .join("");
  $("#cg").innerHTML = c
    .map(
      (e) =>
        `<a class="cc rv" ${e.link ? `href="${esc(e.link)}" target="_blank"` : e.image ? `data-img="${esc(e.image)}" onclick="$('#lb img').src=this.dataset.img;$('#lb').classList.add('on')"` : ""}><div class="im" ${bg(e.image)}></div><div class="t"><b>${esc(e.title)}</b><small>${esc(e.subtitle)} ${esc(e.period || "")}</small></div></a>`,
    )
    .join("");
  rv();
  hov();
  size();
  setTimeout(size, 800);
  addEventListener("load", size);
})();
const tr = $("#track"),
  hs = $("#hs");
function size() {
  hs.style.height = Math.max(innerHeight, tr.scrollWidth - innerWidth + innerHeight) + "px";
}
addEventListener("resize", size);
// scroll effects
const sp = [...document.querySelectorAll("#ab span")];
function sc() {
  const r = hs.getBoundingClientRect(),
    m = hs.offsetHeight - innerHeight,
    p = Math.min(1, Math.max(0, -r.top / m || 0));
  tr.style.transform = `translateX(${-p * (tr.scrollWidth - innerWidth)}px)`;
  const b = $("#about").getBoundingClientRect(),
    q = Math.min(1, Math.max(0, (innerHeight * 0.85 - b.top) / (b.height * 0.9)));
  sp.forEach((s, i) => s.classList.toggle("on", i < q * sp.length * 1.15));
}
addEventListener("scroll", sc, { passive: true });
sc();
// card tilt + cursor
const card = $("#card");
card.onmousemove = (e) => {
  const r = card.getBoundingClientRect(),
    x = (e.clientX - r.left) / r.width - 0.5,
    y = (e.clientY - r.top) / r.height - 0.5;
  card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
};
card.onmouseleave = () => (card.style.transform = "");
const cur = $(".cur");
addEventListener("mousemove", (e) => {
  cur.style.left = e.clientX - 7 + "px";
  cur.style.top = e.clientY - 7 + "px";
});
// clock WIB + contact
setInterval(
  () =>
    ($("#clk").textContent =
      C.loc.split(" ")[0].toUpperCase() +
      ", ID / " +
      new Date().toLocaleTimeString("id-ID", { timeZone: "Asia/Jakarta", hour12: false }) +
      " WIB"),
  1000,
);
async function send(e) {
  e.preventDefault();
  const f = e.target;
  $("#st").textContent = "Mengirim…";
  try {
    const r = await fetch("/api/items?table=messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(f))),
    });
    if (!r.ok) throw 0;
    f.reset();
    $("#st").textContent = "Terkirim, terima kasih!";
  } catch (_) {
    $("#st").textContent = "Gagal mengirim. Coba lagi.";
  }
}
