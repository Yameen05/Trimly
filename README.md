# ✂️ Trimly - Modern Barbershop Booking Platform

<div align="center">

![Trimly Logo](https://img.shields.io/badge/Trimly-Premium%20Barbershop%20Booking-blue?style=for-the-badge&logo=scissors)

**A sophisticated, full-stack web application revolutionizing the barbershop booking experience**

[![React](https://img.shields.io/badge/React-19.0+-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org/)
[![Django](https://img.shields.io/badge/Django-5.1+-092E20?style=flat-square&logo=django)](https://djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python)](https://python.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=flat-square&logo=docker)](https://docker.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791?style=flat-square&logo=postgresql)](https://postgresql.org/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai)](https://openai.com/)
[![CI/CD](https://img.shields.io/badge/CI%2FCD-GitHub%20Actions-2088FF?style=flat-square&logo=github-actions)](https://github.com/features/actions)


</div>

---

## 🌟 Project Overview

**Trimly** is a cutting-edge barbershop booking platform that bridges traditional craftsmanship with modern technology. Built as a comprehensive full-stack solution, it demonstrates advanced web development skills, modern UI/UX design principles, and seamless integration of AI-powered features.

### 🎯 The Vision

Transform the barbershop experience by creating an intuitive, professional platform where customers can effortlessly book appointments with skilled barbers like Ali, while providing barbers with powerful tools to manage their business.

---

## ✨ Key Features

### 🔐 **Authentication & User Management**

- **Secure user registration and login system**
- **Session-based authentication with Django**
- **Protected routes and user-specific content**
- **Seamless user experience with persistent sessions**

### 📅 **Smart Appointment Booking**

- **Real-time availability checking**
- **Interactive date and time selection**
- **Conflict prevention and double-booking protection**
- **Instant booking confirmation**
- **Appointment management (view, cancel, reschedule)**

### 🤖 **AI-Powered Chatbot**

- **GPT-4 integration for intelligent customer support**
- **Natural language processing for customer queries**
- **Contextual responses about services, pricing, and policies**
- **Fallback system ensuring 24/7 availability**
- **Professional conversation flow**

### 🎨 **Modern UI/UX Design**

- **Responsive design optimized for all devices**
- **Professional blue gradient theme**
- **Smooth animations and micro-interactions**
- **Intuitive navigation and user flow**
- **Accessibility-compliant components**

### 🗺️ **Location Integration**

- **Embedded Google Maps for easy navigation**
- **Direct integration with Google Maps directions**
- **Business hours and contact information display**
- **Mobile-friendly location services**

### 📊 **Business Management**

- **Service catalog with pricing and duration**
- **Appointment history and tracking**
- **Customer communication tools**
- **Business analytics foundation**

---

## 🛠️ Technology Stack

### **Frontend**

- **React 19** - Latest component-based architecture with concurrent features
- **TypeScript** - Type-safe development with compile-time error checking
- **React Router DOM** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Tailwind CSS 4** - Utility-first CSS framework with modern features
- **Vite** - Lightning-fast build tool and development server

### **Backend**

- **Django 5.1** - Robust Python web framework
- **Django REST Framework** - Professional API development
- **Multi-Database Support** - PostgreSQL, MySQL, and SQLite compatibility
- **Swagger/OpenAPI** - Comprehensive API documentation
- **Django CORS Headers** - Cross-origin resource sharing

### **Database & Storage**

- **PostgreSQL 15** - Production-ready relational database
- **MySQL 8.0** - Alternative database support
- **SQLite** - Lightweight database for development
- **Multi-Database Routing** - Intelligent database selection

### **DevOps & CI/CD**

- **Docker & Docker Compose** - Containerized development and deployment
- **GitHub Actions** - Automated CI/CD pipeline
- **Code Quality Tools** - ESLint, Prettier, Black, Flake8
- **Security Scanning** - Bandit, Safety vulnerability detection
- **Automated Testing** - Backend and frontend test automation

### **AI & Integration**

- **OpenAI GPT-4** - Advanced conversational AI with fallback systems
- **Google Maps API** - Location services and mapping
- **Session Authentication** - Secure user management
- **Environment-based Configuration** - Secure secrets management

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.11 or higher)
- **Docker & Docker Compose** (for containerized development)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Yameen05/trimly.git
cd trimly
```

### 2. Backend Setup (Django)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Start Django server
python manage.py runserver
```

### 3. Frontend Setup (React)

```bash
# Navigate to frontend directory
cd trimly-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Environment Configuration

```bash
# Copy the environment template
cp .env.example .env

# Edit .env file and add your actual API keys
OPENAI_API_KEY=sk-xxxxxx
SECRET_KEY=django-insecure-xxxxxx

# Database Configuration (optional - defaults to SQLite)
# DATABASE_URL=postgresql://trimly_user:trimly_password@localhost:5432/trimly_db
# MYSQL_URL=mysql://trimly_user:trimly_password@localhost:3306/trimly_db
```

**⚠️ Important: Never commit your `.env` file to version control!**

### 5. Docker Development (Recommended)

```bash
# Start all services with Docker Compose
docker-compose up --build

# This will start:
# - PostgreSQL database on port 5432
# - MySQL database on port 3306  
# - Django backend on port 8000
# - React frontend on port 5173
```

### 6. API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/swagger/
- **ReDoc**: http://localhost:8000/redoc/

---

## 📱 Application Screenshots

### 🏠 **Modern Homepage**

- Hero section with compelling call-to-action
- Feature highlights with smooth animations
- Professional business information display
- Integrated location services
<img width="1800" height="944" alt="Screenshot 2025-08-14 at 7 13 39 PM" src="https://github.com/user-attachments/assets/0deed6d4-0c62-42bc-bdf8-337c48e7ffb4" />

<img width="1800" height="942" alt="Screenshot 2025-08-14 at 7 13 51 PM" src="https://github.com/user-attachments/assets/cd4067bd-4fb4-4993-bb15-57ffa08ee3fb" />

<img width="1800" height="934" alt="Screenshot 2025-08-14 at 7 14 03 PM" src="https://github.com/user-attachments/assets/aedc62c5-dfc4-4559-a0ae-02959d0ad5ac" />

<img width="1800" height="944" alt="Screenshot 2025-08-14 at 7 14 10 PM" src="https://github.com/user-attachments/assets/7928f884-c7f8-4819-a24a-651698e55afe" />


### ℹ️ **About Page**

- Professional barber introduction and background
- Business story and mission statement
- Team showcase with expertise highlights
- Trust-building content and credentials

<img width="1800" height="939" alt="Screenshot 2025-08-14 at 7 16 11 PM" src="https://github.com/user-attachments/assets/09e9e8a0-54cd-40b6-b75c-4d326a876fc6" />

<img width="1800" height="938" alt="Screenshot 2025-08-14 at 7 16 20 PM" src="https://github.com/user-attachments/assets/96f42a5f-ff35-4a30-87c7-100586941cf9" />

<img width="1800" height="943" alt="Screenshot 2025-08-14 at 7 16 30 PM" src="https://github.com/user-attachments/assets/6d349651-45d6-432e-b3b9-1744945ea1b0" />

<img width="1800" height="938" alt="Screenshot 2025-08-14 at 7 16 41 PM" src="https://github.com/user-attachments/assets/0108747c-2340-4097-94d1-273702f2107b" />


### 🛍️ **Services Showcase**

- Comprehensive service catalog with detailed descriptions
- Professional pricing structure
- Service duration and booking information
- Visual service gallery

<img width="1800" height="938" alt="Screenshot 2025-08-14 at 7 21 50 PM" src="https://github.com/user-attachments/assets/68871ebd-ddca-4d71-9f17-137ec65dbf00" />

<img width="1800" height="936" alt="Screenshot 2025-08-14 at 7 21 57 PM" src="https://github.com/user-attachments/assets/4140b6bc-9bf6-4fae-9a18-e2dedbbfeb0b" />


### 📋 **Booking Appointment Interface**


- Interactive appointment booking form
- Real-time availability calendar
- Service selection with pricing
- Customer information capture
- Booking confirmation flow

  
### 📋 **Service Booking Interface**
- Clean service catalog with pricing
- Interactive booking modal with real-time availability
- Comprehensive appointment summary
- Seamless user experience flow



### 📅 **Appointment Management**

- Professional appointment dashboard
- Easy cancellation and rescheduling
- Status tracking and history
- Mobile-optimized interface

<img width="1800" height="936" alt="Screenshot 2025-08-14 at 7 22 49 PM" src="https://github.com/user-attachments/assets/18261c30-5231-418e-9030-34436a9f009e" />


### 📞 **Contact & Location**

- Integrated Google Maps location
- Business contact information
- Operating hours display
- Direct communication options

<img width="1800" height="944" alt="Screenshot 2025-08-14 at 7 23 29 PM" src="https://github.com/user-attachments/assets/d8b38ba7-4c51-49f4-9494-0c7caf2efb6d" />

<img width="1799" height="945" alt="Screenshot 2025-08-14 at 7 23 55 PM" src="https://github.com/user-attachments/assets/12eec766-420c-4ebd-b1cd-08e957280bcc" />

### 💬 **AI Chatbot Integration**

- Intelligent customer support
- Natural conversation flow
- Business-specific knowledge base
- 24/7 availability with fallback responses

<img width="444" height="544" alt="Screenshot 2025-08-14 at 7 24 55 PM" src="https://github.com/user-attachments/assets/cf076f50-9749-479e-ab7a-a4ee261fb001" />

<img width="420" height="513" alt="Screenshot 2025-08-14 at 7 25 16 PM" src="https://github.com/user-attachments/assets/8da0ea5b-1ee3-4d54-8df1-178f94f05a69" />

---

## 🏗️ Architecture & Design Patterns

### **Frontend Architecture**

- **Component-based design** with reusable UI elements
- **Context API** for global state management
- **Custom hooks** for business logic separation
- **Responsive design** with mobile-first approach

### **Backend Architecture**

- **RESTful API design** with clear endpoints
- **Model-View-Controller** pattern implementation
- **Authentication middleware** for secure access
- **CORS configuration** for frontend integration

### **Database Design**

- **Normalized database schema** for data integrity
- **Efficient relationships** between users, appointments, and services
- **Scalable model structure** for future enhancements

---

## 🎯 Key Technical Achievements

### **Full-Stack Integration**

- Seamless communication between React frontend and Django backend
- Proper authentication flow with session management
- Real-time data synchronization and updates

### **AI Implementation**

- Successfully integrated OpenAI GPT-4 for intelligent customer support
- Implemented fallback mechanisms for reliability
- Created context-aware conversational experiences

### **Modern UI/UX**

- Designed and implemented a professional, modern interface
- Created smooth animations and micro-interactions
- Ensured accessibility and responsive design principles

### **Business Logic**

- Implemented complex appointment scheduling logic
- Created conflict prevention and availability checking
- Built comprehensive user management system

---

## 🔮 Future Enhancements

### **Planned Features**

- **Multi-barber support** - Scale to multiple barbers and locations
- **Payment integration** - Stripe/PayPal for online payments
- **SMS notifications** - Appointment reminders and confirmations
- **Advanced analytics** - Business insights and reporting
- **Mobile app** - React Native implementation
- **Review system** - Customer feedback and ratings

### **Technical Improvements**

- **Redis caching** - Performance optimization and session storage
- **Kubernetes deployment** - Container orchestration for production
- **AWS/Azure integration** - Cloud deployment and scaling
- **Performance monitoring** - Application performance insights
- **Advanced security** - OAuth2, JWT tokens, rate limiting

---

## 👨‍💻 Developer Information

**Built with passion by a full-stack developer who understands both technical excellence and user experience.**

### **Skills Demonstrated**

- ✅ **Full-Stack Development** - End-to-end application development
- ✅ **Modern Frontend** - React 19, TypeScript, responsive design
- ✅ **Backend Development** - Django, RESTful APIs, multi-database architecture
- ✅ **DevOps & CI/CD** - Docker, GitHub Actions, automated testing
- ✅ **AI Integration** - OpenAI GPT-4, conversational interfaces
- ✅ **Database Design** - PostgreSQL, MySQL, database routing
- ✅ **API Documentation** - Swagger/OpenAPI, professional documentation
- ✅ **Code Quality** - TypeScript, linting, formatting, security scanning
- ✅ **Container Orchestration** - Docker Compose, multi-service architecture

### **Why This Project Stands Out**

1. **Real-world Application** - Solves actual business problems
2. **Modern Technology Stack** - Uses current industry standards
3. **Professional Design** - Production-ready user interface
4. **AI Integration** - Cutting-edge technology implementation
5. **Scalable Architecture** - Built for growth and expansion
6. **Attention to Detail** - Polished user experience throughout

---

## 📞 Contact & Links

**Let's connect and discuss how this project demonstrates my capabilities as a full-stack developer!**

- 📧 Email: [yameenrizeq@gmail.com](mailto:yameenrizeq@gmail.com)
- 💼 LinkedIn: [Yameen Alsaaidah](https://linkedin.com/in/yameen-alsaaidah)
- 🐙 GitHub: [Yameen05](https://github.com/Yameen05)
- 🌐 Portfolio: [yameenrizeq.com](https://yameenrizeq.com)

---

## 🔐 Security & Environment Variables

This project follows security best practices:

- **Environment Variables**: All sensitive data (API keys, secrets) are stored in `.env` files
- **Git Security**: `.env` files are excluded from version control via `.gitignore`
- **Template Provided**: Use `.env.example` as a template for your local setup
- **Production Ready**: Environment-based configuration for different deployment stages

### Setting Up Your Environment:

1. Copy `.env.example` to `.env`
2. Replace placeholder values with your actual API keys
3. Never commit `.env` files to GitHub
4. Use environment variables in production deployments

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**⭐ If you found this project impressive, please give it a star! ⭐**

_Built with ❤️ and lots of ☕ by a passionate full-stack developer_

</div>
