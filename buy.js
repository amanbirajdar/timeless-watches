const INR = n => '₹' + Number(n).toLocaleString('en-IN');
let cart = JSON.parse(localStorage.getItem('tw_cart') || '[]');
const session = JSON.parse(localStorage.getItem('tw_session') || sessionStorage.getItem('tw_session') || 'null');
const $ = id => document.getElementById(id);
function renderOrder() {
  if (!cart.length) { $('checkoutContent').style.display='none'; $('empty').style.display='block'; return; }
  const subtotal = cart.reduce((sum,item) => sum + item.price * item.qty, 0);
  $('orderItems').innerHTML = cart.map(item => '<div class="summary-item"><img class="summary-img" src="'+item.img+'" alt="'+item.name+'"><div><div class="summary-name">'+item.name+'</div><div class="summary-meta">'+item.brand+' · Qty '+item.qty+'</div></div><span class="summary-price">'+INR(item.price * item.qty)+'</span></div>').join('');
  $('subtotal').textContent = INR(subtotal); $('shipping').textContent = subtotal >= 10000 ? 'FREE' : INR(299); $('grandTotal').textContent = INR(subtotal >= 10000 ? subtotal : subtotal + 299);
  if (session && session.loggedIn) { $('firstName').value=session.name || ''; $('lastName').value=session.lastName || ''; $('email').value=session.email || ''; $('phone').value=session.phone || ''; }
}
$('checkoutForm').addEventListener('submit', event => {
  event.preventDefault(); const form=event.currentTarget; const error=$('formError');
  if (!form.checkValidity()) { form.classList.add('was-validated'); error.textContent='Please complete all required delivery details.'; error.style.display='block'; return; }
  const order = { id:'TW-' + Date.now().toString().slice(-8), items:cart, customer:{firstName:$('firstName').value.trim(),lastName:$('lastName').value.trim(),email:$('email').value.trim(),phone:$('phone').value.trim(),address:$('address').value.trim(),city:$('city').value.trim(),state:$('state').value,pin:$('pin').value.trim()}, payment:document.querySelector('input[name="payment"]:checked').value, total:$('grandTotal').textContent, createdAt:new Date().toISOString() };
  const orders=JSON.parse(localStorage.getItem('tw_orders') || '[]'); orders.push(order); localStorage.setItem('tw_orders',JSON.stringify(orders)); localStorage.removeItem('tw_cart'); cart=[];
  $('checkoutContent').style.display='none'; $('success').classList.add('show'); $('successText').textContent='Order '+order.id+' was placed for '+order.total+'. A confirmation has been saved in this browser.';
});
renderOrder();
