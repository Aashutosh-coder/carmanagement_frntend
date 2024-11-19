import React from 'react'
import "./ApiDocs.css"
const ApiDocs = () => {
  return (
    
      

      <div class="api-container">
        <header>
            <h1>Signup</h1>
            <p>Endpoint: <code>POST http://localhost:8080/auth/signup</code></p>
        </header>

        <section class="description">
            <h2>Description</h2>
            <p>This endpoint registers a new user. It accepts the user's name, email, and password, checks if the email already exists, and if not, creates a new user and saves their information.</p>
        </section>

        <section class="request">
            <h2>Request</h2>
            <p><strong>Headers:</strong></p>
            <pre><code>Content-Type: application/json</code></pre>

            <p><strong>Body:</strong></p>
            <pre><code>{`
  "name": "string",
  "email": "string",
  "password": "string"`
}</code></pre>

            <p><strong>Example Request:</strong></p>
            <pre><code>{ `
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123"`
}</code></pre>
        </section>

        <section class="responses">
            <h2>Responses</h2>
            <p><strong>Success (Status Code: 201):</strong></p>
            <pre><code>{`
  "message": "Signup successfully",
  "success": true`
}</code></pre>

            <p><strong>Error - User Already Exists (Status Code: 409):</strong></p>
            <pre><code> {`
  "message"L "User is already exist, you can login",
  "success": false`
  }</code></pre>

            <p><strong>Error - Invalid Data (Status Code: 400):</strong></p>
            <pre><code>{`
  "message": "Invalid email format or password too short",
  "success": false`
}</code></pre>

            <p><strong>Error - Server Error (Status Code: 500):</strong></p>
            <pre><code>{`
  "message": "Internal server error",
  "success": false`
}</code></pre>
        </section>

        <section class="status-codes">
            <h2>Status Codes</h2>
            <ul>
                <li><strong>201</strong>: User successfully registered.</li>
                <li><strong>400</strong>: Bad request, invalid or missing parameters.</li>
                <li><strong>409</strong>: Conflict, user already exists with the provided email.</li>
                <li><strong>500</strong>: Internal server error.</li>
            </ul>
        </section>

        <header>
            <h1> Login</h1>
            <p>Endpoint: <code>POST http://localhost:8080/auth/login</code></p>
        </header>

        <section class="description">
            <h2>Description</h2>
            <p>This endpoint logs in a user by validating their email and password. If successful, it returns a JWT token that can be used for authenticating further requests. If the email or password is incorrect, an authentication error is returned.</p>
        </section>

        <section class="request">
            <h2>Request</h2>
            <p><strong>Headers:</strong></p>
            <pre><code>Content-Type: application/json</code></pre>

            <p><strong>Body:</strong></p>
            <pre><code>{`
  "email": "string",
  "password": "string"`}</code></pre>

            <p><strong>Example Request:</strong></p>
            <pre><code>{ `
  "email": "john.doe@example.com",
  "password": "password123"`}</code></pre>
        </section>

        <section class="responses">
            <h2>Responses</h2>
            
            <p><strong>Success (Status Code: 200):</strong></p>
            <pre><code>{`
  "message": "Login Success",
  "success": true,
  "jwtToken": "string",
  "email": "string",
  "name": "string"`}</code></pre>

            <p><strong>Error - Invalid Email or Password (Status Code: 403):</strong></p>
            <pre><code>{`
  "message": "Auth failed email or password is wrong",
  "success": false`}</code></pre>

            <p><strong>Error - Server Error (Status Code: 500):</strong></p>
            <pre><code>{`
  "message": "Internal server error",
  "success": false`}</code></pre>
        </section>

        <section class="status-codes">
            <h2>Status Codes</h2>
            <ul>
                <li><strong>200</strong>: Login successful, returns JWT token and user details.</li>
                <li><strong>403</strong>: Authentication failed, incorrect email or password.</li>
                <li><strong>500</strong>: Internal server error.</li>
            </ul>
        </section>

        <header>
            <h1> Add Car</h1>
            <p>Endpoint: <code>POST http://localhost:8080/cars/add</code></p>
        </header>

        <section class="description">
            <h2>Description</h2>
            <p>This endpoint allows a user to add a new car listing. It requires a user to be authenticated, providing their user ID from the authentication middleware. The request body must include the car's title, description, tags, and image files. The server stores the image file paths and car details in the database.</p>
        </section>

        <section class="request">
            <h2>Request</h2>
            <p><strong>Headers:</strong></p>
            <pre><code>Content-Type: application/json</code></pre>

            <p><strong>Body:</strong></p>
            <pre><code>{`
  "title": "string",
  "description": "string",
  "tags": ["string"],
  "images": ["file(s)"]`}</code></pre>

            <p><strong>Example Request:</strong></p>
            <pre><code>{ `
  "title": "2021 Toyota Camry",
  "description": "A reliable and fuel-efficient sedan.",
  "tags": ["sedan", "2021", "toyota", "camry"],
  "images": ["path/to/image1.jpg", "path/to/image2.jpg"]`}</code></pre>
        </section>

        <section class="responses">
            <h2>Responses</h2>
            
            <p><strong>Success (Status Code: 201):</strong></p>
            <pre><code>{`
  "message": "Car added successfully",
  "car": {
    "userId": "string",
    "title": "string",
    "description": "string",
    "tags": ["string"],
    "images": ["file_paths"]
  }`}</code></pre>

            <p><strong>Error - Missing User ID (Status Code: 400):</strong></p>
            <pre><code>{`
  "message": "User ID is missing in the request"`}</code></pre>

            <p><strong>Error - Server Error (Status Code: 500):</strong></p>
            <pre><code>{`
  "message": "Failed to add car",
  "error": "error_message"`}</code></pre>
        </section>

        <section class="status-codes">
            <h2>Status Codes</h2>
            <ul>
                <li><strong>201</strong>: Car added successfully, returns car details.</li>
                <li><strong>400</strong>: Bad request, missing user ID in the request.</li>
                <li><strong>500</strong>: Internal server error, failed to add car.</li>
            </ul>
        </section>


        <header>
            <h1>Fetch Cars</h1>
            <p>Endpoint: <code>GET http://localhost:8080/cars/user-cars</code></p>
        </header>

        <section class="description">
            <h2>Description</h2>
            <p>This endpoint retrieves a list of cars that belong to the authenticated user. The user must provide a valid token in the `Authorization` header for successful authentication.</p>
        </section>

        <section class="request">
            <h2>Request</h2>
            <p><strong>Headers:</strong></p>
            <pre><code>Authorization:  token</code></pre>
            <pre><code>Content-Type: application/json</code></pre>

            <p><strong>Example Request:</strong></p>
            <pre><code>GET http://localhost:8080/cars/user-cars</code></pre>
        </section>

        <section class="responses">
            <h2>Responses</h2>
            
            <p><strong>Success (Status Code: 200):</strong></p>
            <pre><code>{`
  "cars": [
    {
      "userId": "string",
      "title": "string",
      "description": "string",
      "tags": ["string"],
      "images": ["file_paths"]
    }
  ]`}</code></pre>

            <p><strong>Error - Unauthorized (Status Code: 401):</strong></p>
            <pre><code>{`
  "message": "User not authenticated"`}</code></pre>

            <p><strong>Error - Failed to Fetch Cars (Status Code: 500):</strong></p>
            <pre><code>{`
  "message": "Failed to fetch cars"`}</code></pre>
        </section>

        <section class="status-codes">
            <h2>Status Codes</h2>
            <ul>
                <li><strong>200</strong>: Successfully fetched the list of cars belonging to the authenticated user.</li>
                <li><strong>401</strong>: Unauthorized, no valid token provided in the request headers.</li>
                <li><strong>500</strong>: Internal server error, failed to fetch cars due to a server issue.</li>
            </ul>
        </section>

        <header>
            <h1>Delete Car</h1>
            <p>Endpoint: <code>DELETE http://localhost:8080/cars/delete/{`carId`}</code></p>
        </header>

        <section class="description">
            <h2>Description</h2>
            <p>This endpoint allows the authenticated user to delete a car listing by its ID. The user must provide a valid token in the `Authorization` header for successful authentication. The `carId` is passed as part of the URL.</p>
        </section>

        <section class="request">
            <h2>Request</h2>
            <p><strong>Headers:</strong></p>
            <pre><code>Authorization: token </code></pre>
            <pre><code>Content-Type: application/json</code></pre>

            <p><strong>URL Parameter:</strong></p>
            <pre><code>carId</code></pre>
            
            <p><strong>Example Request:</strong></p>
            <pre><code>DELETE http://localhost:8080/cars/delete/123456</code></pre>
        </section>

        <section class="responses">
            <h2>Responses</h2>
            
            <p><strong>Success (Status Code: 200):</strong></p>
            <pre><code>{`
  "message": "Car deleted successfully!"`}</code></pre>

            <p><strong>Error - Unauthorized (Status Code: 401):</strong></p>
            <pre><code>{`
  "message": "User not authenticated"`}</code></pre>

            <p><strong>Error - Car Not Found (Status Code: 404):</strong></p>
            <pre><code>{`
  "message": "Car not found"`}</code></pre>

            <p><strong>Error - Failed to Delete Car (Status Code: 500):</strong></p>
            <pre><code>{`
  "message": "Failed to delete car"`}</code></pre>
        </section>

        <section class="status-codes">
            <h2>Status Codes</h2>
            <ul>
                <li><strong>200</strong>: Successfully deleted the car listing.</li>
                <li><strong>401</strong>: Unauthorized, no valid token provided in the request headers.</li>
                <li><strong>404</strong>: Car with the specified ID not found.</li>
                <li><strong>500</strong>: Internal server error, failed to delete car due to a server issue.</li>
            </ul>
        </section>

        <header>
            <h1> Update Car</h1>
            <p>Endpoint: <code>PUT http://localhost:8080/cars/{`carId`}</code></p>
        </header>

        <section class="description">
            <h2>Description</h2>
            <p>This endpoint allows an authenticated user to update the details of an existing car listing. The user must provide a valid token in the `Authorization` header for successful authentication. The `carId` is passed as part of the URL, and the body of the request should contain the updated car details.</p>
        </section>

        <section class="request">
            <h2>Request</h2>
            <p><strong>Headers:</strong></p>
            <pre><code>Authorization: token</code></pre>
            <pre><code>Content-Type: application/json</code></pre>

            <p><strong>URL Parameter:</strong></p>
            <pre><code>{`carId`}</code></pre>

            <p><strong>Body:</strong></p>
            <pre><code>{` "title": "string",
  "description": "string",
  "tags": ["string1", "string2"],
  "images": ["imagePath1", "imagePath2"]`}</code></pre>

            <p><strong>Example Request:</strong></p>
            <pre><code>PUT http://localhost:8080/cars/123456
{`
  "title": "Updated Car Title",
  "description": "Updated car description",
  "tags": ["sedan", "used", "family"],
  "images": ["imagePath1.jpg", "imagePath2.jpg"] `
}</code></pre>
        </section>

        <section class="responses">
            <h2>Responses</h2>
            
            <p><strong>Success (Status Code: 200):</strong></p>
            <pre><code>{`
  "message": "Car details updated successfully!",
  "car": { "title": "Updated Car Title", "description": "Updated car description", "tags": ["sedan", "used"], "images": ["imagePath1.jpg"]` }
</code></pre>

            <p><strong>Error - Unauthorized (Status Code: 401):</strong></p>
            <pre><code>{`
  "message": "User not authenticated"`}</code></pre>

            <p><strong>Error - Car Not Found (Status Code: 404):</strong></p>
            <pre><code>{`
  "message": "Car not found"`}</code></pre>

            <p><strong>Error - Failed to Update Car (Status Code: 500):</strong></p>
            <pre><code>{`
  "message": "Failed to update car details"`}</code></pre>
        </section>

        <section class="status-codes">
            <h2>Status Codes</h2>
            <ul>
                <li><strong>200</strong>: Successfully updated the car details.</li>
                <li><strong>401</strong>: Unauthorized, no valid token provided in the request headers.</li>
                <li><strong>404</strong>: Car with the specified ID not found.</li>
                <li><strong>500</strong>: Internal server error, failed to update car due to a server issue.</li>
            </ul>
        </section>
    </div>

      

  )
}

export default ApiDocs
