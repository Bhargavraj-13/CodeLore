# Home Page
The Home Page is the main learning dashboard for authenticated users, displaying topics, search functionality, and difficulty-based organisation.

## **Features**
* Search bar with live suggestions
* Difficulty-based topic cards
* Sorted topic listing (beginner → advanced)
* Protected access (login required)
* Responsive layout

## **Tech Stack**
**Frontend:** React, React Router, Tailwind CSS, Axios, Context API

## **Folder Structure**
src/  
├── components/  
│   ├── home/ (SearchBar, TopicGrid, TopicCard)  
│   └── layout/ (AppHeader, AppFooter)  
├── context/ (AuthContext)  
├── hooks/ (useAuth)  
├── pages/ (HomePage)  
├── lib/ (api)  
└── App.jsx  
