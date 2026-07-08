// import axios from 'axios';
// window.axios = axios;

// // Header wajib untuk Inertia / Laravel
// window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// // Ambil CSRF token dari meta tag
// const token = document.head.querySelector('meta[name="csrf-token"]');

// if (token) {
//     window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
// } else {
//     console.error('CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token');
// }
// resources/js/bootstrap.js
// bootstrap.js
import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.withCredentials = true;

// Ambil token CSRF dari meta
const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

// Fungsi refresh CSRF token (panggil setelah login/logout)
window.refreshCsrfToken = function () {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    if (token) {
        window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
};
