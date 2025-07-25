# 📝 QuickBlog

A modern, full-stack blog application that allows users to create, view, and manage blog posts. Features include admin authentication, a rich-text editor, image uploads, comments, and AI-powered blog generation using Google's GenAI.

---

## 🌐 Live Demo

👉 [Check out the live app here](https://quick-blog-nine-kappa.vercel.app/)

---

## 🖼️ Screenshots

**Home Page**  
![Home](./screenshots/home.png)

**Blog Page**  
![Blog](./screenshots/blog.png)

**Admin Page**  
![Admin](./screenshots/admin.png)

---

## 🚀 Features

- ✍️ Create, edit, and delete blog posts
- 🔐 Admin authentication with secure routes
- 💬 Comment system with moderation
- 🤖 AI-powered blog creation (via @google/genai)
- 🖼️ Image uploads using ImageKit
- 🎨 Responsive UI with Tailwind CSS
- 📦 Rich text editor using Quill
- ⚡ Smooth animations with Framer Motion

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React
- Tailwind CSS
- Axios
- Framer Motion
- React Quill

### 🔹 Backend
- Node.js
- Express.js
- @google/genai (AI blog generation)
- ImageKit (Image uploads)
- Mongoose + MongoDB
- Multer (File uploads)

---

## 📦 Installation

```bash
git clone https://github.com/Arijit-mondal099/quickBlog.git

# Backend
cd ../backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## Environment Variables
```bash
# backend
PORT = 4000
MONGODB_URI = "************************"
DB_NAME = "****************************"
ADMIN_EMAIL = "************************"
ADMIN_PASSWORD = "*********************"
JWT_SECRET = "*************************"
IMAGEKIT_PUBLIC_KEY = "****************"
IMAGEKIT_PRIVATE_KEY = "***************"
IMAGEKIT_URL_ENDPOINT = "**************"
GEMINI_API_KEY = "*********************"

# front end
VITE_BASE_URL=https://your-backend.vercel.app
```

---

## 🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

--- 

## 📬 Contact
Made with ❤️ by Arijit Mondal

📧 Email: arijitm717@gmail.com
