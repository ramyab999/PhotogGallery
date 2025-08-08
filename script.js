const ACCESS_KEY = "XKS-K3BsJNOfka_zYZzjui0QrH8WBB2_A936As6qKGI";
const gallery = document.getElementById("gallery");
const button = document.getElementById("getPhotos");

button.addEventListener("click", getPhotos);

async function getPhotos() {
  const count = document.getElementById("photoCount").value;

  if (count < 0 || count > 11) {
    alert("Please enter a number between 0 and 11.");
    return;
  }

  const UNSPLASH_URL = `https://api.unsplash.com/photos/random?count=${count}&client_id=${ACCESS_KEY}`;
  const PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(
    UNSPLASH_URL
  )}`;
  console.log("Fetching from:", PROXY_URL);

  try {
    const res = await fetch(PROXY_URL);
    if (!res.ok) throw new Error("Network response was not ok");

    const wrapped = await res.json();
    const data = JSON.parse(wrapped.contents); // Unsplash photos array

    gallery.innerHTML = "";

    data.forEach((photo) => {
      const img = document.createElement("img");
      img.src = photo.urls.small;
      img.alt = photo.alt_description || "Unsplash Image";
      gallery.appendChild(img);
    });
  } catch (err) {
    console.error("Error fetching photos:", err);
    alert("Failed to load images. Check console.");
  }
}
