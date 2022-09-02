const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// Event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  // defers the prompt until later in the page lifecycle.
  window.deferredPrompt = event;
  butInstall.style.visibility = "visible";
});

// Click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();
  window.deferredPrompt = null;

  // prevents the console log from reading an error saying that "e.split" isn't a function
  butInstall.classList.toggle("hidden", true);
  butInstall.textContent = "Installed!";
});

// The handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("Success!", "appinstalled", event);
});
