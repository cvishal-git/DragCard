# How to Run the Project

## Overview

This project is a web application that implements drag-and-drop functionality using `dnd-kit` and image preview using Material-UI (MUI). The application allows users to reorder items within a grid layout, preview images in a modal, and persist the order of items across sessions using `localStorage`. It uses Mock Service Worker (MSW) for API mocking. The project is containerized using Docker and can be easily run and managed using Docker Compose.

## Prerequisites

Before running this project, ensure that you have the following software installed on your system:

- **Node.js**
- **Yarn**

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine using the following command:

```bash
git clone https://github.com/cvishal-git/DragCard.git
```

### 2. Install Dependencies

Use Yarn to install the required dependencies:

```bash
cd frontend/
yarn install
```

### 3. Running the Development Server

To start the development server and view the application in your browser, use the following command:

```bash
yarn dev
```

### 3. Lint the Code

To lint the code, run:

```bash
yarn lint
```

### 5. Building for Production

To create an optimized build of the application for production deployment, run:

```bash
yarn build
```

## Build and Run the Project with Docker Compose

### 1. Build and start the Docker containers:

```bash
docker-compose up --build
```

### 2. Exit the Container

To stop and exit the container:

    Use Ctrl + C if running interactively.

## Thought Process

I began the project by choosing MUI for components and Vite with TypeScript for an easy start. After evaluating several options, I selected DnD Kit for drag-and-drop functionality due to its simplicity and built-in features. For preview functionality, I opted for a button to avoid conflicts with DnD events. I used local storage to persist item order and MSW to mock the API, as a backend wasn’t required. Luxon was implemented to display time abbreviations, and debounce was added to save changes 5 seconds after the last action. Setting up Docker Compose was challenging but rewarding. Although I planned to implement a backend, I chose to focus on a mock API due to time constraints and unfamiliarity with the required tech stack.
