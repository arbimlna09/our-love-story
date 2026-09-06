with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("glow.style.left = ${event.clientX}px;", "glow.style.left = `${event.clientX}px`;")
content = content.replace("glow.style.top = ${event.clientY}px;", "glow.style.top = `${event.clientY}px`;")
content = content.replace("emoji.style.transform = translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) rotate(${Math.random() * 360}deg) scale(0.3);", "emoji.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) rotate(${Math.random() * 360}deg) scale(0.3)`;")
content = content.replace("const reasonImages = Array.from({ length: 50 }, (_, index) => ${imageFolder}/${index + 1}.jpg);", "const reasonImages = Array.from({ length: 50 }, (_, index) => `${imageFolder}/${index + 1}.jpg`);")

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Backticks fixed!")
