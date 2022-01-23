const { app, BrowserWindow, ipcMain } = require('electron');
const { exec, spawn } = require('child_process');

const createWindow = () => {
	const win = new BrowserWindow({
		width          : 800,
		height         : 600,
		webPreferences : {
			preload : `${__dirname}/preload.js`
		}
	});

	win.loadFile('index.html');
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

let volume = 0;
let muted = false;

ipcMain.on('volume-set', (event, arg) => {
	if (!muted || arg != volume) {
		event.reply('volume-reply', String(arg));
	}
	volume = arg;
});

ipcMain.on('volume-up', (event, arg) => {
	if (muted) {
		unmuteVolume();
		muted = false;
	}
	if (volume < 100) {
		volume++;
		setVolume(volume);
	}
	event.reply('volume-reply', String(volume));
});

ipcMain.on('volume-down', (event, arg) => {
	if (muted) {
		unmuteVolume();
		muted = false;
	}
	if (volume > 0) {
		volume--;
		setVolume(volume);
	}
	event.reply('volume-reply', String(volume));
});

ipcMain.on('volume-mute', (event, arg) => {
	if (muted) {
		unmuteVolume();
		muted = false;
		event.reply('volume-reply', String(volume));
	} else {
		muteVolume();
		muted = true;
		event.reply('volume-reply', 'Muted');
	}
});

// pactl get/set volume commands

async function pactl (...args) {
	const res = await spawn('pactl', args);
	res.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	res.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	res.on('error', (error) => {
		console.log(`error: ${error.message}`);
	});

	res.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
}

async function setVolume (level) {
	if (level >= 0 || level <= 100)
		return await pactl('set-sink-volume', '0', `${level}%`);
}

async function muteVolume () {
	return await pactl('set-sink-mute', '0', '1');
}

async function unmuteVolume () {
	return await pactl('set-sink-mute', '0', '0');
}
