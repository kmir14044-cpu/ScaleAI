// const API = "https://scaleai-production-4db1.up.railway.app";

const API = "http://127.0.0.1:8000";
const GOOGLE_CLIENT_ID = "929736577941-965n895k7lm97j4b0u2k23vi9mg3s7um.apps.googleusercontent.com";

// ─── STATE ───────────────────────────────────────────────────────────────────

let currentUser = null;
let uploadedImage = null;
let googleAuthInitialized = false;

// ─── ELEMENTS ────────────────────────────────────────────────────────────────

const uploadBtn        = document.getElementById("uploadBtn");
const fileInput        = document.getElementById("imageUpload");
const authModal        = document.getElementById("authModal");
const authBackdrop     = document.getElementById("authBackdrop");
const closeAuthModal   = document.getElementById("closeAuthModal");
const upgradeModal     = document.getElementById("upgradeModal");
const upgradeBackdrop  = document.getElementById("upgradeBackdrop");
const closeUpgradeModal= document.getElementById("closeUpgradeModal");
const upgradeBtn       = document.getElementById("upgradeBtn");
const tabLogin         = document.getElementById("tabLogin");
const tabRegister      = document.getElementById("tabRegister");
const authSubmit       = document.getElementById("authSubmit");
const authError        = document.getElementById("authError");
const nameField        = document.getElementById("nameField");
const headerLoggedOut  = document.getElementById("headerLoggedOut");
const headerLoggedIn   = document.getElementById("headerLoggedIn");
const headerLoginBtn   = document.getElementById("headerLoginBtn");
const headerSignupBtn  = document.getElementById("headerSignupBtn");
const headerUpgradeBtn = document.getElementById("headerUpgradeBtn");
const avatarBtn        = document.getElementById("avatarBtn");
const userDropdown     = document.getElementById("userDropdown");
const logoutBtn        = document.getElementById("logoutBtn");
const googleAuthBtn    = document.getElementById("googleAuthBtn");

// ─── AUTH MODAL ──────────────────────────────────────────────────────────────

let authMode = "login"; // "login" | "register"

function openAuthModal(mode = "login") {
  authMode = mode;
  authModal.classList.remove("hidden");
  authError.classList.add("hidden");
  document.getElementById("authEmail").value = "";
  document.getElementById("authPassword").value = "";
  document.getElementById("authName").value = "";
  setAuthTab(mode);
}

function closeAuth() {
  authModal.classList.add("hidden");
}

function setAuthTab(mode) {
  authMode = mode;
  if (mode === "login") {
    tabLogin.classList.add("text-secondary", "border-secondary");
    tabLogin.classList.remove("text-gray-400", "border-transparent");
    tabRegister.classList.remove("text-secondary", "border-secondary");
    tabRegister.classList.add("text-gray-400", "border-transparent");
    nameField.classList.add("hidden");
    authSubmit.textContent = "Log In";
  } else {
    tabRegister.classList.add("text-secondary", "border-secondary");
    tabRegister.classList.remove("text-gray-400", "border-transparent");
    tabLogin.classList.remove("text-secondary", "border-secondary");
    tabLogin.classList.add("text-gray-400", "border-transparent");
    nameField.classList.remove("hidden");
    authSubmit.textContent = "Create Account";
  }
}

tabLogin.addEventListener("click", () => setAuthTab("login"));
tabRegister.addEventListener("click", () => setAuthTab("register"));
closeAuthModal.addEventListener("click", closeAuth);
authBackdrop.addEventListener("click", closeAuth);
headerLoginBtn.addEventListener("click", () => openAuthModal("login"));
headerSignupBtn.addEventListener("click", () => openAuthModal("register"));

// ─── EMAIL AUTH ──────────────────────────────────────────────────────────────

authSubmit.addEventListener("click", async () => {
  const email    = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  const name     = document.getElementById("authName").value.trim();

  if (!email || !password) {
    showAuthError("Please fill in all fields");
    return;
  }

  authSubmit.disabled = true;
  authSubmit.textContent = "Please wait...";

  try {
    const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
    const body = authMode === "login"
      ? { email, password }
      : { email, password, name };

    const res = await fetch(API + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      showAuthError(data.detail || "Something went wrong");
      return;
    }

    localStorage.setItem("clarify_token", data.token);
    setUser(data.user);
    closeAuth();

  } catch (err) {
    showAuthError("Network error. Please try again.");
  } finally {
    authSubmit.disabled = false;
    authSubmit.textContent = authMode === "login" ? "Log In" : "Create Account";
  }
});

function showAuthError(msg) {
  authError.textContent = msg;
  authError.classList.remove("hidden");
}

// ─── GOOGLE AUTH (requires Google Identity Services script) ──────────────────

googleAuthBtn.addEventListener("click", () => {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
    showAuthError("Google Sign-In is not configured yet.");
    return;
  }

  if (!window.google?.accounts?.id) {
    showAuthError("Google Sign-In is still loading, please wait.");
    return;
  }

  window.google.accounts.id.prompt();
});

async function handleGoogleCredentialResponse(response) {
  const credential = response?.credential;
  if (!credential) {
    showAuthError("Google Sign-In failed. Please try again.");
    return;
  }

  googleAuthBtn.disabled = true;
  try {
    const res = await fetch(API + "/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ credential })
    });

    const data = await res.json();
    if (!res.ok) {
      showAuthError(data.detail || "Google Sign-In failed.");
      return;
    }

    localStorage.setItem("clarify_token", data.token);
    setUser(data.user);
    closeAuth();
  } catch (err) {
    showAuthError("Network error. Please try again.");
  } finally {
    googleAuthBtn.disabled = false;
  }
}

function initGoogleAuth() {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
    return;
  }

  if (!window.google?.accounts?.id) {
    return;
  }

  if (googleAuthInitialized) {
    return;
  }

  window.google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCredentialResponse,
    cancel_on_tap_outside: true,
  });
  googleAuthInitialized = true;
}

function ensureGoogleAuthReady() {
  initGoogleAuth();
  if (googleAuthInitialized) {
    return;
  }

  const interval = setInterval(() => {
    if (window.google?.accounts?.id) {
      initGoogleAuth();
      if (googleAuthInitialized) {
        clearInterval(interval);
      }
    }
  }, 100);

  setTimeout(() => clearInterval(interval), 5000);
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  ensureGoogleAuthReady();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    ensureGoogleAuthReady();
  });
}

// ─── USER STATE ──────────────────────────────────────────────────────────────

function setUser(user) {
  currentUser = user;
  headerLoggedOut.classList.add("hidden");
  headerLoggedIn.classList.remove("hidden");

  // Avatar
  if (user.avatar) {
    document.getElementById("avatarImg").src = user.avatar;
    document.getElementById("avatarImg").classList.remove("hidden");
    document.getElementById("avatarInitial").classList.add("hidden");
  } else {
    document.getElementById("avatarInitial").textContent =
      (user.name || user.email || "U")[0].toUpperCase();
  }

  // Dropdown info
  document.getElementById("dropdownName").textContent = user.name || "User";
  document.getElementById("dropdownEmail").textContent = user.email;
  document.getElementById("dropdownPlan").textContent =
    user.plan === "pro" ? "✦ Pro" : "Free";

  // Usage pill
  const limit = user.images_limit === -1 ? "∞" : user.images_limit;
  document.getElementById("usageText").textContent = `${user.images_used}/${limit}`;

  // Upgrade button (free users only)
  if (user.plan === "free") {
    headerUpgradeBtn.classList.remove("hidden");
  } else {
    headerUpgradeBtn.classList.add("hidden");
  }
}

function clearUser() {
  currentUser = null;
  localStorage.removeItem("clarify_token");
  headerLoggedOut.classList.remove("hidden");
  headerLoggedIn.classList.add("hidden");
}

// ─── AVATAR DROPDOWN ─────────────────────────────────────────────────────────

avatarBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  userDropdown.classList.toggle("hidden");
});

document.addEventListener("click", () => {
  userDropdown.classList.add("hidden");
});

logoutBtn.addEventListener("click", () => {
  clearUser();
  userDropdown.classList.add("hidden");
});

// ─── UPGRADE MODAL ───────────────────────────────────────────────────────────

function openUpgradeModal() {
  upgradeModal.classList.remove("hidden");
}

function closeUpgrade() {
  upgradeModal.classList.add("hidden");
}

closeUpgradeModal.addEventListener("click", closeUpgrade);
upgradeBackdrop.addEventListener("click", closeUpgrade);
headerUpgradeBtn.addEventListener("click", openUpgradeModal);

upgradeBtn.addEventListener("click", async () => {
  // Placeholder — wire Stripe here
  const res = await fetch(API + "/upgrade", {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("clarify_token")}` }
  });
  const data = await res.json();
  alert(data.message);
});

// ─── SESSION RESTORE ─────────────────────────────────────────────────────────

async function restoreSession() {
  const token = localStorage.getItem("clarify_token");
  if (!token) return;
  try {
    const res = await fetch(API + "/auth/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const user = await res.json();
      setUser(user);
    } else {
      localStorage.removeItem("clarify_token");
    }
  } catch (_) {}
}

restoreSession();

// ─── UPLOAD FLOW ─────────────────────────────────────────────────────────────

uploadBtn.addEventListener("click", () => {
  if (!currentUser) {
    openAuthModal("register");
    return;
  }
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  uploadedImage = file;
  showPreview(file);
});

function showPreview(file) {
  const uploadContainer = uploadBtn.closest
    ? uploadBtn.closest("#uploadCard") || uploadBtn.parentElement
    : uploadBtn.parentElement;

  const reader = new FileReader();

  reader.onload = function (e) {
    uploadContainer.innerHTML = `
      <div class="w-full h-full flex flex-col">
        <div class="grid grid-cols-2 gap-4 flex-1">
          <!-- ORIGINAL -->
          <div class="relative rounded-3xl overflow-hidden bg-gray-100">
            <img id="originalPreview" src="${e.target.result}" class="w-full h-full object-cover" />
            <div class="absolute bottom-4 left-4">
              <div class="bg-black/60 text-white px-4 py-2 rounded-xl text-sm font-semibold">Original</div>
            </div>
          </div>
          <!-- RESULT -->
          <div id="resultBox" class="relative rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
            <div id="placeholder" class="text-gray-400 text-center">
              <span class="material-symbols-outlined text-6xl mb-3">image</span>
              <p class="text-lg">Processed image</p>
            </div>
          </div>
        </div>
        <!-- ACTIONS -->
        <div class="flex items-center justify-center gap-4 mt-6">
          <button id="processBtn" class="bg-secondary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-blue-700 transition">
            <span class="material-symbols-outlined">auto_awesome</span>
            Remove Background
          </button>
          <a id="downloadBtn" class="hidden bg-black text-white px-8 py-4 rounded-2xl font-semibold items-center gap-3 hover:bg-gray-800 transition">
            <span class="material-symbols-outlined">download</span>
            Download
          </a>
        </div>
        <p id="loadingText" class="text-center text-gray-500 mt-4 text-sm"></p>
      </div>
    `;

    const processBtn   = document.getElementById("processBtn");
    const resultBox    = document.getElementById("resultBox");
    const loadingText  = document.getElementById("loadingText");
    const downloadBtn  = document.getElementById("downloadBtn");

    processBtn.addEventListener("click", async () => {
      if (!currentUser) {
        openAuthModal("login");
        return;
      }

      try {
        processBtn.disabled = true;
        loadingText.textContent = "Processing image...";

        const formData = new FormData();
        formData.append("file", uploadedImage);

        const token = localStorage.getItem("clarify_token");
        const response = await fetch(API + "/remove-bg", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData
        });

        // Handle limit exceeded
        if (response.status === 429) {
          const err = await response.json();
          loadingText.textContent = "";
          openUpgradeModal();
          return;
        }

        if (!response.ok) throw new Error("Failed to process");

        const blob = await response.blob();
        const removedURL = URL.createObjectURL(blob);

        // Update usage counter from response headers
        const used  = response.headers.get("X-Images-Used");
        const limit = response.headers.get("X-Images-Limit");
        const plan  = response.headers.get("X-Plan");
        if (used && limit && currentUser) {
          currentUser.images_used = parseInt(used);
          const displayLimit = limit === "-1" ? "∞" : limit;
          document.getElementById("usageText").textContent = `${used}/${displayLimit}`;
        }

        resultBox.innerHTML = `
          <img src="${removedURL}" class="w-full h-full object-cover" />
          <div class="absolute bottom-4 right-4">
            <div class="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-semibold">Clean Cut</div>
          </div>
        `;

        downloadBtn.href = removedURL;
        downloadBtn.download = "removed-background.png";
        downloadBtn.classList.remove("hidden");
        downloadBtn.classList.add("flex");
        loadingText.textContent = "Background removed successfully ✓";

      } catch (err) {
        console.error(err);
        loadingText.textContent = "Failed to remove background. Try again.";
      } finally {
        processBtn.disabled = false;
      }
    });
  };

  reader.readAsDataURL(file);
}

// ─── PASTE ───────────────────────────────────────────────────────────────────

document.addEventListener("paste", (event) => {
  if (!currentUser) {
    openAuthModal("register");
    return;
  }
  const items = event.clipboardData.items;
  for (const item of items) {
    if (item.type.indexOf("image") !== -1) {
      const file = item.getAsFile();
      uploadedImage = file;
      showPreview(file);
    }
  }
});
