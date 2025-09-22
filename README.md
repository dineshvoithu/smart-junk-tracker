# 🍕 Smart Junk Tracker

A full-stack web application that helps users track junk food consumption and provides intelligent health warnings based on eating patterns.

## 🎯 Features

- **Smart Food Logging** - Track consumption of various junk foods with quantities
- **Health Warning System** - Intelligent alerts based on consumption patterns and health risks
- **Persistent Data Storage** - Cloud-based PostgreSQL database with Supabase
- **Responsive Design** - Modern UI built with React and Tailwind CSS
- **Multi-Environment Support** - Development (H2) and Production (PostgreSQL) configurations

## 🛠️ Technology Stack

### Backend
- **Java 17** with **Spring Boot 3.x**
- **Spring Data JPA** with Hibernate
- **PostgreSQL** (Production) / **H2** (Development)
- **RESTful APIs** with proper error handling
- **Maven** for dependency management

### Frontend  
- **React 18** with modern hooks
- **Tailwind CSS** for styling
- **Axios** for API integration
- **Responsive design** for mobile compatibility

### Database
- **Supabase PostgreSQL** (Cloud production database)
- **H2 In-Memory** (Local development)
- **Environment-specific configurations**

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher  
- Maven 3.6+

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/smart-junk-tracker.git
   cd smart-junk-tracker
   ```

2. **Backend Setup**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   # Runs with H2 database on http://localhost:8080
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   # Runs on http://localhost:5173
   ```

4. **Access H2 Console** (Development)
   - URL: http://localhost:8080/h2-console
   - JDBC URL: `jdbc:h2:mem:testdb`
   - Username: `sa` | Password: `password`

### Production Database Setup

1. **Create Supabase account** at https://supabase.com
2. **Create new project** and note database credentials
3. **Configure production properties** (not tracked in git)
   ```properties
   # backend/src/main/resources/application-prod.properties
   spring.datasource.url=jdbc:postgresql://your-supabase-url:5432/postgres
   spring.datasource.username=postgres
   spring.datasource.password=your-password
   spring.datasource.driver-class-name=org.postgresql.Driver
   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
   spring.jpa.hibernate.ddl-auto=update
   spring.h2.console.enabled=false
   ```
4. **Run with production profile**
   ```bash
   ./mvnw spring-boot:run -Dspring.profiles.active=prod
   ```

## 📊 Database Schema

### Entities
- **JunkFood** - Food items with health information and risk levels
- **JunkLog** - User consumption logs with timestamps and quantities
- **User** - User management (future enhancement)

### Sample Data
The application includes pre-populated food items:
- Pizza (High Risk - 300 calories)
- Parotta (Medium Risk - 250 calories) 
- Burger (High Risk - 350 calories)

## 🎮 Usage

1. **Browse available junk foods** with calorie and health risk information
2. **Click "I ate this!"** to log consumption
3. **Enter quantity** and submit
4. **Receive health warnings** based on consumption patterns
5. **View persistent data** across application restarts

## 🔧 Development Features

- **Dual database support** - Switch between H2 (dev) and PostgreSQL (prod)
- **Environment profiles** - Separate configurations for different environments
- **Automatic table creation** - Hibernate DDL handles schema management
- **Sample data initialization** - Pre-populated food items for testing
- **CORS configuration** - Proper frontend-backend communication

## 🏗️ Architecture Highlights

- **Clean separation of concerns** with MVC architecture
- **RESTful API design** with proper HTTP status codes
- **Environment-specific configurations** for scalability
- **Modern React patterns** with functional components and hooks
- **Responsive design** principles for cross-device compatibility
- **Professional error handling** and validation

## 📱 API Endpoints

### Food Management
- `GET /api/junkfoods` - Get all junk foods
- `GET /api/junkfoods/{id}` - Get specific food item

### Logging
- `POST /api/logs` - Log food consumption
- `GET /api/logs` - Get consumption logs (if implemented)

## 🚀 Deployment

### Production Deployment
The application is designed for easy cloud deployment:
- **Backend**: Deploy to Render, Railway, or similar platforms
- **Frontend**: Deploy to Vercel, Netlify, or similar platforms
- **Database**: Supabase PostgreSQL (already cloud-based)

### Environment Variables for Production
```bash
DATABASE_URL=your-supabase-url
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=your-password
SPRING_PROFILES_ACTIVE=prod
```

## 🚀 Future Enhancements

- [ ] User authentication and authorization
- [ ] Personal dashboard with consumption analytics
- [ ] Food recommendation system
- [ ] Export data functionality (CSV/PDF)
- [ ] Mobile app development
- [ ] Social features and sharing capabilities
- [ ] Nutritionist recommendations
- [ ] Integration with fitness trackers

## 🧪 Testing

### Development Testing
- **H2 Database**: Quick testing with in-memory database
- **Sample Data**: Pre-loaded food items for immediate testing
- **API Testing**: Use tools like Postman or browser for endpoint testing

### Production Testing
- **PostgreSQL**: Full production database testing
- **Data Persistence**: Verify data survives application restarts
- **Cross-browser**: Test responsive design across devices

## 💡 Key Learning Outcomes

This project demonstrates mastery of:
- **Full-stack development** with modern technologies
- **Database design** and ORM implementation
- **RESTful API** development and consumption  
- **Environment configuration** management
- **Cloud database** integration
- **Responsive UI/UX** development
- **Professional development** practices

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:
- Report bugs or issues
- Suggest feature enhancements
- Provide code review feedback

## 📄 License

This project is created for educational and portfolio purposes.


### Background
Full-stack developer with expertise in Java, Spring Boot, and React. Passionate about creating user-focused applications that solve real-world problems. Currently seeking opportunities in full-stack development roles.

---

## 🙏 Acknowledgments

- **Spring Boot** team for the excellent framework
- **React** team for the powerful frontend library
- **Supabase** for reliable cloud database services
- **Tailwind CSS** for beautiful, responsive styling

---

*This project showcases modern web development practices and production-ready application development. Built with ❤️ for learning and career advancement.*

## 📞 Contact & Support

- 📧 **Email**: dineshkumarvoithu@gmail.com
- 💼 **LinkedIn**: [linkedin.com/in/dineshvoithu](https://linkedin.com/in/dineshvoithu)
- 🌟 **Star this repo** if you found it helpful!

---
