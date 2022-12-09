let currentSlide = 0;
let carouselInterval = 3000;
let $slides = $('.slides__item');
let $indicatorsContainer = $('.indicators');
let $indicatorsItems = $('.indicators__item');

const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
const SPACE = ' ';
const FA_PAUSE = '<i class="far fa-pause-circle"></i>';
const FA_PLAY = '<i class="far fa-play-circle"></i>';

$indicatorsContainer.css('display', 'flex'); 
$('.controls').css('display', 'block');

let gotoNSlide = (n) => {
  $($slides[currentSlide]).toggleClass('active');
  $($indicatorsItems[currentSlide]).toggleClass('active');
  currentSlide = (n + $slides.length) % $slides.length;
  $($slides[currentSlide]).toggleClass('active');
  $($indicatorsItems[currentSlide]).toggleClass('active');
};
 
let gotoPrevSlide = () => gotoNSlide(currentSlide - 1);

let gotoNextSlide = () => gotoNSlide(currentSlide + 1);

let playback = true;
let $prev = $('.controls__prev');
let $pausePlay = $('.controls__pause');
let $next = $('.controls__next');
let slideInterval = setInterval(gotoNextSlide, carouselInterval);

let pauseSlide = () => {
  if (playback) {
    $pausePlay.html(FA_PAUSE);
    playback = !playback;
    clearInterval(slideInterval);
  }
};

let playSlide = () => {
  $pausePlay.html(FA_PLAY);
  playback = !playback;
  slideInterval = setInterval(gotoNextSlide, carouselInterval);
};

let clickPrev = () => {
  pauseSlide();
  gotoPrevSlide();
};

let clickPausePlay = () => playback ? pauseSlide() : playSlide();

let clickNext = () => {
  pauseSlide();
  gotoNextSlide();
};

$prev.on('click', clickPrev);
$pausePlay.on('click', clickPausePlay);
$next.on('click', clickNext);

let clickIndicator = (e) => {
  pauseSlide();
  gotoNSlide(+e.target.getAttribute('data-slide-to'));
};

$indicatorsContainer.on('click', '.indicators__item', clickIndicator);

let pressKey = (e) => {
  if (e.key === LEFT_ARROW) clickPrev();
  if (e.key === SPACE) clickPausePlay(); 
  if (e.key === RIGHT_ARROW) clickNext();
};

$(document).on('keydown', pressKey);
