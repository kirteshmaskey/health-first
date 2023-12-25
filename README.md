# Health First

### Web Application for Elderly People

Welcome to Health First, a web application designed to cater to the health and wellness needs of elderly individuals. This comprehensive platform provides various features to ensure a holistic approach to healthcare and well-being.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Live Demo](#live-demo)
4. [Screenshots](#screenshots)
5. [Getting Started](#getting-started)
6. [Dependencies](#dependencies)
7. [Installation](#installation)
8. [Usage](#usage)
9. [Issues and Contributions](#issues-and-contributions)

## Introduction

Health First is specifically designed for elderly individuals, offering a user-friendly interface and a range of features to address their health concerns. The application covers various aspects, including appointment management, interaction with a chatbot, dietary guidance, and a BMI calculator.

## Features

#### 1. Signup

- Users can create an account using their email, name, and password.

#### 2. Login

- Secure login using email and password.

#### 3. Home

- Display information about upcoming and previous appointments with doctors.

#### 4. Schedule Appointment

- Users can easily schedule appointments with healthcare professionals.

#### 5. Diet and Tips

- Provides various diet plans for snacks, breakfast, lunch, and dinner.
- Offers tips for maintaining a healthy lifestyle.

#### 6. Talk Bot

- Integrated with Google BARD, allowing users to interact with a chatbot for health-related queries and assistance.

#### 7. BMI Calculator

- Includes a BMI calculator to help users assess their body mass index.
- Instantly informs users about whether they are normal, overweight, or underweight.

## Live Demo

Visit the live demo of the application at [https://elderly-health.netlify.app/](https://elderly-health.netlify.app/)

## Screenshots

- Signup
  ![Signup Page](https://github.com/kirteshmaskey/health-first/assets/84732597/81198895-b6da-46f6-acd6-829982403ca6)

- Login
  ![Login Page](https://github.com/kirteshmaskey/health-first/assets/84732597/92da66db-163f-4cbb-9ba0-3153b39ec760)

- Home
  ![Home Page](https://github.com/kirteshmaskey/health-first/assets/84732597/be5d8a00-61fe-48b7-ad79-77b6cd407632)

- Schedule Appointment
  ![Appointment Page](https://github.com/kirteshmaskey/health-first/assets/84732597/eff708b5-a0f6-43c6-a342-9155261194f5)

- Diet and Tips
  ![Diet Page](https://github.com/kirteshmaskey/health-first/assets/84732597/7c0d67f1-9756-424a-a865-76f06bf4f630)
  ![Tips Page](https://github.com/kirteshmaskey/health-first/assets/84732597/4aad5986-ea16-46ac-8b44-03520fb24ecc)

- Talk Bot
  ![Talk Bot Page](https://github.com/kirteshmaskey/health-first/assets/84732597/162311fe-8555-49d6-b523-c3321131e778)

- BMI Calculator
  ![BMI Page](https://github.com/kirteshmaskey/health-first/assets/84732597/df8aaf13-335e-4fa4-8c08-8e44d51467a7)

## Getting Started

To get started with the Health First web application, follow these steps:

## Dependencies

The Health First web application relies on the following dependencies:

#### Backend Dependencies

```json
"dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "joi": "^17.11.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "openai": "^4.24.0"
},
"devDependencies": {
    "dotenv": "^16.3.1",
    "nodemon": "^3.0.2"
}
```

#### Frontend Dependencies

```json
"dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.15.1",
    "@mui/material": "^5.15.1",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.6.2",
    "bootstrap": "^5.3.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0",
    "react-scripts": "5.0.1",
    "react-toastify": "^9.1.3",
    "web-vitals": "^2.1.4"
}
```

## Installation

1. Clone the repository.

   ```bash
    git clone https://github.com/kirteshmaskey/health-first.git
    cd health-first
   ```

2. Install dependencies.
   - To install server dependencies:
     ```bash
      cd server
      npm install
     ```
   - To install client dependencies:
     ```bash
      cd client
      npm install
     ```

## Usage

1. Start the frontend server (client directory).

   ```bash
    npm start
   ```

2. Start the backend server (server directory).

   ```bash
    npm start
   ```

3. Open the application in your web browser.
   ```bash
    http://localhost:3000
   ```

## Issues and Contributions

If you encounter any issues with the Health First web application or have suggestions for improvements, feel free to raise an issue on the [GitHub repository](https://github.com/kirteshmaskey/health-first/issues). 

If you'd like to contribute to the project, you can follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`.
3. Implement your changes and commit them: `git commit -m "Description of changes"`.
4. Push your changes to the branch: `git push origin feature-name`.
5. Open a pull request on the [GitHub repository](https://github.com/kirteshmaskey/health-first/pulls) with a detailed description of your changes.

Your contributions are highly appreciated! Together, we can make Health First even better.
