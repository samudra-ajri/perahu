# Simple Information System Platform

> Information system platform built with the MERN stack & Redux.

This project called as Perahu (Pemetaan Genarasi Margahayu) was built as my freelance order for Miftahul Huda Alfirdausy Foundation.
![screenshot](https://github.com/samudra-ajri/perahu/blob/master/frontend/public/screenshot.png)

## Features

- User authentication and authorization
- Top ranked users
- Sidebar
- Filtering users by category
- User profile
- Subjects completion per users
- Subjects completion per category
- Admin user management
- Admin subjects details page
- Simple admin dasboard (charts and progress bar)
- Database seeder

## Usage

### ES Modules in Node

ECMAScript Modules is used in the backend (has to use Node v14.6+).

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

There is a Heroku postbuild script.

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
