/* =====================================================
   DADOS DOS PRODUTOS
===================================================== */
const PRODUCTS = [
  {id:1, name:"Colar Vienna Classic", category:"Colares", price:149.90, rating:5, reviews:128, material:"Folheado a Ouro 18k com banho de ródio", desc:"Peça atemporal que combina com qualquer produção. O elo delicado e o acabamento espelhado garantem brilho duradouro sem pesar no décote.", measures:"Comprimento: 45cm + 5cm extensor", img:"./img/display-shiny-luxurious-golden-chain.jpg", img2:"https://picsum.photos/id/1012/600/600", img3:"https://picsum.photos/id/1013/600/600", tag:"Mais vendido", sold:342},
  {id:2, name:"Brinco Argola Dourada", category:"Brincos", price:89.90, rating:5, reviews:96, material:"Folheado a Ouro 18k", desc:"Argola clássica em tamanho médio, leve para o uso diário e versátil o suficiente para do trabalho à balada.", measures:"Diâmetro: 3cm", img:"https://picsum.photos/id/1027/600/600", img2:"https://picsum.photos/id/1025/600/600", img3:"https://picsum.photos/id/1024/600/600", tag:"Mais vendido", sold:410},
  {id:3, name:"Anel Solitário Prata", category:"Anéis", price:79.90, rating:4, reviews:58, material:"Prata 925 com zircônia", desc:"Elegância minimalista com um único ponto de luz — perfeito para uso solo ou combinado em camadas com outros anéis.", measures:"Aro ajustável 14 a 20", img:"https://picsum.photos/id/1035/600/600", img2:"https://picsum.photos/id/1039/600/600", img3:"https://picsum.photos/id/1043/600/600", tag:"", sold:187},
  {id:4, name:"Pulseira Corrente Fina", category:"Pulseiras", price:69.90, rating:5, reviews:74, material:"Folheado a Ouro 18k", desc:"Corrente delicada estilo cartier fino, ideal para compor looks sobrepostos ou usar sozinha no dia a dia.", measures:"Comprimento: 18cm + 2cm extensor", img:"https://picsum.photos/id/1050/600/600", img2:"https://picsum.photos/id/1057/600/600", img3:"https://picsum.photos/id/1059/600/600", tag:"", sold:203},
  {id:5, name:"Colar Pingente Coração", category:"Colares", price:129.90, rating:5, reviews:112, material:"Folheado a Ouro 18k", desc:"Um clássico atemporal: pingente de coração em tamanho delicado, presente perfeito para presentear (ou se presentear).", measures:"Comprimento: 42cm + pingente 1,2cm", img:"https://picsum.photos/id/1062/600/600", img2:"https://picsum.photos/id/1069/600/600", img3:"https://picsum.photos/id/1074/600/600", tag:"Presente", sold:298},
  {id:6, name:"Brinco Maxi Rose", category:"Brincos", price:99.90, rating:4, reviews:41, material:"Folheado Rose 18k", desc:"Brinco statement com design geométrico moderno em tom rose — para quem gosta de arrasar sem medo.", measures:"Altura: 4,5cm", img:"https://picsum.photos/id/1084/600/600", img2:"https://picsum.photos/id/1080/600/600", img3:"https://picsum.photos/id/1082/600/600", tag:"Novo", sold:76},
  {id:7, name:"Anel Duas Cores", category:"Anéis", price:109.90, rating:5, reviews:63, material:"Folheado a Ouro 18k + Prata 925", desc:"O contraste elegante entre dourado e prateado em uma única peça — combina com qualquer outra joia que você já tenha.", measures:"Aro ajustável 15 a 19", img:"https://picsum.photos/id/1074/600/600", img2:"https://picsum.photos/id/1084/600/600", img3:"https://picsum.photos/id/1076/600/600", tag:"", sold:134},
  {id:8, name:"Pulseira de Grânulos", category:"Pulseiras", price:59.90, rating:4, reviews:52, material:"Prata 925", desc:"Textura orgânica de pequenas esferas que reflete luz de um jeito único — discreta e sofisticada ao mesmo tempo.", measures:"Comprimento: 17cm + 3cm extensor", img:"https://picsum.photos/id/1027/600/600", img2:"https://picsum.photos/id/1031/600/600", img3:"https://picsum.photos/id/1033/600/600", tag:"", sold:99}
];

const COUPONS = {
  "VIENNA10": 0.10,
  "BEMVINDO10": 0.10
};

let cart = JSON.parse(localStorage.getItem('vienna_cart') || '[]');
let appliedCoupon = JSON.parse(localStorage.getItem('vienna_coupon') || 'null');
let currentCategoryFilter = 'Todos';
let currentSort = 'popular';
let currentProduct = null;
let selectedPayMethod = 'pix';
const WHATSAPP_NUMBER = "5511999999999";

/* =====================================================
   HELPERS
===================================================== */
function formatBRL(v){ return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); }
function stars(n){ return '★★★★★'.slice(0,n) + '☆☆☆☆☆'.slice(0,5-n); }
function saveCart(){ localStorage.setItem('vienna_cart', JSON.stringify(cart)); updateCartCount(); }

function showToast(msg){
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(()=>t.classList.remove('show'), 2600);
}

/* =====================================================
   PAGE NAVIGATION
===================================================== */
function showPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}
function goHome(){ showPage('home'); }
function goCategory(cat){
  currentCategoryFilter = cat;
  document.getElementById('categoryTitle').textContent = cat === 'Todos' ? 'Todos os Produtos' : cat;
  renderFilterBar();
  renderCategoryGrid();
  showPage('category');
}
function toggleMobileNav(open){
  document.getElementById('mobileNav').classList.toggle('open', open);
}

function copiarEmail(event) {
  event.preventDefault();
  const email = "useviennaco@gmail.com";
  
  navigator.clipboard.writeText(email).then(() => {
    const toast = document.getElementById("toast-notification");
    
    // Mostra o aviso
    toast.className = "toast-visible";
    
    // Esconde o aviso após 3 segundos
    setTimeout(() => {
      toast.className = "toast-hidden";
    }, 3000);
  }).catch(err => {
    console.error("Erro ao copiar: ", err);
  });
}

/* =====================================================
   RENDER PRODUCT CARD
===================================================== */
function productCardHTML(p){
  return `
  <div class="product-card" onclick="openProductModal(${p.id})">
    <div class="product-media">
      ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ''}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="product-quick"><button onclick="event.stopPropagation();openProductModal(${p.id})">Ver detalhes</button></div>
    </div>
    <div class="product-info">
      <div class="product-cat">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-rating">${stars(p.rating)} <span>(${p.reviews})</span></div>
      <div class="product-price-row">
        <div>
          <div class="product-price">${formatBRL(p.price)}</div>
          <span class="product-installment">6x de ${formatBRL(p.price/6)}</span>
        </div>
        <button class="add-cart-icon" onclick="event.stopPropagation();addToCart(${p.id},1)"><i class="fa-solid fa-plus"></i></button>
      </div>
    </div>
  </div>`;
}

function renderBestsellers(){
  const top8 = [...PRODUCTS].sort((a,b)=>b.sold-a.sold);
  document.getElementById('bestsellerGrid').innerHTML = top8.map(productCardHTML).join('');
}

function renderFilterBar(){
  const cats = ['Todos','Colares','Brincos','Anéis','Pulseiras'];
  document.getElementById('filterBar').innerHTML = `
    ${cats.map(c=>`<button class="filter-chip ${currentCategoryFilter===c?'active':''}" onclick="filterByCategory('${c}')">${c}</button>`).join('')}
    <select class="sort-select" onchange="sortProducts(this.value)">
      <option value="popular" ${currentSort==='popular'?'selected':''}>Mais vendidos</option>
      <option value="lowprice" ${currentSort==='lowprice'?'selected':''}>Menor preço</option>
      <option value="highprice" ${currentSort==='highprice'?'selected':''}>Maior preço</option>
    </select>`;
}
function filterByCategory(cat){
  currentCategoryFilter = cat;
  document.getElementById('categoryTitle').textContent = cat === 'Todos' ? 'Todos os Produtos' : cat;
  renderFilterBar();
  renderCategoryGrid();
}
function sortProducts(val){ currentSort = val; renderCategoryGrid(); }

function renderCategoryGrid(){
  let list = currentCategoryFilter==='Todos' ? [...PRODUCTS] : PRODUCTS.filter(p=>p.category===currentCategoryFilter);
  if(currentSort==='lowprice') list.sort((a,b)=>a.price-b.price);
  else if(currentSort==='highprice') list.sort((a,b)=>b.price-a.price);
  else list.sort((a,b)=>b.sold-a.sold);
  document.getElementById('categoryGrid').innerHTML = list.length ? list.map(productCardHTML).join('') : '<p style="grid-column:1/-1;text-align:center;color:var(--texto-suave);">Nenhum produto encontrado nesta categoria.</p>';
}

function handleSearch(e){
  if(e.key === 'Enter'){
    const term = document.getElementById('searchInput').value.trim();
    runSearch(term);
  }
}
function runSearch(term){
  const t = term.toLowerCase();
  const results = PRODUCTS.filter(p=>p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t));
  document.getElementById('searchSummary').textContent = term ? `${results.length} resultado(s) para "${term}"` : 'Digite algo na busca acima';
  document.getElementById('searchGrid').innerHTML = results.length ? results.map(productCardHTML).join('') : '<p style="grid-column:1/-1;text-align:center;color:var(--texto-suave);">Nenhum produto encontrado.</p>';
  showPage('search');
}

/* =====================================================
   PRODUCT MODAL
===================================================== */
function openProductModal(id){
  const p = PRODUCTS.find(x=>x.id===id);
  currentProduct = p;
  let qty = 1;
  const related = PRODUCTS.filter(x=>x.category===p.category && x.id!==p.id).slice(0,4);
  const relatedList = related.length ? related : PRODUCTS.filter(x=>x.id!==p.id).slice(0,4);

  document.getElementById('productModalBox').innerHTML = `
    <span class="modal-close" onclick="closeProductModal()"><i class="fa-solid fa-xmark"></i></span>
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="pd-main-img"><img id="pdMainImg" src="${p.img}" alt="${p.name}"></div>
        <div class="pd-thumbs">
          <img src="${p.img}" class="active" onclick="switchPdImg(this,'${p.img}')">
          <img src="${p.img2}" onclick="switchPdImg(this,'${p.img2}')">
          <img src="${p.img3}" onclick="switchPdImg(this,'${p.img3}')">
        </div>
      </div>
      <div class="pd-info">
        <div class="product-cat">${p.category}</div>
        <h2>${p.name}</h2>
        <div class="product-rating">${stars(p.rating)} <span>(${p.reviews} avaliações)</span></div>
        <div class="pd-price-block">
          <div class="price">${formatBRL(p.price)}</div>
          <div class="install">ou 6x de ${formatBRL(p.price/6)} sem juros</div>
        </div>
        <p class="pd-desc">${p.desc}</p>
        <div class="pd-specs">
          <div><b>Material</b>${p.material}</div>
          <div><b>Medidas</b>${p.measures}</div>
        </div>
        <a class="size-guide-link" onclick="closeProductModal();showPage('sizeguide')"><i class="fa-solid fa-ruler"></i> Consultar guia de medidas</a>
        <div class="pd-add-row">
          <div class="qty-box">
            <button onclick="pdChangeQty(-1)">−</button>
            <span id="pdQty">1</span>
            <button onclick="pdChangeQty(1)">+</button>
          </div>
          <button class="btn btn-primary" style="flex:1;" onclick="addFromModal()"><i class="fa-solid fa-bag-shopping"></i> Adicionar ao Carrinho</button>
        </div>
        <div style="font-size:12.5px;color:var(--texto-suave);"><i class="fa-solid fa-rotate-left"></i> Troca grátis em 60 dias &nbsp; · &nbsp; <i class="fa-solid fa-gift"></i> Caixa de presente inclusa</div>
      </div>
    </div>
    <div class="related-title">Você também pode gostar</div>
    <div class="related-row">
      ${relatedList.map(r=>`
        <div class="related-card" onclick="openProductModal(${r.id})">
          <img src="${r.img}" alt="${r.name}">
          <b>${r.name}</b>
          <span>${formatBRL(r.price)}</span>
        </div>`).join('')}
    </div>
  `;
  window._pdQty = 1;
  document.getElementById('productModalOverlay').classList.add('show');
}
function switchPdImg(el, src){
  document.getElementById('pdMainImg').src = src;
  document.querySelectorAll('.pd-thumbs img').forEach(i=>i.classList.remove('active'));
  el.classList.add('active');
}
function pdChangeQty(delta){
  window._pdQty = Math.max(1, (window._pdQty||1) + delta);
  document.getElementById('pdQty').textContent = window._pdQty;
}
function addFromModal(){
  addToCart(currentProduct.id, window._pdQty||1);
  closeProductModal();
}
function closeProductModal(){ document.getElementById('productModalOverlay').classList.remove('show'); }

/* =====================================================
   CART
===================================================== */
function addToCart(id, qty){
  const existing = cart.find(i=>i.id===id);
  if(existing) existing.qty += qty;
  else cart.push({id, qty});
  saveCart();
  const p = PRODUCTS.find(x=>x.id===id);
  showToast(`${p.name} adicionado ao carrinho!`);
  renderCartItems();
}
function removeFromCart(id){
  cart = cart.filter(i=>i.id!==id);
  saveCart();
  renderCartItems();
}
function changeQty(id, delta){
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty<=0){ removeFromCart(id); return; }
  saveCart();
  renderCartItems();
}
function cartSubtotal(){
  return cart.reduce((sum,item)=>{
    const p = PRODUCTS.find(x=>x.id===item.id);
    return sum + (p ? p.price*item.qty : 0);
  },0);
}
function cartTotalWithDiscount(){
  const sub = cartSubtotal();
  if(appliedCoupon) return sub * (1-appliedCoupon.pct);
  return sub;
}
function updateCartCount(){
  const count = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cartCount').textContent = count;
}
function renderCartItems(){
  const list = document.getElementById('cartItemsList');
  if(cart.length===0){
    list.innerHTML = `<div class="empty-cart"><i class="fa-solid fa-bag-shopping"></i><p>Seu carrinho está vazio.<br>Que tal dar uma olhada nas novidades?</p></div>`;
    document.getElementById('cartTotal').textContent = formatBRL(0);
    return;
  }
  list.innerHTML = cart.map(item=>{
    const p = PRODUCTS.find(x=>x.id===item.id);
    if(!p) return '';
    return `
    <div class="cart-item">
      <img src="${p.img}" alt="${p.name}">
      <div class="cart-item-info">
        <b>${p.name}</b>
        <span class="cat">${p.category}</span>
        <div class="qty-control">
          <button onclick="changeQty(${p.id},-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${p.id},1)">+</button>
        </div>
      </div>
      <div class="cart-item-right">
        <b>${formatBRL(p.price*item.qty)}</b>
        <a class="remove-item" onclick="removeFromCart(${p.id})">Remover</a>
      </div>
    </div>`;
  }).join('');
  document.getElementById('cartTotal').textContent = formatBRL(cartTotalWithDiscount());
}
function applyCoupon(){
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  const msg = document.getElementById('couponMsg');
  if(!code){ msg.textContent=''; return; }
  if(COUPONS[code]){
    appliedCoupon = {code, pct: COUPONS[code]};
    localStorage.setItem('vienna_coupon', JSON.stringify(appliedCoupon));
    msg.textContent = `Cupom ${code} aplicado! ${COUPONS[code]*100}% de desconto.`;
    msg.className = 'coupon-msg ok';
  } else {
    msg.textContent = 'Cupom inválido.';
    msg.className = 'coupon-msg err';
  }
  renderCartItems();
}
function openCart(){
  renderCartItems();
  document.getElementById('cartOverlay').classList.add('show');
  document.getElementById('cartDrawer').classList.add('open');
}
function closeCart(){ 
  document.getElementById('cartOverlay').classList.remove('show');
  document.getElementById('cartDrawer').classList.remove('open');
}
function goToCheckout(){
  if(cart.length===0){ showToast('Seu carrinho está vazio.'); return; }
  closeCart();
  renderCheckoutSummary();
  showPage('checkout');
}

/* =====================================================
   CHECKOUT
===================================================== */
function renderCheckoutSummary(){
  const box = document.getElementById('checkoutSummaryItems');
  box.innerHTML = cart.map(item=>{
    const p = PRODUCTS.find(x=>x.id===item.id);
    return `<div class="summary-item"><img src="${p.img}"><span class="name">${p.name} x${item.qty}</span><span class="price">${formatBRL(p.price*item.qty)}</span></div>`;
  }).join('');
  const sub = cartSubtotal();
  let discount = appliedCoupon ? sub*appliedCoupon.pct : 0;
  if(selectedPayMethod==='pix') discount += (sub-discount)*0.05;
  const total = sub - discount;
  document.getElementById('ckSubtotal').textContent = formatBRL(sub);
  document.getElementById('ckDiscount').textContent = '- ' + formatBRL(discount);
  document.getElementById('ckTotal').textContent = formatBRL(total);
  populateInstallments(total);
}
function selectPay(method){
  selectedPayMethod = method;
  document.querySelectorAll('.pay-opt').forEach(el=>el.classList.remove('active'));
  document.querySelector(`.pay-opt[data-pay="${method}"]`).classList.add('active');
  document.getElementById('creditInstallmentRow').style.display = method==='credit' ? 'block' : 'none';
  renderCheckoutSummary();
}
function populateInstallments(total){
  const sel = document.getElementById('ckInstallments');
  let opts = '';
  for(let i=1;i<=12;i++){
    opts += `<option value="${i}">${i}x de ${formatBRL(total/i)} sem juros</option>`;
  }
  sel.innerHTML = opts;
}

async function buscarCep(){
  const cepInput = document.getElementById('ckCep');
  const cep = cepInput.value.replace(/\D/g,'');
  if(cep.length!==8) return;
  try{
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    if(data.erro){ showToast('CEP não encontrado.'); return; }
    document.getElementById('ckStreet').value = data.logradouro || '';
    document.getElementById('ckNeighborhood').value = data.bairro || '';
    document.getElementById('ckCity').value = data.localidade || '';
    document.getElementById('ckState').value = data.uf || '';
    showToast('Endereço preenchido automaticamente!');
  }catch(err){
    showToast('Não foi possível buscar o CEP agora.');
  }
}

function submitCheckout(e){
  e.preventDefault();
  const requiredFields = ['ckName','ckEmail','ckPhone','ckCpf','ckCep','ckCity','ckStreet','ckNumber','ckNeighborhood','ckState'];
  let valid = true;
  requiredFields.forEach(id=>{
    const el = document.getElementById(id);
    if(!el.value.trim()){ valid=false; el.style.borderColor='var(--erro)'; }
    else el.style.borderColor='var(--marrom-claro)';
  });
  const emailEl = document.getElementById('ckEmail');
  if(emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)){ valid=false; emailEl.style.borderColor='var(--erro)'; }
  if(!valid){ showToast('Preencha todos os campos obrigatórios corretamente.'); return false; }

  // Monta a mensagem para o WhatsApp
  let mensagem = "🛒 *Novo Pedido - Vienna Semijoias*%0A%0A";
  mensagem += "📋 *Itens do Pedido:*%0A";
  
  let total = 0;
  cart.forEach(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if(p) {
      const subtotal = p.price * item.qty;
      total += subtotal;
      mensagem += `• ${p.name} x${item.qty} - ${formatBRL(subtotal)}%0A`;
    }
  });
  
  // Aplica desconto se houver cupom
  let desconto = 0;
  if(appliedCoupon) {
    desconto = total * appliedCoupon.pct;
    mensagem += `%0A💸 *Cupom aplicado:* ${appliedCoupon.code} (${appliedCoupon.pct*100}% OFF)%0A`;
    mensagem += `💰 *Desconto:* -${formatBRL(desconto)}%0A`;
  }
  
  // Desconto PIX
  if(selectedPayMethod === 'pix') {
    const descontoPix = (total - desconto) * 0.05;
    desconto += descontoPix;
    mensagem += `💳 *Pagamento:* PIX (5% OFF)%0A`;
  } else if(selectedPayMethod === 'debit') {
    mensagem += `💳 *Pagamento:* Débito%0A`;
  } else if(selectedPayMethod === 'credit') {
    const parcelas = document.getElementById('ckInstallments').value;
    mensagem += `💳 *Pagamento:* Crédito em ${parcelas}x%0A`;
  }
  
  const totalFinal = total - desconto;
  mensagem += `%0A📦 *Total do Pedido:* ${formatBRL(totalFinal)}%0A%0A`;
  
  // Dados do cliente
  const nome = document.getElementById('ckName').value;
  const telefone = document.getElementById('ckPhone').value;
  const email = document.getElementById('ckEmail').value;
  
  mensagem += `👤 *Dados do Cliente:*%0A`;
  mensagem += `Nome: ${nome}%0A`;
  mensagem += `Telefone: ${telefone}%0A`;
  mensagem += `Email: ${email}%0A%0A`;
  
  mensagem += "✅ *Aguardando confirmação do pedido!*";

  // Redireciona para o WhatsApp
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagem}`;
  window.open(url, '_blank');

  // Limpa o carrinho
  cart = [];
  appliedCoupon = null;
  localStorage.removeItem('vienna_coupon');
  saveCart();
  document.getElementById('checkoutForm').reset();
  
  showToast('Pedido enviado para o WhatsApp!');
  setTimeout(() => { goHome(); }, 2000);
  return false;
}

/* =====================================================
   NEWSLETTER / POPUP (removido)
===================================================== */
function subscribeNewsletter(e, source){
  e.preventDefault();
  showToast('Cupom VIENNA10 enviado para seu email! Use no carrinho.');
  return false;
}

/* =====================================================
   INIT
===================================================== */
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){
    closeCart(); closeProductModal(); toggleMobileNav(false);
  }
});

renderBestsellers();
renderFilterBar();
renderCategoryGrid();
updateCartCount();
