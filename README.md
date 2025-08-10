# ✂️ Trimly - Modern Barbershop Booking Platform

<div align="center">

![Trimly Logo](https://img.shields.io/badge/Trimly-Premium%20Barbershop%20Booking-blue?style=for-the-badge&logo=scissors)

**A sophisticated, full-stack web application revolutionizing the barbershop booking experience**

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Django](https://img.shields.io/badge/Django-5.1+-092E20?style=flat-square&logo=django)](https://djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=flat-square&logo=python)](https://python.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript)](https://javascript.info/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-412991?style=flat-square&logo=openai)](https://openai.com/)

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

- **React 18** - Modern component-based architecture
- **React Router** - Client-side routing and navigation
- **Axios** - HTTP client for API communication
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and development server

### **Backend**

- **Django 5.1** - Robust Python web framework
- **Django REST Framework** - API development
- **SQLite** - Lightweight database for development
- **Django CORS Headers** - Cross-origin resource sharing

### **AI & Integration**

- **OpenAI GPT-4** - Advanced conversational AI
- **Google Maps API** - Location services and mapping
- **Session Authentication** - Secure user management

### **Development Tools**

- **Git** - Version control
- **Modern ES6+** - Latest JavaScript features
- **Component-based Architecture** - Scalable frontend structure
- **RESTful API Design** - Clean backend architecture

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/trimly.git
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
# OPENAI_API_KEY=your-actual-openai-api-key-here
# SECRET_KEY=your-django-secret-key-here

# Frontend: Ensure API base URL matches your Django server
const API_BASE_URL = 'http://localhost:8000/api';
```

**⚠️ Important: Never commit your `.env` file to version control!**

---

## 📱 Application Screenshots

### 🏠 **Modern Homepage**

![Homepage Screenshot](screenshots/homepage.png)

- Hero section with compelling call-to-action
- Feature highlights with smooth animations
- Professional business information display
- Integrated location services

### ℹ️ **About Page**

![About Page Screenshot](screenshots/about-page.png)

- Professional barber introduction and background
- Business story and mission statement
- Team showcase with expertise highlights
- Trust-building content and credentials

### 🛍️ **Services Showcase**

![Services Page Screenshot](screenshots/services-page.png)

- Comprehensive service catalog with detailed descriptions
- Professional pricing structure
- Service duration and booking information
- Visual service gallery

### 📋 **Booking Appointment Interface**

![Booking Interface Screenshot](screenshots/booking-interface.png)

- Interactive appointment booking form
- Real-time availability calendar
- Service selection with pricing
- Customer information capture
- Booking confirmation flow

### 📅 **Appointment Management**

![Appointment Dashboard Screenshot](screenshots/appointment-dashboard.png)

- Professional appointment dashboard
- Easy cancellation and rescheduling
- Status tracking and history
- Mobile-optimized interface

### 📞 **Contact & Location**

![Contact Page Screenshot](screenshots/contact-page.png)

- Integrated Google Maps location
- Business contact information
- Operating hours display
- Direct communication options

### 💬 **AI Chatbot Integration**

![Chatbot Screenshot](screenshots/chatbot-interface.png)

- Intelligent customer support
- Natural conversation flow
- Business-specific knowledge base
- 24/7 availability with fallback responses

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

- **PostgreSQL migration** - Production-ready database
- **Docker containerization** - Simplified deployment
- **CI/CD pipeline** - Automated testing and deployment
- **Performance optimization** - Caching and query optimization
- **Security enhancements** - Advanced authentication methods

---

## 👨‍💻 Developer Information

**Built with passion by a full-stack developer who understands both technical excellence and user experience.**

### **Skills Demonstrated**

- ✅ **Full-Stack Development** - End-to-end application development
- ✅ **Modern Frontend** - React, modern JavaScript, responsive design
- ✅ **Backend Development** - Django, RESTful APIs, database design
- ✅ **AI Integration** - OpenAI GPT-4, conversational interfaces
- ✅ **UI/UX Design** - Modern design principles, user-centered approach
- ✅ **Problem Solving** - Complex business logic implementation
- ✅ **Code Quality** - Clean, maintainable, scalable code

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

- 📧 **Email**: [your.email@example.com](mailto:your.email@example.com)
- 💼 **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)
- 🐙 **GitHub**: [Your GitHub Profile](https://github.com/yourusername)
- 🌐 **Portfolio**: [Your Portfolio Website](https://yourportfolio.com)

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
