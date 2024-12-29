// script.js

document.getElementById('add-magnet').addEventListener('click', function() {
    const magnet = document.getElementById('magnet-input').value;
    if (magnet) {
        addTorrent(magnet);
        document.getElementById('magnet-input').value = '';
    }
});

document.getElementById('torrent-file').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file && file.type === 'application/x-bittorrent') {
        addTorrent(file);
        event.target.value = '';
    } else {
        alert('Please select a valid .torrent file.');
    }
});

function addTorrent(source) {
    const client = new WebTorrent();
    const torrentsElement = document.getElementById('torrents');

    const torrent = client.add(source, (err, torrent) => {
        if (err) {
            console.error(err);
            return;
        }

        const li = document.createElement('li');
        li.textContent = `Downloading: ${torrent.name}`;

        const progressBar = document.createElement('div');
        progressBar.className = 'progress';
        const progressbarElement = document.createElement('div');
        progressbarElement.className = 'progress-bar';
        progressBar.appendChild(progressBarElement);
        li.appendChild(progressBar);

        torrentsElement.appendChild(li);

        torrent.on('download', () => {
            const percent = (torrent.downloaded / torrent.length) * 100;
            progressbarElement.style.width = `${percent.toFixed(2)}%`;
        });

        torrent.on('done', () => {
            li.textContent = `Completed: ${torrent.name}`;
        });
    });
}