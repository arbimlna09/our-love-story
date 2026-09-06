// PIN Security
if (!sessionStorage.getItem('isUnlocked')) {
  document.documentElement.style.overflow = 'hidden';
  const overlay = document.createElement('div');
  overlay.id = 'pinOverlay';
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
    background: #0f1115; z-index: 999999; display: flex;
    flex-direction: column; justify-content: center; align-items: center;
    color: white; font-family: 'Poppins', sans-serif;
  `;
  overlay.innerHTML = `
    <h2 style="margin-bottom: 20px; font-family: 'Cormorant Garamond', serif; font-size: 32px; letter-spacing: 1px;">Our Love Story ✨</h2>
    <p style="margin-bottom: 20px; color: #a9a9a9; font-size: 14px;">Masukkan PIN (Hari Jadian Kita)</p>
    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
      <input type="password" id="pinInput" maxlength="4" placeholder="••••" style="width: 140px; height: 50px; text-align: center; font-size: 28px; border-radius: 12px; border: 2px solid #333; background: #1a1c23; color: white; outline: none; letter-spacing: 15px; padding-left: 15px;">
    </div>
    <p id="pinError" style="color: #ff4d4d; font-size: 14px; opacity: 0; transition: opacity 0.3s;">PIN salah. Coba lagi ya sayang ❤️</p>
  `;
  document.documentElement.appendChild(overlay);

  const pinInput = document.getElementById('pinInput');
  pinInput.focus();
  pinInput.addEventListener('input', (e) => {
    if (pinInput.value === '0711') {
      sessionStorage.setItem('isUnlocked', 'true');
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        overlay.remove();
        document.documentElement.style.overflow = 'auto';
      }, 500);
    } else if (pinInput.value.length === 4) {
      document.getElementById('pinError').style.opacity = '1';
      setTimeout(() => { pinInput.value = ''; }, 600);
    } else {
      document.getElementById('pinError').style.opacity = '0';
    }
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
