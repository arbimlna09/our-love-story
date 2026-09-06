import re

with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace the HTML for giftScreen and bouquetScreen
new_html = """
    <!-- Welcome Screen -->
    <div id="welcomeScreen" style="display: none; text-align: center; animation: fadeIn 1s forwards;">
      <h2 style="font-family: 'Dancing Script', cursive; font-size: 55px; color: #ff758c; margin-bottom: 20px;">Happy 2nd Anniversary! \u2728</h2>
      <p style="font-size: 20px; color: #fff; max-width: 80%; line-height: 1.6; margin: 0 auto 40px auto;">
        Terima kasih sudah nemenin aku sejauh ini. Aku sayang banget sama kamu! \u2764\ufe0f
      </p>
      <button class="enter-btn" id="enterBtn">Buka Website</button>
    </div>
  `;
"""

pattern = re.compile(r'<!-- Gift Screen -->.*?(?=\n  `;\n  document\.documentElement\.appendChild)', re.DOTALL)
content = pattern.sub(new_html.strip(), content)

content = content.replace("Our Love Story ?", "Our Love Story \u2728")
content = content.replace("Ingat hari jadian kita ya sayang ??", "Ingat hari jadian kita ya sayang \u2764\ufe0f")
content = content.replace("<p>tap to open ??</p>", "<p>tap to open \U0001F446</p>")
content = content.replace("Our Romantic Memories ?", "Our Romantic Memories \u2728")

content = content.replace("const giftScreen = document.getElementById('giftScreen');", "")
content = content.replace("const bouquetScreen = document.getElementById('bouquetScreen');", "const welcomeScreen = document.getElementById('welcomeScreen');")
content = content.replace("giftScreen.style.display = 'block';", "welcomeScreen.style.display = 'block';")

gift_box_listener = """  document.getElementById('giftBox').addEventListener('click', () => {
    giftScreen.style.display = 'none';
    bouquetScreen.style.display = 'block';
  });"""
content = content.replace(gift_box_listener, "")

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Flow updated.")
