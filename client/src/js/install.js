const butInstall = document.getElementById('buttonInstall');

/* ----------- an event handler to the `beforeinstallprompt` event ---------- */
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

/* ------------ a click event handler on the `butInstall` element ----------- */
butInstall.addEventListener('click', async () => {
    // Select the deferredPrompt
    const promptEvent = window.deferredPrompt;
    // If there is no deferredPrompt exit out of the function
    if (!promptEvent) {
        return;
    }
    // Show prompt
    promptEvent.prompt();
    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.classList.toggle('hidden', true);
});

/* ----------------- a handler for the `appinstalled` event ----------------- */
window.addEventListener('appinstalled', () => {
    // Clear prompt
    window.deferredPrompt = null;
});
