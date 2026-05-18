const API = "https://scaleai-production-4db1.up.railway.app";

const uploadBtn = document.getElementById("uploadBtn");
const imageInput = document.getElementById("imageInput");
const previewBox = document.getElementById("previewBox");
const bgColor = document.getElementById("bgColor");
const changeBgBtn = document.getElementById("changeBgBtn");
const downloadBtn = document.getElementById("downloadBtn");

let uploadedFile = null;

uploadBtn.addEventListener("click", () => {
  imageInput.click();
});

imageInput.addEventListener("change", (e) => {
  uploadedFile = e.target.files[0];

  if (!uploadedFile) return;

  const reader = new FileReader();

  reader.onload = function (event) {
    previewBox.innerHTML = `
      <img
        src="${event.target.result}"
        class="w-full h-full object-contain"
      />
    `;
  };

  reader.readAsDataURL(uploadedFile);
});

changeBgBtn.addEventListener("click", async () => {
  if (!uploadedFile) {
    alert("Upload image first");
    return;
  }

  try {
    previewBox.innerHTML = `
      <div class="flex flex-col items-center gap-4">
        <div class="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        <p>Changing background...</p>
      </div>
    `;

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("bg_color", bgColor.value);

    console.log("Selected color:", bgColor.value);

    const response = await fetch(
      `${API}/change-background`,
      {
        method: "POST",
        body: formData
      }
    );

    console.log("Status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend Error:", errorText);

      throw new Error(
        `Server Error: ${response.status}`
      );
    }

    const blob = await response.blob();
    console.log("Blob received:", blob);

    const imageURL =
      URL.createObjectURL(blob);

    previewBox.innerHTML = `
      <img
        src="${imageURL}"
        class="w-full h-full object-contain"
      />
    `;

    downloadBtn.href = imageURL;
    downloadBtn.download =
      "background-changed.png";

    downloadBtn.classList.remove(
      "hidden"
    );

  } catch (err) {
    console.error(err);

    previewBox.innerHTML = `
      <div class="text-center">
        <p class="text-red-500 font-semibold">
          Failed to change background
        </p>
        <p class="text-sm text-gray-400 mt-2">
          ${err.message}
        </p>
      </div>
    `;
  }
});