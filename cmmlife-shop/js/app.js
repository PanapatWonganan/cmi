/* ==========================================================================
   CMMLIFE · storefront application (hash-routed SPA, no build step)
   ========================================================================== */
(function () {
  'use strict';
  const { products, brands, concerns, categories, research, reviews, faqs, shipping, payments, promos, FREE_SHIP, SUB_DISCOUNT } = CMM;

  /* ------------------------------------------------------------------ utils */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const baht = n => '฿' + Math.round(n).toLocaleString('th-TH');
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const byId = id => products.find(p => p.id === id);
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem('cmm.' + k)) ?? d; } catch { return d; } },
    set: (k, v) => localStorage.setItem('cmm.' + k, JSON.stringify(v)),
  };
  const go = h => { location.hash = h; };

  /* ------------------------------------------------------------------ icons (1.7px line, no fills) */
  const I = {
    cart: '<svg class="ic" viewBox="0 0 24 24"><path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L21 8H6.4"/><circle cx="9.5" cy="20" r="1"/><circle cx="17.5" cy="20" r="1"/></svg>',
    search: '<svg class="ic" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>',
    user: '<svg class="ic" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
    menu: '<svg class="ic" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    close: '<svg class="ic" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    plus: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg class="ic" viewBox="0 0 24 24"><path d="M5 12h14"/></svg>',
    check: '<svg class="ic" viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7"/></svg>',
    arrow: '<svg class="ic" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    truck: '<svg class="ic" viewBox="0 0 24 24"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/></svg>',
    balance: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 4v16M6 8h12M6 8l-3 6a3 3 0 0 0 6 0zM18 8l-3 6a3 3 0 0 0 6 0z"/></svg>',
    shield: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z"/></svg>',
    flask: '<svg class="ic" viewBox="0 0 24 24"><path d="M10 3h4M11 3v6l-5.5 9A2 2 0 0 0 7.2 21h9.6a2 2 0 0 0 1.7-3L13 9V3"/><path d="M8 15h8"/></svg>',
    heart: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    cycle: '<svg class="ic" viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v5h-5"/></svg>',
    star: '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z"/></svg>',
    leaf: '<svg class="ic" viewBox="0 0 24 24"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14zM5 19l7-7"/></svg>',
    lock: '<svg class="ic" viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    box: '<svg class="ic" viewBox="0 0 24 24"><path d="M3 8l9-4 9 4-9 4zM3 8v8l9 4 9-4V8M12 12v8"/></svg>',
    doc: '<svg class="ic" viewBox="0 0 24 24"><path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6"/></svg>',
    line: '<svg class="ic" viewBox="0 0 24 24"><path d="M12 4C7 4 3 7.3 3 11.3c0 3.6 3.2 6.6 7.5 7.2.3.1.7.2.8.5.1.2.1.6 0 .9l-.1.8c0 .2-.2.9.8.5s5.2-3.1 7.1-5.3A6.4 6.4 0 0 0 21 11.3C21 7.3 17 4 12 4z"/></svg>',
  };

  /* Logo mark — recreated from CMI.png (open C ring, rosé dot, fern + aqua leaves) */
  /* Logo images — recolored to #3D7059 from the supplied cmmlife logo */
  const logoMark = (c1 = '') => `<img src="assets/logo-cmmlife${(c1 === '#FFFFFF' || c1 === '#fff') ? '-light' : ''}.png" alt="" aria-hidden="true">`;
  const logoFull = (light = false) => `
    <a href="#/" class="logo" aria-label="CMMLIFE หน้าแรก">
      ${light ? logoMark('#FFFFFF') : logoMark()}
      <span><span class="word">CMMLIFE</span><span class="tag">women's health, evidence first</span></span>
    </a>`;
  const miniMark = () => `<img src="assets/logo-cmmlife.png" alt="" aria-hidden="true">`;

  /* ------------------------------------------------------------------ components */
  const stars = (n, size) => `<span class="stars"${size ? ` style="--s:${size}px"` : ''}>${[1, 2, 3, 4, 5].map(i => I.star.replace('<svg', `<svg class="${i <= Math.round(n) ? '' : 'off'}"`)).join('')}</span>`;

  const packshot = (p, cls = '') => `
    <div class="pack ${p.powder ? 'is-powder' : ''} ${cls}" style="--accent:${p.accent}" aria-hidden="true">
      <div class="pk-top">${miniMark(p.accent)}<span>CMMLIFE</span></div>
      <div class="pk-rule"></div>
      <div class="pk-mid">
        <div class="pk-brand">${esc(brands[p.brand].name)}</div>
        <div class="pk-formula">${esc(p.name)}<br>${esc(p.formula)}</div>
        <div class="pk-dot"></div>
        <div class="pk-benefit">${esc(p.benefit)}</div>
      </div>
      <div class="pk-band"></div>
      <div class="pk-bot"><span class="cfu">${esc(p.dose)}</span><span class="cnt">${esc(p.unit)}</span></div>
    </div>`;

  const productCard = (p) => `
    <article class="pcard">
      <a href="#/product/${p.id}" class="media">
        ${p.bestseller ? '<span class="chip chip-rose flag">ขายดี</span>' : p.compareAt ? '<span class="chip chip-aqua flag">เซ็ตประหยัด</span>' : ''}
        ${packshot(p)}
      </a>
      <div class="body">
        <span class="brand">${esc(brands[p.brand].name)} · by CMMLIFE</span>
        <a href="#/product/${p.id}" class="name">${esc(p.name)}</a>
        <span class="benefit">${esc(p.benefit)}</span>
        <span class="meta">${I.flask.replace('class="ic"', 'class="ic" style="width:14px;height:14px"')} ${esc(p.dose)} · ${esc(p.unit)}</span>
        <span class="rating">${stars(p.rating)} ${p.rating.toFixed(1)} <span class="muted">(${p.reviews})</span></span>
        <div class="foot">
          <span class="price">${baht(p.price)}${p.compareAt ? `<s>${baht(p.compareAt)}</s>` : ''}</span>
          <button class="add" data-add="${p.id}" aria-label="เพิ่ม ${esc(p.name)} ลงตะกร้า">${I.plus}</button>
        </div>
      </div>
    </article>`;

  const studyCard = (r) => `
    <div class="study">
      <div class="flex" style="justify-content:space-between">
        <span class="chip chip-aqua">${esc(r.type)} · n = ${r.n.toLocaleString()}</span>
        <span class="t-caption">${r.weeks} สัปดาห์</span>
      </div>
      <div class="st">${esc(r.title)}</div>
      <div class="sj">${esc(r.src)}</div>
      <div class="sf">${esc(r.finding)}</div>
      <div class="databar"><div class="lab"><span>${esc(r.stat.label)}</span><b>${r.stat.value}${r.stat.unit} <span class="muted" style="font-weight:400">· ${esc(r.stat.compare)}</span></b></div><div class="bar"><i style="--w:${Math.min(100, r.stat.unit === '%' ? r.stat.value : 70)}%"></i></div></div>
      <div class="t-caption">PubMed ID ${r.pmid} · สายพันธุ์/สาร: ${r.strains.map(esc).join(', ')}</div>
    </div>`;

  const disclaimer = `<div class="notice">ผลิตภัณฑ์เสริมอาหาร ไม่มีผลในการป้องกันหรือรักษาโรค · ควรกินอาหารหลากหลายครบ 5 หมู่ ในสัดส่วนที่เหมาะสมเป็นประจำ · เด็กและสตรีมีครรภ์ไม่ควรรับประทาน เว้นแต่อยู่ภายใต้คำแนะนำของแพทย์</div>`;

  /* ------------------------------------------------------------------ cart */
  const cart = {
    items: store.get('cart', []),
    promo: store.get('promo', null),
    save() { store.set('cart', this.items); store.set('promo', this.promo); renderHeaderBadge(); },
    key: (id, sub) => `${id}:${sub ? 's' : 'o'}`,
    add(id, qty = 1, sub = false) {
      const k = this.key(id, sub);
      const line = this.items.find(l => l.key === k);
      if (line) line.qty += qty; else this.items.push({ key: k, id, qty, sub });
      this.save(); toast(`เพิ่ม ${byId(id).name} ลงตะกร้าแล้ว`); openDrawer();
    },
    setQty(k, q) { const l = this.items.find(x => x.key === k); if (!l) return; l.qty = Math.max(0, q); if (!l.qty) this.items = this.items.filter(x => x.key !== k); this.save(); renderDrawer(); if (location.hash.startsWith('#/checkout')) render(); },
    remove(k) { this.setQty(k, 0); },
    clear() { this.items = []; this.promo = null; this.save(); },
    count() { return this.items.reduce((a, l) => a + l.qty, 0); },
    linePrice(l) { const p = byId(l.id); return p.price * (l.sub ? 1 - SUB_DISCOUNT : 1); },
    subtotal() { return this.items.reduce((a, l) => a + this.linePrice(l) * l.qty, 0); },
    discount() {
      if (!this.promo) return 0; const pr = promos[this.promo]; const s = this.subtotal();
      if (!pr || (pr.min && s < pr.min)) return 0;
      return pr.type === 'pct' ? s * pr.value / 100 : pr.value;
    },
    shipFee(method) { const s = this.subtotal() - this.discount(); const m = shipping.find(x => x.id === method) || shipping[0]; if (m.id === 'pickup') return 0; return s >= FREE_SHIP && m.id === 'standard' ? 0 : m.price; },
    total(method, pay) { const pm = payments.find(x => x.id === pay); return this.subtotal() - this.discount() + this.shipFee(method) + (pm?.fee || 0); },
  };

  /* ------------------------------------------------------------------ shell */
  function renderShell() {
    $('#app').innerHTML = `
      <div class="announce">ส่งฟรีเมื่อสั่งซื้อ <b>1,500 บาท</b> ขึ้นไป · กล่องทึบไม่ระบุชื่อสินค้า · สมาชิกใหม่ใช้โค้ด <b>WELCOME10</b></div>
      <header class="header">
        <div class="wrap">
          <div class="flex" style="gap:4px"><button class="icon-btn menu-btn" id="menuBtn" aria-label="เมนู">${I.menu}</button>${logoFull()}</div>
          <nav class="nav" id="nav">
            <a href="#/shop">สินค้า</a><a href="#/finder">ค้นหาที่เหมาะกับคุณ</a><a href="#/research">งานวิจัย</a><a href="#/brands">แบรนด์ในเครือ</a><a href="#/about">เกี่ยวกับเรา</a>
          </nav>
          <div class="hdr-actions">
            <button class="icon-btn" id="searchBtn" aria-label="ค้นหา">${I.search}</button>
            <a class="icon-btn" href="#/account" aria-label="บัญชี">${I.user}</a>
            <button class="icon-btn" id="cartBtn" aria-label="ตะกร้า">${I.cart}<span class="badge" id="cartBadge" hidden>0</span></button>
          </div>
        </div>
        <div class="search-bar" id="searchBar"><div class="wrap"><form id="searchForm"><input type="search" id="searchInput" placeholder="ค้นหาสินค้า สายพันธุ์ หรือสารสำคัญ เช่น GR-1, โฟเลต" autocomplete="off"><button class="btn btn-fern" type="submit">ค้นหา</button></form></div></div>
      </header>
      <main id="view"></main>
      <footer class="footer">
        <div class="wrap">
          <div class="top">
            <div>${logoFull(true)}<p class="mt4" style="max-width:34ch;font-size:13.5px">ให้ผู้หญิงไทยดูแลสุขภาพจากภายในได้อย่างมั่นใจ ด้วยผลิตภัณฑ์ที่มีงานวิจัยรองรับ ไม่ใช่คำโฆษณา</p>
              <div class="dots mt6"><i></i><i></i><i></i><i></i></div></div>
            <div><h4>สินค้า</h4><ul>${concerns.map(c => `<li><a href="#/shop?concern=${c.id}">${esc(c.name)}</a></li>`).join('')}<li><a href="#/shop?cat=bundle">เซ็ตดูแล</a></li></ul></div>
            <div><h4>ความรู้</h4><ul><li><a href="#/research">งานวิจัยทั้งหมด</a></li><li><a href="#/finder">ค้นหาผลิตภัณฑ์ที่เหมาะกับคุณ</a></li><li><a href="#/help">คำถามที่พบบ่อย</a></li><li><a href="#/about">แก่นแบรนด์</a></li></ul></div>
            <div><h4>ช่วยเหลือ</h4><ul><li><a href="#/help">การจัดส่งและคืนสินค้า</a></li><li><a href="#/account">ติดตามคำสั่งซื้อ</a></li><li><a href="#/help">ปรึกษาเภสัชกร</a></li><li><a href="mailto:care@cmmlife.co.th">care@cmmlife.co.th</a></li></ul>
              <a class="btn btn-line btn-sm mt2" href="#/help">${I.line} LINE @cmmlife</a></div>
          </div>
          <div class="disclaimer">ผลิตภัณฑ์เสริมอาหาร ไม่มีผลในการป้องกันหรือรักษาโรค · อ่านคำเตือนในฉลากก่อนบริโภค · ข้อมูลงานวิจัยบนเว็บไซต์นี้จัดทำเพื่อให้ความรู้ ไม่ใช่คำแนะนำทางการแพทย์ · บริษัท ซีเอ็มเอ็มไลฟ์ จำกัด เลขทะเบียน 0105566000000</div>
          <div class="legal"><span>© 2026 CMMLIFE Co., Ltd. · Bangkok</span><span>นโยบายความเป็นส่วนตัว · เงื่อนไขการใช้บริการ · PDPA</span></div>
        </div>
      </footer>
      <div class="drawer" id="drawer"><div class="scrim" data-close-drawer></div><div class="panel" role="dialog" aria-label="ตะกร้าสินค้า"><div id="drawerInner"></div></div></div>
      <div class="sheet" id="sheet"><div class="scrim" data-close-sheet></div><div class="panel">
        <div class="flex" style="justify-content:space-between;margin-bottom:16px">${logoFull()}<button class="icon-btn" data-close-sheet>${I.close}</button></div>
        <a href="#/shop">สินค้าทั้งหมด</a><a href="#/finder">ค้นหาที่เหมาะกับคุณ</a><a href="#/research">งานวิจัย</a><a href="#/brands">แบรนด์ในเครือ</a><a href="#/about">เกี่ยวกับเรา</a><a href="#/account">บัญชีของฉัน</a><a href="#/help">ช่วยเหลือ</a>
      </div></div>
      <div class="toast" id="toast"></div>
      <div class="buybar" id="buybar"></div>`;

    $('#cartBtn').onclick = openDrawer;
    $('#menuBtn').onclick = () => { $('#sheet').classList.add('open'); document.body.classList.add('lock'); };
    $$('[data-close-sheet]').forEach(b => b.onclick = () => { $('#sheet').classList.remove('open'); document.body.classList.remove('lock'); });
    $('[data-close-drawer]').onclick = closeDrawer;
    $('#searchBtn').onclick = () => { const sb = $('#searchBar'); sb.classList.toggle('open'); if (sb.classList.contains('open')) $('#searchInput').focus(); };
    $('#searchForm').onsubmit = e => { e.preventDefault(); const q = $('#searchInput').value.trim(); if (q) { go('#/shop?q=' + encodeURIComponent(q)); $('#searchBar').classList.remove('open'); } };
    renderHeaderBadge();
  }

  function renderHeaderBadge() { const b = $('#cartBadge'); if (!b) return; const n = cart.count(); b.hidden = !n; b.textContent = n; }
  function toast(msg) { const t = $('#toast'); t.innerHTML = I.check + esc(msg); t.classList.add('show'); clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 2200); }
  function openDrawer() { renderDrawer(); $('#drawer').classList.add('open'); document.body.classList.add('lock'); }
  function closeDrawer() { $('#drawer').classList.remove('open'); document.body.classList.remove('lock'); }

  function cartLine(l) {
    const p = byId(l.id);
    return `<div class="line">
      ${packshot(p)}
      <div><div class="ln">${esc(p.name)}</div><div class="lv">${esc(p.unit)}${l.sub ? ' · <span style="color:var(--aqua)">ส่งทุก 30 วัน −10%</span>' : ''}</div>
        <div class="qty"><button data-qty="${l.key}" data-d="-1" aria-label="ลด">${I.minus}</button><span>${l.qty}</span><button data-qty="${l.key}" data-d="1" aria-label="เพิ่ม">${I.plus}</button></div></div>
      <div class="lp"><span class="price" style="font-size:15px">${baht(cart.linePrice(l) * l.qty)}</span><button class="rm" data-rm="${l.key}">นำออก</button></div>
    </div>`;
  }

  function renderDrawer() {
    const el = $('#drawerInner'); if (!el) return;
    const s = cart.subtotal(); const left = Math.max(0, FREE_SHIP - s);
    el.innerHTML = `
      <div class="dh"><h3>ตะกร้า <span class="muted" style="font-size:14px;font-weight:400">(${cart.count()} ชิ้น)</span></h3><button class="icon-btn" data-close-drawer aria-label="ปิด">${I.close}</button></div>
      <div class="db">
        ${cart.items.length ? `<div class="ship-prog ${left ? '' : 'done'}">${left ? `สั่งเพิ่มอีก <b>${baht(left)}</b> เพื่อรับสิทธิ์ส่งฟรี` : 'คุณได้รับสิทธิ์ส่งฟรีแล้ว'}<div class="bar"><i style="width:${Math.min(100, s / FREE_SHIP * 100)}%"></i></div></div>` + cart.items.map(cartLine).join('')
          : `<div class="empty"><p>ยังไม่มีสินค้าในตะกร้า</p><a class="btn btn-secondary mt4" href="#/shop" data-close-drawer>เลือกสินค้า</a></div>`}
      </div>
      ${cart.items.length ? `<div class="df">
        <div class="tot"><span>ยอดรวมสินค้า</span><span>${baht(s)}</span></div>
        <div class="t-caption">ค่าจัดส่งและส่วนลดจะคำนวณในขั้นตอนชำระเงิน</div>
        <a class="btn btn-primary btn-lg btn-block" href="#/checkout" data-close-drawer>ชำระเงิน ${I.arrow}</a>
        <a class="btn btn-ghost btn-block" href="#/shop" data-close-drawer>เลือกสินค้าเพิ่ม</a>
      </div>` : ''}`;
    $$('[data-close-drawer]', el).forEach(b => b.onclick = closeDrawer);
    $$('[data-qty]', el).forEach(b => b.onclick = () => { const l = cart.items.find(x => x.key === b.dataset.qty); cart.setQty(b.dataset.qty, l.qty + +b.dataset.d); });
    $$('[data-rm]', el).forEach(b => b.onclick = () => cart.remove(b.dataset.rm));
  }

  /* ------------------------------------------------------------------ views */
  const views = {};

  views.home = () => {
    const featured = products.filter(p => p.cat !== 'bundle').slice(0, 4);
    const bundles = products.filter(p => p.cat === 'bundle');
    const hp = byId('probio-pro-plus'), hp2 = byId('fertility-prep'), hp3 = byId('cranberry-pac36');
    return `
      <section class="hero">
        <div class="wrap">
          <div class="hero-copy">
            <span class="t-accent reveal">evidence-first supplements</span>
            <h1 class="t-display reveal d1">ดูแลสุขภาพผู้หญิง<br>จากภายใน</h1>
            <p class="lead reveal d2">ผลิตภัณฑ์ที่คัดวัตถุดิบจากหลักฐานทางคลินิก ระบุสายพันธุ์และปริมาณสารสำคัญทุกตัว เพื่อให้คุณตัดสินใจได้ด้วยข้อมูล ไม่ใช่คำโฆษณา</p>
            <div class="hero-cta reveal d3"><a class="btn btn-primary btn-lg" href="#/shop">เลือกสินค้า</a><a class="btn btn-secondary btn-lg" href="#/research">อ่านงานวิจัย</a></div>
            <div class="hero-proof reveal d4">
              <div><strong>${research.length}</strong><span>งานวิจัยอ้างอิงที่เปิดเผย</span></div>
              <div><strong>100%</strong><span>ระบุรหัสสายพันธุ์</span></div>
              <div><strong>4.8</strong><span>คะแนนจาก ${products.reduce((a, p) => a + p.reviews, 0).toLocaleString()} รีวิว</span></div>
            </div>
          </div>
          <div class="hero-visual reveal d2">
            <div class="hero-ring"></div><div class="hero-ring r2"></div><div class="hero-ring r3"></div>
            <div class="hero-pack p2">${packshot(hp2)}</div>
            <div class="hero-pack p3">${packshot(hp3)}</div>
            <div class="hero-pack">${packshot(hp)}</div>
            <div class="hero-note n1"><span class="dot"></span><div><b>La-14® · HN001™</b>ตรวจพบในช่องคลอด 80% ที่วันที่ 14</div></div>
            <div class="hero-note n2"><span class="dot aq"></span><div><b>ไม่ต้องแช่เย็น</b>คง CFU ตามฉลากถึงวันหมดอายุ</div></div>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="pillars io">
            <div class="pillar"><div class="num">1</div><h3>Evidence First</h3><p>ทุกคำกล่าวอ้างต้องอ้างอิงสายพันธุ์หรือสารสำคัญที่มีงานวิจัย</p></div>
            <div class="pillar"><div class="num">2</div><h3>Clarity</h3><p>อธิบายกลไกให้เข้าใจได้ ไม่ซ่อนข้อมูลไว้ในตัวอักษรเล็ก</p></div>
            <div class="pillar"><div class="num">3</div><h3>Care</h3><p>พูดกับผู้หญิงอย่างให้เกียรติ ไม่ใช้ความอายเป็นเครื่องมือขาย</p></div>
            <div class="pillar"><div class="num">4</div><h3>Consistency</h3><p>ทุกแบรนด์ในเครือใช้มาตรฐานคุณภาพและการสื่อสารชุดเดียวกัน</p></div>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="sec-head io"><div><div class="eyebrow"><span class="t-label">เลือกตามเรื่องที่คุณดูแล</span></div><h2 class="t-h1">เริ่มจากสิ่งที่คุณอยากดูแล</h2></div><a class="link" href="#/finder">หรือให้เราช่วยแนะนำใน 3 คำถาม</a></div>
          <div class="concerns io">${concerns.map(c => `<a class="concern" href="#/shop?concern=${c.id}"><span class="ico">${I[c.icon]}</span><b>${esc(c.name)}</b><span>${esc(c.sub)}</span></a>`).join('')}</div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="sec-head io"><div><div class="eyebrow"><span class="t-label">Nutralist · by CMMLIFE</span></div><h2 class="t-h1">สินค้าแนะนำ</h2><p>ทุกชิ้นระบุรหัสสายพันธุ์ ปริมาณต่อหน่วย และงานวิจัยที่อ้างอิง</p></div><a class="link" href="#/shop">ดูสินค้าทั้งหมด</a></div>
          <div class="grid-products io">${featured.map(productCard).join('')}</div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="research-band io">
            <div>
              <span class="t-accent">from the literature</span>
              <h2 class="t-h1 mt2">เราให้ข้อมูลก่อนขาย</h2>
              <p class="mt4 t-body-l">ตัวเลขทุกตัวบนเว็บไซต์มาจากงานวิจัยที่ตีพิมพ์ พร้อมเลข PubMed ให้คุณตรวจสอบเองได้ และเราจะไม่ใช้คำว่า "รักษา" "หายขาด" หรือ "การันตีผล" ในทุกข้อความ</p>
              <a class="btn btn-secondary mt6" style="border-color:rgba(255,255,255,.6);color:#fff" href="#/research">ดูงานวิจัยทั้งหมด</a>
            </div>
            <div class="databars">
              ${research.slice(0, 3).map(r => `<div class="databar"><div class="lab"><span>${esc(r.stat.label)}</span><b>${r.stat.value}${r.stat.unit}</b></div><div class="bar"><i style="--w:${r.stat.unit === '%' ? r.stat.value : 70}%"></i></div><div class="src">${esc(r.src)}</div></div>`).join('')}
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="sec-head io"><div><div class="eyebrow"><span class="t-label">เซ็ตดูแล</span></div><h2 class="t-h1">จับคู่ตามคำแนะนำของเภสัชกร</h2></div></div>
          <div class="grid-products io">${bundles.map(productCard).join('')}
            <div class="card card-pad" style="grid-column: span 2; background: var(--fern); color:#fff; border:0; display:flex; flex-direction:column; justify-content:center; gap:12px">
              <span class="t-accent" style="color:#8FD0D8">why pair</span>
              <h3 class="t-h2" style="color:#fff">ทำไมเภสัชกรถึงจับคู่แบบนี้</h3>
              <p style="color:rgba(255,255,255,.8)">ปัญหาที่เป็นซ้ำมักมีมากกว่าหนึ่งกลไก เช่น สมดุลจุลินทรีย์และการยึดเกาะของแบคทีเรีย เซ็ตของเราจึงจับคู่สารที่ทำงานคนละจุดและมีงานวิจัยรองรับแยกกัน ไม่ใช่รวมทุกอย่างไว้ในเม็ดเดียว</p>
              <ul style="display:grid;gap:8px;font-size:14px;color:rgba(255,255,255,.85)"><li>· ประหยัดกว่าซื้อแยก 190–380 บาท</li><li>· มีการ์ดสรุปปริมาณสารสำคัญสำหรับแจ้งแพทย์</li><li>· ส่งฟรีทุกเซ็ต</li></ul>
              <a class="link" style="color:#fff;border-color:#8FD0D8;align-self:start" href="#/shop?cat=bundle">ดูเซ็ตทั้งหมด</a>
            </div></div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="sec-head io"><div><div class="eyebrow"><span class="t-label">แบรนด์ในเครือ</span></div><h2 class="t-h1">หนึ่งแบรนด์ ดูแลหนึ่งกลุ่มปัญหา</h2><p>CMMLIFE เป็นผู้รับรองคุณภาพ ส่วนแบรนด์ลูกแต่ละแบรนด์ดูแลเรื่องเฉพาะทางโดยไม่ทับซ้อนกัน</p></div><a class="link" href="#/brands">โครงสร้างแบรนด์</a></div>
          <div class="brands io">${Object.values(brands).map(b => brandCard(b)).join('')}</div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="sec-head io"><div><div class="eyebrow"><span class="t-label">เสียงจากผู้ใช้</span></div><h2 class="t-h1">รีวิวที่ผ่านการยืนยันการซื้อ</h2></div></div>
          <div class="reviews io">${reviews.slice(0, 3).map(reviewCard).join('')}</div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="wrap">
          <div class="connect io">
            <div class="card"><span class="t-accent">educational letters</span><h3 class="t-h2 mt2">จดหมายความรู้ เดือนละครั้ง</h3><p class="muted mt2">สรุปงานวิจัยใหม่เรื่องสุขภาพผู้หญิงด้วยภาษาที่เข้าใจได้ ไม่มีโปรโมชันรบกวน ยกเลิกได้ทุกเมื่อ</p>
              <form id="nlForm"><input type="email" placeholder="อีเมลของคุณ" required><button class="btn btn-fern" type="submit">สมัครรับ</button></form></div>
            <div class="card line-card"><h3 class="t-h2">ปรึกษาเภสัชกรทาง LINE</h3><p class="mt2">ถามเรื่องการเลือกผลิตภัณฑ์ การใช้ร่วมกับยา หรือขอเอกสารงานวิจัย ตอบโดยเภสัชกรทุกวัน 9:00–20:00</p><a class="btn btn-line mt6" href="#/help">${I.line} เพิ่มเพื่อน @cmmlife</a></div>
          </div>
        </div>
      </section>`;
  };

  const brandCard = (b) => `
    <a class="brand-card ${b.live ? 'live' : 'soon'}" href="${b.live ? '#/shop?brand=' + b.id : '#/brands'}">
      <span class="swatch" style="background:${b.accent}"></span>
      <span class="bname">${esc(b.name)}</span>
      <span class="bdesc">${esc(b.desc)}</span>
      <span class="by">${b.live ? 'BY CMMLIFE' : 'COMING SOON'}</span>
    </a>`;

  const reviewCard = (r) => { const p = byId(r.p); return `
    <div class="review">${stars(r.stars)}<q>${esc(r.text)}</q>
      <div class="who"><span class="av">${esc(r.init)}</span><div>${esc(r.name)}, ${r.age}<small>${esc(p.name)} · ${r.date}</small></div><span class="verified" style="margin-left:auto">${I.check} ยืนยันการซื้อ</span></div></div>`; };

  /* ---- shop */
  views.shop = (params) => {
    const q = (params.get('q') || '').toLowerCase();
    const sel = { concern: params.getAll('concern'), cat: params.getAll('cat'), brand: params.getAll('brand') };
    const sort = params.get('sort') || 'featured';
    let list = products.filter(p => (!sel.concern.length || p.concerns.some(c => sel.concern.includes(c))) && (!sel.cat.length || sel.cat.includes(p.cat)) && (!sel.brand.length || sel.brand.includes(p.brand)));
    if (q) list = list.filter(p => [p.name, p.formula, p.benefit, p.desc, ...p.tags, ...p.ingredients.map(i => i[0])].join(' ').toLowerCase().includes(q));
    const sorters = { featured: (a, b) => (b.bestseller - a.bestseller) || b.reviews - a.reviews, priceAsc: (a, b) => a.price - b.price, priceDesc: (a, b) => b.price - a.price, rating: (a, b) => b.rating - a.rating };
    list.sort(sorters[sort]);
    const title = q ? `ผลการค้นหา "${esc(q)}"` : sel.concern.length === 1 ? concerns.find(c => c.id === sel.concern[0]).name : sel.cat.length === 1 ? categories.find(c => c.id === sel.cat[0]).name : 'สินค้าทั้งหมด';
    const group = (key, items, name) => `<div class="fgroup"><h4>${name}</h4>${items.map(it => `<label><input type="checkbox" data-f="${key}" value="${it.id}" ${sel[key].includes(it.id) ? 'checked' : ''}>${esc(it.name)}<span class="n">${products.filter(p => key === 'concern' ? p.concerns.includes(it.id) : p[key] === it.id).length}</span></label>`).join('')}</div>`;
    return `
      <div class="wrap">
        <div class="page-head"><div class="crumbs"><a href="#/">หน้าแรก</a><span>/</span><span>สินค้า</span></div><h1 class="t-h1">${title}</h1></div>
        <div class="shop">
          <aside class="filters" id="filters">
            ${group('concern', concerns, 'เรื่องที่ดูแล')}
            ${group('cat', categories, 'ประเภท')}
            ${group('brand', Object.values(brands).filter(b => b.live), 'แบรนด์')}
            <a class="btn btn-ghost btn-sm" href="#/shop">ล้างตัวกรอง</a>
          </aside>
          <div>
            <div class="toolbar"><span class="count">${list.length} รายการ</span><div class="flex"><button class="btn btn-secondary btn-sm filter-toggle" id="ftoggle">ตัวกรอง</button><select class="select" id="sort"><option value="featured" ${sort === 'featured' ? 'selected' : ''}>แนะนำ</option><option value="rating" ${sort === 'rating' ? 'selected' : ''}>คะแนนรีวิว</option><option value="priceAsc" ${sort === 'priceAsc' ? 'selected' : ''}>ราคาต่ำ–สูง</option><option value="priceDesc" ${sort === 'priceDesc' ? 'selected' : ''}>ราคาสูง–ต่ำ</option></select></div></div>
            ${list.length ? `<div class="grid-products">${list.map(productCard).join('')}</div>` : `<div class="empty"><h3 class="t-h3">ไม่พบสินค้าที่ตรงกับเงื่อนไข</h3><p class="mt2">ลองค้นด้วยชื่อสารสำคัญ เช่น "อินโนซิทอล" หรือดูสินค้าทั้งหมด</p><a class="btn btn-secondary mt6" href="#/shop">ดูสินค้าทั้งหมด</a></div>`}
            <div class="mt8">${disclaimer}</div>
          </div>
        </div>
      </div>`;
  };
  views.shop.after = (params) => {
    const apply = () => { const p = new URLSearchParams(); const q = params.get('q'); if (q) p.set('q', q); $$('[data-f]:checked').forEach(c => p.append(c.dataset.f, c.value)); p.set('sort', $('#sort').value); go('#/shop?' + p.toString()); };
    $$('[data-f]').forEach(c => c.onchange = apply); $('#sort').onchange = apply;
    $('#ftoggle').onclick = () => $('#filters').classList.toggle('open');
  };

  /* ---- product detail */
  views.product = (params, id) => {
    const p = byId(id); if (!p) return views.notFound();
    const rs = p.research.map(r => research.find(x => x.id === r)).filter(Boolean);
    const rv = reviews.filter(r => r.p === p.id);
    const related = products.filter(x => x.id !== p.id && x.concerns.some(c => p.concerns.includes(c))).slice(0, 4);
    const hist = [5, 4, 3, 2, 1].map(s => [s, rv.filter(r => r.stars === s).length]);
    return `
      <div class="wrap">
        <div class="page-head" style="padding-bottom:0"><div class="crumbs"><a href="#/">หน้าแรก</a><span>/</span><a href="#/shop">สินค้า</a><span>/</span><a href="#/shop?cat=${p.cat}">${esc(categories.find(c => c.id === p.cat).name)}</a><span>/</span><span>${esc(p.name)}</span></div></div>
        <div class="pdp">
          <div class="pdp-gallery">
            <div class="pdp-stage" id="stage"><div class="ring"></div><div class="ring r2"></div>${packshot(p)}<span class="chip lab" id="stageLab">${esc(p.gallery[0])}</span></div>
            <div class="pdp-thumbs">${p.gallery.map((g, i) => `<button class="${i ? '' : 'on'}" data-g="${i}">${esc(g)}</button>`).join('')}</div>
          </div>
          <div class="pdp-info">
            <div class="brand-line"><span class="chip chip-fern">${esc(brands[p.brand].name)}</span><span class="t-label" style="letter-spacing:.18em">by CMMLIFE</span>${p.bestseller ? '<span class="chip chip-rose">ขายดี</span>' : ''}</div>
            <h1>${esc(p.name)}</h1>
            <div class="formula">${esc(p.formula)}</div>
            <div class="flex" style="gap:8px">${stars(p.rating)} <b class="t-mono" style="color:var(--fern)">${p.rating.toFixed(1)}</b><a href="#reviews" class="link" style="font-size:13px" data-tab="reviews">${p.reviews} รีวิว</a><span class="muted">·</span><span class="t-caption">เลข อย. ${esc(p.fda)}</span></div>
            <p class="desc">${esc(p.desc)}</p>
            <div class="facts">${p.facts.map(f => `<div class="fact"><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join('')}</div>
            <div class="flex" style="gap:6px">${p.tags.map(t => `<span class="chip pill">${esc(t)}</span>`).join('')}</div>
            <div class="pdp-price"><span class="price" id="pdpPrice">${baht(p.price)}</span>${p.compareAt ? `<s class="muted">${baht(p.compareAt)}</s>` : ''}<span class="per">· ${baht(p.price / (parseInt(p.unit) || 30))} ต่อวัน</span></div>
            <div class="opt"><h4>รูปแบบการสั่งซื้อ</h4>
              <div class="opt-row">
                <label class="opt-card on"><input type="radio" name="sub" value="0" checked><div><b>ซื้อครั้งเดียว</b><span>${baht(p.price)} · ไม่มีข้อผูกมัด</span></div></label>
                <label class="opt-card"><input type="radio" name="sub" value="1"><div><b>ส่งทุก 30 วัน <span class="save">−10%</span></b><span>${baht(p.price * (1 - SUB_DISCOUNT))} · ข้ามหรือยกเลิกได้ทุกเมื่อ</span></div></label>
              </div></div>
            <div class="buy-row">
              <div class="qty"><button id="qm" aria-label="ลด">${I.minus}</button><span id="qv">1</span><button id="qp" aria-label="เพิ่ม">${I.plus}</button></div>
              <button class="btn btn-primary btn-lg" id="addBtn">${I.cart} เพิ่มลงตะกร้า</button>
            </div>
            <div class="ship-hints">
              <div>${I.check} ส่งฟรีเมื่อสั่งซื้อ ${baht(FREE_SHIP)} ขึ้นไป · กล่องทึบไม่ระบุชื่อสินค้า</div>
              <div>${I.check} เหลือในคลัง ${p.stock} ชิ้น · จัดส่งภายใน 24 ชั่วโมง</div>
              <div>${I.check} ปรึกษาเภสัชกรก่อนซื้อได้ทาง LINE @cmmlife</div>
            </div>
          </div>
        </div>

        <div class="pdp-tabs">
          <div class="tabs" id="tabs"><button class="on" data-tab="mech">กลไกและส่วนผสม</button><button data-tab="research">งานวิจัย (${rs.length})</button><button data-tab="usage">วิธีรับประทาน</button><button data-tab="reviews">รีวิว (${rv.length})</button><button data-tab="faq">คำถามที่พบบ่อย</button></div>
          <div class="tabpanel on" data-panel="mech"><div class="two">
            <div><h3 class="t-h3 mb4">ส่วนผสมต่อหน่วยบริโภค</h3><table class="spec-table"><tbody>${p.ingredients.map(i => `<tr><th>${esc(i[0])}</th><td>${esc(i[1])}</td></tr>`).join('')}</tbody></table>
              <p class="t-caption mt4">ปริมาณที่แสดงคือปริมาณ ณ วันหมดอายุ (สำหรับโพรไบโอติก) ไม่ใช่ปริมาณ ณ วันผลิต</p></div>
            <div><h3 class="t-h3 mb4">กลไกการทำงาน</h3><p class="muted">${esc(p.desc)}</p>
              <div class="mt6"><h4 class="t-label mb4" style="color:var(--fern)">สิ่งที่เราจะไม่อ้าง</h4><div class="warn-box">เราไม่อ้างว่าผลิตภัณฑ์นี้ "รักษา" หรือ "หายขาด" จากภาวะใด ๆ ผลลัพธ์ในงานวิจัยเป็นค่าเฉลี่ยของกลุ่มตัวอย่าง และอาจแตกต่างกันในแต่ละบุคคล</div></div>
              <div class="mt4">${disclaimer}</div></div>
          </div></div>
          <div class="tabpanel" data-panel="research">${rs.length ? `<div class="two"><div>${rs.map(studyCard).join('')}</div><div><div class="card card-pad"><h3 class="t-h3 mb4">วิธีอ่านงานวิจัยของเรา</h3><p class="muted" style="font-size:14px">เราแสดงเฉพาะงานวิจัยที่ใช้สายพันธุ์หรือสารชนิดเดียวกับในผลิตภัณฑ์ ในปริมาณใกล้เคียงกัน และระบุจำนวนผู้เข้าร่วม (n) ระยะเวลา และเลข PubMed ทุกครั้ง หากเป็นการศึกษาแบบ RCT (สุ่มเทียบยาหลอก) จะมีน้ำหนักมากกว่าการศึกษาแบบสังเกต</p><a class="link mt4" style="display:inline-block" href="#/research">ดูงานวิจัยทั้งหมดในห้องสมุด</a></div></div></div>` : `<div class="card card-pad"><p class="muted">ผลิตภัณฑ์นี้ใช้สารอาหารพื้นฐานที่มีข้อแนะนำจากหน่วยงานสาธารณสุข เราจึงยังไม่แสดงงานวิจัยเฉพาะ หากต้องการเอกสารอ้างอิง สอบถามเภสัชกรได้ทาง LINE</p></div>`}</div>
          <div class="tabpanel" data-panel="usage"><div class="two"><div><h3 class="t-h3 mb4">วิธีรับประทาน</h3><p>${esc(p.usage)}</p><h3 class="t-h3 mt6 mb4">วิธีเก็บรักษา</h3><p class="muted">เก็บที่อุณหภูมิไม่เกิน 30°C พ้นแสงแดดและความชื้น ปิดฝาให้สนิททุกครั้ง</p></div><div><h3 class="t-h3 mb4">คำเตือน</h3><div class="notice">อ่านคำเตือนในฉลากก่อนบริโภค · ผู้ที่ตั้งครรภ์ ให้นมบุตร มีโรคประจำตัว หรืออยู่ระหว่างรับประทานยา ควรปรึกษาแพทย์ก่อน · หากมีอาการผิดปกติ ให้หยุดรับประทานและปรึกษาแพทย์</div><button class="btn btn-secondary btn-sm mt4" onclick="window.print()">${I.doc} พิมพ์รายการส่วนผสมสำหรับแพทย์</button></div></div></div>
          <div class="tabpanel" data-panel="reviews" id="reviews">
            <div class="rv-sum"><div><div class="big">${p.rating.toFixed(1)}</div>${stars(p.rating)}<div class="t-caption mt2">${p.reviews} รีวิวที่ยืนยันการซื้อ</div></div>
              <div class="hist">${hist.map(([s, n]) => `<div><span>${s}</span><span class="bar"><i style="width:${rv.length ? n / rv.length * 100 : 0}%"></i></span><span>${n}</span></div>`).join('')}</div></div>
            <div class="rv-list">${rv.length ? rv.map(r => `<div class="review" style="border:1px solid var(--hair)">${stars(r.stars)}<q>${esc(r.text)}</q><div class="who"><span class="av">${esc(r.init)}</span><div>${esc(r.name)}, ${r.age}<small>${r.date}</small></div><span class="verified" style="margin-left:auto">${I.check} ยืนยันการซื้อ</span></div></div>`).join('') : '<p class="muted">ยังไม่มีรีวิวสำหรับสินค้านี้</p>'}</div>
            <p class="t-caption mt4">รีวิวทั้งหมดมาจากผู้ที่ซื้อสินค้าจริง เราไม่แก้ไขข้อความ และไม่แสดงภาพก่อน–หลัง ตามแนวทางแบรนด์</p>
          </div>
          <div class="tabpanel faq" data-panel="faq">${faqs.slice(0, 4).map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
        </div>

        <section class="section"><div class="sec-head"><div><div class="eyebrow"><span class="t-label">ใช้ร่วมกันได้</span></div><h2 class="t-h2">สินค้าที่เกี่ยวข้อง</h2></div></div><div class="grid-products">${related.map(productCard).join('')}</div></section>
      </div>`;
  };
  views.product.after = (params, id) => {
    const p = byId(id); if (!p) return;
    let qty = 1, sub = false;
    const upd = () => { $('#qv').textContent = qty; $('#pdpPrice').textContent = baht(p.price * (sub ? 1 - SUB_DISCOUNT : 1)); $$('.opt-card').forEach(c => c.classList.toggle('on', c.querySelector('input').checked)); $('#bbPrice') && ($('#bbPrice').textContent = baht(p.price * (sub ? 1 - SUB_DISCOUNT : 1) * qty)); };
    $('#qm').onclick = () => { qty = Math.max(1, qty - 1); upd(); };
    $('#qp').onclick = () => { qty = Math.min(10, qty + 1); upd(); };
    $$('input[name=sub]').forEach(r => r.onchange = () => { sub = r.value === '1' && r.checked; upd(); });
    $('#addBtn').onclick = () => cart.add(p.id, qty, sub);
    $$('#tabs button').forEach(b => b.onclick = () => showTab(b.dataset.tab));
    $$('[data-tab]').forEach(b => b.addEventListener('click', e => { if (b.tagName === 'A') { e.preventDefault(); showTab(b.dataset.tab); $('#tabs').scrollIntoView({ behavior: 'smooth', block: 'start' }); } }));
    const showTab = t => { $$('#tabs button').forEach(x => x.classList.toggle('on', x.dataset.tab === t)); $$('.tabpanel').forEach(x => x.classList.toggle('on', x.dataset.panel === t)); };
    $$('[data-g]').forEach(b => b.onclick = () => { $$('[data-g]').forEach(x => x.classList.remove('on')); b.classList.add('on'); $('#stageLab').textContent = p.gallery[b.dataset.g]; const pk = $('#stage .pack'); pk.style.transform = b.dataset.g == 1 ? 'rotateY(180deg) scale(.98)' : b.dataset.g == 2 ? 'scale(1.35)' : ''; pk.style.transition = 'transform .4s cubic-bezier(.2,.8,.2,1)'; });
    // sticky mobile buy bar
    const bb = $('#buybar'); bb.innerHTML = `<div style="flex:1"><div class="t-caption">${esc(p.name)}</div><span class="price" id="bbPrice">${baht(p.price)}</span></div><button class="btn btn-primary" id="bbAdd">${I.cart} เพิ่มลงตะกร้า</button>`;
    bb.classList.add('show'); document.body.classList.add('has-buybar'); $('#bbAdd').onclick = () => cart.add(p.id, qty, sub);
  };

  /* ---- finder quiz */
  views.finder = () => `
    <div class="wrap section">
      <div class="center mb6"><div class="eyebrow" style="justify-content:center"><span class="t-label">product finder</span></div><h1 class="t-h1">ให้เราช่วยเลือกใน 3 คำถาม</h1><p class="muted mt2">คำตอบของคุณใช้เพื่อแนะนำสินค้าเท่านั้น ไม่ถูกบันทึก</p></div>
      <div class="quiz" id="quiz"></div>
    </div>`;
  views.finder.after = () => {
    const Q = [
      { q: 'เรื่องที่คุณอยากดูแลเป็นหลักคืออะไร', opts: [['intimate', 'สมดุลจุดซ่อนเร้น มีปัญหาเป็นซ้ำ'], ['urinary', 'ทางเดินปัสสาวะ'], ['fertility', 'เตรียมตั้งครรภ์ หรืออยู่ระหว่างทำ IVF'], ['cycle', 'รอบเดือนไม่สม่ำเสมอ / PCOS'], ['daily', 'ยังไม่มีอาการ อยากดูแลเชิงป้องกัน']] },
      { q: 'ตอนนี้คุณอยู่ในการดูแลของแพทย์หรือไม่', opts: [['doc', 'ใช่ มีแพทย์ดูแลอยู่'], ['nodoc', 'ไม่ ดูแลตัวเอง']] },
      { q: 'คุณชอบรูปแบบไหน', opts: [['cap', 'แคปซูล / เม็ด สะดวกพกพา'], ['powder', 'ผงละลายน้ำ ปรับปริมาณได้'], ['any', 'แบบไหนก็ได้']] },
    ];
    let step = 0; const ans = [];
    const el = $('#quiz');
    const draw = () => {
      if (step < Q.length) {
        const q = Q[step];
        el.innerHTML = `<div class="qcard reveal"><div class="qprog">${Q.map((_, i) => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div><span class="t-label">คำถาม ${step + 1} / ${Q.length}</span><h2 class="t-h2 mt2">${esc(q.q)}</h2><div class="opts">${q.opts.map(o => `<button data-v="${o[0]}"><i></i>${esc(o[1])}</button>`).join('')}</div>${step ? '<button class="btn btn-ghost btn-sm mt6" id="qback">ย้อนกลับ</button>' : ''}</div>`;
        $$('[data-v]', el).forEach(b => b.onclick = () => { ans[step] = b.dataset.v; step++; draw(); });
        $('#qback') && ($('#qback').onclick = () => { step--; draw(); });
      } else {
        let list = products.filter(p => p.concerns.includes(ans[0]));
        if (ans[2] === 'powder') list = [...list.filter(p => p.powder), ...list.filter(p => !p.powder)];
        if (ans[2] === 'cap') list = list.filter(p => !p.powder);
        list = [...list.filter(p => p.cat === 'bundle'), ...list.filter(p => p.cat !== 'bundle')].slice(0, 3);
        el.innerHTML = `<div class="qcard reveal quiz-result"><div class="qprog">${Q.map(() => '<i class="on"></i>').join('')}</div><span class="t-label">คำแนะนำสำหรับคุณ</span><h2 class="t-h2 mt2">${esc(concerns.find(c => c.id === ans[0]).name)}</h2>
          ${ans[1] === 'doc' ? '<div class="notice mb6">คุณมีแพทย์ดูแลอยู่ — ทุกสินค้าของเรามีรายการส่วนผสมพร้อมปริมาณที่พิมพ์ได้ในหน้าสินค้า แนะนำให้นำไปแจ้งแพทย์ก่อนเริ่มรับประทาน</div>' : '<p class="muted mb6">ผลิตภัณฑ์ด้านล่างมีงานวิจัยที่เกี่ยวข้องกับเรื่องที่คุณเลือก ดูรายละเอียดงานวิจัยได้ในแต่ละหน้าสินค้า</p>'}
          <div class="grid-products">${list.map(productCard).join('')}</div>
          <div class="flex mt6"><button class="btn btn-secondary btn-sm" id="qre">เริ่มใหม่</button><a class="btn btn-ghost btn-sm" href="#/shop?concern=${ans[0]}">ดูทั้งหมดในหมวดนี้</a></div></div>`;
        $('#qre').onclick = () => { step = 0; ans.length = 0; draw(); };
      }
    };
    draw();
  };

  /* ---- research library */
  views.research = () => `
    <div class="wrap">
      <div class="page-head"><div class="crumbs"><a href="#/">หน้าแรก</a><span>/</span><span>งานวิจัย</span></div><h1 class="t-h1">ห้องสมุดงานวิจัย</h1><p class="muted mt2" style="max-width:60ch">ทุกคำกล่าวอ้างบนผลิตภัณฑ์ของเราย้อนกลับมาที่หน้านี้ได้ เราแสดงเฉพาะงานวิจัยที่ใช้สายพันธุ์หรือสารชนิดเดียวกัน ในปริมาณใกล้เคียงกับที่อยู่ในผลิตภัณฑ์</p></div>
      <div class="evidence-levels">
        <div><b>RCT · สุ่มเทียบยาหลอก</b>หลักฐานระดับสูงสุดสำหรับผลิตภัณฑ์เสริมอาหาร</div>
        <div><b>Meta-analysis · รวมหลายการศึกษา</b>สรุปภาพรวมจากหลาย RCT</div>
        <div><b>Cohort / Consensus · สังเกตและฉันทามติ</b>ใช้ประกอบ ไม่ใช้เป็นหลักฐานหลัก</div>
      </div>
      <div class="research-list">${research.map(r => { const used = products.filter(p => p.research.includes(r.id) && p.cat !== 'bundle'); return `
        <div class="research-card">
          <div class="rc-top"><span class="rc-strain">${r.strains.map(esc).join(' + ')}</span><span class="chip chip-aqua rc-type">${esc(r.type)}</span></div>
          <div class="rc-title">${esc(r.title)}</div>
          <div class="rc-src">${esc(r.src)}</div>
          <div class="rc-find">${esc(r.finding)}</div>
          <div class="databar"><div class="lab" style="color:var(--ink)"><span>${esc(r.stat.label)}</span><b style="color:var(--fern)">${r.stat.value}${r.stat.unit}</b></div><div class="bar" style="background:var(--n100)"><i style="width:${r.stat.unit === '%' ? r.stat.value : 70}%"></i></div></div>
          <div class="rc-foot"><span>n = ${r.n.toLocaleString()} · ${r.weeks} สัปดาห์ · PMID ${r.pmid}</span><span class="flex" style="gap:6px">${used.map(p => `<a class="chip" href="#/product/${p.id}">${esc(p.name)}</a>`).join('')}</span></div>
        </div>`; }).join('')}</div>
      <div class="card card-pad mt8"><h3 class="t-h3">ต้องการเอกสารฉบับเต็ม</h3><p class="muted mt2">เภสัชกรของเราส่งบทคัดย่อและลิงก์ PubMed ให้ได้ทาง LINE หรืออีเมล และยินดีอธิบายวิธีอ่านตารางผลการทดลอง</p><a class="btn btn-secondary mt4" href="#/help">ติดต่อเภสัชกร</a></div>
    </div>`;

  /* ---- brands */
  views.brands = () => `
    <div class="wrap">
      <div class="page-head"><div class="crumbs"><a href="#/">หน้าแรก</a><span>/</span><span>แบรนด์ในเครือ</span></div><h1 class="t-h1">โครงสร้างแบรนด์ในเครือ</h1><p class="muted mt2" style="max-width:60ch">CMMLIFE เป็นแบรนด์แม่แบบ Endorsed House — แบรนด์ลูกมีชื่อของตัวเอง แต่มีตรา BY CMMLIFE รับรองคุณภาพอยู่เสมอ หนึ่งแบรนด์ลูกดูแลหนึ่งกลุ่มปัญหา ไม่ทับซ้อนกัน</p></div>
      <div class="card card-pad center" style="background:var(--fern);color:#fff;border-radius:24px;max-width:420px;margin:0 auto var(--s8)"><div class="logo" style="justify-content:center;color:#fff">${logoMark('#fff', '#E6398B', '#8FD0D8')}<span><span class="word">CMMLIFE</span></span></div><p class="t-caption mt2" style="color:rgba(255,255,255,.7)">MASTER BRAND · ผู้รับรองคุณภาพ</p></div>
      <div class="brands">${Object.values(brands).map(brandCard).join('')}</div>
      <div class="two mt8">
        <div class="card card-pad"><h3 class="t-h3 mb4">กฎการรับรองแบรนด์ลูก</h3><ul style="display:grid;gap:10px;font-size:14px;color:var(--ink-soft)"><li>ทุกแบรนด์ลูกต้องแสดงตรารับรอง BY CMMLIFE บนด้านหน้าแพ็กเกจและหน้าสินค้าบนเว็บ</li><li>ชื่อแบรนด์ลูกต้องอ่านออกเสียงได้ในภาษาไทย และไม่สื่อถึงการรักษาโรค</li><li>หนึ่งแบรนด์ลูกดูแลหนึ่งกลุ่มปัญหา ห้ามทับซ้อนกันเพื่อไม่ให้แข่งกันเอง</li><li>แบรนด์ลูกใหม่ต้องผ่านการอนุมัติชื่อ สี และตำแหน่งทางการตลาดจากทีมแบรนด์ก่อนพัฒนา</li></ul></div>
        <div class="card card-pad" style="background:var(--n100);border:0"><h3 class="t-h3 mb4">แบรนด์ถัดไป</h3><p class="muted" style="font-size:14px">แบรนด์ที่ 2 (ฮอร์โมนและวัยหมดประจำเดือน) อยู่ระหว่างทดสอบสูตรและรวบรวมงานวิจัย คาดว่าเปิดตัวปี 2027 · ลงชื่อรับข่าวสารเมื่อเปิดตัว</p><form class="mt4 flex" id="waitForm"><input type="email" placeholder="อีเมลของคุณ" required style="flex:1;min-height:44px;border:1.5px solid var(--n200);border-radius:12px;padding:0 14px;background:#fff"><button class="btn btn-fern" type="submit">แจ้งเตือนฉัน</button></form></div>
      </div>
    </div>`;
  views.brands.after = () => { const f = $('#waitForm'); if (f) f.onsubmit = e => { e.preventDefault(); toast('บันทึกอีเมลของคุณแล้ว'); f.reset(); }; };

  /* ---- about */
  views.about = () => `
    <div class="wrap">
      <div class="page-head"><div class="crumbs"><a href="#/">หน้าแรก</a><span>/</span><span>เกี่ยวกับเรา</span></div></div>
      <div class="about-hero">
        <div><span class="t-accent">our purpose</span><h1 class="t-display mt2" style="font-size:clamp(30px,4vw,44px)">ให้ผู้หญิงไทยดูแลสุขภาพจากภายในได้อย่างมั่นใจ ด้วยผลิตภัณฑ์ที่มีงานวิจัยรองรับ ไม่ใช่คำโฆษณา</h1>
          <p class="t-body-l muted mt6">สำหรับผู้หญิงไทยที่ใส่ใจสุขภาพภายในแต่ไม่ไว้ใจคำโฆษณาเกินจริง CMMLIFE คือกลุ่มผลิตภัณฑ์เสริมอาหารที่คัดวัตถุดิบจากหลักฐานทางคลินิกและอธิบายกลไกให้เข้าใจได้ — ต่างจากแบรนด์ทั่วไปที่ขายด้วยความสวยและคำสัญญา</p></div>
        <div class="visual">${logoMark('#FFFFFF', '#E6398B', '#8FD0D8')}</div>
      </div>
      <section class="section">
        <div class="values">
          <div class="value"><span class="t-accent">vision</span><h3 class="t-h3">บ้านของแบรนด์อาหารเสริมที่ผู้หญิงไทยเชื่อถือที่สุด</h3><p class="mt2">โดยแต่ละแบรนด์ในเครือดูแลความต้องการที่ต่างกันอย่างเจาะจง</p></div>
          <div class="value"><span class="t-accent">mission</span><h3 class="t-h3">คัดสรรวัตถุดิบที่มีหลักฐานจากผู้ผลิตระดับโลก</h3><p class="mt2">สื่อสารอย่างตรงไปตรงมา และให้คำปรึกษาที่เข้าถึงได้จริง</p></div>
          <div class="value"><span class="t-accent">tone</span><h3 class="t-h3">พูดแบบเภสัชกรที่เป็นมิตร</h3><p class="mt2">อธิบายกลไกด้วยภาษาที่เข้าใจง่าย ให้ข้อมูลก่อนขาย ไม่กดดัน ไม่ใช้ความกลัวเป็นเครื่องมือ</p></div>
        </div>
        <div class="words mt4">
          <div class="use"><b>คำที่เราใช้</b>ดูแล · สมดุล · ฟื้นฟู · มีงานวิจัยรองรับ · ใช้ "คุณ" ไม่ใช้ "ลูกค้า"</div>
          <div class="no"><b>คำที่เราไม่ใช้</b>รักษา · หายขาด · ปลอดภัย 100% · การันตีผล · ภาพก่อน–หลัง</div>
        </div>
      </section>
      <section class="section" style="padding-top:0">
        <div class="sec-head"><div><div class="eyebrow"><span class="t-label">มาตรฐานการผลิต</span></div><h2 class="t-h1">สิ่งที่เราทำกับทุกล็อต</h2></div></div>
        <div class="pillars">
          <div class="pillar"><div class="num">01</div><h3>วัตถุดิบมีรหัสสายพันธุ์</h3><p>ใช้สายพันธุ์จากผู้ผลิตที่มีงานวิจัยเฉพาะ เช่น Chr. Hansen, DuPont/IFF</p></div>
          <div class="pillar"><div class="num">02</div><h3>ตรวจ CFU ณ วันหมดอายุ</h3><p>ฉลากแสดงปริมาณที่รับประกันจนถึงวันหมดอายุ ไม่ใช่วันผลิต</p></div>
          <div class="pillar"><div class="num">03</div><h3>ทดสอบโลหะหนัก</h3><p>น้ำมันปลาและสารสกัดทุกล็อตผ่านการตรวจโดยห้องปฏิบัติการภายนอก</p></div>
          <div class="pillar"><div class="num">04</div><h3>โรงงาน GMP / HACCP</h3><p>ผลิตในโรงงานที่ได้รับการรับรองมาตรฐาน และขึ้นทะเบียน อย. ทุกรายการ</p></div>
        </div>
      </section>
    </div>`;

  /* ---- help */
  views.help = () => `
    <div class="wrap">
      <div class="page-head"><div class="crumbs"><a href="#/">หน้าแรก</a><span>/</span><span>ช่วยเหลือ</span></div><h1 class="t-h1">ช่วยเหลือและคำถามที่พบบ่อย</h1></div>
      <div class="two">
        <div class="faq">${faqs.map(f => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('')}</div>
        <div style="display:grid;gap:16px;align-content:start">
          <div class="card card-pad" style="background:var(--fern);color:#fff;border:0"><h3 class="t-h3" style="color:#fff">ปรึกษาเภสัชกร</h3><p class="mt2" style="color:rgba(255,255,255,.8);font-size:14px">ทุกวัน 9:00–20:00 · ตอบภายใน 15 นาทีในเวลาทำการ</p><a class="btn btn-line mt4" href="https://line.me/R/ti/p/@cmmlife" target="_blank" rel="noopener">${I.line} LINE @cmmlife</a></div>
          <div class="card card-pad"><h3 class="t-h3">การจัดส่ง</h3><ul class="mt2" style="display:grid;gap:6px;font-size:14px;color:var(--ink-soft)">${shipping.map(s => `<li><b style="color:var(--fern);font-family:var(--f-display);font-weight:500">${esc(s.name)}</b> · ${esc(s.desc)} · ${s.price ? baht(s.price) : 'ฟรี'}</li>`).join('')}</ul><p class="t-caption mt4">ส่งฟรี (มาตรฐาน) เมื่อสั่งซื้อ ${baht(FREE_SHIP)} ขึ้นไป · ทุกกล่องเป็นกล่องทึบไม่ระบุชื่อสินค้า</p></div>
          <div class="card card-pad"><h3 class="t-h3">ติดต่อ</h3><p class="mt2" style="font-size:14px;color:var(--ink-soft)">บริษัท ซีเอ็มเอ็มไลฟ์ จำกัด<br>ร้าน CMMLIFE ทองหล่อ · สุขุมวิท 55 กรุงเทพฯ 10110<br>care@cmmlife.co.th · 02-000-0000</p></div>
        </div>
      </div>
    </div>`;

  /* ---- checkout */
  const ck = { step: store.get('ckstep', 1), addr: store.get('addr', {}), ship: 'standard', pay: 'promptpay' };
  views.checkout = () => {
    if (!cart.items.length) return `<div class="wrap"><div class="empty"><h2 class="t-h1">ตะกร้าของคุณว่างอยู่</h2><p class="mt2">เลือกสินค้าก่อนเข้าสู่ขั้นตอนชำระเงิน</p><a class="btn btn-primary mt6" href="#/shop">เลือกสินค้า</a></div></div>`;
    const a = ck.addr;
    const f = (k, label, ph = '', type = 'text', req = true) => `<div class="field"><label for="f_${k}">${label}</label><input id="f_${k}" name="${k}" type="${type}" value="${esc(a[k] || '')}" placeholder="${ph}" ${req ? 'required' : ''}></div>`;
    const stepsHtml = `<div class="steps">${['ที่อยู่จัดส่ง', 'การจัดส่ง', 'ชำระเงิน'].map((s, i) => `<div class="step ${ck.step === i + 1 ? 'on' : ck.step > i + 1 ? 'done' : ''}"><i>${ck.step > i + 1 ? '✓' : i + 1}</i>${s}</div>`).join('')}</div>`;
    let body = '';
    if (ck.step === 1) body = `<form class="form" id="addrForm">
        <div class="row">${f('first', 'ชื่อ', 'ชื่อจริง')}${f('last', 'นามสกุล')}</div>
        <div class="row">${f('phone', 'เบอร์โทรศัพท์', '08X-XXX-XXXX', 'tel')}${f('email', 'อีเมล', 'สำหรับใบเสร็จและติดตามพัสดุ', 'email')}</div>
        ${f('addr', 'ที่อยู่', 'บ้านเลขที่ หมู่บ้าน ซอย ถนน')}
        <div class="row">${f('sub', 'แขวง / ตำบล')}${f('dist', 'เขต / อำเภอ')}</div>
        <div class="row">${f('prov', 'จังหวัด')}${f('zip', 'รหัสไปรษณีย์', '10110')}</div>
        <div class="field"><label for="f_note">หมายเหตุถึงผู้ส่ง (ไม่บังคับ)</label><textarea id="f_note" name="note" placeholder="เช่น ฝากไว้ที่ป้อม รปภ.">${esc(a.note || '')}</textarea></div>
        <label class="flex" style="font-size:13.5px"><input type="checkbox" name="save" ${a.first ? 'checked' : ''} style="accent-color:var(--fern)"> บันทึกที่อยู่นี้ไว้ในเครื่องสำหรับครั้งถัดไป</label>
        <div class="flex" style="justify-content:space-between;margin-top:8px"><a class="btn btn-ghost" href="#/shop">กลับไปเลือกสินค้า</a><button class="btn btn-primary btn-lg" type="submit">ไปขั้นตอนจัดส่ง ${I.arrow}</button></div>
      </form>`;
    else if (ck.step === 2) body = `<div class="radio-list" id="shipList">${shipping.map(s => `<label class="radio-card ${ck.ship === s.id ? 'on' : ''}"><input type="radio" name="ship" value="${s.id}" ${ck.ship === s.id ? 'checked' : ''}><div><b>${esc(s.name)}</b><span>${esc(s.desc)}</span></div><span class="rp">${cart.shipFee(s.id) ? baht(cart.shipFee(s.id)) : 'ฟรี'}</span></label>`).join('')}</div>
      <div class="notice mt6">พัสดุทุกชิ้นบรรจุในกล่องทึบสีครีม ไม่ระบุชื่อสินค้าหรือประเภทผลิตภัณฑ์ภายนอก</div>
      <div class="flex mt6" style="justify-content:space-between"><button class="btn btn-ghost" id="back">ย้อนกลับ</button><button class="btn btn-primary btn-lg" id="next">ไปขั้นตอนชำระเงิน ${I.arrow}</button></div>`;
    else body = `<div class="radio-list" id="payList">${payments.filter(p => !(p.id === 'cod' && ck.ship !== 'standard')).map(p => `<label class="radio-card ${ck.pay === p.id ? 'on' : ''}"><input type="radio" name="pay" value="${p.id}" ${ck.pay === p.id ? 'checked' : ''}><div><b>${esc(p.name)}</b><span>${esc(p.desc)}</span></div>${p.fee ? `<span class="rp">+${baht(p.fee)}</span>` : ''}</label>`).join('')}</div>
      <div class="mt6" id="payDetail"></div>
      <label class="flex mt6" style="font-size:13.5px;align-items:start"><input type="checkbox" id="agree" style="accent-color:var(--fern);margin-top:4px"><span>ฉันได้อ่านคำเตือนบนฉลากผลิตภัณฑ์ และรับทราบว่าผลิตภัณฑ์เสริมอาหารไม่มีผลในการป้องกันหรือรักษาโรค</span></label>
      <div class="flex mt6" style="justify-content:space-between"><button class="btn btn-ghost" id="back">ย้อนกลับ</button><button class="btn btn-primary btn-lg" id="place">${I.lock} ยืนยันคำสั่งซื้อ ${baht(cart.total(ck.ship, ck.pay))}</button></div>`;
    return `<div class="wrap"><div class="page-head" style="padding-bottom:0"><h1 class="t-h1">ชำระเงิน</h1></div>
      <div class="checkout"><div>${stepsHtml}<div class="card card-pad">${body}</div></div>
      <aside class="summary card card-pad" id="summary">${summaryHtml()}</aside></div></div>`;
  };
  function summaryHtml() {
    const d = cart.discount();
    return `<h3 class="t-h3 mb4">สรุปคำสั่งซื้อ</h3>
      ${cart.items.map(l => { const p = byId(l.id); return `<div class="sl">${packshot(p)}<div><b>${esc(p.name)}</b><span>× ${l.qty}${l.sub ? ' · ส่งทุก 30 วัน' : ''}</span></div><span class="t-mono">${baht(cart.linePrice(l) * l.qty)}</span></div>`; }).join('')}
      <div class="promo"><input id="promoIn" placeholder="โค้ดส่วนลด" value="${cart.promo || ''}"><button class="btn btn-secondary btn-sm" id="promoBtn">ใช้</button></div>
      <div class="promo msg" id="promoMsg" style="margin-top:-6px">${cart.promo ? (d ? `<span style="color:var(--success)">${esc(promos[cart.promo].desc)}</span>` : `<span style="color:var(--warning)">โค้ดนี้ใช้ได้เมื่อสั่งซื้อ ${baht(promos[cart.promo].min)} ขึ้นไป</span>`) : ''}</div>
      <div style="display:grid;gap:6px;margin-top:8px">
        <div class="tot"><span>ยอดรวมสินค้า</span><span>${baht(cart.subtotal())}</span></div>
        ${d ? `<div class="tot"><span>ส่วนลด (${cart.promo})</span><span class="disc">−${baht(d)}</span></div>` : ''}
        <div class="tot"><span>ค่าจัดส่ง</span><span>${ck.step >= 2 ? (cart.shipFee(ck.ship) ? baht(cart.shipFee(ck.ship)) : 'ฟรี') : '<span class="muted">คำนวณในขั้นถัดไป</span>'}</span></div>
        ${ck.step === 3 && payments.find(p => p.id === ck.pay)?.fee ? `<div class="tot"><span>ค่าธรรมเนียมเก็บเงินปลายทาง</span><span>${baht(30)}</span></div>` : ''}
        <div class="tot grand"><span>ยอดชำระ</span><span>${baht(ck.step >= 2 ? cart.total(ck.ship, ck.step === 3 ? ck.pay : null) : cart.subtotal() - d)}</span></div>
      </div>
      <div class="t-caption mt4 flex" style="gap:6px">${I.lock.replace('class="ic"', 'class="ic" style="width:14px;height:14px"')} ข้อมูลของคุณถูกเข้ารหัส · ไม่เก็บข้อมูลบัตรบนเซิร์ฟเวอร์ของเรา</div>`;
  }
  views.checkout.after = () => {
    if (!cart.items.length) return;
    const wirePromo = () => { const b = $('#promoBtn'); if (!b) return; b.onclick = () => { const c = $('#promoIn').value.trim().toUpperCase(); if (!c) { cart.promo = null; cart.save(); render(); return; } if (promos[c]) { cart.promo = c; cart.save(); toast('ใช้โค้ดส่วนลดแล้ว'); render(); } else { $('#promoMsg').innerHTML = '<span style="color:var(--error)">ไม่พบโค้ดนี้</span>'; } }; };
    wirePromo();
    if (ck.step === 1) {
      const form = $('#addrForm');
      form.onsubmit = e => { e.preventDefault(); const fd = new FormData(form); const a = Object.fromEntries(fd.entries()); let ok = true;
        $$('.field', form).forEach(fl => { const inp = fl.querySelector('input,textarea'); const bad = inp.required && !inp.value.trim() || (inp.type === 'tel' && !/^0\d{8,9}$/.test(inp.value.replace(/\D/g, ''))); fl.classList.toggle('err', bad); if (bad) ok = false; });
        if (!ok) { toast('กรุณากรอกข้อมูลให้ครบถ้วน'); return; }
        ck.addr = a; if (a.save) store.set('addr', a); else store.set('addr', {}); ck.step = 2; store.set('ckstep', 2); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    } else if (ck.step === 2) {
      $$('input[name=ship]').forEach(r => r.onchange = () => { ck.ship = r.value; if (ck.ship !== 'standard' && ck.pay === 'cod') ck.pay = 'promptpay'; render(); });
      $('#back').onclick = () => { ck.step = 1; store.set('ckstep', 1); render(); };
      $('#next').onclick = () => { ck.step = 3; store.set('ckstep', 3); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); };
    } else {
      const detail = () => { const d = $('#payDetail'); const total = cart.total(ck.ship, ck.pay);
        if (ck.pay === 'promptpay') d.innerHTML = `<div class="qr-box">${qrSvg()}<b class="t-mono" style="color:var(--fern);font-family:var(--f-display)">${baht(total)}</b><small>QR จะถูกสร้างหลังกดยืนยันคำสั่งซื้อ · มีอายุ 15 นาที · ยืนยันอัตโนมัติเมื่อชำระสำเร็จ</small></div>`;
        else if (ck.pay === 'card') d.innerHTML = `<div class="card-mock"><div class="cn">•••• •••• •••• ••••</div><div class="cm"><span>ชื่อบนบัตร</span><span>MM / YY</span></div></div><p class="t-caption mt2">หลังกดยืนยัน คุณจะถูกนำไปยังหน้าชำระเงินที่ปลอดภัยของผู้ให้บริการ (Omise) เราไม่เก็บข้อมูลบัตรของคุณ</p>`;
        else d.innerHTML = `<div class="notice">ชำระเงินสดกับพนักงานส่งเมื่อได้รับสินค้า · ค่าธรรมเนียม 30 บาท · กรุณาเตรียมเงินให้พอดี</div>`; };
      detail();
      $$('input[name=pay]').forEach(r => r.onchange = () => { ck.pay = r.value; $$('.radio-card', $('#payList')).forEach(c => c.classList.toggle('on', c.querySelector('input').checked)); $('#summary').innerHTML = summaryHtml(); wirePromo(); $('#place').innerHTML = `${I.lock} ยืนยันคำสั่งซื้อ ${baht(cart.total(ck.ship, ck.pay))}`; detail(); });
      $('#back').onclick = () => { ck.step = 2; store.set('ckstep', 2); render(); };
      $('#place').onclick = () => { if (!$('#agree').checked) { toast('กรุณายืนยันว่าได้อ่านคำเตือนบนฉลาก'); return; }
        const id = 'CMM' + String(Date.now()).slice(-8); const order = { id, date: new Date().toISOString(), items: cart.items.map(l => ({ ...l })), addr: ck.addr, ship: ck.ship, pay: ck.pay, promo: cart.promo, discount: cart.discount(), shipFee: cart.shipFee(ck.ship), payFee: payments.find(p => p.id === ck.pay)?.fee || 0, total: cart.total(ck.ship, ck.pay), status: ck.pay === 'cod' ? 'กำลังจัดเตรียม' : 'รอชำระเงิน' };
        const orders = store.get('orders', []); orders.unshift(order); store.set('orders', orders); cart.clear(); ck.step = 1; store.set('ckstep', 1); go('#/order/' + id); };
    }
  };
  const qrSvg = () => { let cells = ''; let seed = 7; for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) { seed = (seed * 9301 + 49297) % 233280; const fin = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13); const on = fin ? ((x % 6 === 0 || y % 6 === 0 || (x > 1 && x < 5 && y > 1 && y < 5)) && !(x === 7 || y === 7 || x === 13 || y === 13)) : seed / 233280 > .55; if (on && !(fin && (x === 6 || y === 6 || x === 14 || y === 14) && false)) cells += `<rect x="${x}" y="${y}" width="1" height="1"/>`; } return `<svg viewBox="-1 -1 23 23" fill="#3D7059" style="background:#fff;border-radius:8px;padding:6px;opacity:.35">${cells}</svg>`; };

  /* ---- order confirmation */
  views.order = (params, id) => { const o = store.get('orders', []).find(x => x.id === id); if (!o) return views.notFound();
    const stepsT = ['รับคำสั่งซื้อ', o.pay === 'cod' ? 'จัดเตรียมสินค้า' : 'ยืนยันการชำระ', 'จัดส่ง', 'ถึงมือคุณ'];
    return `<div class="wrap"><div class="confirm reveal">
      <div class="ok">${I.check}</div><span class="onum">ORDER ${esc(o.id)}</span>
      <h1 class="t-h1">ขอบคุณ คุณ${esc(o.addr.first)} เราได้รับคำสั่งซื้อของคุณแล้ว</h1>
      <p class="muted">${o.pay === 'promptpay' ? 'สแกน QR ด้านล่างเพื่อชำระเงินภายใน 15 นาที ระบบจะยืนยันอัตโนมัติ' : o.pay === 'card' ? 'การชำระเงินสำเร็จ ใบเสร็จถูกส่งไปที่ ' + esc(o.addr.email) : 'เตรียมเงินสด ' + baht(o.total) + ' ให้พนักงานส่งเมื่อได้รับสินค้า'}</p>
      ${o.pay === 'promptpay' ? `<div class="qr-box" style="width:260px">${qrSvg().replace('opacity:.35', 'opacity:1')}<b style="font-family:var(--f-display);color:var(--fern)">${baht(o.total)}</b><small>PromptPay · บริษัท ซีเอ็มเอ็มไลฟ์ จำกัด</small></div>` : ''}
      <div class="timeline">${stepsT.map((s, i) => `<div class="${i === 0 ? 'on' : ''}"><i></i>${s}</div>`).join('')}</div>
      <div class="card card-pad" style="width:100%;text-align:left"><div style="display:grid;gap:8px">${o.items.map(l => { const p = byId(l.id); return `<div class="sl" style="display:grid;grid-template-columns:48px 1fr auto;gap:10px;align-items:center;font-size:13.5px">${packshot(p)}<div><b style="font-family:var(--f-display);font-weight:500;color:var(--fern)">${esc(p.name)}</b><div class="t-caption">× ${l.qty}${l.sub ? ' · ส่งทุก 30 วัน' : ''}</div></div><span>${baht(cart.linePrice(l) * l.qty)}</span></div>`; }).join('')}</div>
        <div class="hr mt4 mb4"></div>
        ${o.discount ? `<div class="tot"><span>ส่วนลด (${esc(o.promo)})</span><span class="disc">−${baht(o.discount)}</span></div>` : ''}
        <div class="tot"><span>ค่าจัดส่ง</span><span>${o.shipFee ? baht(o.shipFee) : 'ฟรี'}</span></div>
        ${o.payFee ? `<div class="tot"><span>ค่าธรรมเนียมเก็บเงินปลายทาง</span><span>${baht(o.payFee)}</span></div>` : ''}
        <div class="tot grand" style="margin-top:6px"><span>ยอดชำระ</span><span>${baht(o.total)}</span></div>
        <p class="t-caption mt4">จัดส่งไปที่ ${esc(o.addr.addr)} ${esc(o.addr.sub)} ${esc(o.addr.dist)} ${esc(o.addr.prov)} ${esc(o.addr.zip)} · ${esc(shipping.find(s => s.id === o.ship).name)}</p></div>
      <div class="flex"><a class="btn btn-secondary" href="#/account">ดูคำสั่งซื้อของฉัน</a><a class="btn btn-ghost" href="#/shop">เลือกสินค้าต่อ</a></div>
      <p class="t-caption">เราจะส่งคำแนะนำการรับประทานและจดหมายความรู้ (เดือนละครั้ง) ไปที่อีเมลของคุณ ยกเลิกได้ทุกเมื่อ</p>
    </div></div>`; };

  /* ---- account */
  views.account = () => { const orders = store.get('orders', []); const subs = orders.flatMap(o => o.items.filter(l => l.sub).map(l => ({ ...l, o })));
    return `<div class="wrap"><div class="page-head" style="padding-bottom:0"><h1 class="t-h1">บัญชีของฉัน</h1><p class="muted mt2">ข้อมูลถูกเก็บในเบราว์เซอร์ของคุณเท่านั้น (เวอร์ชันสาธิต)</p></div>
      <div class="account"><nav class="acc-nav"><a class="on" href="#/account">คำสั่งซื้อ</a><a href="#/account">การส่งรายเดือน</a><a href="#/account">ที่อยู่</a><a href="#/help">ช่วยเหลือ</a></nav>
      <div style="display:grid;gap:16px">
        <h3 class="t-h3">คำสั่งซื้อ (${orders.length})</h3>
        ${orders.length ? orders.map(o => `<div class="order"><div class="oh"><div><b>${esc(o.id)}</b><div class="t-caption">${new Date(o.date).toLocaleString('th-TH', { dateStyle: 'medium', timeStyle: 'short' })}</div></div><span class="chip ${o.status === 'รอชำระเงิน' ? 'chip-rose' : 'chip-aqua'}">${esc(o.status)}</span><b class="t-mono">${baht(o.total)}</b></div><div class="ol">${o.items.map(l => packshot(byId(l.id))).join('')}</div><div class="flex"><a class="btn btn-secondary btn-sm" href="#/order/${o.id}">รายละเอียด</a><button class="btn btn-ghost btn-sm" data-reorder="${o.id}">สั่งซื้ออีกครั้ง</button></div></div>`).join('') : `<div class="card card-pad center"><p class="muted">ยังไม่มีคำสั่งซื้อ</p><a class="btn btn-secondary mt4" href="#/shop">เลือกสินค้า</a></div>`}
        <h3 class="t-h3 mt4">การส่งรายเดือน (${subs.length})</h3>
        ${subs.length ? subs.map(s => { const p = byId(s.id); return `<div class="order"><div class="oh"><div class="flex">${packshot(p, 'sm').replace('class="pack', 'style="width:48px;border-radius:5px;box-shadow:none;--accent:' + p.accent + '" class="pack')}<div><b>${esc(p.name)}</b><div class="t-caption">ส่งครั้งถัดไป ${new Date(Date.parse(s.o.date) + 30 * 864e5).toLocaleDateString('th-TH', { dateStyle: 'medium' })} · ${baht(cart.linePrice(s))} × ${s.qty}</div></div></div><div class="flex"><button class="btn btn-ghost btn-sm">ข้ามรอบนี้</button><button class="btn btn-ghost btn-sm">ยกเลิก</button></div></div></div>`; }).join('') : '<p class="muted" style="font-size:14px">เลือก "ส่งทุก 30 วัน" ในหน้าสินค้าเพื่อรับส่วนลด 10% และไม่ต้องสั่งซ้ำ</p>'}
      </div></div></div>`; };
  views.account.after = () => { $$('[data-reorder]').forEach(b => b.onclick = () => { const o = store.get('orders', []).find(x => x.id === b.dataset.reorder); o.items.forEach(l => { const k = cart.key(l.id, l.sub); const ex = cart.items.find(x => x.key === k); if (ex) ex.qty += l.qty; else cart.items.push({ ...l }); }); cart.save(); openDrawer(); }); };

  views.notFound = () => `<div class="wrap"><div class="empty"><h1 class="t-h1">ไม่พบหน้าที่คุณต้องการ</h1><a class="btn btn-secondary mt6" href="#/">กลับหน้าแรก</a></div></div>`;

  /* ------------------------------------------------------------------ router */
  function render() {
    const raw = location.hash.slice(1) || '/';
    const [path, qs] = raw.split('?');
    const params = new URLSearchParams(qs || '');
    const seg = path.split('/').filter(Boolean);
    const name = seg[0] || 'home'; const arg = seg[1];
    const view = views[name] || views.notFound;
    $('#buybar').classList.remove('show'); document.body.classList.remove('has-buybar');
    $('#view').innerHTML = view(params, arg);
    view.after && view.after(params, arg);
    $$('#nav a').forEach(a => a.classList.toggle('active', a.getAttribute('href').startsWith('#/' + name)));
    $$('[data-add]').forEach(b => b.onclick = () => cart.add(b.dataset.add));
    const nl = $('#nlForm'); if (nl) nl.onsubmit = e => { e.preventDefault(); toast('สมัครรับจดหมายความรู้แล้ว'); nl.reset(); };
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
    $$('.io').forEach(el => { const r = el.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0) el.classList.add('in'); else io.observe(el); });
    clearTimeout(render._safety); render._safety = setTimeout(() => $$('.io:not(.in)').forEach(el => el.classList.add('in')), 2500);
    document.title = ({ home: 'CMMLIFE · women\'s health, evidence first', shop: 'สินค้า · CMMLIFE', product: (byId(arg)?.name || 'สินค้า') + ' · CMMLIFE', research: 'งานวิจัย · CMMLIFE', checkout: 'ชำระเงิน · CMMLIFE', account: 'บัญชีของฉัน · CMMLIFE', finder: 'ค้นหาที่เหมาะกับคุณ · CMMLIFE', brands: 'แบรนด์ในเครือ · CMMLIFE', about: 'เกี่ยวกับเรา · CMMLIFE', help: 'ช่วยเหลือ · CMMLIFE', order: 'คำสั่งซื้อ · CMMLIFE' })[name] || 'CMMLIFE';
  }
  let lastPath = '';
  window.addEventListener('hashchange', () => { const p = location.hash.split('?')[0]; closeDrawer(); $('#sheet').classList.remove('open'); document.body.classList.remove('lock'); render(); if (p !== lastPath) window.scrollTo({ top: 0 }); lastPath = p; });
  renderShell(); lastPath = location.hash.split('?')[0]; render();
})();
