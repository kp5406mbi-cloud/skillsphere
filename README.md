⭐ If you found this project useful, consider starring the repository.

# SkillSphere – Freelance Marketplace Platform

SkillSphere is a full-stack freelance marketplace that connects clients with freelancers. Clients can post jobs, review applications, hire freelancers, and make secure payments. Freelancers can browse jobs, submit proposals, upload resumes, and track application status.

## 🌐 Live Demo

Frontend:

```
https://skillsphere-client-my3i.onrender.com
```

Backend:

```
https://skillsphere-60jl.onrender.com
```

---

## ☁️ Deployment

- Frontend deployed on Render
- Backend deployed on Render
- MongoDB Atlas for database hosting
- Cloudinary for file storage
- Razorpay for payment processing

## ✨ Key Highlights

- Full-stack MERN application
- JWT Authentication & Role-Based Access Control
- Resume Uploads with Cloudinary
- Razorpay Payment Gateway Integration
- Protected Routes & Secure APIs
- Search, Filter, and Sort Functionality
- Responsive Tailwind CSS UI
- Production Deployment on Render

 ## 🎯 Project Impact

SkillSphere simulates a real-world freelance marketplace similar to Upwork and Fiverr. The platform supports:

- End-to-end hiring workflow
- Resume management
- Project lifecycle tracking
- Multi-role authentication system
- Secure file uploads with Cloudinary
- Razorpay payment workflow integration
- Applicant management system supporting 25+ applications per job
- Protected REST APIs with JWT authentication
- Fully deployed MERN application on Render

This project was built to demonstrate full-stack development, REST API design, authentication, cloud integrations, and payment gateway implementation.

## 🚀 Features

### Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Separate dashboards for Clients and Freelancers
* Secure protected routes

### Client Workflow

* Post freelance jobs with budget and deadline.
* Receive and manage freelancer applications.
* Review resumes stored on Cloudinary.
* Accept or reject applicants.
* Make secure payments through Razorpay.
* Automatically mark projects as completed after successful payment.

### Freelancer Features

* Browse available jobs
* Search, sort, and filter jobs
* Apply to jobs with proposals
* Upload resumes while applying
* Track application status
* Receive updates on accepted/rejected applications

### Payment System

* Razorpay payment gateway integration
* Secure order creation and payment verification
* Payment status tracking
* Automatic project completion after successful payment

### Additional Features

* Cloudinary resume storage
* Budget filtering
* Job search functionality
* Sorting by budget and date
* Responsive UI
* Deployed on Render

---

## 🛠 Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer

### Cloud & Deployment

* Cloudinary
* Render

### Payment Gateway

* Razorpay

---

## 🔌 API Features

- JWT Authentication
- Job Management APIs
- Application Management APIs
- Resume Upload APIs
- Razorpay Payment APIs
- Notification APIs

## 🏗️ Architecture


Frontend (React + Tailwind)
        │
        ▼
REST APIs (Express.js)
        │
        ▼
MongoDB Database
        │
        ├── Cloudinary (Resume Storage)
        │
        └── Razorpay (Payments)


## 📂 Project Structure

```bash
SkillSphere/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── api/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── index.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/kp5406mbi-cloud/skillsphere.git
cd skillsphere
```

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

Start backend:

```bash
npm start
```

---

### Frontend Setup

```bash
cd client
npm install
```

Create `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

Run frontend:

```bash
npm run dev
```

---

## 🔐 User Roles

### Client

* Post jobs
* View applicants
* Accept/reject freelancers
* Make payments
* Manage projects

### Freelancer

* Browse jobs
* Apply to jobs
* Upload resumes
* Track application status

---

## 📸 Screenshots

### Client Dashboard

* Total Jobs
* Total Applicants
* Accepted Freelancers

### Job Listings

* Search jobs
* Filter by budget
* Sort by newest/highest/lowest budget

### Applicant Management

* View proposals
* View resumes
* Accept/Reject applications

### Payment System

* Razorpay integration
* Secure payment verification

---

## 🔮 Future Improvements

* Real-time chat between client and freelancer
* Email notifications
* Ratings & reviews
* Freelancer portfolio section
* Project milestones
* Admin dashboard
* AI-powered job recommendations

---

## 👨‍💻 Author

**Kumar Piyush**

Integrated M.Sc. Mathematics and Computing
BIT Mesra



---

## 📜 License

This project is licensed under the MIT License.


