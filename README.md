# Join - Kanban Project Management Tool

Join is a Kanban-based project management tool designed for managing tasks and collaboration. Developed as part of a web development bootcamp at the Developer Akademie, Join is a flexible, simple tool that allows users to organize their projects in workspaces and boards.

> **Note:** This is an educational project created for learning purposes. It might not be suitable for large-scale business use, but it provides an excellent base for a task management system.

---

## Features

- **Workspaces**: Create separate workspaces for different projects.
- **Boards & Lists**: Organize tasks using boards with customizable lists such as "To Do", "In Progress", "Awaiting Feedback", and "Done".
- **Contacts & Members**: Add contacts for collaboration and invite team members to workspaces.
- **Task Management**: Create and manage tasks with due dates, descriptions, and assignees.
- **Drag & Drop**: Easily move tasks between lists as their status changes.
- **Task Completion**: Mark tasks as complete or delete them entirely.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Documentation](#documentation)
- [Backend](#backend)

---

## Installation

### Prerequisites

Make sure you have the following installed:
- [Vue.js](https://vuejs.org/)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/Dogan36/join-v2-frontend.git
   
2. Install the required dependencies:

    ```bash
    npm install

3. Start the development server:
    ```bash
    npm run serve

4. Open your browser and go to http://localhost:8080 to see the app.

Usage
    After starting the app, you can:

    Sign up for a new account or log in if you already have one.
    Create a new workspace or join existing workspaces by entering the workspace code.
    Use the board view to organize tasks with columns like "To Do", "In Progress", and "Done".
    Add contacts and members to collaborate with your team.
    Create tasks by clicking the "+" button in the desired list.
    Move tasks between lists to update their status.
    Remove tasks by deleting them or moving them to the "Done" list.

Configuration
    The project uses the following configuration:

    API Base URL: All API requests are directed to the local development server (http://localhost:8000).
    Authentication: The app supports token-based authentication, which is stored in localStorage.
    Responsive Design: The UI adjusts for different screen sizes, making it accessible on both desktop and mobile devices.  

Contributing
    Contributions to Join are welcome! Feel free to fork the repository, make changes, and submit pull requests. Here’s how you can get involved:

    Fork the repository.
    Create a new branch for your feature or fix (git checkout -b feature-name).
    Commit your changes (git commit -am 'Add new feature').
    Push to the branch (git push origin feature-name).
    Open a pull request to merge your changes into the main branch.

License
    Join is licensed under the MIT License.

Documentation
    Documentation created with Docusaurus
    Find it at http://docs.dogan-celik.com

Backend
    Backend created with Django Rest Framework
    Github https://github.com/Dogan36/join_backend_v2

Contact
    For feedback or questions, please reach out to the developer:
    Dogan Celik
    Email: mail@dogan-celik.com

### Explanation of Sections:

- **Features**: An overview of what the application can do.
- **Installation**: Instructions on how to set up the project locally.
- **Usage**: Provides instructions for interacting with the app after installation.
- **Configuration**: Configuration settings like API base URL or authentication methods.
- **Contributing**: Guidelines for contributing to the project.
- **License**: Information about the license governing the project (MIT in this case).
- **Documentation**: Information about the documentation and link
- **Backend**: Information about the documentation and Github link
- **Contact**: Developer's contact information for questions or feedback.

Feel free to modify and expand on this template based on your project's specific requirements!