import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';
import BrandImg from '../images/icon_96x96.png';

const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.innerHTML = `
  <div class="loading-container">
  <div class="loading-spinner" />
  </div>
  `;
    main.appendChild(spinner);
};

// Inject logo
const navbarBrand = document.querySelector('.navbar-brand__img');
navbarBrand.src = BrandImg;

const editor = new Editor();

if (typeof editor === 'undefined') {
    loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register();
} else {
    console.error('Service workers are not supported in this browser.');
}
