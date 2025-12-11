document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name") || "Persona";
  const img = params.get("img") || "";

  const nameElem = document.getElementById("personaName");
  const imgElem = document.getElementById("personaImg");
  if (nameElem) nameElem.textContent = name;
  if (imgElem && img) imgElem.src = img;

  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");

  if (chatMessages) {
    chatMessages.innerHTML = "";
    const greet = document.createElement("div");
    greet.className = "message left";
    greet.innerHTML = `<div class="bubble">Hi! I'm ${name}. How can I help you today?</div>`;
    chatMessages.appendChild(greet);
  }

  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const msg = chatInput.value.trim();
      if (!msg) return;

      const userMsg = document.createElement("div");
      userMsg.className = "message right";
      userMsg.innerHTML = `<div class="bubble">${escapeHTML(msg)}</div>`;
      chatMessages.appendChild(userMsg);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;

      const replyText = await getPersonaReply(msg, name);
      const reply = document.createElement("div");
      reply.className = "message left";
      reply.innerHTML = `<div class="bubble">${escapeHTML(replyText)}</div>`;
      chatMessages.appendChild(reply);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  }

  async function getPersonaReply(userMsg, personaName) {
    const res = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg, persona: personaName }),
    });
    const data = await res.json();
    return data.reply;
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[c];
    });
  }
});
