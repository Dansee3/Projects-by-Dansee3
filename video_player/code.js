window.addEventListener('load', () => {
  const video = document.getElementById('video');
  const playPauseButton = document.getElementById('play-pause');
  const progressInput = document.getElementById('progress-input');
  const videoProgress = document.getElementById('video-progress');
  const muteButton = document.getElementById('mute-button');
  const videoControls = document.getElementById('controls');
  const videoContainer = document.getElementById('video-container');
  const fullscreenButton = document.getElementById('fullscreen');

  const fullscreenSupported = !!document.fullscreenEnabled;

  let wasPausedBeforeSeek;
  let controlsTimeout;

  const init = () => {
    video.controls = false;
    playPauseButton.addEventListener('click', playPauseClicked);
    video.addEventListener('play', updatePlayPauseIcon);
    video.addEventListener('pause', updatePlayPauseIcon);
    muteButton.addEventListener('click', muteButtonClicked);
    video.addEventListener('timeupdate', updateVideoProgress);
    progressInput.addEventListener('input', seekVideo);
    progressInput.addEventListener('mousedown', () => {
      wasPausedBeforeSeek = video.paused;
      video.pause();
    });
    progressInput.addEventListener('mouseup', seekVideo);
    if (fullscreenSupported) {
      fullscreenButton.addEventListener('click', handleFullscreen);
    } else {
      fullscreenButton.style.display = 'none';
    }

    videoContainer.addEventListener('mouseover', showControls);
    videoContainer.addEventListener('mousemove', showControls);
    videoContainer.addEventListener('mouseout', () => {
      if (!video.paused) {
        videoControls.style.opacity = '0';
      }
    });
  };

  const handleFullscreen = () => {
    if (!fullscreenSupported) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen();
      fullscreenButton.innerHTML = '<i class="fa fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullscreenButton.innerHTML = '<i class="fa fa-expand"></i>';
    }
  };

  const showControls = () => {
    videoControls.style.opacity = '1';
    if (!video.paused && controlsTimeout === undefined) {
      controlsTimeout = setTimeout(() => {
        videoControls.style.opacity = '0';
        controlsTimeout = undefined;
      }, 3000);
    }
  };

  const stopHidingControls = () => {
    clearTimeout(controlsTimeout);
    controlsTimeout = undefined;
  };

  const playPauseClicked = () => {
    if (video.paused) {
      video.play();
      showControls();
    } else {
      video.pause();
      stopHidingControls();
      videoControls.style.opacity = '1';
    }
  };

  const updatePlayPauseIcon = () => {
    playPauseButton.innerHTML = video.paused
      ? '<i class="fa fa-play"></i>'
      : '<i class="fa fa-pause"></i>';
  };

  const muteButtonClicked = () => {
    video.muted = !video.muted;
    muteButton.innerHTML = video.muted
      ? '<i class="fa fa-volume-mute"></i>'
      : '<i class="fa fa-volume-up"></i>';
  };

  const updateVideoProgress = () => {
    progressInput.value = (video.currentTime / video.duration) * 100;
    let minutes = Math.floor(video.currentTime / 60);
    if (minutes < 10) minutes = '0' + minutes;
    let secounds = Math.floor(video.currentTime % 60);
    if (secounds < 10) secounds = '0' + secounds;
    videoProgress.innerHTML = `${minutes}:${secounds}`;
  };

  const seekVideo = () => {
    let seekToTime = (progressInput.value * video.duration) / 100;

    if (seekToTime < 0 || seekToTime > video.duration) return;

    video.currentTime = seekToTime;
    if (!wasPausedBeforeSeek) {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video playback started');
          })
          .catch((error) => {
            console.error('Video playback failed:', error);
          });
      }
    }
  };

  init();
});
