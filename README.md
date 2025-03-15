# TM System Mobile App

A React Native mobile application for the Tenant Management System (TMS), providing landlords and tenants with a convenient way to manage properties, rooms, lease agreements, and invoices on the go.

![TM System Mobile App Banner](https://via.placeholder.com/800x400?text=TM+System+Mobile+App)

## Screenshots

<div style="display: flex; flex-wrap: wrap; justify-content: space-between;">
  <img src="https://via.placeholder.com/200x400?text=Login+Screen" alt="Login Screen" width="200" />
  <img src="https://via.placeholder.com/200x400?text=Dashboard" alt="Dashboard" width="200" />
  <img src="https://via.placeholder.com/200x400?text=Properties" alt="Properties List" width="200" />
  <img src="https://via.placeholder.com/200x400?text=Room+Details" alt="Room Details" width="200" />
</div>

<div style="display: flex; flex-wrap: wrap; justify-content: space-between; margin-top: 20px;">
  <img src="https://via.placeholder.com/200x400?text=Tenant+Profile" alt="Tenant Profile" width="200" />
  <img src="https://via.placeholder.com/200x400?text=Invoices" alt="Invoices" width="200" />
  <img src="https://via.placeholder.com/200x400?text=Tickets" alt="Support Tickets" width="200" />
  <img src="https://via.placeholder.com/200x400?text=Applications" alt="Applications" width="200" />
</div>

## Features

- **Role-based access** for landlords and tenants
- **Cross-platform** - works on both iOS and Android
- **Real-time notifications** for new invoices, ticket updates, and messages
- **Property management** - view and manage sites and rooms
- **Tenant management** - handle tenant profiles and lease agreements
- **Invoice tracking** - view, download, and pay invoices
- **Support tickets** - create and track maintenance requests
- **Accommodation applications** - submit and review applications

## Technologies Used

- React Native
- Redux for state management
- React Navigation for routing
- Axios for API communication
- React Native Paper for UI components
- Formik and Yup for form handling and validation
- AsyncStorage for local data persistence

## Prerequisites

Before setting up the mobile app, ensure you have the following:

- Node.js 14.x or later
- npm or Yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development, Mac only)
- A running instance of the [TM System Laravel Backend](https://github.com/Tshabalala-Thabo/TenantManagementSystem)

## Setup Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/Tshabalala-Thabo/TenantManagementSystem-Mobile.git
cd TenantManagementSystem-Mobile
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

### Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```
API_URL=http://your-laravel-backend-url/api
```

Replace `your-laravel-backend-url` with the URL where your Laravel backend is hosted.

### Step 4: Configure the Backend

Ensure your Laravel backend is set up correctly following the instructions in the [backend repository](https://github.com/Tshabalala-Thabo/TenantManagementSystem). The backend should be properly configured with:

- Database connection
- API endpoints
- Authentication system
- CORS settings to allow requests from the mobile app

### Step 5: Run the Application

#### For Android:

```bash
# Start Metro bundler
npx react-native start

# In a new terminal, run on Android
npx react-native run-android
```

#### For iOS (Mac only):

```bash
# Install pods
cd ios && pod install && cd ..

# Start Metro bundler
npx react-native start

# In a new terminal, run on iOS
npx react-native run-ios
```

## Backend Integration

This mobile app is designed to work with the TM System Laravel backend. For detailed information about the backend API and database schema, refer to the [backend repository README](https://github.com/Tshabalala-Thabo/TenantManagementSystem).

Key integration points:

- **Authentication**: JWT-based authentication with the Laravel backend
- **API Endpoints**: RESTful API communication for all data operations
- **Real-time Updates**: WebSocket integration for notifications and real-time data updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Laravel backend was developed by Thabo Tshabalala
- React Native framework and community
- All contributors to this project
