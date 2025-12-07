project:
  name: "DMS - Document Management System"
  description: >
    DMS is a full-stack Document Management System allowing secure document upload,
    management, search, and download. Authentication ensures users only view their 
    own documents.

features:
  - title: "JWT Authentication"
    details: "Secure login & register"
  - title: "Upload Documents"
    details: "Upload with title, description & tags"
  - title: "View/Download Files"
    details: "Secure document access"
  - title: "Document Search"
    details: "Search by title or description"
  - title: "Delete Documents"
    details: "Files can be removed when needed"
  - title: "Responsive UI"
    details: "Angular + Material Design"

tech_stack:
  frontend:
    - "Angular 16+"
    - "Angular Material"
    - "TypeScript"
  backend:
    - "Node.js"
    - "Express.js"
    - "MongoDB + Mongoose"
    - "JWT Authentication"
    - "Multer (File Uploads)"

structure:
  DMS-project:
    backend:
      includes:
        - "models/"
        - "routes/"
        - "middleware/"
        - "uploads/"
        - "server.js"
        - "package.json"
        - ".env"
    frontend:
      includes:
        - "src/"
        - "angular.json"
        - "package.json"

local_setup:
  clone:
    - "git clone https://github.com/SidharthaVarma/DMS-project.git"
    - "cd DMS-project"

  backend:
    - "cd backend"
    - "npm install"
    - "npm start"
    url: "http://localhost:5000"

  frontend:
    - "cd frontend"
    - "npm install"
    - "ng serve -o"
    url: "http://localhost:4200"

test_credentials:
  - email: "test@example.com"
    password: "123456"
  - email: "ksvarma2005@gmail.com"
    password: "123456"
  note: "Users auto-stored in MongoDB after registration."

known_limitations:
  - "Permissions UI partially done"
  - "Version control only implemented in backend (tested via Postman)"

future_enhancements:
  - "Document sharing with UI"
  - "File version tracking + restore"
  - "Admin dashboard"
  - "PDF/Image preview"
  - "Activity logs"

contact:
  author: "Sidhartha Varma"
  github: "https://github.com/SidharthaVarma"
  message: "Thank you for reviewing my project!"
