/*jshint esversion: 6 */
const submit = document.getElementById('indexSubmit');
submit.addEventListener('click', indexSubmitCheck);

function indexSubmitCheck() {
    document.location.href='dashboard.html';
}