const { ipcRenderer } = require('electron');
const { exec } = require('child_process');

window.addEventListener('DOMContentLoaded', () => {
	const upButton = document.getElementById('volume-up');
	const downButton = document.getElementById('volume-down');
	const muteButton = document.getElementById('volume-mute');
	const currentVol = document.getElementById('current-volume');
	setupVol();

  ipcRenderer.on('volume-reply', (event, arg) => currentVol.textContent = `${arg}%`);

	upButton.addEventListener('click', () => {
    ipcRenderer.send('volume-up');
  });
  
  downButton.addEventListener('click', () => {
    ipcRenderer.send('volume-down');
  });

  muteButton.addEventListener('click', () => {
    ipcRenderer.send('volume-mute');
  });

  // track volume changes from system side
  setInterval(() => setupVol(), 300);
});

async function setupVol () {
	return await exec(
		`pactl list sinks | grep 'front-left:' | head -n 1`,
		(error, stdout, stderr) => {
			if (error) {
				console.log(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.log(`stderr: ${stderr}`);
				return;
			}
			console.log(`stdout: ${stdout}`);
			const systemVol = stdout.match(/(\d+)%/);
			if (systemVol) {
				ipcRenderer.send('volume-set', systemVol[1]);
			}
			console.log(`system volume: ${systemVol[1]}`);
		}
	);
}