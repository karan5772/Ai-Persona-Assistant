# ☕ Chai With AI Buddies

A small web app where you can pick an AI persona (currently **Hitesh Choudhary** or **Piyush Garg**) and chat with them in a simple chat UI.

The project is split into:

- **Frontend** – static HTML/CSS/JS (no framework)
- **Backend** – Node.js API that returns persona-specific responses

---

## Features

- Persona selection page
  - Click a card to choose Hitesh or Piyush
  - Redirects to a dedicated chat page with that persona’s name and avatar
- Chat interface
  - Shows selected persona at the top
  - Scrollable message history area
  - Input box with “Send” button
- Backend integration
  - Frontend sends user messages to `http://localhost:3000/api/chat`
  - Backend returns a reply which is rendered in the chat

---

## Tech Stack

- **Frontend**

  - HTML: `index.html`, `chat.html`
  - CSS: `styles.css`, `chat.css`
  - JS: `script.js`, `chat.js`

- **Backend**
  - Node.js
  - Express (for HTTP API)
  - (Pluggable) LLM client in `backend/hitesh_persona.js`
    > You should configure either OpenAI or Gemini correctly here.

---

## Project Structure

```text
Persona AI/
├─ index.html          # Persona selection page
├─ chat.html           # Chat UI
├─ styles.css          # Styles for index.html
├─ chat.css            # Styles for chat.html
├─ script.js           # Persona selection logic (navigation to chat.html)
├─ chat.js             # Chat UI logic + fetch to backend
├─ backend/
│  ├─ index.js         # Express server (exposes POST /api/chat)
│  ├─ hitesh_persona.js# Persona/LLM logic
│  └─ package.json
└─ .gitignore
```

---

## Setup

### 1. Clone and install backend

From the project root:

```bash
cd backend
npm install
```

### 2. Configure environment variables

Create `backend/.env`:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

Then in `backend/hitesh_persona.js`, make sure you use:

### 3. Run the backend

From `backend/`:

```bash
npm start
# or
node index.js
```

The API should be available at:

```text
http://localhost:3000/api/chat
```

---

## Running the Frontend

You can open the frontend directly or via a static server.

### Option A – Open directly

Just open `index.html` in your browser:

```text
/Users/karanchoudhary/Developer/Persona AI/index.html
```

Click on a persona card to navigate to `chat.html` and start chatting.  
`chat.js` sends POST requests to `http://localhost:3000/api/chat`.

> Make sure the backend is running; otherwise you’ll see network errors.

### Option B – Serve via a local static server (recommended)

From the project root:

```bash
npx serve .
# or any static server you prefer
```

Then open the URL it prints (e.g. `http://localhost:5000`) and navigate to `/index.html`.

---

## How the Chat Flow Works

1. **Select persona** on `index.html`  
   `script.js` adds click handlers to `.buddy-card` elements:

   - It reads persona info from a local array
   - Redirects to `chat.html?name=...&img=...`

2. **Populate chat header** on `chat.html`  
   `chat.js`:

   - Reads `name` and `img` from `window.location.search`
   - Sets `#personaName` and `#personaImg`
   - Shows an initial greeting message

3. **Send message** from user

   - On form submit:
     - Adds a right-aligned bubble with user text
     - Calls `getPersonaReply(message, personaName)`

4. **Backend request**

   ```js
   async function getPersonaReply(userMsg, personaName) {
     const res = await fetch("http://localhost:3000/api/chat", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ message: userMsg, persona: personaName }),
     });
     const data = await res.json();
     return data.reply;
   }
   ```

   - This hits `POST /api/chat` in `backend/index.js`
   - `index.js` calls persona logic in `hitesh_persona.js`
   - Returns `{ reply: "..." }` JSON

5. **Render reply**

   - `chat.js` takes `data.reply`
   - Renders a left-aligned bubble with the persona’s response

---

## Notes / Gotchas

- Ensure your backend LLM configuration (`hitesh_persona.js`) is **consistent** with the provider you use:
  - For OpenAI: use OpenAI SDK + OpenAI key + OpenAI endpoint.
  - For Gemini: use Gemini SDK + Gemini key + Gemini endpoints.
- Keep your API keys **only in backend `.env`**, never in frontend JS.
- If you change the backend port or path, also update the URL in `chat.js`.

---
