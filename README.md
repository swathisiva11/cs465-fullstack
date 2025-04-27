# cs465-fullstack
CS-465 Full Stack Development with MEAN
# Travlr Full Stack Project 
## Architecture
In this project, I implemented several types of frontend development, including static HTML files, server-rendered pages using Express with Handlebars templates, and a dynamic Single Page Application (SPA) built using Angular. Static HTML was initially used to create basic pages. Express with Handlebars (HBS) allowed for dynamic server-side rendering using templates and partials, which helped avoid code repetition and made the structure more efficient. Later, an Angular SPA was developed to move the rendering logic to the client side, making the application faster and more responsive by reducing server load and improving the overall user experience.

The backend used a NoSQL MongoDB database because MongoDB stores data in flexible, JSON-like documents, making it a natural fit for handling dynamic trip data. MongoDB also allowed for easier scaling, faster development cycles, and seamless integration with Node.js and Mongoose, which helped streamline the backend development process.

## Functionality
JSON (JavaScript Object Notation) is a data format, not a programming language like JavaScript. It provides a structured, lightweight way to exchange data between the frontend and backend. In this project, JSON served as the link between different parts of the application. The frontend Angular SPA made API calls that returned JSON responses, and the backend Express API processed and served JSON data from MongoDB.

Throughout development, I refactored code to improve functionality and maintainability. For example, static HTML trip listings were replaced with dynamic Handlebars loops using JSON data, which reduced hundreds of lines of HTML into more efficient, reusable code. I also created reusable Angular components, such as the trip listing component, to display trip data efficiently across the application. The benefits of reusable UI components included easier maintenance, a consistent look and feel, and quicker updates when making changes across the application.

## Testing
In the full stack process, I conducted various types of API testing to ensure the application worked properly. GET requests were tested using Postman to retrieve all trips and individual trip details via endpoints like /api/trips and /api/trips/:tripCode. Testing became more complicated once security layers, such as authentication and authorization, were added. Managing authentication tokens and headers properly was essential for accessing protected routes during testing.

Methods refer to HTTP verbs like GET, POST, PUT, and DELETE, which determine the type of operation performed on resources. Endpoints are specific URL paths that connect frontend requests to backend server logic. Security involves protecting these endpoints with user authentication (such as login functionality) and authorization (controlling access based on user permissions), ensuring that only valid users can perform sensitive actions like editing or deleting trips.

## Reflection
This course has helped me progress toward my professional goals in full stack development. I learned and applied modern frontend development using Angular and component-based architecture, backend API development using Express and MongoDB, and full stack integration using RESTful APIs, JSON, and authentication flows. I also gained experience in version control and project organization using Git and GitHub.

Most importantly, I have developed a practical understanding of how to build scalable, secure, and maintainable full stack applications, which are skills I look forward in being able to use to take on real-world full stack projects in the future.
