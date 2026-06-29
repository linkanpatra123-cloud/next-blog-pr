# Blog App

 Explain Video:- https://drive.google.com/file/d/1WMX48wMjC5cKsdwxIEImLD2XuZOGwur-/view?usp=sharing

A fully functional, modern blog application built with Next.js and Redux Toolkit. It allows users to browse, read, create, edit, and manage blog posts with a beautiful dark-themed UI.
  
🚀 Features
-----------

* **CRUD Operations:** Create, Read, Update, and Delete blog posts.
* **Advanced Filtering & Sorting:** Filter blogs by categories (Technology, Fashion, etc.) and sort them by Date (Latest/Oldest) or Alphabetically (A-Z/Z-A).
* **Live Search:** Search blogs instantly by title or category using the custom-styled search bar.
* **Modern UI/UX:** Features a dark theme with custom CSS hover effects (card lifting, bottom-to-top button fill, glowing search bar).
* **Dynamic Routing:** Individual blog detail pages and edit pages using Next.js App Router.
* **State Management:** Centralized state handling for blogs, search queries, and filters using Redux Toolkit.
* **Mock Backend:** REST API simulation using JSON Server.

🛠️ Tech Stack
--------------

* **Framework:** Next.js (App Router)
* **UI Library:** React
* **State Management:** Redux Toolkit (`react-redux`, `@reduxjs/toolkit`)
* **Styling:** React Bootstrap, standard Bootstrap, Custom CSS
* **HTTP Client:** Axios
* **Icons:** React Icons (`FaSearch`, `FaEdit`, `FaTrash`, `FaCalendarAlt`, etc.)
* **Database/API:** JSON Server

📁 Project Structure
--------------------

```text
my-blog-app/
├── db.json                 # Mock database
├── package.json
├── public/
└── src/
    ├── app/
    │   ├── blog/[id]/      # Blog details dynamic route
    │   │   └── page.js
    │   ├── create/         # Create post route
    │   │   └── page.js
    │   ├── edit/[id]/      # Edit post dynamic route
    │   │   └── page.js
    │   ├── globals.css     # Custom UI animations & styles
    │   ├── layout.js       # Root layout & providers
    │   └── page.js         # Home dashboard (List, Filter, Sort)
    ├── components/
    │   ├── CustomNavbar.jsx
    │   ├── EmptyState.jsx
    │   └── ReduxProvider.jsx
    └── redux/
        ├── blogSlice.js    # Async thunks and reducers
        └── store.js        # Redux store configuration

⚙️ Installation
1. Clone the repository

 git clone <(https://github.com/linkanpatra123-cloud/next-blog-pr)>
 cd my-blog-app    

2. Install dependencies
   npm install 

3. Start the development server
npm run dev
The frontend application will be available at: http://localhost:3000

4. Start the JSON Server (Mock Backend)

To run the database, open a new terminal window in the project root and run:

Bash
npm run server
Note: This runs the mock database on port 5000.
API Endpoint: http://localhost:5000/blogs

📜 Available Scripts
Bash
npm run dev     # Starts the Next.js development server
npm run server  # Starts the JSON Server on port 5000
npm run build   # Builds the app for production
npm run start   # Starts the production server
npm run lint    # Runs ESLint to check for code issues

✨ Future Improvements
User Authentication & Authorization

Comments Section for individual blogs

Rich Text Editor for blog content creation

Pagination for handling large numbers of blogs

👨‍💻 Author
Linkan
GitHub: (https://github.com/linkanpatra123-cloud/next-blog-pr)   
