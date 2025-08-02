# Smart Crop Rotation Planner

A web application that helps farmers plan optimal crop rotations for sustainable agriculture. The project consists of a Django REST API backend and a Vite-powered frontend.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/downloads)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd smart-crop-rotation-planner
```

### 2. Backend Setup (Django)

Navigate to the backend directory and set up the Python environment:

```powershell
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1

# On Windows (Command Prompt):
venv\Scripts\activate.bat

# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Create a superuser (optional, for admin access)
python manage.py createsuperuser

# Start the Django development server
python manage.py runserver
```

The backend will be available at `http://localhost:8000`

### 3. Frontend Setup (Vite)

Open a new terminal window and navigate to the frontend directory:

```powershell
# Navigate to frontend directory
cd frontend

# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## 🏗️ Project Structure

```
smart-crop-rotation-planner/
├── backend/                    # Django REST API
│   ├── api/                   # Main API app
│   │   ├── models.py         # Database models
│   │   ├── views.py          # API endpoints
│   │   └── ...
│   ├── backend/              # Django project settings
│   │   ├── settings.py       # Configuration
│   │   ├── urls.py           # URL routing
│   │   └── ...
│   ├── manage.py             # Django management script
│   ├── requirements.txt      # Python dependencies
│   └── db.sqlite3           # SQLite database
├── frontend/                 # Vite frontend
│   ├── src/                 # Source files
│   │   ├── main.js         # Entry point
│   │   ├── style.css       # Styles
│   │   └── ...
│   ├── public/             # Static assets
│   ├── package.json        # Node.js dependencies
│   └── vite.config.js      # Vite configuration
└── README.md               # This file
```

## 🛠️ Development Workflow

### Backend Development

1. **Activate virtual environment** (if not already active):

   ```powershell
   cd backend
   .\venv\Scripts\Activate.ps1
   ```

2. **Make model changes**:

   - Edit `api/models.py`
   - Create migrations: `python manage.py makemigrations`
   - Apply migrations: `python manage.py migrate`

3. **Add new API endpoints**:

   - Edit `api/views.py` and `api/urls.py`

4. **Run tests**:
   ```powershell
   python manage.py test
   ```

### Frontend Development

1. **Start development server**:

   ```powershell
   cd frontend
   npm run dev
   ```

2. **Build for production**:

   ```powershell
   npm run build
   ```

3. **Preview production build**:
   ```powershell
   npm run preview
   ```

## 📦 Dependencies

### Backend (Python)

- **Django 5.2.4+** - Web framework
- **Django REST Framework 3.14.0+** - API framework
- **SQLite** - Database (included with Python)

### Frontend (Node.js)

- **Vite 7.0.4+** - Build tool and dev server
- **@vitejs/plugin-react 4.7.0+** - React plugin for Vite

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory for sensitive configuration:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### Database Configuration

The project uses SQLite by default. To use a different database:

1. Install the appropriate database adapter
2. Update the `DATABASES` setting in `backend/backend/settings.py`

## 🚀 Deployment

### Backend Deployment

1. Set `DEBUG=False` in settings
2. Configure allowed hosts
3. Collect static files: `python manage.py collectstatic`
4. Use a production WSGI server like Gunicorn

### Frontend Deployment

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your web server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run tests to ensure everything works
5. Commit your changes: `git commit -am 'Add new feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📝 Common Issues

### Virtual Environment Issues

- **Problem**: `cannot be loaded because running scripts is disabled`
- **Solution**: Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` in PowerShell

### Port Already in Use

- **Backend**: Change port with `python manage.py runserver 8001`
- **Frontend**: Vite will automatically find an available port

### Module Not Found Errors

- **Backend**: Ensure virtual environment is activated and dependencies are installed
- **Frontend**: Run `npm install` to install missing packages

## 📞 Support

If you encounter any issues:

1. Check the common issues section above
2. Ensure all prerequisites are installed
3. Verify that both backend and frontend servers are running
4. Check the console for error messages

## 📄 License

[Add your license information here]

---

**Happy farming! 🌱**
