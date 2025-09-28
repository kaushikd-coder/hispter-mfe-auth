# Auth App – Authentication & User Management (React + TypeScript + Module Federation)

This repository contains the **auth micro‑frontend** for the pluggable architecture. It handles **login, logout, and user profile management**, exposes key components to the host, and broadcasts session state for cross‑app communication.

---

## ✨ Features

* **Login & Logout** UI and flow
* **User Profile** component (avatar, name, email)
* **Event‑driven session sharing** with other MFEs
* **Module Federation exposes** for host consumption
* **Tailwind CSS** styling for modern UI

---

## 🧱 Tech Stack

* **React 18 + TypeScript**
* **Webpack 5 Module Federation**
* **Tailwind CSS**

---

## 📁 Folder Structure (auth-app)

```
├─ public/
│  └─ index.html
├─ src/
│  ├─ components/
│  │   ├─ Login.tsx
│  │   └─ UserProfile.tsx
│  ├─ useAuth.ts               # internal hook for state
│  ├─ bootstrap.tsx            # React root
│  ├─ index.ts                 # async import('./bootstrap')
│  └─ events.ts                # event dispatch helpers
├─ webpack.config.js
├─ package.json
└─ README.md
```

---

## ⚙️ Module Federation Config (auth-app)

```js
new ModuleFederationPlugin({
  name: "authApp",
  filename: "remoteEntry.js",
  exposes: {
    "./Login": "./src/components/Login",
    "./UserProfile": "./src/components/UserProfile"
  },
  shared: {
    react: { singleton: true, requiredVersion: deps.react },
    "react-dom": { singleton: true, requiredVersion: deps["react-dom"] },
  }
});
```

---

## 🔐 Auth Flow

### Login

1. User submits credentials (simplified demo: name/email only).
2. App dispatches global event:

```ts
window.dispatchEvent(new CustomEvent("auth:login", { detail: user }));
```

3. Host persists session (`localStorage`) and updates its state.

### Logout

```ts
window.dispatchEvent(new CustomEvent("auth:logout"));
```

Clears session everywhere.

---

## 🔁 Cross‑App Communication

* Session events allow booking/reporting apps to react without tight coupling.
* Example in host:

```ts
window.addEventListener("auth:login", (e: any) => setUser(e.detail));
window.addEventListener("auth:logout", () => setUser(null));
```

---

## 🧩 Exposed Components

* **`./Login`** → Login form with email input and login button.
* **`./UserProfile`** → Displays current user info and logout option.

Usage in host:

```tsx
<RemoteLoader
  scope="authApp"
  module="./Login"
  fallback={<div>Loading login…</div>}
  render={({ Component }) => <Component />}
/>
```

---

## 🧰 Local Development

### Prereqs

* Node 18+

### Install & Run

```bash
npm install
npm run dev
```

Runs at `http://localhost:3001` by default.

### Build

```bash
npm run build
```

---

## 🚀 Deployment Simulation

* Serve `remoteEntry.js` from this app independently.
* Update `remotes.json` in host to point to this URL.
* Host consumes new version without rebuild.

---

---

## ✅ Assessment Checklist (Auth App)

* [x] Exposes `Login` and `UserProfile`
* [x] Dispatches login/logout events for cross‑app comms
* [x] Works standalone on its own port
* [x] Styled with Tailwind
* [x] Ready for deployment simulation
