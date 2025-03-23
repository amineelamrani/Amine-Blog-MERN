# Amine Blog Project

Welcome to the repository of my Blog App built using the MERN Stack. Below, you will find everything you need to know about the project, the tech stack and how to get started.

## 🌟 Features

- Full Stack MERN Application : Built using the MERN Stack.
- Authentication and Authorization using the JWT (JSON Web Token).
- Oauth using google Firebase auth.
- Real time data Vizualization for the Admin using ChartJS.
- Email notification using Nodemail for email confirmation and password reset.
- Beautiful and responsive design using DaisyUI and TailwindCSS.
- Dark/white themes and the possibility to store the preferred theme for the user so he could find it in next time.
- Image storage managed with cloudinary
- SPA via React Router.
- Robuste state management using redux and redux toolkit + Redux persist.

## 🛠️ Process  
Building this MERN Blog was an exciting journey, and I approached it with a systematic and organized mindset (thanks to my background as a Systems Engineer in the automotive industry). Here's how I brought this project to life, step by step:  
1. Requirements and planning
- Top-to-Bottom Approach: I started by defining the requirements, deciding on features, and then moved to the implementation phase.
- Brainstorming : I used Excalidraw to map out the project’s features, steps and features plan, data modeling for the backend (embedding, referencing, ...) and tech stacks selections .... (see the excalidraw extract below).  
![Project-Brainstorm Overview](https://github.com/user-attachments/assets/dd132f0e-c74e-44dc-afc4-1b5896185019)
2. Design
I created the design prototypes using Figma to ensure a clean, user-friendly interface.
3. Project Management
I used Notion App to plan and track the project’s progress, breaking it down into tasks, milestones, and deadlines.
![Notion app](https://github.com/user-attachments/assets/109895eb-d617-4230-bc7b-7e3854cf9f10)

> P.s.: This project took longer than expected because I was working full-time as a Systems Engineer. There were times when I had to work in the office, which limited the time I could dedicate to programming. This experience has inspired me to create a better action plan for organizing my time and energy when working in the office, so I can dedicate more time to projects like this, Insha'Allah. 💪

## 🛠️ Tech Stack

### Front end:

- React : For building dynamic and reusable UI components.
- Redux & Redux Toolkit: For state management and predictable data flow.
- Chart.js: For creating interactive and visually appealing charts in the admin Dashboard.
- Tailwind CSS & DaisyUI: For sleek, utility-first styling and pre-designed components.
- React Markdown: For rendering markdown article content from the database and to store the article created by the admin.
- React Router: For client-side routing and navigation.

### Back end:

- Node.js & Express.js: For building a robust and scalable server.
- MongoDB & Mongoose: For database management and schema modeling.
- JWT (JSON Web Tokens): For secure user authentication and authorization.
- Nodemailer: For sending emails and notifications.

### Utilities:

- Cloudinary: For efficient image and profile pictures storage.
- Firebase for oAuth.

## 🚀 Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud-based)
- A Cloudinary account (for file uploads)
- A Firebase account (for deployment)

### Installation

1. Clone the repository and install the dependancies:

```sh
# Install server dependencies
npm install
# Install client dependencies
cd client
npm install
```

2. Set up environment variables:  
   Create a .env file in the server directory and add the following:

```sh
DB_PASSWORD
DB_URL
NODE_ENV
PORT
SECRET_JWT_KEY
NODE_MAIL
NODE_PASSWORD
VITE_CLOUDINARY_uploadPreset
VITE_CLOUDINARY_cloudName
# + Firebase informations
```

3. Open your browser and Visit :

```sh
http://localhost:5173
```

## 🤝 Contributing

Contributions are always welcome!
