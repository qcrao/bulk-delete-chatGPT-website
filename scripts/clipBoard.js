// Your existing JavaScript functions here
function copyToClipboard(text, btnElement) {
  navigator.clipboard
    .writeText(text)
    .then(function () {
      btnElement.innerHTML = '<i class="fas fa-check"></i>';
      btnElement.classList.add("text-green-400");
      setTimeout(function () {
        btnElement.innerHTML = '<i class="fas fa-copy"></i>';
        btnElement.classList.remove("text-green-400");
      }, 2000);
    })
    .catch(function (err) {
      console.error("Unable to copy text to clipboard", err);
    });
}

// Add mobile menu toggle functionality
document
  .getElementById("mobile-menu-button")
  .addEventListener("click", function () {
    document.getElementById("mobile-menu").classList.toggle("hidden");
  });
