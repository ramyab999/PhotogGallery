const ACCESS_KEY = "XKS-K3BsJNOfka_zYZzjui0QrH8WBB2_A936As6qKGI";
const gallery = document.getElementById("gallery");
const button = document.getElementById("getPhotos");

button.addEventListener("click", getPhotos);

async function getPhotos() {
  const count = parseInt(document.getElementById("photoCount").value, 10);

  // Validate input
  if (isNaN(count) || count < 1 || count > 11) {
    alert("Please enter a number between 1 and 11.");
    return;
  }

  const UNSPLASH_URL = `https://api.unsplash.com/photos/random?count=${count}&client_id=${ACCESS_KEY}`;
  console.log("Fetching from:", UNSPLASH_URL);

  try {
    const res = await fetch(UNSPLASH_URL);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json(); // Unsplash photos array
    gallery.innerHTML = "";

    data.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.urls.small;
      img.alt = photo.alt_description || "Unsplash Image";
      img.loading = "lazy"; // Better performance
      gallery.appendChild(img);
    });
  } catch (err) {
    console.error("Error fetching photos:", err);
    alert("Failed to load images. Check console.");
  }
}
