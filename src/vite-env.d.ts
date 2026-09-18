/// <reference types="vite/client" />

interface Window {
  /** true cuando React montó la app (lo usa el loader de index.html y main.tsx) */
  __SINTIENS_MOUNTED__?: boolean;
}
