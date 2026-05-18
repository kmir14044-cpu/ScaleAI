const API =
  "https://scaleai-production-4db1.up.railway.app";

const uploadBtn =
  document.getElementById("uploadBtn");

const imageInput =
  document.getElementById("imageInput");

const previewBox =
  document.getElementById("previewBox");

const upscaleBtn =
  document.getElementById("upscaleBtn");

const downloadBtn =
  document.getElementById("downloadBtn");

let uploadedFile = null;

// Upload click
uploadBtn.addEventListener("click", () => {
  imageInput.click();
});

// Preview image
imageInput.addEventListener("change", (e) => {
  uploadedFile = e.target.files[0];

  if (!uploadedFile) return;

  const reader = new FileReader();

  reader.onload = (event) => {
    previewBox.innerHTML = `
      <img
        src="${event.target.result}"
        class="w-full h-full object-contain"
      />
    `;
  };

  reader.readAsDataURL(uploadedFile);
});

// Upscale
upscaleBtn.addEventListener(
  "click",
  async () => {

    if (!uploadedFile) {
      alert("Upload image first");
      return;
    }

    try {

      previewBox.innerHTML = `
        <div class="flex flex-col items-center gap-4">
          <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p>Enhancing image...</p>
        </div>
      `;

      const formData =
        new FormData();

      formData.append(
        "file",
        uploadedFile
      );

      const response =
        await fetch(
          `${API}/upscale`,
          {
            method: "POST",
            body: formData
          }
        );

      if (!response.ok) {
        throw new Error(
          "Failed to upscale"
        );
      }

      const blob =
        await response.blob();

      const imageURL =
        URL.createObjectURL(blob);

      previewBox.innerHTML = `
        <img
          src="${imageURL}"
          class="w-full h-full object-contain"
        />
      `;

      downloadBtn.href =
        imageURL;

      downloadBtn.download =
        "hd-image.png";

      downloadBtn.classList.remove(
        "hidden"
      );

    } catch (err) {

      previewBox.innerHTML = `
        <div class="text-center">
          <p class="text-red-500 font-semibold">
            Failed to enhance image
          </p>
        </div>
      `;

      console.error(err);
    }
  }
);