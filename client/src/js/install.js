const butInstall = document.getElementById('buttonInstall');

/* ----------- an event handler to the `beforeinstallprompt` event ---------- */
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {});
