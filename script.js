// 1. Page Navigation
document.querySelectorAll(".sidebar a").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    // Active tab switch
    document.querySelectorAll(".sidebar a").forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    const page = link.dataset.page;
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(`${page}Section`).classList.remove("hidden");
    document.getElementById("pageTitle").textContent = page.charAt(0).toUpperCase() + page.slice(1);
  });
});

// 2. Theme Toggle (Dark/Light)
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light");
  showToast(`Switched to ${document.body.classList.contains("light") ? "Light" : "Dark"} Mode`);
});

// 3. API Send Button
const sendBtn = document.getElementById("sendBtn");
const input = document.getElementById("textInput");
const output = document.getElementById("output");

sendBtn.addEventListener("click", async () => {
  const text = input.value.trim();
  if (!text) return showToast("Input cannot be empty!");

  showToast("Sending request...");
  try {
    // Replace this with your actual API endpoint:
    const res = await fetch("https://api.example.com/ai?text=" + encodeURIComponent(text));
    const data = await res.json();
    output.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    output.textContent = "// ERROR: " + err.message;
    showToast("Failed to fetch API", true);
  }
});

// 4. Toast System
function showToast(msg, isError = false) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = "toast";
  if (isError) toast.style.borderLeftColor = "red";
  toast.textContent = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => container.removeChild(toast), 500);
  }, 3000);
}