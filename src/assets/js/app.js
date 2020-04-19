function addVideo(event) {
    // Get Elements
    const videos = document.querySelector('#videos');
    const template = document.querySelector('#template-video');

    // Clone video input template
    const newVideoInner = template.content.cloneNode(true);

    // Create video input element
    const newVideo = document.createElement('video-input');
    newVideo.classList.add('grid', 'grid-cols-12');
    newVideo.appendChild(newVideoInner);

    // Add the video input to our list
    videos.appendChild(newVideo);

    // Focus in the input
    newVideo.querySelector('input').focus();
}

function filterYTURL(url) {
    let id;

    // 1. Check if url starts with https
    let isURL = url.startsWith('https');

    // 2. If true, check domain
    if (isURL) {
        let isShortURL = url.includes('youtu.be');

        if (isShortURL) {
            id = url.substr(17, 11);
        } else {
            id = url.substr(32, 11);
        }
    }

    return id || url;
}

function generateURL(event) {
    const urlContainer = document.querySelector('#url');
    const videoIDs = [];
    const videos = document.querySelectorAll('#videos input');

    if (videos.length > 0) {
        videos.forEach((video) => {
            videoIDs.push(filterYTURL(video.value));
        });
    }

    // Generate the URL
    let url = `https://localhost:5000/play.html?videos=${videoIDs.join(',')}`;

    // Show the URL to the user
    let input = urlContainer.querySelector('input');
    input.value = url;
    urlContainer.removeAttribute('hidden');
}

class VideoInput extends HTMLElement {
    connectedCallback() {
        const input = this.querySelector('input');
        input.addEventListener('keyup', this.handleKeyPress);

        const removeBtn = this.querySelector('[data-action="remove"]');
        removeBtn.addEventListener('click', this.delete.bind(this));
    }

    handleKeyPress(event) {
        event.preventDefault();

        if (event.key === 'Enter') {
            addVideo();
        }
    }

    delete(event) {
        this.remove();
    }
}

window.customElements.define('video-input', VideoInput);

(() => {
    const addBtn = document.querySelector('[data-action="add"]');
    addBtn.addEventListener('click', addVideo);

    const generateBtn = document.querySelector('[data-action="generate"');
    generateBtn.addEventListener('click', generateURL);
})();
