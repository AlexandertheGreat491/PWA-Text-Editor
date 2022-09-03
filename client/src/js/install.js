const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // defers the prompt until later in the page lifecycle.
  window.deferredPrompt = event;
  butInstall.style.toggle("hidden", false);
});

// Click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();
  
  window.deferredPrompt = null;
  butInstall.classList.toggle('hidden', true);
});

// The handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
