let currentVideoID = null;
let videos = {};

// Selectors
let videoPlayer = document.querySelector('#video-player');
let videoUrl = document.querySelector('#video-url');
let watchButton = document.querySelector('#watch-button');

let noteInput = document.querySelector('#note');
let saveButton = document.querySelector('#save-button');
let notesList = document.querySelector('#notes-list');
let noNotesText = document.querySelector('#no-notes-text');
let timestampInput = document.querySelector('#timestamp');

// Extract video ID
function extractVideoID(url) {
    return url.split('v=')[1]?.substring(0, 11);
}

// Load video
watchButton.addEventListener('click', function () {
    let url = videoUrl.value;
    if (!url) return;

    let videoID = extractVideoID(url);
    if (!videoID) return;

    currentVideoID = videoID;

    videoPlayer.src = `https://www.youtube.com/embed/${videoID}`;
    videoPlayer.classList.remove('h-0');
    videoPlayer.classList.add('h-[200px]', 'md:h-[400px]', 'w-full');

    if (!videos[videoID]) {
        videos[videoID] = [];
    }

    renderNotes();
});

// Save note with timestamp
saveButton.addEventListener('click', function () {
    if (!currentVideoID) return;

    let note = noteInput.value;
    let time = timestampInput.value;

    if (note === '' || time === '') return;

    videos[currentVideoID].push({
        text: note,
        time: time
    });

    noteInput.value = '';
    timestampInput.value = '';

    renderNotes();
});

// Render notes
function renderNotes() {
    notesList.innerHTML = '';

    if (videos[currentVideoID].length === 0) {
        noNotesText.style.display = 'block';
        return;
    }

    noNotesText.style.display = 'none';

    videos[currentVideoID].forEach(function (item) {
        let li = document.createElement('li');
        li.textContent = `[${item.time}s] ${item.text}`;

// ✅ Сканди-стиль — ВНУТРИ
        li.classList.add(
            'bg-stone-50',
            'border-l-4',
            'border-emerald-600',
            'pl-4',
            'p-2',
            'mt-2',
            'cursor-pointer'
        );

        li.addEventListener('click', function () {
            videoPlayer.src =
                `https://www.youtube.com/embed/${currentVideoID}?start=${item.time}`;
        });

        notesList.appendChild(li);
    });
}
