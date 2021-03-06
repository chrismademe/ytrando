class VideoPlayer extends HTMLElement {
    connectedCallback() {
        const params = new URLSearchParams(window.location.search);
        let videoList = params.has('videos') ? params.get('videos') : null;

        if (videoList === null) return;
        videoList = videoList.replace(/(<([^>]+)>)/gi, ''); // strip html
        let videoID = this.selectRandomVideo(videoList);
        this.render(videoID);
    }

    selectRandomVideo(list) {
        let videos = list.split(',');
        let key = Math.floor(Math.random() * videos.length);
        return videos[key];
    }

    render(videoID) {
        this.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoID}?autoplay=true" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }
}

window.customElements.define('video-player', VideoPlayer);
