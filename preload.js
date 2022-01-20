const { ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
	const upButton = document.getElementById('volume-up');
	const downButton = document.getElementById('volume-down');
	const muteButton = document.getElementById('volume-mute');
	const currentVol = document.getElementById('current-volume');
  
  ipcRenderer.on('volume-reply', (event, arg) => currentVol.textContent = arg);

	upButton.addEventListener('click', () => {
    ipcRenderer.send('volume-up');
  });
  
  downButton.addEventListener('click', () => {
    ipcRenderer.send('volume-down');
  });

  muteButton.addEventListener('click', () => {
    ipcRenderer.send('volume-mute');
  })
});