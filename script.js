// PIN Security & Virtual Gift
if (!sessionStorage.getItem('isUnlocked')) {
  document.documentElement.style.overflow = 'hidden';
  const overlay = document.createElement('div');
  overlay.id = 'pinOverlay';
  overlay.innerHTML = `
    <style>
      #pinOverlay {
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(15, 17, 21, 0.98); backdrop-filter: blur(15px);
        z-index: 999999; display: flex; flex-direction: column;
        justify-content: center; align-items: center; color: white;
        font-family: 'Poppins', sans-serif;
      }
      .pin-dots { display: flex; gap: 25px; margin: 30px 0 60px; }
      .dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid white; transition: 0.2s ease; }
      .dot.filled { background: white; transform: scale(1.2); }
      .keypad { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px 30px; }
      .key { width: 80px; height: 80px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); 
             background: rgba(255,255,255,0.03); color: white; font-size: 36px; font-weight: 300;
             display: flex; justify-content: center; align-items: center; cursor: pointer; transition: 0.1s;
             user-select: none; }
      .key:active { background: rgba(255,255,255,0.2); transform: scale(0.9); }
      .key.empty { border: none; background: transparent; cursor: default; }
      .key.del { font-size: 20px; font-weight: 500; border: none; background: transparent; letter-spacing: 1px;}
      
      #giftScreen { display: none; text-align: center; animation: fadeIn 1s forwards; }
      .gift-box { font-size: 130px; cursor: pointer; animation: bounce 2s infinite; margin: 40px; transition: 0.3s; filter: drop-shadow(0 0 20px rgba(255,255,255,0.3)); }
      .gift-box:hover { transform: scale(1.15) rotate(5deg); }
      
      #bouquetScreen { display: none; text-align: center; animation: fadeIn 1s forwards; }
      .bouquet { font-size: 180px; margin: 30px; animation: popUp 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); filter: drop-shadow(0 0 30px rgba(255,105,180,0.5)); }
      .enter-btn { margin-top: 40px; padding: 18px 50px; border-radius: 40px; border: none; 
                   background: linear-gradient(135deg, #ff4d4d, #ff758c); color: white; font-size: 22px; font-family: 'Dancing Script', cursive; cursor: pointer; 
                   transition: 0.3s; box-shadow: 0 10px 30px rgba(255, 77, 77, 0.4); }
      .enter-btn:hover { transform: scale(1.05) translateY(-3px); box-shadow: 0 15px 40px rgba(255, 77, 77, 0.6); }

      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes bounce { 0%, 20%, 50%, 80%, 100% {transform: translateY(0);} 40% {transform: translateY(-30px);} 60% {transform: translateY(-15px);} }
      @keyframes popUp { from { transform: scale(0) rotate(-20deg) translateY(50px); opacity: 0; } to { transform: scale(1) rotate(0) translateY(0); opacity: 1; } }
      @keyframes shake { 0%, 100% {transform: translateX(0);} 25% {transform: translateX(-15px);} 75% {transform: translateX(15px);} }
    </style>

    <!-- PIN Screen -->
    <div id="pinScreen" style="display:flex; flex-direction:column; align-items:center;">
      <p style="font-size: 16px; letter-spacing: 2px; color: #aaa; margin-top: 20px;">Masukkan PIN</p>
      <h2 style="font-family: 'Dancing Script', cursive; font-size: 38px; margin-top: 5px;">Our Love Story ?</h2>
      
      <div class="pin-dots">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div><div class="dot"></div>
      </div>
      <p id="pinMsg" style="color: #ff4d4d; font-size: 15px; opacity: 0; margin-top: -30px; margin-bottom: 30px; transition: 0.3s;">PIN salah. Ingat hari jadian kita ya sayang ??</p>

      <div class="keypad">
        <div class="key">1</div><div class="key">2</div><div class="key">3</div>
        <div class="key">4</div><div class="key">5</div><div class="key">6</div>
        <div class="key">7</div><div class="key">8</div><div class="key">9</div>
        <div class="key empty"></div><div class="key">0</div><div class="key del">DEL</div>
      </div>
    </div>

    <!-- Gift Screen -->
    <div id="giftScreen">
      <h2 style="font-family: 'Dancing Script', cursive; font-size: 45px; color: #ffb3b3;">PIN Benar! ??</h2>
      <p style="font-size: 18px; color: #eee; margin-top: 10px;">Ada hadiah kecil buat kamu...</p>
      <div class="gift-box" id="giftBox">??</div>
      <p style="color: #aaa; font-size: 14px; margin-top: -10px;">(Tap kadonya)</p>
    </div>

    <!-- Bouquet Screen -->
    <div id="bouquetScreen">
      <h2 style="font-family: 'Dancing Script', cursive; font-size: 48px; color: #ff758c;">Virtual Bouquet For You ??</h2>
      <div class="bouquet">??</div>
      <p style="font-size: 18px; color: #fff; max-width: 80%; line-height: 1.6; margin: 0 auto;">Bunga virtual ini ngga akan pernah layu, sama kayak sayang aku ke kamu. Selamat Anniversary ya, cintaku! ??</p>
      <button class="enter-btn" id="enterBtn">Buka Website</button>
    </div>
  `;
  document.documentElement.appendChild(overlay);

  // Logic
  let enteredPin = "";
  const correctPin = "0711";
  const dots = document.querySelectorAll('.dot');
  const msg = document.getElementById('pinMsg');
  const pinScreen = document.getElementById('pinScreen');
  const giftScreen = document.getElementById('giftScreen');
  const bouquetScreen = document.getElementById('bouquetScreen');
  
  function updateDots() {
    dots.forEach((dot, index) => {
      if (index < enteredPin.length) dot.classList.add('filled');
      else dot.classList.remove('filled');
    });
  }

  document.querySelectorAll('.key').forEach(key => {
    key.addEventListener('click', () => {
      if (key.classList.contains('empty')) return;
      
      if (key.classList.contains('del')) {
        enteredPin = enteredPin.slice(0, -1);
      } else {
        if (enteredPin.length < 4) {
          enteredPin += key.innerText;
        }
      }
      updateDots();
      msg.style.opacity = '0';

      if (enteredPin.length === 4) {
        if (enteredPin === correctPin) {
          // Success
          setTimeout(() => {
            pinScreen.style.display = 'none';
            giftScreen.style.display = 'block';
          }, 400);
        } else {
          // Failed
          msg.style.opacity = '1';
          pinScreen.style.animation = 'shake 0.4s';
          setTimeout(() => {
            pinScreen.style.animation = '';
            enteredPin = "";
            updateDots();
          }, 500);
        }
      }
    });
  });

  document.getElementById('giftBox').addEventListener('click', () => {
    giftScreen.style.display = 'none';
    bouquetScreen.style.display = 'block';
  });

  document.getElementById('enterBtn').addEventListener('click', () => {
    sessionStorage.setItem('isUnlocked', 'true');
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.8s ease';
    setTimeout(() => {
      overlay.remove();
      document.documentElement.style.overflow = 'auto';
    }, 800);
  });
}

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const glow = $('.cursor-glow');
document.addEventListener('mousemove', (event) => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
});

const musicBtn = $('#musicBtn');
musicBtn?.addEventListener('click', () => {
  musicBtn.classList.toggle('playing');
  musicBtn.textContent = musicBtn.classList.contains('playing') ? '♫' : '♪';
});

const birthdayDate = new Date('2027-05-24T00:00:00').getTime();
function updateCountdown() {
  const countdown = $('#countdown');
  if (!countdown) return;

  const difference = Math.max(birthdayDate - Date.now(), 0);
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  const seconds = Math.floor((difference % 60000) / 1000);

  $('#days').textContent = String(days).padStart(2, '0');
  $('#hours').textContent = String(hours).padStart(2, '0');
  $('#mins').textContent = String(minutes).padStart(2, '0');
  $('#secs').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

const reasons = [
  "When you pout, you look like an angry little duck ??",
  "Hobby: Testing my patience but I still miss you ??",
  "Your laugh is so contagious I can't help but join in ??",
  "The most random person on earth, but you are my favorite ??",
  "You snore louder than a tractor but I still love you ??",
  "More talkative than a radio host when you are excited ???",
  "The absolute best at making me blush out of nowhere ??",
  "Pretends not to care but is actually the softest softie ??",
  "Extremely clingy when you miss me and I love it ??",
  "Turns into a fierce dinosaur when hungry ??",
  "Can literally fall asleep anywhere, anytime ??",
  "Your smile is so sweet it might give me diabetes ??",
  "So weird sometimes but you are my weirdo ??",
  "Replies to texts like you live in a different time zone ??",
  "The fiercest tamer of my heart ??",
  "Always looking for a playful fight ??",
  "Cannot sit still for even a minute ??",
  "Oscar winner for best dramatic performance ??",
  "Gets jealous so easily but it is so cute ??",
  "Your random behavior is truly out of this world ??",
  "My favorite annoying person in the entire universe ??",
  "Professional 2 AM overthinker ??",
  "Always forgets where you put your own stuff ???",
  "You look so funny when you try to be serious ??",
  "The master of making excuses when caught ??",
  "Cries like a baby when watching sad movies ??",
  "Always gets ice cream all over your face ??",
  "Acts cool when complimented but is actually so happy ??",
  "When you pout, you look like an angry little duck ??",
  "Hobby: Testing my patience but I still miss you ??",
  "Your laugh is so contagious I can't help but join in ??",
  "The most random person on earth, but you are my favorite ??",
  "You snore louder than a tractor but I still love you ??",
  "More talkative than a radio host when you are excited ???",
  "The absolute best at making me blush out of nowhere ??",
  "Pretends not to care but is actually the softest softie ??",
  "Extremely clingy when you miss me and I love it ??",
  "Turns into a fierce dinosaur when hungry ??",
  "Can literally fall asleep anywhere, anytime ??",
  "Your smile is so sweet it might give me diabetes ??",
  "So weird sometimes but you are my weirdo ??",
  "Replies to texts like you live in a different time zone ??",
  "The fiercest tamer of my heart ??",
  "Always looking for a playful fight ??",
  "Cannot sit still for even a minute ??",
  "Oscar winner for best dramatic performance ??",
  "Gets jealous so easily but it is so cute ??",
  "Your random behavior is truly out of this world ??",
  "My favorite annoying person in the entire universe ??",
  "Professional 2 AM overthinker ??",
  "Always forgets where you put your own stuff ???",
  "You look so funny when you try to be serious ??",
  "The master of making excuses when caught ??",
  "Cries like a baby when watching sad movies ??",
  "Always gets ice cream all over your face ??",
  "Acts cool when complimented but is actually so happy ??",
  "When you pout, you look like an angry little duck ??",
  "Hobby: Testing my patience but I still miss you ??",
  "Your laugh is so contagious I can't help but join in ??",
  "The most random person on earth, but you are my favorite ??",
  "You snore louder than a tractor but I still love you ??",
  "More talkative than a radio host when you are excited ???",
  "The absolute best at making me blush out of nowhere ??",
  "Pretends not to care but is actually the softest softie ??",
  "Extremely clingy when you miss me and I love it ??",
  "Turns into a fierce dinosaur when hungry ??",
  "Can literally fall asleep anywhere, anytime ??",
  "Your smile is so sweet it might give me diabetes ??",
  "So weird sometimes but you are my weirdo ??",
  "Replies to texts like you live in a different time zone ??",
  "The fiercest tamer of my heart ??",
  "Always looking for a playful fight ??",
  "Cannot sit still for even a minute ??",
  "Oscar winner for best dramatic performance ??",
  "Gets jealous so easily but it is so cute ??",
  "Your random behavior is truly out of this world ??",
  "My favorite annoying person in the entire universe ??",
  "Professional 2 AM overthinker ??",
  "Always forgets where you put your own stuff ???",
  "You look so funny when you try to be serious ??",
  "The master of making excuses when caught ??",
  "Cries like a baby when watching sad movies ??",
  "Always gets ice cream all over your face ??",
  "Acts cool when complimented but is actually so happy ??",
  "When you pout, you look like an angry little duck ??",
  "Hobby: Testing my patience but I still miss you ??",
  "Your laugh is so contagious I can't help but join in ??",
  "The most random person on earth, but you are my favorite ??",
  "You snore louder than a tractor but I still love you ??",
  "More talkative than a radio host when you are excited ???",
  "The absolute best at making me blush out of nowhere ??",
  "Pretends not to care but is actually the softest softie ??",
  "Extremely clingy when you miss me and I love it ??",
  "Turns into a fierce dinosaur when hungry ??",
  "Can literally fall asleep anywhere, anytime ??",
  "Your smile is so sweet it might give me diabetes ??",
  "So weird sometimes but you are my weirdo ??",
  "Replies to texts like you live in a different time zone ??",
  "The fiercest tamer of my heart ??",
  "Always looking for a playful fight ??",
];

const reasonGrid = $('#reasonGrid');
if (reasonGrid) {
  const imageFolder = reasonGrid.dataset.imageFolder || 'assets';
  const reasonImages = Array.from({ length: 50 }, (_, index) => `${imageFolder}/${index + 1}.jpg`);

  reasonGrid.innerHTML = reasons.slice(0, 50)
    .map((reason, index) => {
      const image = reasonImages[index % reasonImages.length];
      let cardHTML = `
      <article class="reason-card reveal" tabindex="0">
        <div class="reason-inner">
          <div class="reason-front">
            <h3>${index + 1}</h3>
            <p>tap to open 🤍</p>
          </div>
          <div class="reason-back" style="background-image: url('${image}'); background-size: cover; background-position: center;">
          </div>
        </div>
      </article>`;
      
      if (index === 49) {
          cardHTML += `
          <article class="reason-card reveal" style="grid-column: 1 / -1; grid-row: span 2; display: flex; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.25); position: relative; z-index: 10; min-height: 550px; margin: 30px 0;">
            <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0;">
              <source src="assets/vidio_baru.mp4" type="video/mp4">
            </video>
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 50px 15px 25px; text-align: center; color: white; font-family: 'Dancing Script', cursive; font-size: 42px; z-index: 2;">
              Our Romantic Memories 💕
            </div>
          </article>`;
      }
      return cardHTML;
    })
    .join('');
}

$('#randomReasonBtn')?.addEventListener('click', () => {
  $('#randomReason').textContent = reasons[Math.floor(Math.random() * reasons.length)];
});

const envelope = $('#envelope');
const letterText = `Hai Miwmiw sayang...
Jujur, ketemu sama kamu itu hal paling indah yang pernah terjadi di hidupku. Cuma dengan ada di dekatmu, atau sekadar liat kamu senyum aja, duniaku rasanya jadi jauh lebih tenang dan bahagia.
Di hari anniversary kita yang ke-2 ini, aku cuma mau kamu tau kalau aku sayang banget sama kamu. Bukan cuma hari ini aja, tapi setiap detik, setiap hari. Dua tahun bareng kamu rasanya luar biasa banget, dan aku selalu bersyukur kamu yang nemenin hari-hariku.
Harapanku buat kita... semoga kita selalu bisa sama-sama terus, saling ngerti, dan nggak pernah capek buat saling jatuh cinta lagi dan lagi. Semoga ke depannya kita selalu nemuin banyak kebahagiaan, pagi yang tenang, dan momen-momen kecil yang bikin kita senyum berdua.
Selamat Anniversary yang ke-2 ya, sayang. Kamu itu bener-bener keajaiban buat aku, dan kamu pantes dapet semua cinta di dunia ini di setiap langkah cerita kita nanti. I Love You so much 🫶`;
let hasTypedLetter = false;

envelope?.addEventListener('click', () => {
  envelope.classList.add('open');
  if (hasTypedLetter) return;

  hasTypedLetter = true;
  let index = 0;
  const typedLetter = $('#typedLetter');
  const typing = setInterval(() => {
    typedLetter.textContent += letterText[index] || '';
    index += 1;
    if (index > letterText.length) clearInterval(typing);
  }, 35);
});

const cake = $('#birthdayCake') || $('.cake');
const cutCakeBtn = $('.cut-cake-btn');
const cakeStageText = $('#cakeStageText');
let cakeAnimationStarted = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

cutCakeBtn?.addEventListener('click', async () => {
  if (!cake || cakeAnimationStarted) return;

  cakeAnimationStarted = true;
  cutCakeBtn.disabled = true;

  cakeStageText.textContent = 'blowing the candles... 🌬️';
  cutCakeBtn.textContent = 'Blowing Candles...';
  cake.classList.add('blow');
  await wait(1500);

  cakeStageText.textContent = ' cake is cutting 🔪';
  cutCakeBtn.textContent = '';
  cake.classList.add('knife-in');
  await wait(1200);

  cakeStageText.textContent = ' into a slice... 🍰';
  cutCakeBtn.textContent = 'Cutting Slice...';
  cake.classList.add('sliced');
  await wait(900);

  cakeStageText.textContent = 'first slice for my Miwmiw 🎉';
  cutCakeBtn.textContent = 'Cake Cut 🎉';

  if (typeof confetti === 'function') {
    confetti({ particleCount: 280, spread: 115, origin: { y: 0.62 } });
  }
});


// Funny sound on reason click
const funnySound = new Audio('https://www.myinstants.com/media/sounds/squeak.mp3');
document.addEventListener('click', (e) => {
  if (e.target.closest('.reason-card')) {
    funnySound.currentTime = 0;
    funnySound.play().catch(e => console.log('Audio play failed', e));
  }
});


// Funny & Romantic Click Burst Effect
const burstEmojis = ['??', '??', '??', '??', '??', '??', '??', '??', '?'];
document.addEventListener('click', (e) => {
  // Don't burst on the PIN screen input to avoid blocking the view
  if (e.target.id === 'pinInput') return;
  
  for (let i = 0; i < 6; i++) {
    const emoji = document.createElement('div');
    emoji.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
    emoji.style.position = 'fixed';
    emoji.style.left = (e.clientX - 15) + 'px';
    emoji.style.top = (e.clientY - 15) + 'px';
    emoji.style.fontSize = Math.random() * 15 + 20 + 'px';
    emoji.style.pointerEvents = 'none';
    emoji.style.zIndex = '9999999';
    emoji.style.transition = 'all 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    
    document.body.appendChild(emoji);
    
    // Spread animation
    setTimeout(() => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 40 + Math.random() * 80;
      emoji.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) rotate(${Math.random() * 360}deg) scale(0.3)`;
      emoji.style.opacity = '0';
    }, 10);
    
    setTimeout(() => emoji.remove(), 800);
  }
});
