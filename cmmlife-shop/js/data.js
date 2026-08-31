/* ==========================================================================
   CMMLIFE · Catalogue data
   All copy follows brandbook vocabulary: ใช้ ดูแล · สมดุล · ฟื้นฟู · มีงานวิจัยรองรับ
   ห้าม รักษา · หายขาด · ปลอดภัย 100% · การันตีผล
   ========================================================================== */

window.CMM = window.CMM || {};

CMM.brands = {
  nutralist: { id: 'nutralist', name: 'Nutralist', accent: '#E6398B', desc: 'สุขภาพจุดซ่อนเร้นและระบบสืบพันธุ์', live: true },
  brand2:    { id: 'brand2', name: 'แบรนด์ที่ 2', accent: '#A67BB8', desc: 'ฮอร์โมนและวัยหมดประจำเดือน', live: false },
  brand3:    { id: 'brand3', name: 'แบรนด์ที่ 3', accent: '#E0A24A', desc: 'ผิวพรรณและคอลลาเจน', live: false },
  brand4:    { id: 'brand4', name: 'แบรนด์ที่ 4', accent: '#3E9CA8', desc: 'พื้นที่สำหรับการขยายในอนาคต', live: false },
};

CMM.concerns = [
  { id: 'intimate',  name: 'สมดุลจุดซ่อนเร้น', sub: 'ค่า pH · จุลินทรีย์ดี', icon: 'balance' },
  { id: 'urinary',   name: 'ทางเดินปัสสาวะ', sub: 'ดูแลต่อเนื่อง', icon: 'shield' },
  { id: 'fertility', name: 'เตรียมตั้งครรภ์ / IVF', sub: 'ไข่ · โฟเลต · DHA', icon: 'heart' },
  { id: 'cycle',     name: 'รอบเดือน & PCOS', sub: 'อินโนซิทอล · เหล็ก', icon: 'cycle' },
  { id: 'daily',     name: 'ดูแลเชิงป้องกัน', sub: 'วิตามินพื้นฐาน', icon: 'flask' },
];

CMM.categories = [
  { id: 'probiotic', name: 'โพรไบโอติก' },
  { id: 'fertility', name: 'เตรียมตั้งครรภ์' },
  { id: 'vitamin',   name: 'วิตามินและแร่ธาตุ' },
  { id: 'botanical', name: 'สารสกัดจากพืช' },
  { id: 'bundle',    name: 'เซ็ตดูแล' },
];

/* Research references — strain level */
CMM.research = [
  {
    id: 'gr1-rc14-2001', strains: ['Lactobacillus rhamnosus GR-1®', 'Lactobacillus reuteri RC-14®'],
    type: 'RCT', n: 64, weeks: 4,
    title: 'ผลของโพรไบโอติก GR-1 และ RC-14 ชนิดรับประทานต่อจุลินทรีย์ในช่องคลอดของผู้หญิงวัยเจริญพันธุ์',
    src: 'Reid G. et al., FEMS Immunology & Medical Microbiology, 2003',
    finding: 'กลุ่มที่รับประทานมีสัดส่วนจุลินทรีย์ Lactobacillus ในช่องคลอดเพิ่มขึ้นอย่างมีนัยสำคัญ เทียบกับยาหลอก หลังรับประทานต่อเนื่อง 28 วัน',
    stat: { label: 'สัดส่วนผู้ที่จุลินทรีย์กลับสู่สมดุล', value: 82, unit: '%', compare: 'ยาหลอก 37%' },
    pmid: '12628548'
  },
  {
    id: 'la14-hn001-2014', strains: ['Lactobacillus acidophilus La-14®', 'Lactobacillus rhamnosus HN001™'],
    type: 'RCT', n: 40, weeks: 2,
    title: 'การตั้งรกรากของ La-14 และ HN001 ในช่องคลอดหลังรับประทานร่วมกับแลคโตเฟอร์ริน',
    src: 'De Alberti D. et al., Archives of Gynecology and Obstetrics, 2015',
    finding: 'ตรวจพบสายพันธุ์ทั้งสองในช่องคลอดของผู้เข้าร่วมส่วนใหญ่ภายใน 14 วัน แสดงถึงการเดินทางจากลำไส้ไปยังช่องคลอดได้จริง',
    stat: { label: 'ตรวจพบสายพันธุ์ในช่องคลอด', value: 80, unit: '%', compare: 'วันที่ 14' },
    pmid: '25488145'
  },
  {
    id: 'myo-pcos-2012', strains: ['Myo-inositol 4 g/วัน'],
    type: 'Meta-analysis', n: 1216, weeks: 12,
    title: 'ไมโอ-อินโนซิทอลกับการตกไข่และระดับอินซูลินในผู้หญิงที่มีภาวะ PCOS',
    src: 'Unfer V. et al., Gynecological Endocrinology, 2012',
    finding: 'การรับประทานไมโอ-อินโนซิทอล 4 กรัม/วัน สัมพันธ์กับการตกไข่ที่สม่ำเสมอขึ้นและค่า HOMA-IR ที่ดีขึ้นในหลายการศึกษา',
    stat: { label: 'สัดส่วนผู้ที่กลับมาตกไข่', value: 70, unit: '%', compare: 'ช่วง 12–16 สัปดาห์' },
    pmid: '22296306'
  },
  {
    id: 'pac36-2009', strains: ['Cranberry PAC 36 mg'],
    type: 'RCT', n: 32, weeks: 1,
    title: 'ปริมาณโปรแอนโทไซยานิดินจากแครนเบอร์รี่กับการยึดเกาะของแบคทีเรีย E. coli',
    src: 'Howell A.B. et al., BMC Infectious Diseases, 2010',
    finding: 'ขนาด 36 mg PAC/วัน ลดการยึดเกาะของแบคทีเรียที่ผนังทางเดินปัสสาวะได้อย่างมีนัยสำคัญ และคงผลได้ถึง 24 ชั่วโมง',
    stat: { label: 'การยึดเกาะของแบคทีเรียที่ลดลง', value: 60, unit: '%', compare: 'ภายใน 6 ชั่วโมง' },
    pmid: '20565836'
  },
  {
    id: 'folate-mthf-2014', strains: ['5-MTHF (โฟเลตรูปแบบพร้อมใช้)'],
    type: 'RCT', n: 144, weeks: 24,
    title: 'ระดับโฟเลตในเม็ดเลือดแดงหลังเสริม 5-MTHF เทียบกับกรดโฟลิกในผู้หญิงวัยเจริญพันธุ์',
    src: 'Lamers Y. et al., American Journal of Clinical Nutrition, 2006',
    finding: '5-MTHF เพิ่มระดับโฟเลตในเม็ดเลือดแดงได้ไม่ต่ำกว่ากรดโฟลิก และไม่ขึ้นกับยีน MTHFR ของผู้รับประทาน',
    stat: { label: 'ระดับโฟเลตในเม็ดเลือดแดงที่เพิ่มขึ้น', value: 50, unit: '%', compare: 'สัปดาห์ที่ 24' },
    pmid: '16400055'
  },
  {
    id: 'iron-bisglycinate-2014', strains: ['Iron bisglycinate 18 mg'],
    type: 'RCT', n: 80, weeks: 12,
    title: 'เหล็กบิสไกลซิเนตเทียบกับเหล็กซัลเฟตในหญิงตั้งครรภ์: ระดับฮีโมโกลบินและผลข้างเคียงทางเดินอาหาร',
    src: 'Milman N. et al., Journal of Perinatal Medicine, 2014',
    finding: 'เหล็กบิสไกลซิเนตขนาดต่ำให้ผลต่อระดับฮีโมโกลบินเทียบเท่าเหล็กซัลเฟตขนาดสูง โดยมีอาการท้องผูกและคลื่นไส้น้อยกว่า',
    stat: { label: 'รายงานผลข้างเคียงทางเดินอาหาร', value: 24, unit: '%', compare: 'เหล็กซัลเฟต 47%' },
    pmid: '24152889'
  },
  {
    id: 'dha-pregnancy-2013', strains: ['DHA 200 mg'],
    type: 'Cohort', n: 350, weeks: 20,
    title: 'ปริมาณ DHA ที่ได้รับระหว่างตั้งครรภ์กับพัฒนาการด้านการมองเห็นและสมองของทารก',
    src: 'Koletzko B. et al., Journal of Perinatal Medicine, 2008 (consensus)',
    finding: 'ข้อแนะนำสากลระบุให้หญิงตั้งครรภ์และให้นมบุตรได้รับ DHA ไม่ต่ำกว่า 200 mg/วัน',
    stat: { label: 'ปริมาณที่แนะนำต่อวัน', value: 200, unit: 'mg', compare: 'ฉันทามติ ISSFAL' },
    pmid: '18184094'
  },
];

/* Products */
CMM.products = [
  {
    id: 'probio-pro-plus', brand: 'nutralist', cat: 'probiotic', concerns: ['intimate', 'daily'],
    name: 'Probio Pro Plus+', formula: 'La-14® · HN001™ · Lactoferrin',
    benefit: 'โพรไบโอติกเพื่อสมดุลจุดซ่อนเร้นของผู้หญิง',
    desc: 'สายพันธุ์ที่มีงานวิจัยยืนยันว่าเดินทางจากลำไส้ไปตั้งรกรากในช่องคลอดได้จริง เสริมด้วยแลคโตเฟอร์รินที่ช่วยให้จุลินทรีย์ดีเติบโต เหมาะสำหรับผู้ที่ต้องการดูแลค่า pH ให้สมดุลอย่างต่อเนื่อง',
    price: 1290, compareAt: null, unit: '30 แคปซูล', dose: '10 พันล้าน CFU', form: 'แคปซูล', accent: '#E6398B',
    rating: 4.8, reviews: 214, bestseller: true, stock: 120,
    facts: [['10 พันล้าน', 'CFU ต่อแคปซูล'], ['2 สายพันธุ์', 'มีรหัสสายพันธุ์'], ['30 วัน', 'ต่อ 1 กล่อง']],
    ingredients: [
      ['Lactobacillus acidophilus La-14®', '5 × 10⁹ CFU'],
      ['Lactobacillus rhamnosus HN001™', '5 × 10⁹ CFU'],
      ['Lactoferrin (จากนมวัว)', '50 mg'],
      ['แคปซูลผัก (HPMC)', '—'],
    ],
    usage: 'รับประทานวันละ 1 แคปซูล พร้อมน้ำ ก่อนนอนหรือเวลาเดิมทุกวัน · ไม่ต้องแช่เย็น เก็บให้พ้นแสงแดดและความชื้น',
    research: ['la14-hn001-2014'], tags: ['ไม่มีน้ำตาล', 'ไม่ต้องแช่เย็น', 'แคปซูลผัก'],
    fda: '13-1-01234-5-0001', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ขนาดแคปซูล'],
  },
  {
    id: 'probio-balance', brand: 'nutralist', cat: 'probiotic', concerns: ['intimate', 'urinary'],
    name: 'Probio Balance', formula: 'GR-1® · RC-14®',
    benefit: 'สองสายพันธุ์คลาสสิกที่มีงานวิจัยมากที่สุดสำหรับผู้หญิง',
    desc: 'GR-1 และ RC-14 เป็นคู่สายพันธุ์ที่ถูกศึกษาในผู้หญิงมากกว่า 30 การทดลองทางคลินิกตลอด 25 ปี สำหรับผู้ที่มีปัญหาเป็นซ้ำและต้องการดูแลระยะยาวด้วยหลักฐานที่หนักแน่นที่สุด',
    price: 1190, compareAt: null, unit: '30 แคปซูล', dose: '5 พันล้าน CFU', form: 'แคปซูล', accent: '#A81259',
    rating: 4.7, reviews: 168, bestseller: false, stock: 86,
    facts: [['5 พันล้าน', 'CFU ต่อแคปซูล'], ['30+ งานวิจัย', 'ในผู้หญิง'], ['30 วัน', 'ต่อ 1 กล่อง']],
    ingredients: [
      ['Lactobacillus rhamnosus GR-1®', '2.5 × 10⁹ CFU'],
      ['Lactobacillus reuteri RC-14®', '2.5 × 10⁹ CFU'],
      ['แคปซูลผัก (HPMC)', '—'],
    ],
    usage: 'รับประทานวันละ 1 แคปซูล พร้อมอาหาร · ใช้ต่อเนื่องอย่างน้อย 4 สัปดาห์เพื่อให้เห็นความเปลี่ยนแปลง',
    research: ['gr1-rc14-2001'], tags: ['ไม่ต้องแช่เย็น', 'แคปซูลผัก', 'ปราศจากกลูเตน'],
    fda: '13-1-01234-5-0002', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ขนาดแคปซูล'],
  },
  {
    id: 'cranberry-pac36', brand: 'nutralist', cat: 'botanical', concerns: ['urinary'],
    name: 'Cranberry PAC 36', formula: 'PAC 36 mg · D-Mannose 1,000 mg',
    benefit: 'สารสกัดแครนเบอร์รี่มาตรฐาน 36 mg PAC ตามงานวิจัย',
    desc: 'แครนเบอร์รี่ที่ได้ผลต้องวัดที่ปริมาณ PAC ไม่ใช่น้ำหนักผลไม้ สูตรนี้ให้ 36 mg PAC (วิธีวัด DMAC) ซึ่งเป็นขนาดที่ใช้ในงานวิจัย ร่วมกับดี-แมนโนสเพื่อดูแลทางเดินปัสสาวะอย่างต่อเนื่อง',
    price: 890, compareAt: null, unit: '30 แคปซูล', dose: '36 mg PAC', form: 'แคปซูล', accent: '#C0392B',
    rating: 4.6, reviews: 97, bestseller: false, stock: 140,
    facts: [['36 mg', 'PAC (DMAC)'], ['1,000 mg', 'D-Mannose'], ['30 วัน', 'ต่อ 1 กล่อง']],
    ingredients: [
      ['สารสกัดแครนเบอร์รี่ (Vaccinium macrocarpon) มาตรฐาน PAC', '36 mg PAC'],
      ['D-Mannose', '1,000 mg'],
      ['แคปซูลผัก (HPMC)', '—'],
    ],
    usage: 'รับประทานวันละ 1 แคปซูล พร้อมน้ำ 1 แก้ว · แนะนำให้ดื่มน้ำอย่างน้อย 1.5 ลิตรต่อวันร่วมด้วย',
    research: ['pac36-2009'], tags: ['ไม่มีน้ำตาล', 'วีแกน'],
    fda: '13-1-01234-5-0003', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ขนาดแคปซูล'],
  },
  {
    id: 'fertility-prep', brand: 'nutralist', cat: 'fertility', concerns: ['fertility', 'cycle'],
    name: 'Fertility Prep+', formula: 'Myo-inositol · 5-MTHF · CoQ10',
    benefit: 'สูตรเตรียมตั้งครรภ์ที่ออกแบบให้ใช้ร่วมกับแผนของแพทย์ได้',
    desc: 'รวมสามสารสำคัญที่มีงานวิจัยในผู้หญิงที่วางแผนตั้งครรภ์และผู้ที่อยู่ระหว่างทำ IVF ได้แก่ ไมโอ-อินโนซิทอลสำหรับคุณภาพไข่ โฟเลตรูปแบบพร้อมใช้ (5-MTHF) และโคเอนไซม์คิวเท็น · ระบุปริมาณทุกตัวชัดเจนเพื่อให้คุณนำไปปรึกษาแพทย์ได้',
    price: 1590, compareAt: null, unit: '60 แคปซูล', dose: '2,000 mg Myo-inositol', form: 'แคปซูล', accent: '#3E9CA8',
    rating: 4.9, reviews: 142, bestseller: true, stock: 64,
    facts: [['2,000 mg', 'Myo-inositol'], ['400 mcg', '5-MTHF'], ['100 mg', 'CoQ10']],
    ingredients: [
      ['Myo-inositol', '2,000 mg'],
      ['L-5-Methyltetrahydrofolate (5-MTHF)', '400 mcg DFE'],
      ['Coenzyme Q10 (Ubiquinone)', '100 mg'],
      ['Vitamin D3', '1,000 IU'],
      ['แคปซูลผัก (HPMC)', '—'],
    ],
    usage: 'รับประทานวันละ 2 แคปซูล พร้อมอาหารเช้า · หากอยู่ระหว่างการดูแลของแพทย์ โปรดแจ้งแพทย์ก่อนเริ่มรับประทาน',
    research: ['myo-pcos-2012', 'folate-mthf-2014'], tags: ['ปรึกษาแพทย์ได้', 'ไม่มีน้ำตาล'],
    fda: '13-1-01234-5-0004', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ขนาดแคปซูล'],
  },
  {
    id: 'myo-inositol-powder', brand: 'nutralist', cat: 'fertility', concerns: ['cycle', 'fertility'],
    name: 'Myo-Inositol Powder', formula: 'Myo : D-chiro 40 : 1',
    benefit: 'ผงอินโนซิทอลสัดส่วนตามงานวิจัย สำหรับรอบเดือนและ PCOS',
    desc: 'อัตราส่วน 40:1 เป็นสัดส่วนเดียวกับที่พบในร่างกายและใช้ในงานวิจัย PCOS ส่วนใหญ่ ผงละลายน้ำ ไม่มีรสชาติ ตวงได้แม่นยำด้วยช้อนในกล่อง',
    price: 1090, compareAt: null, unit: '120 g (30 วัน)', dose: '4,000 mg ต่อวัน', form: 'ผง', accent: '#E6398B',
    rating: 4.7, reviews: 76, bestseller: false, stock: 58,
    facts: [['4,000 mg', 'Myo ต่อวัน'], ['100 mg', 'D-chiro ต่อวัน'], ['40 : 1', 'สัดส่วน']],
    ingredients: [
      ['Myo-inositol', '4,000 mg'],
      ['D-chiro-inositol', '100 mg'],
    ],
    usage: 'ตวง 1 ช้อน (2 g) ละลายน้ำ ดื่มเช้าและเย็น · ใช้ต่อเนื่อง 12 สัปดาห์ขึ้นไปตามงานวิจัย',
    research: ['myo-pcos-2012'], tags: ['ไม่มีรส', 'ไม่มีน้ำตาล', 'วีแกน'], powder: true,
    fda: '13-1-01234-5-0005', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ช้อนตวง'],
  },
  {
    id: 'omega-dha-prenatal', brand: 'nutralist', cat: 'fertility', concerns: ['fertility'],
    name: 'Omega-3 DHA Prenatal', formula: 'DHA 400 mg · EPA 100 mg',
    benefit: 'น้ำมันปลาเกรดคุณภาพสูง ทดสอบโลหะหนักทุกล็อต',
    desc: 'DHA ขนาดสูงกว่าข้อแนะนำสากล 200 mg/วัน เพื่อรองรับช่วงเตรียมตั้งครรภ์ ตั้งครรภ์ และให้นมบุตร · ผ่านการทดสอบปรอทและโลหะหนักทุกล็อต มีผลตรวจให้ดูในหน้างานวิจัย',
    price: 990, compareAt: null, unit: '60 ซอฟต์เจล', dose: '400 mg DHA', form: 'ซอฟต์เจล', accent: '#2E7D5B',
    rating: 4.8, reviews: 121, bestseller: false, stock: 92,
    facts: [['400 mg', 'DHA ต่อวัน'], ['100 mg', 'EPA ต่อวัน'], ['IFOS', 'ทดสอบทุกล็อต']],
    ingredients: [
      ['น้ำมันปลาเข้มข้น (Triglyceride form)', '1,000 mg'],
      ['DHA', '400 mg'],
      ['EPA', '100 mg'],
      ['วิตามินอี (ป้องกันการหืน)', '5 mg'],
    ],
    usage: 'รับประทานวันละ 1 ซอฟต์เจล พร้อมอาหาร · กลิ่นคาวน้อยด้วยการเคลือบเอนเทอริก',
    research: ['dha-pregnancy-2013'], tags: ['ทดสอบโลหะหนัก', 'ไม่มีกลิ่นคาว'],
    fda: '13-1-01234-5-0006', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ขนาดซอฟต์เจล'],
  },
  {
    id: 'iron-gentle', brand: 'nutralist', cat: 'vitamin', concerns: ['cycle', 'fertility'],
    name: 'Iron Gentle', formula: 'Iron bisglycinate 18 mg · Vitamin C',
    benefit: 'เหล็กรูปแบบอ่อนโยนต่อกระเพาะ สำหรับผู้ที่มีประจำเดือนมาก',
    desc: 'เหล็กบิสไกลซิเนตดูดซึมได้ดีในขนาดต่ำ จึงลดอาการท้องผูกและคลื่นไส้ที่พบกับเหล็กทั่วไป เสริมวิตามินซีเพื่อช่วยการดูดซึม',
    price: 690, compareAt: null, unit: '60 เม็ด', dose: '18 mg', form: 'เม็ด', accent: '#A81259',
    rating: 4.6, reviews: 88, bestseller: false, stock: 150,
    facts: [['18 mg', 'เหล็ก'], ['80 mg', 'วิตามินซี'], ['60 วัน', 'ต่อ 1 กล่อง']],
    ingredients: [
      ['Iron (as Ferrous bisglycinate chelate)', '18 mg'],
      ['Vitamin C (Ascorbic acid)', '80 mg'],
    ],
    usage: 'รับประทานวันละ 1 เม็ด ท้องว่างหรือพร้อมอาหาร · เว้นระยะจากชา กาแฟ และแคลเซียมอย่างน้อย 2 ชั่วโมง',
    research: ['iron-bisglycinate-2014'], tags: ['อ่อนโยนต่อกระเพาะ', 'วีแกน'],
    fda: '13-1-01234-5-0007', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ขนาดเม็ด'],
  },
  {
    id: 'd3-k2', brand: 'nutralist', cat: 'vitamin', concerns: ['daily', 'fertility'],
    name: 'Vitamin D3 + K2', formula: 'D3 2,000 IU · K2 (MK-7) 90 mcg',
    benefit: 'วิตามินดีพื้นฐานที่ผู้หญิงไทยส่วนใหญ่ได้รับไม่เพียงพอ',
    desc: 'การสำรวจในประเทศไทยพบผู้หญิงวัยทำงานจำนวนมากมีระดับวิตามินดีต่ำกว่าเกณฑ์ แม้จะอยู่ในประเทศที่มีแดด สูตรนี้ให้ D3 ขนาดพอเหมาะร่วมกับ K2 รูปแบบ MK-7',
    price: 590, compareAt: null, unit: '60 ซอฟต์เจล', dose: '2,000 IU', form: 'ซอฟต์เจล', accent: '#D98324',
    rating: 4.7, reviews: 203, bestseller: false, stock: 210,
    facts: [['2,000 IU', 'วิตามินดี 3'], ['90 mcg', 'K2 MK-7'], ['60 วัน', 'ต่อ 1 กล่อง']],
    ingredients: [
      ['Vitamin D3 (Cholecalciferol)', '2,000 IU (50 mcg)'],
      ['Vitamin K2 (Menaquinone-7)', '90 mcg'],
      ['น้ำมันมะกอกสกัดเย็น', '—'],
    ],
    usage: 'รับประทานวันละ 1 ซอฟต์เจล พร้อมมื้ออาหารที่มีไขมัน',
    research: [], tags: ['ขนาดเล็ก กลืนง่าย'],
    fda: '13-1-01234-5-0008', gallery: ['หน้ากล่อง', 'ฉลากหลัง', 'ขนาดซอฟต์เจล'],
  },
  {
    id: 'set-balance', brand: 'nutralist', cat: 'bundle', concerns: ['intimate', 'urinary'],
    name: 'Balance Set', formula: 'Probio Balance + Cranberry PAC 36',
    benefit: 'เซ็ตดูแลจุดซ่อนเร้นและทางเดินปัสสาวะ 30 วัน',
    desc: 'คู่ที่ผู้เภสัชกรของเราแนะนำบ่อยที่สุดสำหรับผู้ที่มีปัญหาเป็นซ้ำ โพรไบโอติกดูแลสมดุลจุลินทรีย์ ส่วน PAC ดูแลการยึดเกาะของแบคทีเรียในทางเดินปัสสาวะ',
    price: 1890, compareAt: 2080, unit: '2 กล่อง', dose: '30 วัน', form: 'เซ็ต', accent: '#A81259',
    rating: 4.8, reviews: 54, bestseller: false, stock: 40, bundle: ['probio-balance', 'cranberry-pac36'],
    facts: [['2 กล่อง', 'ใน 1 เซ็ต'], ['ประหยัด', '190 บาท'], ['30 วัน', 'ดูแลต่อเนื่อง']],
    ingredients: [['Probio Balance', '30 แคปซูล'], ['Cranberry PAC 36', '30 แคปซูล']],
    usage: 'รับประทานอย่างละ 1 แคปซูลต่อวัน สามารถรับประทานพร้อมกันได้',
    research: ['gr1-rc14-2001', 'pac36-2009'], tags: ['ประหยัดกว่าซื้อแยก'],
    fda: '—', gallery: ['เซ็ตสินค้า'],
  },
  {
    id: 'set-conceive', brand: 'nutralist', cat: 'bundle', concerns: ['fertility'],
    name: 'Conceive Set', formula: 'Fertility Prep+ · Omega-3 DHA · D3+K2',
    benefit: 'เซ็ตเตรียมตั้งครรภ์ครบ 3 ส่วนสำคัญ',
    desc: 'ครอบคลุมไข่ โฟเลต กรดไขมันจำเป็น และวิตามินดี ในเซ็ตเดียว ออกแบบให้เริ่มอย่างน้อย 3 เดือนก่อนวางแผนตั้งครรภ์ตามคำแนะนำทั่วไปของสูตินรีแพทย์',
    price: 2790, compareAt: 3170, unit: '3 กล่อง', dose: '30–60 วัน', form: 'เซ็ต', accent: '#3E9CA8',
    rating: 4.9, reviews: 38, bestseller: false, stock: 30, bundle: ['fertility-prep', 'omega-dha-prenatal', 'd3-k2'],
    facts: [['3 กล่อง', 'ใน 1 เซ็ต'], ['ประหยัด', '380 บาท'], ['ปรึกษาแพทย์', 'นำรายการไปได้']],
    ingredients: [['Fertility Prep+', '60 แคปซูล'], ['Omega-3 DHA Prenatal', '60 ซอฟต์เจล'], ['Vitamin D3 + K2', '60 ซอฟต์เจล']],
    usage: 'ดูวิธีรับประทานของแต่ละผลิตภัณฑ์ · มีการ์ดสรุปปริมาณสารสำคัญในกล่องสำหรับนำไปแจ้งแพทย์',
    research: ['myo-pcos-2012', 'folate-mthf-2014', 'dha-pregnancy-2013'], tags: ['ประหยัดกว่าซื้อแยก', 'ปรึกษาแพทย์ได้'],
    fda: '—', gallery: ['เซ็ตสินค้า'],
  },
];

CMM.reviews = [
  { p: 'probio-pro-plus', name: 'พิมพ์ชนก', init: 'พ', age: 34, stars: 5, date: '2026-07-18', text: 'เคยเป็นซ้ำปีละหลายครั้ง ลองกินต่อเนื่อง 2 เดือนแล้วรู้สึกว่าสมดุลดีขึ้น ชอบที่บอกชื่อสายพันธุ์ชัดเจน เอาไปถามหมอได้' },
  { p: 'probio-pro-plus', name: 'Nattaya', init: 'N', age: 29, stars: 5, date: '2026-06-02', text: 'ไม่ต้องแช่เย็น พกไปทำงานสะดวก แคปซูลเล็กกลืนง่าย' },
  { p: 'probio-pro-plus', name: 'วรัญญา', init: 'ว', age: 41, stars: 4, text: 'ดีค่ะ แต่อยากให้มีแบบ 90 แคปซูลจะได้ไม่ต้องสั่งบ่อย', date: '2026-05-21' },
  { p: 'probio-balance', name: 'กมลวรรณ', init: 'ก', age: 37, stars: 5, date: '2026-07-30', text: 'อ่านงานวิจัยในเว็บก่อนตัดสินใจ ชอบที่ไม่โฆษณาเกินจริง กินมา 6 สัปดาห์ รอบนี้ไม่เป็นซ้ำ' },
  { p: 'fertility-prep', name: 'ปาณิสรา', init: 'ป', age: 33, stars: 5, date: '2026-08-03', text: 'อยู่ระหว่างเตรียม IVF เอารายการส่วนผสมให้คุณหมอดู หมอบอกว่าปริมาณเหมาะสม กินร่วมกับแผนได้' },
  { p: 'fertility-prep', name: 'Ploy', init: 'P', age: 31, stars: 5, date: '2026-06-15', text: 'รอบเดือนมาสม่ำเสมอขึ้นหลังกิน 3 เดือน ไม่รู้ว่าเพราะตัวนี้อย่างเดียวไหม แต่ชอบที่สินค้าให้ข้อมูลตรงไปตรงมา' },
  { p: 'cranberry-pac36', name: 'ศิริพร', init: 'ศ', age: 45, stars: 5, date: '2026-07-09', text: 'ตัวอื่นบอกแค่ "สารสกัดแครนเบอร์รี่ 500 mg" แต่ตัวนี้บอกค่า PAC ชัดเจน เชื่อถือได้มากกว่า' },
  { p: 'iron-gentle', name: 'ธนพร', init: 'ธ', age: 27, stars: 4, date: '2026-05-05', text: 'ไม่ท้องผูกเหมือนเหล็กที่เคยกิน ดีมาก' },
  { p: 'myo-inositol-powder', name: 'อรวรรณ', init: 'อ', age: 30, stars: 5, date: '2026-07-22', text: 'ไม่มีรสจริง ๆ ละลายน้ำเปล่าได้ ช้อนตวงในกล่องช่วยให้ไม่ต้องเดา' },
  { p: 'd3-k2', name: 'Mook', init: 'M', age: 36, stars: 5, date: '2026-04-12', text: 'ตรวจเลือดแล้ววิตามินดีต่ำ หมอให้กินเสริม เลือกตัวนี้เพราะมี K2 ด้วย ราคาโอเค' },
  { p: 'omega-dha-prenatal', name: 'จิราภรณ์', init: 'จ', age: 32, stars: 5, date: '2026-06-28', text: 'ไม่เรอคาวเลย มีผลตรวจโลหะหนักให้ดู สบายใจตอนท้อง' },
];

CMM.faqs = [
  { q: 'โพรไบโอติกของ Nutralist ต้องแช่เย็นไหม', a: 'ไม่ต้อง ทุกสายพันธุ์ผ่านกระบวนการทำแห้งเยือกแข็งและบรรจุในแผงกันความชื้น คงปริมาณ CFU ตามฉลากจนถึงวันหมดอายุเมื่อเก็บที่อุณหภูมิห้องไม่เกิน 30°C' },
  { q: 'ต้องรับประทานนานแค่ไหนจึงเห็นความเปลี่ยนแปลง', a: 'งานวิจัยส่วนใหญ่ประเมินผลที่ 4–12 สัปดาห์ เราจึงแนะนำให้รับประทานต่อเนื่องอย่างน้อย 1 เดือน และไม่มีงานวิจัยใดรับรองผลภายในไม่กี่วัน' },
  { q: 'รับประทานร่วมกับยาที่แพทย์สั่งได้ไหม', a: 'ผลิตภัณฑ์ส่วนใหญ่รับประทานร่วมกับยาทั่วไปได้ แต่หากคุณมีโรคประจำตัว ตั้งครรภ์ หรืออยู่ระหว่างการรักษา โปรดนำรายการส่วนผสม (พิมพ์ได้จากหน้าสินค้า) ไปปรึกษาแพทย์หรือเภสัชกรก่อน' },
  { q: 'ทำไมราคาสูงกว่าโพรไบโอติกทั่วไป', a: 'เพราะเราใช้สายพันธุ์ที่มีรหัสและงานวิจัยเฉพาะ (เช่น GR-1®, La-14®) ซึ่งมีค่าลิขสิทธิ์สายพันธุ์ ต่างจากโพรไบโอติกที่ระบุแค่ชื่อสกุลโดยไม่มีรหัสสายพันธุ์' },
  { q: 'ส่งฟรีเมื่อไหร่ และใช้เวลากี่วัน', a: 'ส่งฟรีเมื่อยอดสั่งซื้อ 1,500 บาทขึ้นไป · กรุงเทพฯ และปริมณฑล 1–2 วันทำการ · ต่างจังหวัด 2–4 วันทำการ · บรรจุในกล่องทึบไม่ระบุชื่อสินค้าภายนอก' },
  { q: 'นโยบายคืนสินค้าเป็นอย่างไร', a: 'หากได้รับสินค้าชำรุดหรือผิดรายการ แจ้งภายใน 7 วันเพื่อเปลี่ยนใหม่โดยไม่มีค่าใช้จ่าย · ผลิตภัณฑ์เสริมอาหารที่เปิดใช้แล้วไม่สามารถคืนได้ตามหลักความปลอดภัยของผู้บริโภค' },
];

CMM.shipping = [
  { id: 'standard', name: 'ส่งมาตรฐาน', desc: '2–4 วันทำการ · Flash / Kerry', price: 50 },
  { id: 'express',  name: 'ส่งด่วน กรุงเทพฯ–ปริมณฑล', desc: 'ถึงภายในวันถัดไป', price: 120 },
  { id: 'pickup',   name: 'รับที่ร้าน CMMLIFE ทองหล่อ', desc: 'พร้อมรับภายใน 2 ชั่วโมง · จ–ส 10:00–19:00', price: 0 },
];

CMM.payments = [
  { id: 'promptpay', name: 'พร้อมเพย์ (QR)', desc: 'สแกนจ่ายได้ทุกธนาคาร · ยืนยันอัตโนมัติ' },
  { id: 'card', name: 'บัตรเครดิต / เดบิต', desc: 'Visa · Mastercard · JCB · ผ่านระบบที่ได้มาตรฐาน PCI DSS' },
  { id: 'cod', name: 'เก็บเงินปลายทาง', desc: 'ค่าธรรมเนียม 30 บาท · เฉพาะส่งมาตรฐาน', fee: 30 },
];

CMM.promos = {
  WELCOME10: { type: 'pct', value: 10, desc: 'ส่วนลด 10% สำหรับการสั่งซื้อครั้งแรก' },
  EVIDENCE: { type: 'fixed', value: 150, min: 1500, desc: 'ลด 150 บาท เมื่อสั่งซื้อ 1,500 บาทขึ้นไป' },
};

CMM.FREE_SHIP = 1500;
CMM.SUB_DISCOUNT = 0.10;
