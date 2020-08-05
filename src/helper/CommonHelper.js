/* eslint-disable import/prefer-default-export */
const copyToClipboard = (text) => {
  const Input = document.createElement('input');
  Input.setAttribute('type', 'text');
  Input.value = text;
  Input.style.position = 'absolute';
  Input.style.top = 0;
  Input.style.marginTop = '-100px';
  const app = document.getElementById('app');
  app.appendChild(Input);
  Input.select();
  Input.setSelectionRange(0, 99999);
  document.execCommand('copy');
  Input.remove();
};
export {
  copyToClipboard,
};
