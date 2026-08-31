# CMMLIFE · E-commerce storefront

เว็บ e-commerce สำหรับ CMMLIFE (women's health, evidence first) สร้างตาม `Brandbook_Khun_Boong.pdf` และโลโก้ `CMI.png`

## เปิดใช้งาน

ไม่ต้อง build — เป็น static site ล้วน (HTML / CSS / vanilla JS)

```bash
cd cmmlife-shop && python3 -m http.server 8765
```

แล้วเปิด http://localhost:8765 (หรือเปิด `index.html` ตรง ๆ ก็ได้ แต่ฟอนต์ต้องใช้อินเทอร์เน็ต)

## โครงสร้าง

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | entry + โหลดฟอนต์ Prompt / Noto Sans Thai / Cormorant Garamond |
| `css/styles.css` | design system จาก brandbook (สี, type scale, radius, spacing) + ทุก component |
| `js/data.js` | แคตตาล็อก: แบรนด์ในเครือ, สินค้า 10 รายการ, งานวิจัย 7 ชิ้น, รีวิว, FAQ, วิธีส่ง, วิธีจ่าย, โค้ดส่วนลด |
| `js/app.js` | SPA แบบ hash-route: router, cart (localStorage), checkout 3 ขั้น, ทุกหน้า |
| `assets/logo-mark.svg`, `assets/logo-primary.svg` | โลโก้ vector ที่วาดใหม่จาก CMI.png |

## หน้าที่มี

`#/` หน้าแรก · `#/shop` สินค้า + ตัวกรอง/ค้นหา/เรียง · `#/product/:id` รายละเอียดสินค้า (ส่วนผสม, งานวิจัย, วิธีกิน, รีวิว, FAQ, สมัครส่งรายเดือน −10%) · `#/finder` แบบสอบถาม 3 ข้อแนะนำสินค้า · `#/research` ห้องสมุดงานวิจัย · `#/brands` โครงสร้างแบรนด์ในเครือ · `#/about` แก่นแบรนด์ · `#/help` FAQ/จัดส่ง/ติดต่อ · `#/checkout` ที่อยู่ → จัดส่ง → ชำระเงิน (PromptPay / บัตร / COD) · `#/order/:id` ยืนยันคำสั่งซื้อ · `#/account` คำสั่งซื้อและการส่งรายเดือน

โค้ดส่วนลดสำหรับทดสอบ: `WELCOME10` (−10%), `EVIDENCE` (−150 เมื่อครบ 1,500)

## สิ่งที่เป็น mock / ต้องต่อระบบจริง

- ตะกร้า คำสั่งซื้อ ที่อยู่ เก็บใน `localStorage` ของเบราว์เซอร์เท่านั้น — ต้องต่อ backend / payment gateway (เช่น Omise, 2C2P) และ PromptPay QR จริง
- เลข อย. ในไฟล์ data เป็นตัวอย่าง ต้องแทนด้วยเลขจริงก่อนเผยแพร่
- ภาพสินค้าเป็น packshot ที่ render ด้วย CSS ตามเลย์เอาต์ฉลากใน brandbook §09 — เมื่อมีภาพถ่ายที่ผ่านการอนุมัติแล้วให้แทนใน `packshot()` ใน `app.js`
- งานวิจัย/PMID ใน `data.js` อ้างอิงจากการศึกษาที่มีอยู่จริงของสายพันธุ์เหล่านั้น แต่ควรให้ทีมแบรนด์/เภสัชกรตรวจทานตัวเลขและคำสรุปก่อนเผยแพร่ ตามขั้นตอนอนุมัติใน brandbook §11
