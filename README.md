# 📁 DMS - Document Management System

DMS is a secure web-based Document Management System allowing users to authenticate, upload, search, view, and delete documents easily.

Includes a UI for document sharing permissions but connection to backend is partially pending.

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| 🔐 User Authentication | Secure Login & Signup using JWT |
| 📤 Document Upload | Store files with title, description & tags |
| 📄 View & Download | Access files stored in backend |
| 🔍 Search Bar | Instant search by title / description |
| ❌ File Delete | Remove unnecessary documents |
| 🎨 Modern UI | Angular Material responsive interface |

---

## 🛠 Tech Stack

### ⭐ Frontend
- Angular 16+
- Angular Material
- TypeScript

### ⚙ Backend
- Node.js + Express.js
- MongoDB Atlas + Mongoose
- Multer (File Upload Handling)
- JWT Authentication

---

### ⚙️ Local Setup & Installation

### 1️⃣ Clone the Repo
- cd backend
- npm install
- npm start
- Backend hosted at:
➡ http://localhost:5000

📌 NOTE: .env is already included (ONLY for evaluation purposes)
⚠ Normally, .env should NOT be committed publicly.

### 3️⃣ Frontend Setup
-Open another terminal:
- cd frontend
- npm install
- ng serve -o


-Frontend hosted at:
➡ http://localhost:4200

##🔑 Test Login Credentials
- Email	Password
- test@gmail.com
-	123456
- ksvarma2005@gmail.com
- 123456

➡ New users can also register — saved directly in MongoDB.

##⚠️ Pending Feature Integrations
-Feature	Status
-Permissions Management UI	Backend working, UI not integrated fully
-Version History System	Backend implemented but UI incomplete
-🧩 Future Enhancements

-Complete document permissions frontend integration

-Version history with restore option

-File preview (PDF/Image viewer)

-Admin dashboard & detailed access logs

##🤝 Contributing

This project is built for learning and portfolio purposes.
Suggestions & pull requests are always welcome!

##📧 Contact

##👤 Sidhartha Varma
##🔗 GitHub Profile → https://github.com/SidharthaVarma

git clone https://github.com/SidharthaVarma/DMS-project.git
cd DMS-project



