document.querySelector('#form').addEventListener('submit', (e) => {
    e.preventDefault();

const form = document.querySelector('#form');
const urlInput = document.querySelector('#url');
const backgroundColorInput = document.querySelector('#backgroundColor');
const textColorInput = document.querySelector('#textColor');
const textArea = document.querySelector('#text');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const url = urlInput.value;
    const backgroundColor = backgroundColorInput.value;
    const textColor = textColorInput.value;
    const text = textArea.value;
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = url;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.font = '24px Arial';
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`Screenshot taken at ${new Date().getTime()}`, canvas.width / 2, canvas.height / 2);
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.setAttribute('download', `screenshot_${new Date().getTime()}.png`);
    link.click();
});

