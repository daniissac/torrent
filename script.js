// script.js
const client = new WebTorrent();
const torrentsSection = document.getElementById('torrents');

document.getElementById('add-magnet').addEventListener('click', () => {
    const magnetLink = document.getElementById('magnet-input').value;
    if (magnetLink) {
        addTorrent(magnetLink);
    }
});

document.getElementById('upload-torrent').addEventListener('change', (event) => {
    const file = event.target.files[0];
        if (file) {
        addTorrent(file);
    }
});

function addTorrent(input) {
    torrentsSection.innerHTML = ''; // Clear previous torrents

    client.add(input, (torrent) => {
        const torrentElement = document.createElement('div');
        torrentElement.className = 'torrent';
        torrentElement.innerHTML = `
            <h3>${torrent.name}</h3>
            <p>Downloading... ${Math.round(torrent.progress * 100)}%</p>
            <button id="download-btn-${torrent.infoHash}" onclick="downloadTorrent('${torrent.infoHash}')">Download</button>
        `;
        torrentsSection.appendChild(torrentElement);

        torrent.on('done', () => {
            const downloadBtn = document.getElementById(`download-btn-${torrent.infoHash}`);
            downloadBtn.textContent = 'Download Complete';
            downloadBtn.disabled = true;
        });
    });

    client.on('error', (err) => {
        console.error(err);
            const reader = new FileReader();
    });
}

function downloadTorrent(infoHash) {
    const torrent = client.get(infoHash);
    if (torrent) {
        torrent.files.forEach((file) => {
            file.appendTo('#torrents');
        });
    }
}
