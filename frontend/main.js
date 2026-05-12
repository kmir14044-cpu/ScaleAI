// // const API = "https://scaleai-production-4db1.up.railway.app";

// // // const API = "http://127.0.0.1:8000";
// // const GOOGLE_CLIENT_ID = "667340206192-na2o3d4h5n0dr7lld6knpd40qrktcalq.apps.googleusercontent.com";

// // // ─── STATE ───────────────────────────────────────────────────────────────────

// // let currentUser = null;
// // let uploadedImage = null;
// // let googleAuthInitialized = false;

// // // ─── ELEMENTS ────────────────────────────────────────────────────────────────

// // const uploadBtn        = document.getElementById("uploadBtn");
// // const fileInput        = document.getElementById("imageUpload");
// // const authModal        = document.getElementById("authModal");
// // const authBackdrop     = document.getElementById("authBackdrop");
// // const closeAuthModal   = document.getElementById("closeAuthModal");
// // const upgradeModal     = document.getElementById("upgradeModal");
// // const upgradeBackdrop  = document.getElementById("upgradeBackdrop");
// // const closeUpgradeModal= document.getElementById("closeUpgradeModal");
// // const upgradeBtn       = document.getElementById("upgradeBtn");
// // const tabLogin         = document.getElementById("tabLogin");
// // const tabRegister      = document.getElementById("tabRegister");
// // const authSubmit       = document.getElementById("authSubmit");
// // const authError        = document.getElementById("authError");
// // const nameField        = document.getElementById("nameField");
// // const headerLoggedOut  = document.getElementById("headerLoggedOut");
// // const headerLoggedIn   = document.getElementById("headerLoggedIn");
// // const headerLoginBtn   = document.getElementById("headerLoginBtn");
// // const headerSignupBtn  = document.getElementById("headerSignupBtn");
// // const headerUpgradeBtn = document.getElementById("headerUpgradeBtn");
// // const avatarBtn        = document.getElementById("avatarBtn");
// // const userDropdown     = document.getElementById("userDropdown");
// // const logoutBtn        = document.getElementById("logoutBtn");
// // const googleAuthBtn    = document.getElementById("googleAuthBtn");

// // // ─── AUTH MODAL ──────────────────────────────────────────────────────────────

// // let authMode = "login"; // "login" | "register"

// // function openAuthModal(mode = "login") {
// //   authMode = mode;
// //   authModal.classList.remove("hidden");
// //   authError.classList.add("hidden");
// //   document.getElementById("authEmail").value = "";
// //   document.getElementById("authPassword").value = "";
// //   document.getElementById("authName").value = "";
// //   setAuthTab(mode);
// // }

// // function closeAuth() {
// //   authModal.classList.add("hidden");
// // }

// // function setAuthTab(mode) {
// //   authMode = mode;
// //   if (mode === "login") {
// //     tabLogin.classList.add("text-secondary", "border-secondary");
// //     tabLogin.classList.remove("text-gray-400", "border-transparent");
// //     tabRegister.classList.remove("text-secondary", "border-secondary");
// //     tabRegister.classList.add("text-gray-400", "border-transparent");
// //     nameField.classList.add("hidden");
// //     authSubmit.textContent = "Log In";
// //   } else {
// //     tabRegister.classList.add("text-secondary", "border-secondary");
// //     tabRegister.classList.remove("text-gray-400", "border-transparent");
// //     tabLogin.classList.remove("text-secondary", "border-secondary");
// //     tabLogin.classList.add("text-gray-400", "border-transparent");
// //     nameField.classList.remove("hidden");
// //     authSubmit.textContent = "Create Account";
// //   }
// // }

// // tabLogin.addEventListener("click", () => setAuthTab("login"));
// // tabRegister.addEventListener("click", () => setAuthTab("register"));
// // closeAuthModal.addEventListener("click", closeAuth);
// // authBackdrop.addEventListener("click", closeAuth);
// // headerLoginBtn.addEventListener("click", () => openAuthModal("login"));
// // headerSignupBtn.addEventListener("click", () => openAuthModal("register"));

// // // ─── EMAIL AUTH ──────────────────────────────────────────────────────────────

// // authSubmit.addEventListener("click", async () => {
// //   const email    = document.getElementById("authEmail").value.trim();
// //   const password = document.getElementById("authPassword").value;
// //   const name     = document.getElementById("authName").value.trim();

// //   if (!email || !password) {
// //     showAuthError("Please fill in all fields");
// //     return;
// //   }

// //   authSubmit.disabled = true;
// //   authSubmit.textContent = "Please wait...";

// //   try {
// //     const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
// //     const body = authMode === "login"
// //       ? { email, password }
// //       : { email, password, name };

// //     const res = await fetch(API + endpoint, {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(body)
// //     });

// //     const data = await res.json();

// //     if (!res.ok) {
// //       showAuthError(data.detail || "Something went wrong");
// //       return;
// //     }

// //     localStorage.setItem("clarify_token", data.token);
// //     setUser(data.user);
// //     closeAuth();

// //   } catch (err) {
// //     showAuthError("Network error. Please try again.");
// //   } finally {
// //     authSubmit.disabled = false;
// //     authSubmit.textContent = authMode === "login" ? "Log In" : "Create Account";
// //   }
// // });

// // function showAuthError(msg) {
// //   authError.textContent = msg;
// //   authError.classList.remove("hidden");
// // }

// // // ─── GOOGLE AUTH (requires Google Identity Services script) ──────────────────
// // googleAuthBtn.addEventListener("click", () => {
// //   if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
// //     showAuthError("Google Sign-In is not configured yet.");
// //     return;
// //   }

// //   const client = window.google.accounts.oauth2.initTokenClient({
// //     client_id: GOOGLE_CLIENT_ID,
// //     scope: "email profile openid",
// //     callback: async (tokenResponse) => {
// //       if (tokenResponse.error) {
// //         showAuthError("Google Sign-In failed.");
// //         return;
// //       }
// //       googleAuthBtn.disabled = true;
// //       try {
// //         const res = await fetch(API + "/auth/google-token", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ access_token: tokenResponse.access_token })
// //         });
// //         const data = await res.json();
// //         if (!res.ok) { showAuthError(data.detail || "Google Sign-In failed."); return; }
// //         localStorage.setItem("clarify_token", data.token);
// //         setUser(data.user);
// //         closeAuth();
// //       } catch (e) {
// //         showAuthError("Network error. Please try again.");
// //       } finally {
// //         googleAuthBtn.disabled = false;
// //       }
// //     }
// //   });
// //   client.requestAccessToken();
// // });
// // // googleAuthBtn.addEventListener("click", () => {
// // //   if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
// // //     showAuthError("Google Sign-In is not configured yet.");
// // //     return;
// // //   }

// // //   if (!window.google?.accounts?.id) {
// // //     showAuthError("Google Sign-In is still loading, please wait.");
// // //     return;
// // //   }

// // //   window.google.accounts.id.prompt();
// // // });

// // // async function handleGoogleCredentialResponse(response) {
// // //   const credential = response?.credential;
// // //   if (!credential) {
// // //     showAuthError("Google Sign-In failed. Please try again.");
// // //     return;
// // //   }

// // //   googleAuthBtn.disabled = true;
// // //   try {
// // //     const res = await fetch(API + "/auth/google", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({ credential })
// // //     });

// // //     const data = await res.json();
// // //     if (!res.ok) {
// // //       showAuthError(data.detail || "Google Sign-In failed.");
// // //       return;
// // //     }

// // //     localStorage.setItem("clarify_token", data.token);
// // //     setUser(data.user);
// // //     closeAuth();
// // //   } catch (err) {
// // //     showAuthError("Network error. Please try again.");
// // //   } finally {
// // //     googleAuthBtn.disabled = false;
// // //   }
// // // }

// // // function initGoogleAuth() {
// // //   if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
// // //     return;
// // //   }

// // //   if (!window.google?.accounts?.id) {
// // //     return;
// // //   }

// // //   if (googleAuthInitialized) {
// // //     return;
// // //   }

// // //   window.google.accounts.id.initialize({
// // //     client_id: GOOGLE_CLIENT_ID,
// // //     callback: handleGoogleCredentialResponse,
// // //     cancel_on_tap_outside: true,
// // //   });
// // //   googleAuthInitialized = true;
// // // }

// // // function ensureGoogleAuthReady() {
// // //   initGoogleAuth();
// // //   if (googleAuthInitialized) {
// // //     return;
// // //   }

// // //   const interval = setInterval(() => {
// // //     if (window.google?.accounts?.id) {
// // //       initGoogleAuth();
// // //       if (googleAuthInitialized) {
// // //         clearInterval(interval);
// // //       }
// // //     }
// // //   }, 100);

// // //   setTimeout(() => clearInterval(interval), 5000);
// // // }

// // // if (document.readyState === "complete" || document.readyState === "interactive") {
// // //   ensureGoogleAuthReady();
// // // } else {
// // //   document.addEventListener("DOMContentLoaded", () => {
// // //     ensureGoogleAuthReady();
// // //   });
// // // }

// // // ─── USER STATE ──────────────────────────────────────────────────────────────

// // function setUser(user) {
// //   currentUser = user;
// //   headerLoggedOut.classList.add("hidden");
// //   headerLoggedIn.classList.remove("hidden");

// //   // Avatar
// //   if (user.avatar) {
// //     document.getElementById("avatarImg").src = user.avatar;
// //     document.getElementById("avatarImg").classList.remove("hidden");
// //     document.getElementById("avatarInitial").classList.add("hidden");
// //   } else {
// //     document.getElementById("avatarInitial").textContent =
// //       (user.name || user.email || "U")[0].toUpperCase();
// //   }

// //   // Dropdown info
// //   document.getElementById("dropdownName").textContent = user.name || "User";
// //   document.getElementById("dropdownEmail").textContent = user.email;
// //   document.getElementById("dropdownPlan").textContent =
// //     user.plan === "pro" ? "✦ Pro" : "Free";

// //   // Usage pill
// //   const limit = user.images_limit === -1 ? "∞" : user.images_limit;
// //   document.getElementById("usageText").textContent = `${user.images_used}/${limit}`;

// //   // Upgrade button (free users only)
// //   if (user.plan === "free") {
// //     headerUpgradeBtn.classList.remove("hidden");
// //   } else {
// //     headerUpgradeBtn.classList.add("hidden");
// //   }
// // }

// // function clearUser() {
// //   currentUser = null;
// //   localStorage.removeItem("clarify_token");
// //   headerLoggedOut.classList.remove("hidden");
// //   headerLoggedIn.classList.add("hidden");
// // }

// // // ─── AVATAR DROPDOWN ─────────────────────────────────────────────────────────

// // avatarBtn.addEventListener("click", (e) => {
// //   e.stopPropagation();
// //   userDropdown.classList.toggle("hidden");
// // });

// // document.addEventListener("click", () => {
// //   userDropdown.classList.add("hidden");
// // });

// // logoutBtn.addEventListener("click", () => {
// //   clearUser();
// //   userDropdown.classList.add("hidden");
// // });

// // // ─── UPGRADE MODAL ───────────────────────────────────────────────────────────

// // function openUpgradeModal() {
// //   upgradeModal.classList.remove("hidden");
// // }

// // function closeUpgrade() {
// //   upgradeModal.classList.add("hidden");
// // }

// // closeUpgradeModal.addEventListener("click", closeUpgrade);
// // upgradeBackdrop.addEventListener("click", closeUpgrade);
// // headerUpgradeBtn.addEventListener("click", openUpgradeModal);

// // upgradeBtn.addEventListener("click", async () => {
// //   // Placeholder — wire Stripe here
// //   const res = await fetch(API + "/upgrade", {
// //     method: "POST",
// //     headers: { Authorization: `Bearer ${localStorage.getItem("clarify_token")}` }
// //   });
// //   const data = await res.json();
// //   alert(data.message);
// // });

// // // ─── SESSION RESTORE ─────────────────────────────────────────────────────────

// // async function restoreSession() {
// //   const token = localStorage.getItem("clarify_token");
// //   if (!token) return;
// //   try {
// //     const res = await fetch(API + "/auth/me", {
// //       headers: { Authorization: `Bearer ${token}` }
// //     });
// //     if (res.ok) {
// //       const user = await res.json();
// //       setUser(user);
// //     } else {
// //       localStorage.removeItem("clarify_token");
// //     }
// //   } catch (_) {}
// // }

// // restoreSession();

// // // ─── UPLOAD FLOW ─────────────────────────────────────────────────────────────

// // uploadBtn.addEventListener("click", () => {
// //   if (!currentUser) {
// //     openAuthModal("register");
// //     return;
// //   }
// //   fileInput.click();
// // });

// // fileInput.addEventListener("change", (event) => {
// //   const file = event.target.files[0];
// //   if (!file) return;
// //   uploadedImage = file;
// //   showPreview(file);
// // });

// // function showPreview(file) {
// //   const uploadContainer = uploadBtn.closest
// //     ? uploadBtn.closest("#uploadCard") || uploadBtn.parentElement
// //     : uploadBtn.parentElement;

// //   const reader = new FileReader();

// //   reader.onload = function (e) {
// //     uploadContainer.innerHTML = `
// //       <div class="w-full h-full flex flex-col">
// //         <div class="grid grid-cols-2 gap-4 flex-1">
// //           <!-- ORIGINAL -->
// //           <div class="relative rounded-3xl overflow-hidden bg-gray-100">
// //             <img id="originalPreview" src="${e.target.result}" class="w-full h-full object-cover" />
// //             <div class="absolute bottom-4 left-4">
// //               <div class="bg-black/60 text-white px-4 py-2 rounded-xl text-sm font-semibold">Original</div>
// //             </div>
// //           </div>
// //           <!-- RESULT -->
// //           <div id="resultBox" class="relative rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
// //             <div id="placeholder" class="text-gray-400 text-center">
// //               <span class="material-symbols-outlined text-6xl mb-3">image</span>
// //               <p class="text-lg">Processed image</p>
// //             </div>
// //           </div>
// //         </div>
// //         <!-- ACTIONS -->
// //         <div class="flex items-center justify-center gap-4 mt-6">
// //           <button id="processBtn" class="bg-secondary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-blue-700 transition">
// //             <span class="material-symbols-outlined">auto_awesome</span>
// //             Remove Background
// //           </button>
// //           <a id="downloadBtn" class="hidden bg-black text-white px-8 py-4 rounded-2xl font-semibold items-center gap-3 hover:bg-gray-800 transition">
// //             <span class="material-symbols-outlined">download</span>
// //             Download
// //           </a>
// //         </div>
// //         <p id="loadingText" class="text-center text-gray-500 mt-4 text-sm"></p>
// //       </div>
// //     `;

// //     const processBtn   = document.getElementById("processBtn");
// //     const resultBox    = document.getElementById("resultBox");
// //     const loadingText  = document.getElementById("loadingText");
// //     const downloadBtn  = document.getElementById("downloadBtn");

// //     processBtn.addEventListener("click", async () => {
// //       if (!currentUser) {
// //         openAuthModal("login");
// //         return;
// //       }

// //       try {
// //         processBtn.disabled = true;
// //         loadingText.textContent = "Processing image...";

// //         const formData = new FormData();
// //         formData.append("file", uploadedImage);

// //         const token = localStorage.getItem("clarify_token");
// //         const response = await fetch(API + "/remove-bg", {
// //           method: "POST",
// //           headers: { Authorization: `Bearer ${token}` },
// //           body: formData
// //         });

// //         // Handle limit exceeded
// //         if (response.status === 429) {
// //           const err = await response.json();
// //           loadingText.textContent = "";
// //           openUpgradeModal();
// //           return;
// //         }

// //         if (!response.ok) throw new Error("Failed to process");

// //         const blob = await response.blob();
// //         const removedURL = URL.createObjectURL(blob);

// //         // Update usage counter from response headers
// //         const used  = response.headers.get("X-Images-Used");
// //         const limit = response.headers.get("X-Images-Limit");
// //         const plan  = response.headers.get("X-Plan");
// //         if (used && limit && currentUser) {
// //           currentUser.images_used = parseInt(used);
// //           const displayLimit = limit === "-1" ? "∞" : limit;
// //           document.getElementById("usageText").textContent = `${used}/${displayLimit}`;
// //         }

// //         resultBox.innerHTML = `
// //           <img src="${removedURL}" class="w-full h-full object-cover" />
// //           <div class="absolute bottom-4 right-4">
// //             <div class="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-semibold">Clean Cut</div>
// //           </div>
// //         `;

// //         downloadBtn.href = removedURL;
// //         downloadBtn.download = "removed-background.png";
// //         downloadBtn.classList.remove("hidden");
// //         downloadBtn.classList.add("flex");
// //         loadingText.textContent = "Background removed successfully ✓";

// //       } catch (err) {
// //         console.error(err);
// //         loadingText.textContent = "Failed to remove background. Try again.";
// //       } finally {
// //         processBtn.disabled = false;
// //       }
// //     });
// //   };

// //   reader.readAsDataURL(file);
// // }

// // // ─── PASTE ───────────────────────────────────────────────────────────────────

// // document.addEventListener("paste", (event) => {
// //   if (!currentUser) {
// //     openAuthModal("register");
// //     return;
// //   }
// //   const items = event.clipboardData.items;
// //   for (const item of items) {
// //     if (item.type.indexOf("image") !== -1) {
// //       const file = item.getAsFile();
// //       uploadedImage = file;
// //       showPreview(file);
// //     }
// //   }
// // });
// const API = "https://scaleai-production-4db1.up.railway.app";

// // const API = "http://127.0.0.1:8000";
// const GOOGLE_CLIENT_ID = "667340206192-na2o3d4h5n0dr7lld6knpd40qrktcalq.apps.googleusercontent.com";

// // ─── STATE ───────────────────────────────────────────────────────────────────

// let currentUser = null;
// let uploadedImage = null;

// // ─── ELEMENTS ────────────────────────────────────────────────────────────────

// const uploadBtn        = document.getElementById("uploadBtn");
// const fileInput        = document.getElementById("imageUpload");
// const authModal        = document.getElementById("authModal");
// const authBackdrop     = document.getElementById("authBackdrop");
// const closeAuthModal   = document.getElementById("closeAuthModal");
// const upgradeModal     = document.getElementById("upgradeModal");
// const upgradeBackdrop  = document.getElementById("upgradeBackdrop");
// const closeUpgradeModal= document.getElementById("closeUpgradeModal");
// const upgradeBtn       = document.getElementById("upgradeBtn");
// const tabLogin         = document.getElementById("tabLogin");
// const tabRegister      = document.getElementById("tabRegister");
// const authSubmit       = document.getElementById("authSubmit");
// const authError        = document.getElementById("authError");
// const nameField        = document.getElementById("nameField");
// const headerLoggedOut  = document.getElementById("headerLoggedOut");
// const headerLoggedIn   = document.getElementById("headerLoggedIn");
// const headerLoginBtn   = document.getElementById("headerLoginBtn");
// const headerSignupBtn  = document.getElementById("headerSignupBtn");
// const headerUpgradeBtn = document.getElementById("headerUpgradeBtn");
// const avatarBtn        = document.getElementById("avatarBtn");
// const userDropdown     = document.getElementById("userDropdown");
// const logoutBtn        = document.getElementById("logoutBtn");
// const googleAuthBtn    = document.getElementById("googleAuthBtn");

// // ─── AUTH MODAL ──────────────────────────────────────────────────────────────

// let authMode = "login";

// function openAuthModal(mode = "login") {
//   authMode = mode;
//   authModal.classList.remove("hidden");
//   authError.classList.add("hidden");
//   document.getElementById("authEmail").value = "";
//   document.getElementById("authPassword").value = "";
//   document.getElementById("authName").value = "";
//   setAuthTab(mode);
// }

// function closeAuth() {
//   authModal.classList.add("hidden");
// }

// function setAuthTab(mode) {
//   authMode = mode;
//   if (mode === "login") {
//     tabLogin.classList.add("text-secondary", "border-secondary");
//     tabLogin.classList.remove("text-gray-400", "border-transparent");
//     tabRegister.classList.remove("text-secondary", "border-secondary");
//     tabRegister.classList.add("text-gray-400", "border-transparent");
//     nameField.classList.add("hidden");
//     authSubmit.textContent = "Log In";
//   } else {
//     tabRegister.classList.add("text-secondary", "border-secondary");
//     tabRegister.classList.remove("text-gray-400", "border-transparent");
//     tabLogin.classList.remove("text-secondary", "border-secondary");
//     tabLogin.classList.add("text-gray-400", "border-transparent");
//     nameField.classList.remove("hidden");
//     authSubmit.textContent = "Create Account";
//   }
// }

// tabLogin.addEventListener("click", () => setAuthTab("login"));
// tabRegister.addEventListener("click", () => setAuthTab("register"));
// closeAuthModal.addEventListener("click", closeAuth);
// authBackdrop.addEventListener("click", closeAuth);
// headerLoginBtn.addEventListener("click", () => openAuthModal("login"));
// headerSignupBtn.addEventListener("click", () => openAuthModal("register"));

// // ─── EMAIL AUTH ──────────────────────────────────────────────────────────────

// authSubmit.addEventListener("click", async () => {
//   const email    = document.getElementById("authEmail").value.trim();
//   const password = document.getElementById("authPassword").value;
//   const name     = document.getElementById("authName").value.trim();

//   if (!email || !password) {
//     showAuthError("Please fill in all fields");
//     return;
//   }

//   authSubmit.disabled = true;
//   authSubmit.textContent = "Please wait...";

//   try {
//     const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
//     const body = authMode === "login"
//       ? { email, password }
//       : { email, password, name };

//     const res = await fetch(API + endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body)
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       showAuthError(data.detail || "Something went wrong");
//       return;
//     }

//     localStorage.setItem("clarify_token", data.token);
//     setUser(data.user);
//     closeAuth();

//   } catch (err) {
//     showAuthError("Network error. Please try again.");
//   } finally {
//     authSubmit.disabled = false;
//     authSubmit.textContent = authMode === "login" ? "Log In" : "Create Account";
//   }
// });

// function showAuthError(msg) {
//   authError.textContent = msg;
//   authError.classList.remove("hidden");
// }

// // ─── GOOGLE AUTH ──────────────────────────────────────────────────────────────

// googleAuthBtn.addEventListener("click", () => {
//   if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
//     showAuthError("Google Sign-In is not configured yet.");
//     return;
//   }

//   const client = window.google.accounts.oauth2.initTokenClient({
//     client_id: GOOGLE_CLIENT_ID,
//     scope: "email profile openid",
//     callback: async (tokenResponse) => {
//       if (tokenResponse.error) {
//         showAuthError("Google Sign-In failed.");
//         return;
//       }
//       googleAuthBtn.disabled = true;
//       try {
//         const res = await fetch(API + "/auth/google-token", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ access_token: tokenResponse.access_token })
//         });
//         const data = await res.json();
//         if (!res.ok) { showAuthError(data.detail || "Google Sign-In failed."); return; }
//         localStorage.setItem("clarify_token", data.token);
//         setUser(data.user);
//         closeAuth();
//       } catch (e) {
//         showAuthError("Network error. Please try again.");
//       } finally {
//         googleAuthBtn.disabled = false;
//       }
//     }
//   });
//   client.requestAccessToken();
// });

// // ─── USER STATE ──────────────────────────────────────────────────────────────

// function setUser(user) {
//   currentUser = user;
//   headerLoggedOut.classList.add("hidden");
//   headerLoggedIn.classList.remove("hidden");

//   if (user.avatar) {
//     document.getElementById("avatarImg").src = user.avatar;
//     document.getElementById("avatarImg").classList.remove("hidden");
//     document.getElementById("avatarInitial").classList.add("hidden");
//   } else {
//     document.getElementById("avatarInitial").textContent =
//       (user.name || user.email || "U")[0].toUpperCase();
//   }

//   document.getElementById("dropdownName").textContent = user.name || "User";
//   document.getElementById("dropdownEmail").textContent = user.email;
//   document.getElementById("dropdownPlan").textContent =
//     user.plan === "pro" ? "✦ Pro" : "Free";

//   const limit = user.images_limit === -1 ? "∞" : user.images_limit;
//   document.getElementById("usageText").textContent = `${user.images_used}/${limit}`;

//   if (user.plan === "free") {
//     headerUpgradeBtn.classList.remove("hidden");
//   } else {
//     headerUpgradeBtn.classList.add("hidden");
//   }
// }

// function clearUser() {
//   currentUser = null;
//   localStorage.removeItem("clarify_token");
//   headerLoggedOut.classList.remove("hidden");
//   headerLoggedIn.classList.add("hidden");
// }

// // ─── AVATAR DROPDOWN ─────────────────────────────────────────────────────────

// avatarBtn.addEventListener("click", (e) => {
//   e.stopPropagation();
//   userDropdown.classList.toggle("hidden");
// });

// document.addEventListener("click", () => {
//   userDropdown.classList.add("hidden");
// });

// logoutBtn.addEventListener("click", () => {
//   clearUser();
//   userDropdown.classList.add("hidden");
// });

// // ─── UPGRADE MODAL ───────────────────────────────────────────────────────────

// function openUpgradeModal() {
//   upgradeModal.classList.remove("hidden");
// }

// function closeUpgrade() {
//   upgradeModal.classList.add("hidden");
// }

// closeUpgradeModal.addEventListener("click", closeUpgrade);
// upgradeBackdrop.addEventListener("click", closeUpgrade);
// headerUpgradeBtn.addEventListener("click", openUpgradeModal);

// upgradeBtn.addEventListener("click", async () => {
//   const res = await fetch(API + "/upgrade", {
//     method: "POST",
//     headers: { Authorization: `Bearer ${localStorage.getItem("clarify_token")}` }
//   });
//   const data = await res.json();
//   alert(data.message);
// });

// // ─── SESSION RESTORE ─────────────────────────────────────────────────────────

// async function restoreSession() {
//   const token = localStorage.getItem("clarify_token");
//   if (!token) return;
//   try {
//     const res = await fetch(API + "/auth/me", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (res.ok) {
//       const user = await res.json();
//       setUser(user);
//     } else {
//       localStorage.removeItem("clarify_token");
//     }
//   } catch (_) {}
// }

// restoreSession();

// // ─── UPLOAD FLOW ─────────────────────────────────────────────────────────────

// uploadBtn.addEventListener("click", () => {
//   if (!currentUser) {
//     openAuthModal("register");
//     return;
//   }
//   fileInput.click();
// });

// fileInput.addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   if (!file) return;
//   uploadedImage = file;
//   showPreview(file);
// });

// function showPreview(file) {
//   const uploadContainer = uploadBtn.closest
//     ? uploadBtn.closest("#uploadCard") || uploadBtn.parentElement
//     : uploadBtn.parentElement;

//   uploadContainer.innerHTML = `
//     <div class="w-full h-full flex flex-col">

//       <!-- RESULT BOX -->
//       <div id="resultBox" class="flex-1 rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
//         <div class="text-gray-400 text-center">
//           <span class="material-symbols-outlined text-6xl mb-3">auto_awesome</span>
//           <p class="text-lg font-medium">Ready to process</p>
//           <p class="text-sm mt-1">Click below to remove background</p>
//         </div>
//       </div>

//       <!-- ACTIONS -->
//       <div class="flex items-center justify-center gap-4 mt-6">
//         <button id="processBtn"
//           class="bg-secondary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-blue-700 transition">
//           <span class="material-symbols-outlined">auto_awesome</span>
//           Remove Background
//         </button>
//         <a id="downloadBtn"
//           class="hidden bg-black text-white px-8 py-4 rounded-2xl font-semibold items-center gap-3 hover:bg-gray-800 transition">
//           <span class="material-symbols-outlined">download</span>
//           Download
//         </a>
//       </div>

//     </div>
//   `;

//   const processBtn  = document.getElementById("processBtn");
//   const resultBox   = document.getElementById("resultBox");
//   const downloadBtn = document.getElementById("downloadBtn");

//   processBtn.addEventListener("click", async () => {
//     if (!currentUser) { openAuthModal("login"); return; }

//     try {
//       processBtn.disabled = true;
//       processBtn.classList.add("opacity-50");

//       // Show spinner
//       resultBox.innerHTML = `
//         <div class="flex flex-col items-center justify-center gap-4">
//           <div class="w-14 h-14 border-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
//           <p class="text-gray-500 text-sm font-medium">Removing background...</p>
//         </div>
//       `;

//       const formData = new FormData();
//       formData.append("file", uploadedImage);

//       const token = localStorage.getItem("clarify_token");
//       const response = await fetch(API + "/remove-bg", {
//         method: "POST",
//         headers: { Authorization: `Bearer ${token}` },
//         body: formData
//       });

//       if (response.status === 429) {
//         resultBox.innerHTML = `
//           <div class="text-gray-400 text-center">
//             <span class="material-symbols-outlined text-5xl mb-3">block</span>
//             <p class="font-medium">Monthly limit reached</p>
//           </div>
//         `;
//         openUpgradeModal();
//         return;
//       }

//       if (!response.ok) throw new Error("Failed to process");

//       const blob = await response.blob();
//       const removedURL = URL.createObjectURL(blob);

//       // Update usage counter
//       const used  = response.headers.get("X-Images-Used");
//       const limit = response.headers.get("X-Images-Limit");
//       if (used && limit && currentUser) {
//         currentUser.images_used = parseInt(used);
//         const displayLimit = limit === "-1" ? "∞" : limit;
//         document.getElementById("usageText").textContent = `${used}/${displayLimit}`;
//       }

//       // Show result with checkerboard (shows transparency)
//       resultBox.innerHTML = `
//         <div class="relative w-full h-full rounded-3xl overflow-hidden"
//              style="background-image: linear-gradient(45deg, #e5e5e5 25%, transparent 25%),
//                                       linear-gradient(-45deg, #e5e5e5 25%, transparent 25%),
//                                       linear-gradient(45deg, transparent 75%, #e5e5e5 75%),
//                                       linear-gradient(-45deg, transparent 75%, #e5e5e5 75%);
//                     background-size: 20px 20px;
//                     background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
//                     background-color: #f5f5f5;">
//           <img src="${removedURL}" class="w-full h-full object-contain" />
//           <div class="absolute bottom-4 right-4">
//             <div class="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-semibold">Clean Cut ✓</div>
//           </div>
//         </div>
//       `;

//       downloadBtn.href = removedURL;
//       downloadBtn.download = "removed-background.png";
//       downloadBtn.classList.remove("hidden");
//       downloadBtn.classList.add("flex");

//     } catch (err) {
//       console.error(err);
//       resultBox.innerHTML = `
//         <div class="text-red-400 text-center">
//           <span class="material-symbols-outlined text-5xl mb-3">error</span>
//           <p class="font-medium">Failed to process</p>
//           <p class="text-sm mt-1">Please try again</p>
//         </div>
//       `;
//     } finally {
//       processBtn.disabled = false;
//       processBtn.classList.remove("opacity-50");
//     }
//   });
// }

// // ─── PASTE ───────────────────────────────────────────────────────────────────

// document.addEventListener("paste", (event) => {
//   if (!currentUser) {
//     openAuthModal("register");
//     return;
//   }
//   const items = event.clipboardData.items;
//   for (const item of items) {
//     if (item.type.indexOf("image") !== -1) {
//       const file = item.getAsFile();
//       uploadedImage = file;
//       showPreview(file);
//     }
//   }
// });
// const API = "https://scaleai-production-4db1.up.railway.app";

// // const API = "http://127.0.0.1:8000";
// const GOOGLE_CLIENT_ID = "667340206192-na2o3d4h5n0dr7lld6knpd40qrktcalq.apps.googleusercontent.com";

// // ─── STATE ───────────────────────────────────────────────────────────────────

// let currentUser = null;
// let uploadedImage = null;
// let googleAuthInitialized = false;

// // ─── ELEMENTS ────────────────────────────────────────────────────────────────

// const uploadBtn        = document.getElementById("uploadBtn");
// const fileInput        = document.getElementById("imageUpload");
// const authModal        = document.getElementById("authModal");
// const authBackdrop     = document.getElementById("authBackdrop");
// const closeAuthModal   = document.getElementById("closeAuthModal");
// const upgradeModal     = document.getElementById("upgradeModal");
// const upgradeBackdrop  = document.getElementById("upgradeBackdrop");
// const closeUpgradeModal= document.getElementById("closeUpgradeModal");
// const upgradeBtn       = document.getElementById("upgradeBtn");
// const tabLogin         = document.getElementById("tabLogin");
// const tabRegister      = document.getElementById("tabRegister");
// const authSubmit       = document.getElementById("authSubmit");
// const authError        = document.getElementById("authError");
// const nameField        = document.getElementById("nameField");
// const headerLoggedOut  = document.getElementById("headerLoggedOut");
// const headerLoggedIn   = document.getElementById("headerLoggedIn");
// const headerLoginBtn   = document.getElementById("headerLoginBtn");
// const headerSignupBtn  = document.getElementById("headerSignupBtn");
// const headerUpgradeBtn = document.getElementById("headerUpgradeBtn");
// const avatarBtn        = document.getElementById("avatarBtn");
// const userDropdown     = document.getElementById("userDropdown");
// const logoutBtn        = document.getElementById("logoutBtn");
// const googleAuthBtn    = document.getElementById("googleAuthBtn");

// // ─── AUTH MODAL ──────────────────────────────────────────────────────────────

// let authMode = "login"; // "login" | "register"

// function openAuthModal(mode = "login") {
//   authMode = mode;
//   authModal.classList.remove("hidden");
//   authError.classList.add("hidden");
//   document.getElementById("authEmail").value = "";
//   document.getElementById("authPassword").value = "";
//   document.getElementById("authName").value = "";
//   setAuthTab(mode);
// }

// function closeAuth() {
//   authModal.classList.add("hidden");
// }

// function setAuthTab(mode) {
//   authMode = mode;
//   if (mode === "login") {
//     tabLogin.classList.add("text-secondary", "border-secondary");
//     tabLogin.classList.remove("text-gray-400", "border-transparent");
//     tabRegister.classList.remove("text-secondary", "border-secondary");
//     tabRegister.classList.add("text-gray-400", "border-transparent");
//     nameField.classList.add("hidden");
//     authSubmit.textContent = "Log In";
//   } else {
//     tabRegister.classList.add("text-secondary", "border-secondary");
//     tabRegister.classList.remove("text-gray-400", "border-transparent");
//     tabLogin.classList.remove("text-secondary", "border-secondary");
//     tabLogin.classList.add("text-gray-400", "border-transparent");
//     nameField.classList.remove("hidden");
//     authSubmit.textContent = "Create Account";
//   }
// }

// tabLogin.addEventListener("click", () => setAuthTab("login"));
// tabRegister.addEventListener("click", () => setAuthTab("register"));
// closeAuthModal.addEventListener("click", closeAuth);
// authBackdrop.addEventListener("click", closeAuth);
// headerLoginBtn.addEventListener("click", () => openAuthModal("login"));
// headerSignupBtn.addEventListener("click", () => openAuthModal("register"));

// // ─── EMAIL AUTH ──────────────────────────────────────────────────────────────

// authSubmit.addEventListener("click", async () => {
//   const email    = document.getElementById("authEmail").value.trim();
//   const password = document.getElementById("authPassword").value;
//   const name     = document.getElementById("authName").value.trim();

//   if (!email || !password) {
//     showAuthError("Please fill in all fields");
//     return;
//   }

//   authSubmit.disabled = true;
//   authSubmit.textContent = "Please wait...";

//   try {
//     const endpoint = authMode === "login" ? "/auth/login" : "/auth/register";
//     const body = authMode === "login"
//       ? { email, password }
//       : { email, password, name };

//     const res = await fetch(API + endpoint, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(body)
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       showAuthError(data.detail || "Something went wrong");
//       return;
//     }

//     localStorage.setItem("clarify_token", data.token);
//     setUser(data.user);
//     closeAuth();

//   } catch (err) {
//     showAuthError("Network error. Please try again.");
//   } finally {
//     authSubmit.disabled = false;
//     authSubmit.textContent = authMode === "login" ? "Log In" : "Create Account";
//   }
// });

// function showAuthError(msg) {
//   authError.textContent = msg;
//   authError.classList.remove("hidden");
// }

// // ─── GOOGLE AUTH (requires Google Identity Services script) ──────────────────
// googleAuthBtn.addEventListener("click", () => {
//   if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
//     showAuthError("Google Sign-In is not configured yet.");
//     return;
//   }

//   const client = window.google.accounts.oauth2.initTokenClient({
//     client_id: GOOGLE_CLIENT_ID,
//     scope: "email profile openid",
//     callback: async (tokenResponse) => {
//       if (tokenResponse.error) {
//         showAuthError("Google Sign-In failed.");
//         return;
//       }
//       googleAuthBtn.disabled = true;
//       try {
//         const res = await fetch(API + "/auth/google-token", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ access_token: tokenResponse.access_token })
//         });
//         const data = await res.json();
//         if (!res.ok) { showAuthError(data.detail || "Google Sign-In failed."); return; }
//         localStorage.setItem("clarify_token", data.token);
//         setUser(data.user);
//         closeAuth();
//       } catch (e) {
//         showAuthError("Network error. Please try again.");
//       } finally {
//         googleAuthBtn.disabled = false;
//       }
//     }
//   });
//   client.requestAccessToken();
// });
// // googleAuthBtn.addEventListener("click", () => {
// //   if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
// //     showAuthError("Google Sign-In is not configured yet.");
// //     return;
// //   }

// //   if (!window.google?.accounts?.id) {
// //     showAuthError("Google Sign-In is still loading, please wait.");
// //     return;
// //   }

// //   window.google.accounts.id.prompt();
// // });

// // async function handleGoogleCredentialResponse(response) {
// //   const credential = response?.credential;
// //   if (!credential) {
// //     showAuthError("Google Sign-In failed. Please try again.");
// //     return;
// //   }

// //   googleAuthBtn.disabled = true;
// //   try {
// //     const res = await fetch(API + "/auth/google", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ credential })
// //     });

// //     const data = await res.json();
// //     if (!res.ok) {
// //       showAuthError(data.detail || "Google Sign-In failed.");
// //       return;
// //     }

// //     localStorage.setItem("clarify_token", data.token);
// //     setUser(data.user);
// //     closeAuth();
// //   } catch (err) {
// //     showAuthError("Network error. Please try again.");
// //   } finally {
// //     googleAuthBtn.disabled = false;
// //   }
// // }

// // function initGoogleAuth() {
// //   if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
// //     return;
// //   }

// //   if (!window.google?.accounts?.id) {
// //     return;
// //   }

// //   if (googleAuthInitialized) {
// //     return;
// //   }

// //   window.google.accounts.id.initialize({
// //     client_id: GOOGLE_CLIENT_ID,
// //     callback: handleGoogleCredentialResponse,
// //     cancel_on_tap_outside: true,
// //   });
// //   googleAuthInitialized = true;
// // }

// // function ensureGoogleAuthReady() {
// //   initGoogleAuth();
// //   if (googleAuthInitialized) {
// //     return;
// //   }

// //   const interval = setInterval(() => {
// //     if (window.google?.accounts?.id) {
// //       initGoogleAuth();
// //       if (googleAuthInitialized) {
// //         clearInterval(interval);
// //       }
// //     }
// //   }, 100);

// //   setTimeout(() => clearInterval(interval), 5000);
// // }

// // if (document.readyState === "complete" || document.readyState === "interactive") {
// //   ensureGoogleAuthReady();
// // } else {
// //   document.addEventListener("DOMContentLoaded", () => {
// //     ensureGoogleAuthReady();
// //   });
// // }

// // ─── USER STATE ──────────────────────────────────────────────────────────────

// function setUser(user) {
//   currentUser = user;
//   headerLoggedOut.classList.add("hidden");
//   headerLoggedIn.classList.remove("hidden");

//   // Avatar
//   if (user.avatar) {
//     document.getElementById("avatarImg").src = user.avatar;
//     document.getElementById("avatarImg").classList.remove("hidden");
//     document.getElementById("avatarInitial").classList.add("hidden");
//   } else {
//     document.getElementById("avatarInitial").textContent =
//       (user.name || user.email || "U")[0].toUpperCase();
//   }

//   // Dropdown info
//   document.getElementById("dropdownName").textContent = user.name || "User";
//   document.getElementById("dropdownEmail").textContent = user.email;
//   document.getElementById("dropdownPlan").textContent =
//     user.plan === "pro" ? "✦ Pro" : "Free";

//   // Usage pill
//   const limit = user.images_limit === -1 ? "∞" : user.images_limit;
//   document.getElementById("usageText").textContent = `${user.images_used}/${limit}`;

//   // Upgrade button (free users only)
//   if (user.plan === "free") {
//     headerUpgradeBtn.classList.remove("hidden");
//   } else {
//     headerUpgradeBtn.classList.add("hidden");
//   }
// }

// function clearUser() {
//   currentUser = null;
//   localStorage.removeItem("clarify_token");
//   headerLoggedOut.classList.remove("hidden");
//   headerLoggedIn.classList.add("hidden");
// }

// // ─── AVATAR DROPDOWN ─────────────────────────────────────────────────────────

// avatarBtn.addEventListener("click", (e) => {
//   e.stopPropagation();
//   userDropdown.classList.toggle("hidden");
// });

// document.addEventListener("click", () => {
//   userDropdown.classList.add("hidden");
// });

// logoutBtn.addEventListener("click", () => {
//   clearUser();
//   userDropdown.classList.add("hidden");
// });

// // ─── UPGRADE MODAL ───────────────────────────────────────────────────────────

// function openUpgradeModal() {
//   upgradeModal.classList.remove("hidden");
// }

// function closeUpgrade() {
//   upgradeModal.classList.add("hidden");
// }

// closeUpgradeModal.addEventListener("click", closeUpgrade);
// upgradeBackdrop.addEventListener("click", closeUpgrade);
// headerUpgradeBtn.addEventListener("click", openUpgradeModal);

// upgradeBtn.addEventListener("click", async () => {
//   // Placeholder — wire Stripe here
//   const res = await fetch(API + "/upgrade", {
//     method: "POST",
//     headers: { Authorization: `Bearer ${localStorage.getItem("clarify_token")}` }
//   });
//   const data = await res.json();
//   alert(data.message);
// });

// // ─── SESSION RESTORE ─────────────────────────────────────────────────────────

// async function restoreSession() {
//   const token = localStorage.getItem("clarify_token");
//   if (!token) return;
//   try {
//     const res = await fetch(API + "/auth/me", {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     if (res.ok) {
//       const user = await res.json();
//       setUser(user);
//     } else {
//       localStorage.removeItem("clarify_token");
//     }
//   } catch (_) {}
// }

// restoreSession();

// // ─── UPLOAD FLOW ─────────────────────────────────────────────────────────────

// uploadBtn.addEventListener("click", () => {
//   if (!currentUser) {
//     openAuthModal("register");
//     return;
//   }
//   fileInput.click();
// });

// fileInput.addEventListener("change", (event) => {
//   const file = event.target.files[0];
//   if (!file) return;
//   uploadedImage = file;
//   showPreview(file);
// });

// function showPreview(file) {
//   const uploadContainer = uploadBtn.closest
//     ? uploadBtn.closest("#uploadCard") || uploadBtn.parentElement
//     : uploadBtn.parentElement;

//   const reader = new FileReader();

//   reader.onload = function (e) {
//     uploadContainer.innerHTML = `
//       <div class="w-full h-full flex flex-col">
//         <div class="grid grid-cols-2 gap-4 flex-1">
//           <!-- ORIGINAL -->
//           <div class="relative rounded-3xl overflow-hidden bg-gray-100">
//             <img id="originalPreview" src="${e.target.result}" class="w-full h-full object-cover" />
//             <div class="absolute bottom-4 left-4">
//               <div class="bg-black/60 text-white px-4 py-2 rounded-xl text-sm font-semibold">Original</div>
//             </div>
//           </div>
//           <!-- RESULT -->
//           <div id="resultBox" class="relative rounded-3xl overflow-hidden bg-gray-100 flex items-center justify-center">
//             <div id="placeholder" class="text-gray-400 text-center">
//               <span class="material-symbols-outlined text-6xl mb-3">image</span>
//               <p class="text-lg">Processed image</p>
//             </div>
//           </div>
//         </div>
//         <!-- ACTIONS -->
//         <div class="flex items-center justify-center gap-4 mt-6">
//           <button id="processBtn" class="bg-secondary text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 hover:bg-blue-700 transition">
//             <span class="material-symbols-outlined">auto_awesome</span>
//             Remove Background
//           </button>
//           <a id="downloadBtn" class="hidden bg-black text-white px-8 py-4 rounded-2xl font-semibold items-center gap-3 hover:bg-gray-800 transition">
//             <span class="material-symbols-outlined">download</span>
//             Download
//           </a>
//         </div>
//         <p id="loadingText" class="text-center text-gray-500 mt-4 text-sm"></p>
//       </div>
//     `;

//     const processBtn   = document.getElementById("processBtn");
//     const resultBox    = document.getElementById("resultBox");
//     const loadingText  = document.getElementById("loadingText");
//     const downloadBtn  = document.getElementById("downloadBtn");

//     processBtn.addEventListener("click", async () => {
//       if (!currentUser) {
//         openAuthModal("login");
//         return;
//       }

//       try {
//         processBtn.disabled = true;
//         loadingText.textContent = "Processing image...";

//         const formData = new FormData();
//         formData.append("file", uploadedImage);

//         const token = localStorage.getItem("clarify_token");
//         const response = await fetch(API + "/remove-bg", {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//           body: formData
//         });

//         // Handle limit exceeded
//         if (response.status === 429) {
//           const err = await response.json();
//           loadingText.textContent = "";
//           openUpgradeModal();
//           return;
//         }

//         if (!response.ok) throw new Error("Failed to process");

//         const blob = await response.blob();
//         const removedURL = URL.createObjectURL(blob);

//         // Update usage counter from response headers
//         const used  = response.headers.get("X-Images-Used");
//         const limit = response.headers.get("X-Images-Limit");
//         const plan  = response.headers.get("X-Plan");
//         if (used && limit && currentUser) {
//           currentUser.images_used = parseInt(used);
//           const displayLimit = limit === "-1" ? "∞" : limit;
//           document.getElementById("usageText").textContent = `${used}/${displayLimit}`;
//         }

//         resultBox.innerHTML = `
//           <img src="${removedURL}" class="w-full h-full object-cover" />
//           <div class="absolute bottom-4 right-4">
//             <div class="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-semibold">Clean Cut</div>
//           </div>
//         `;

//         downloadBtn.href = removedURL;
//         downloadBtn.download = "removed-background.png";
//         downloadBtn.classList.remove("hidden");
//         downloadBtn.classList.add("flex");
//         loadingText.textContent = "Background removed successfully ✓";

//       } catch (err) {
//         console.error(err);
//         loadingText.textContent = "Failed to remove background. Try again.";
//       } finally {
//         processBtn.disabled = false;
//       }
//     });
//   };

//   reader.readAsDataURL(file);
// }

// // ─── PASTE ───────────────────────────────────────────────────────────────────

// document.addEventListener("paste", (event) => {
//   if (!currentUser) {
//     openAuthModal("register");
//     return;
//   }
//   const items = event.clipboardData.items;
//   for (const item of items) {
//     if (item.type.indexOf("image") !== -1) {
//       const file = item.getAsFile();
//       uploadedImage = file;
//       showPreview(file);
//     }
//   }
// });
const API = "https://scaleai-production-4db1.up.railway.app";

// const API = "http://127.0.0.1:8000";
const GOOGLE_CLIENT_ID = "667340206192-na2o3d4h5n0dr7lld6knpd40qrktcalq.apps.googleusercontent.com";

// ─── STATE ───────────────────────────────────────────────────────────────────

let currentUser = null;

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

let authMode = "login";

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

// ─── GOOGLE AUTH ──────────────────────────────────────────────────────────────

googleAuthBtn.addEventListener("click", () => {
  if (!GOOGLE_CLIENT_ID || GOOGLE_CLIENT_ID === "YOUR_GOOGLE_CLIENT_ID") {
    showAuthError("Google Sign-In is not configured yet.");
    return;
  }

  const client = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CLIENT_ID,
    scope: "email profile openid",
    callback: async (tokenResponse) => {
      if (tokenResponse.error) {
        showAuthError("Google Sign-In failed.");
        return;
      }
      googleAuthBtn.disabled = true;
      try {
        const res = await fetch(API + "/auth/google-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ access_token: tokenResponse.access_token })
        });
        const data = await res.json();
        if (!res.ok) { showAuthError(data.detail || "Google Sign-In failed."); return; }
        localStorage.setItem("clarify_token", data.token);
        setUser(data.user);
        closeAuth();
      } catch (e) {
        showAuthError("Network error. Please try again.");
      } finally {
        googleAuthBtn.disabled = false;
      }
    }
  });
  client.requestAccessToken();
});

// ─── USER STATE ──────────────────────────────────────────────────────────────

function setUser(user) {
  currentUser = user;
  headerLoggedOut.classList.add("hidden");
  headerLoggedIn.classList.remove("hidden");

  if (user.avatar) {
    document.getElementById("avatarImg").src = user.avatar;
    document.getElementById("avatarImg").classList.remove("hidden");
    document.getElementById("avatarInitial").classList.add("hidden");
  } else {
    document.getElementById("avatarInitial").textContent =
      (user.name || user.email || "U")[0].toUpperCase();
  }

  document.getElementById("dropdownName").textContent = user.name || "User";
  document.getElementById("dropdownEmail").textContent = user.email;
  document.getElementById("dropdownPlan").textContent =
    user.plan === "pro" ? "✦ Pro" : "Free";

  const limit = user.images_limit === -1 ? "∞" : user.images_limit;
  document.getElementById("usageText").textContent = `${user.images_used}/${limit}`;

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
  if (!currentUser) { openAuthModal("register"); return; }
  fileInput.click();
});

fileInput.addEventListener("change", (e) => {
  if (!e.target.files.length) return;
  addFilesToQueue([...e.target.files]);
  fileInput.value = "";
});

// "Add More" button wired after panel renders
document.getElementById("addMoreBtn").addEventListener("click", () => {
  if (!currentUser) { openAuthModal("register"); return; }
  fileInput.click();
});

// ─── DRAG & DROP on upload card ──────────────────────────────────────────────

const uploadCard = document.getElementById("uploadCard");

uploadCard.addEventListener("dragover", (e) => {
  e.preventDefault();
  uploadCard.classList.add("border-secondary", "bg-blue-50");
});
uploadCard.addEventListener("dragleave", () => {
  uploadCard.classList.remove("border-secondary", "bg-blue-50");
});
uploadCard.addEventListener("drop", (e) => {
  e.preventDefault();
  uploadCard.classList.remove("border-secondary", "bg-blue-50");
  if (!currentUser) { openAuthModal("register"); return; }
  const files = [...e.dataTransfer.files].filter(f => f.type.startsWith("image/"));
  if (files.length) addFilesToQueue(files);
});

// ─── PASTE ───────────────────────────────────────────────────────────────────

document.addEventListener("paste", (e) => {
  if (!currentUser) { openAuthModal("register"); return; }
  const files = [...e.clipboardData.items]
    .filter(i => i.type.startsWith("image/"))
    .map(i => i.getAsFile());
  if (files.length) addFilesToQueue(files);
});

// ─── QUEUE STATE ─────────────────────────────────────────────────────────────

// Each item: { id, file, status: "pending"|"processing"|"done"|"error"|"skipped", resultURL, cardEl }
let queue = [];
let isProcessing = false;

function addFilesToQueue(files) {
  const bulkPanel  = document.getElementById("bulkPanel");
  const uploadSection = document.getElementById("uploadCard");

  files.forEach(file => {
    const id = Date.now() + Math.random();
    const item = { id, file, status: "pending", resultURL: null, cardEl: null };
    queue.push(item);
    item.cardEl = createQueueCard(item);
    document.getElementById("queueGrid").appendChild(item.cardEl);
  });

  // Show bulk panel, shrink upload card
  bulkPanel.classList.remove("hidden");
  uploadSection.classList.add("hidden");

  updateQueueSummary();
}

function createQueueCard(item) {
  const card = document.createElement("div");
  card.className = "relative bg-white border border-gray-200 rounded-3xl overflow-hidden floating-shadow group";
  card.dataset.id = item.id;

  const reader = new FileReader();
  reader.onload = (e) => {
    card.innerHTML = `
      <div class="relative">
        <!-- THUMBNAIL -->
        <div class="w-full aspect-square bg-gray-100 overflow-hidden">
          <img src="${e.target.result}" class="w-full h-full object-cover" />
        </div>

        <!-- STATUS OVERLAY -->
        <div class="status-overlay absolute inset-0 flex items-center justify-center bg-black/0 transition-all"></div>

        <!-- REMOVE BUTTON -->
        <button class="remove-btn absolute top-2 right-2 w-7 h-7 bg-black/60 text-white rounded-full items-center justify-center hidden group-hover:flex transition hover:bg-red-500">
          <span class="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      <!-- FOOTER -->
      <div class="p-3">
        <p class="text-xs text-gray-500 truncate">${item.file.name}</p>
        <div class="status-badge mt-1 flex items-center gap-1 text-xs font-medium text-gray-400">
          <span class="material-symbols-outlined text-sm">schedule</span> Pending
        </div>
      </div>
    `;

    // Remove button
    card.querySelector(".remove-btn").addEventListener("click", () => removeFromQueue(item.id));
  };
  reader.readAsDataURL(item.file);

  return card;
}

function removeFromQueue(id) {
  queue = queue.filter(i => i.id !== id);
  const card = document.querySelector(`[data-id="${id}"]`);
  if (card) card.remove();
  updateQueueSummary();

  // If queue emptied, go back to upload state
  if (queue.length === 0) resetToUploadState();
}

function resetToUploadState() {
  document.getElementById("bulkPanel").classList.add("hidden");
  document.getElementById("uploadCard").classList.remove("hidden");
  document.getElementById("downloadAllBtn").classList.add("hidden");
  document.getElementById("progressBarWrap").classList.add("hidden");
  document.getElementById("queueGrid").innerHTML = "";
  queue = [];
}

function updateQueueSummary() {
  const total   = queue.length;
  const done    = queue.filter(i => i.status === "done").length;
  const pending = queue.filter(i => i.status === "pending").length;
  const errors  = queue.filter(i => i.status === "error").length;

  const summaryEl = document.getElementById("queueSummary");
  if (done === total && total > 0) {
    summaryEl.textContent = `All ${total} images processed${errors ? ` (${errors} failed)` : ""}`;
  } else {
    summaryEl.textContent = `${total} image${total !== 1 ? "s" : ""} — ${done} done, ${pending} pending${errors ? `, ${errors} failed` : ""}`;
  }

  // Show Download All if any done
  const dlBtn = document.getElementById("downloadAllBtn");
  if (done > 0) {
    dlBtn.classList.remove("hidden");
    dlBtn.classList.add("flex");
  } else {
    dlBtn.classList.add("hidden");
  }
}

function setCardStatus(item, status, resultURL = null) {
  item.status = status;
  if (resultURL) item.resultURL = resultURL;

  const card = item.cardEl;
  if (!card) return;

  const overlay = card.querySelector(".status-overlay");
  const badge   = card.querySelector(".status-badge");
  const thumb   = card.querySelector(".aspect-square img");

  // Clear overlay
  overlay.className = "status-overlay absolute inset-0 flex items-center justify-center transition-all";

  if (status === "processing") {
    overlay.classList.add("bg-black/30");
    overlay.innerHTML = `<div class="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin"></div>`;
    badge.innerHTML = `<span class="material-symbols-outlined text-sm text-secondary">sync</span> <span class="text-secondary">Processing…</span>`;

  } else if (status === "done") {
    // Swap thumbnail to result (checkerboard bg on card)
    card.querySelector(".aspect-square").style.cssText =
      "background-image: linear-gradient(45deg,#e5e5e5 25%,transparent 25%),linear-gradient(-45deg,#e5e5e5 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e5e5e5 75%),linear-gradient(-45deg,transparent 75%,#e5e5e5 75%);background-size:20px 20px;background-position:0 0,0 10px,10px -10px,-10px 0;background-color:#f5f5f5;";
    if (thumb) thumb.src = resultURL;
    overlay.innerHTML = ``;
    badge.innerHTML = `<span class="material-symbols-outlined text-sm text-green-500">check_circle</span> <span class="text-green-600">Done</span>`;

    // Individual download button
    const footer = card.querySelector(".p-3");
    if (!footer.querySelector(".dl-single")) {
      const dlBtn = document.createElement("a");
      dlBtn.href = resultURL;
      dlBtn.download = "removed-" + item.file.name.replace(/\.[^.]+$/, ".png");
      dlBtn.className = "dl-single mt-2 flex items-center gap-1 text-xs text-secondary font-semibold hover:underline";
      dlBtn.innerHTML = `<span class="material-symbols-outlined text-sm">download</span> Download`;
      footer.appendChild(dlBtn);
    }

  } else if (status === "error") {
    overlay.classList.add("bg-red-500/20");
    overlay.innerHTML = `<span class="material-symbols-outlined text-red-400 text-3xl">error</span>`;
    badge.innerHTML = `<span class="material-symbols-outlined text-sm text-red-400">error</span> <span class="text-red-400">Failed</span>`;

  } else if (status === "skipped") {
    overlay.classList.add("bg-orange-400/20");
    overlay.innerHTML = `<span class="material-symbols-outlined text-orange-400 text-3xl">block</span>`;
    badge.innerHTML = `<span class="material-symbols-outlined text-sm text-orange-400">block</span> <span class="text-orange-400">Limit reached</span>`;
  }
}

// ─── PROCESS ALL ─────────────────────────────────────────────────────────────

document.getElementById("processAllBtn").addEventListener("click", async () => {
  if (!currentUser) { openAuthModal("login"); return; }
  if (isProcessing) return;

  const pending = queue.filter(i => i.status === "pending" || i.status === "error");
  if (!pending.length) return;

  isProcessing = true;
  document.getElementById("processAllBtn").disabled = true;
  document.getElementById("processAllBtn").classList.add("opacity-50");

  const progressWrap  = document.getElementById("progressBarWrap");
  const progressBar   = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");
  const progressCount = document.getElementById("progressCount");

  progressWrap.classList.remove("hidden");

  let completed = 0;
  const total = pending.length;

  for (const item of pending) {
    setCardStatus(item, "processing");
    progressLabel.textContent = `Processing ${item.file.name}…`;
    progressCount.textContent = `${completed}/${total}`;

    try {
      const formData = new FormData();
      formData.append("file", item.file);

      const token = localStorage.getItem("clarify_token");
      const response = await fetch(API + "/remove-bg", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      if (response.status === 429) {
        setCardStatus(item, "skipped");
        // Mark remaining pending as skipped too
        queue.filter(i => i.status === "pending").forEach(i => setCardStatus(i, "skipped"));
        openUpgradeModal();
        break;
      }

      if (!response.ok) throw new Error("Server error");

      const blob = await response.blob();
      const url  = URL.createObjectURL(blob);
      setCardStatus(item, "done", url);

      // Update usage counter
      const used  = response.headers.get("X-Images-Used");
      const limit = response.headers.get("X-Images-Limit");
      if (used && limit && currentUser) {
        currentUser.images_used = parseInt(used);
        const displayLimit = limit === "-1" ? "∞" : limit;
        document.getElementById("usageText").textContent = `${used}/${displayLimit}`;
      }

    } catch (err) {
      console.error(err);
      setCardStatus(item, "error");
    }

    completed++;
    const pct = Math.round((completed / total) * 100);
    progressBar.style.width = pct + "%";
    progressCount.textContent = `${completed}/${total}`;
    updateQueueSummary();
  }

  progressLabel.textContent = "Done!";
  isProcessing = false;
  document.getElementById("processAllBtn").disabled = false;
  document.getElementById("processAllBtn").classList.remove("opacity-50");
  updateQueueSummary();
});

// ─── DOWNLOAD ALL AS ZIP ─────────────────────────────────────────────────────

document.getElementById("downloadAllBtn").addEventListener("click", async () => {
  const done = queue.filter(i => i.status === "done" && i.resultURL);
  if (!done.length) return;

  const dlBtn = document.getElementById("downloadAllBtn");
  dlBtn.textContent = "Preparing ZIP…";
  dlBtn.classList.add("opacity-70");

  try {
    // Load JSZip from CDN
    if (!window.JSZip) {
      await new Promise((resolve, reject) => {
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }

    const zip = new window.JSZip();
    const folder = zip.folder("clarify-removed");

    await Promise.all(done.map(async (item) => {
      const res  = await fetch(item.resultURL);
      const blob = await res.blob();
      const name = "removed-" + item.file.name.replace(/\.[^.]+$/, ".png");
      folder.file(name, blob);
    }));

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(zipBlob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = "clarify-images.zip";
    a.click();
    URL.revokeObjectURL(url);

  } catch (err) {
    console.error(err);
    alert("Failed to create ZIP. Try downloading images individually.");
  } finally {
    dlBtn.innerHTML = `<span class="material-symbols-outlined text-base">download</span> Download All (ZIP)`;
    dlBtn.classList.remove("opacity-70");
  }
});