import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
}

function startPlayback() {
  if (JSON.parse(localStorage.getItem('videoplayer-current-time')) === null) {
    return;
  }
  const paused = JSON.parse(localStorage.getItem('videoplayer-current-time'))[
    'seconds'
  ];
  if (paused) {
    player.setCurrentTime(paused);
  }
}
startPlayback();
