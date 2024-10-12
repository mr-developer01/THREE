import Lenis from 'lenis';
import 'lenis/dist/lenis.css'
import './style.css'

const lenis = new Lenis({
  duration: 1.5,
  lerp: 0.1,
});


lenis.on('scroll', (e) => {
  console.log(e);
});


function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);