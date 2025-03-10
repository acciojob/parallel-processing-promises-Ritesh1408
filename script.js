const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

// Array of images to download
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download an image and return a promise
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Function to handle downloading all images
function downloadImages() {
  output.innerHTML = ""; // Clear previous images
  errorDiv.innerHTML = ""; // Clear previous errors
  loadingDiv.style.display = "block"; // Show loading spinner

  const imagePromises = images.map(image => downloadImage(image.url));

  Promise.all(imagePromises)
    .then(loadedImages => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      loadedImages.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = "none"; // Hide loading spinner
      errorDiv.innerHTML = `<p class="error">${error}</p>`; // Display error
    });
}

// Attach event listener to button
btn.addEventListener("click", downloadImages);
