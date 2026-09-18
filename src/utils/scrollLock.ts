// Scroll-lock con contador — varios overlays anidados no se pelean
let scrollLocks = 0;

export function lockScroll() {
  scrollLocks += 1;
  if (scrollLocks === 1) {
    document.body.style.overflow = "hidden";
  }
}

export function unlockScroll() {
  scrollLocks = Math.max(0, scrollLocks - 1);
  if (scrollLocks === 0) {
    document.body.style.overflow = "";
  }
}
