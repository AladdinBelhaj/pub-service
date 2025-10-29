# Pub Service - Frontend (Vite + React)

This is a minimal Vite + React frontend that implements:

- CreatePost component (write text and optionally attach media). Text required if no media.
- Post component (shows user avatar, name, timestamp, media if exists) with reactions and comments.

Local run:

1. cd into the `frontend` folder
2. npm install
3. npm run dev

Notes:
- This implementation is client-only and stores posts in memory. To persist posts or connect to the backend, call your backend endpoints from `CreatePost` and fetch posts in `App.jsx`.
- The app uses local preview URLs for uploaded media. Uploaded files are not sent to any server by default.
