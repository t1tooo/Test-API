# Automated and Manual tests

## 1.  Status Code 200 Verify that the API returns the correct HTTP status code (e.g., 200 OK) for a successful GET request.

### Manual steps
1. Create a GET API request to any list to retrive data from an examle `http://localhost:3000/api/destination` 
2. Implement a test code in Postman to check the status code
3. Input the GET request to retrive data
4. You should see status 200 OK to the right.  

### Automatic test 
1. Send a GET request to: `http://localhost:3000/api/destination` 
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

### Expected result
- Status code is 200 OK, should be able to see destinations.

### Result
- Status code: 200 OK

----------------------------------------------------------------------------------------------------------------

## 2. Verify that the API returns the expected data format (e.g., JSON, XML) in the response.

### Manual steps
1. Create a Get API request from the list you want to collect data from 
2. Send the GET request to retrive data
3. In the response body you should click: Content Type --> then it should say application/json; charset=utf-8

### Automated steps
Send a Get request to `http://localhost:3000/api/destination`
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response should be in JSON format", function() {
    pm.response.to.have.jsonBody();
});

### Expected result
- Expect that the response is in JSON format

### Result
>API response body:
```
"data": [
        {
            "weather": {
                "temperature": -26,
                "conditions": "Rainy"
            },
            "_id": "66d311c3e848e994a16b01f5",
            "CityName": "East Caryville",
            "attractions": [
                "Hamill LLC",
                "Marquardt - Hilll",
                "Ledner - Yost",
                "Lowe - Swaniawski"
            ],
            "hotels": [
                "Shööner Hintz and Padberg",
                "Tito and Sons"
            ],
            "transports": [
                "Lime Scooters",
                "Tram",
                "Tram",
                "Metro"
            ],
            "cuisine": [
                "Mexican",
                "Vietnamese",
                "Indian",
                "Italian"
            ]}],
            "__v": 0
```
----------------------------------------------------------------------------------------------------------------

## 3. Ensure that the API returns the correct HTTP status code (e.g., 400 Bad Request) for an invalid requests.

### Manual steps 
1. Create a Get API request [http://localhost:3000/api/destination/66d311c3e848e994a16b01f4] with a wrong destination id in the end of URL
2. Send the GET code with the wrongly input 

### Automated test 
Send a Get request to `http://localhost:3000/api/destination/66d311c3e848e994a16b01f4`
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});

### Expected result
- Expected result is that we should get a 404 error 

### Result
- Status code: 400 Bad Request in the response terminal

----------------------------------------------------------------------------------------------------------------

## 4. Create an automated test that sends a request with specific filters or search criteria and checks if the API returns the correct data.


### Steps
1. Create a API to get a specific data
2. Implement a test code in Postman that checks if the return body is correct it should return the destination by id
`http://localhost:3000/api/destination/66d311c3e848e994a16b01f5`

pm.test("City with specific ID should be returned", function() {
    const cityData = pm.response.json();
    const specificId = "66d311c3e848e994a16b01f5"; 
    const city = cityData._id === specificId ? cityData : null;

    pm.expect(city).to.not.be.null;
});

### Expected result
- Expect the response to be the destination which we took the id from

### Result
- The response contains only the destination.

----------------------------------------------------------------------------------------------------------------

## 5. Write an automated test to verify that the API returns paginated results when a large number of records are requested

### Steps
1. Create a Get API request that according to the pagination parameters
2. Code in VSCode to implement pagination and retrieve the value from the API
3. Implement a test code in Postman that checks if the response body contains some properties
4. Send GET request [http://localhost:3000/api/destination?page=1&limit=10]


pm.test("Pagination data & limit is correct", function() {
    const response = pm.response.json();
     pm.expect(response.limit).to.eql(10);
     pm.expect(response.page).to.eql(1);
     pm.expect(response.total).to.eql(30);
 });

### Expected result
- Expect the response to match the pagination parameters

### Result
- The response contains a pagination list of information according to what the URL is set: page = 1, limit = 10 

----------------------------------------------------------------------------------------------------------------

## 6. Test if the API handles special characters and non-English text correctly in input data and returned responses using an automated testing tool.

### Manual steps
1.  Create API requests that POST, GET data that contains special characters and non-English
2.  Send a Get request to [`http://localhost:3000/api/destination?hotels=Shööner Hintz and Padberg`]
3.  Ensure that u have hotel named 
4.  Body should return the detination and a hotel named "Shööner Hintz and Padberg"
 
    "hotels": [
                "Shööner Hintz and Padberg",
                "Tito and Sons"
            ],

### Automated test 

[`http://localhost:3000/api/destination?hotels=Shööner Hintz and Padberg`]

pm.test("Correct user is returned with special characters", function() {
    const users = pm.response.json();
     pm.expect(users.data[0].hotels[0]).to.eql("Shööner Hintz and Padberg");
});

### Expected result
- Expect GET & POST requests handle special characters and non-English text

### Result
- Status code: 200 OK return 
- API message body return should be 
>API response body:
```
    "hotels": [
                "Shööner Hintz and Padberg",
                "Tito and Sons"
            ],
```

----------------------------------------------------------------------------------------------------------------

## 7. Develop an automated test that sends concurrent requests to the API to ensure that it can handle multiple users and maintain data consistency.

### Manual steps
1.  Create multiple test (my case 3 GET, 1 PUT and 1 POST)
2. GET request: `ttp://localhost:3000/api/destination`
3. GET request: `http://localhost:3000/api/destination/66d311c3e848e994a16b01f5`
4. PUT request: `http://localhost:3000/api/destination/66d311c3e848e994a16b01f5`
5. GET request: `http://localhost:3000/api/destinationsss`
6. POST request: `http://localhost:3000/api/destination/`

7. Implement the test code and make sure that all the status codes are correct according to the script are returned 
8. Run the whole test 07 folder in postman
9. Three test should return 200 OK, 1 test should return 201 Created and one test should return 404 Not Found

### Automatic test 
pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("City with specific ID should be returned", function() {
    const cityData = pm.response.json();
    const specificId = "66d311c3e848e994a16b01f5"; 
    const city = cityData._id === specificId ? cityData : null;

    pm.expect(city).to.not.be.null;
});

pm.test("Status code is 404", function() {
    pm.response.to.have.status(404);
});

pm.test("Status code is 201", function() {
    pm.response.to.have.status(201);
});


### Expected result
- The API should return 5 test back and all passed.
### Result
- All the requests went through 
- Avg. Resp. Time: 24 ms

----------------------------------------------------------------------------------------------------------------

## 8. Create an automated test and test if the API correctly handles different HTTP methods (GET, POST, PUT, DELETE) for each endpoint and returns appropriate status codes and responses for each method.

### Manual & Automated test 
1.  Create 4 different API requests GET, POST, PUT & DEL
2.  Implement a test code in Postman that checks the correct status
1. Send GET: `http://localhost:3000/api/destination`
2. Send POST: `http://localhost:3000/api/destination/`
3. Send PUT : `http://localhost:3000/api/destination/66d311c3e848e994a16b01f6`
4. Send DELETE: `http://localhost:3000/api/destination/[Id of a destination which hasnt been deleted]`
5. Make sure to implement corresponding code and array to body and script 

### Expected result
- Expect all the tests to go through with the correct status code

### Result
- GET status code: Passed & 200 OK
- POST status code: Passed and that a new status code 201 
- PUT status code: 200 OK
- DEL status code: 200 OK

----------------------------------------------------------------------------------------------------------------

## 9. Write an automated test to check if the API correctly handles updates to existing records, ensuring that changes are saved and reflected in subsequent requests.

### Manual test 
1.  Create one GET request and one PUT request
2.  Check the code status in Postman
3.  Send a GET request to see destination by id
4.  Send a PUT request with the new details and add the id of the detination in the end of URL [http://localhost:3000/api/destination/66d311c3e848e994a16b01f5]
5.  Go back to the GET request to get to check update status

### Automated test 

pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Status code is 200 and Destination updated", function() {
    pm.response.to.have.status(200);
    const responseBody = pm.response.json();
    pm.expect(responseBody).to.have.property('hotels');
    pm.expect(responseBody.hotels).to.include('Tito and Sons');
});

### Expected result
- Expect the changes that you have made to be showed

### Result
- The hotel name was changed to Tito and Sons
- With code status 200 OK Passed 

----------------------------------------------------------------------------------------------------------------

## 10. Design an automated performance test that simulates a large number of users making requests simultaneously to check the API’s performance under heavy load.

### Manual test 
1. Create a file that contains different request 
2. Set test code to return a stutus in Postman (my case status 200 OK)
3. Run the whole file at once 

### Automatic test 
[http://localhost:3000/api/destination/66d311c3e848e994a16b01f5]
[http://localhost:3000/api/destination]
[`http://localhost:3000/api/destination?hotels=Tito and Sons`]

pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

pm.test("City with specific ID should be returned", function() {
    const cityData = pm.response.json();
    const specificId = "66d311c3e848e994a16b01f5"; 
    const city = cityData._id === specificId ? cityData : null;

    pm.expect(city).to.not.be.null;
});

pm.test("Status code is 200 and Destination updated", function() {
    pm.response.to.have.status(200);
    const responseBody = pm.response.json();
    pm.expect(responseBody).to.have.property('data').that.is.an('array');
    const foundHotel = responseBody.data.some(destination => 
        destination.hotels && destination.hotels.includes('Tito and Sons')
    );

    pm.expect(foundHotel).to.be.true;
});

### Expected result
- API to perform well under pressure 

### Result
- All tests passed with status code 200 OK

----------------------------------------------------------------------------------------------------------------

## 11. Create an automated test that verifies the API can recover gracefully from failures, such as database connection issues or third-party service outages, without compromising data integrity.

### Manual test & Automatic test 
1. Create an API that disconnects from the server and should return false 
2. Code in VSCode to handle the API disconnection

 if (req.query.disconnect === 'true') {
      if (connected) {
        await mongoose.disconnect();
        connected = false;
        console.log("Database connection is offline.");
      }
    } else {
      if (!connected) {
        await mongoose.connect('mongodb+srv://titoguapo9:paswordFortesting@cluster0.3h52txt.mongodb.net/Dest');
        connected = true;
        console.log("Database connection is online.");
      }};

3. Implement test codes in Postman to check the correct status code and message
4. Send GET http://localhost:3000/api/destination?disconnect=true(disconnect)

pm.test("Status code is 500 and error message", function() {
    pm.response.to.have.status(500);
    pm.expect(pm.response.text()).to.include("An error occurred on the server while fetching"); 
});

5. Send http://localhost:3000/api/destination?disconnect=false (reconnect)

pm.test("Status code is 200", function() {
    pm.response.to.have.status(200);
});

### Expected result
- Expect after disconnection nt able to send anything through until server is reconnected 
  
### Result
- When disconnected status code should be 500 Internal server error in the reponse terminal 
- When connected status code should be 200 OK
  
----------------------------------------------------------------------------------------------------------------

### 12. Develop an automated test to handle edge cases, such as requests with missing or invalid parameters, and ensure that appropriate error messages are returned.

### Manual & Automatic test 
 1. Send a GET request with an invalid parameter `http://localhost:3000/api/destination/66d311c3e848e994a16b01f3`
 2. Enter test code in Postman 

pm.test("Status code is 404 with error message", function() {
    pm.response.to.have.status(404);
    pm.expect(pm.response.text()).to.include("Destination not found"); 
});

3. Send GET request with invalid parameter 


### Expected result
- Expect an error message with a message

### Result
- Status code 404 and error message 
>API response body:
```
{
    "message": "Destination not found"
}
```

----------------------------------------------------------------------------------------------------------------

## 13. Write an automated test to verify that the API correctly implements any rate limiting or throttling mechanisms to prevent abuse or excessive use of resources.

### Manual and & Automatic test 
1. Create a folder with a GET request
2. Insert code in Vs code and make sure u already have ratelimit installed: npm i express-rate-limit
```
import { rateLimit } from 'express-rate-limit';

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    limit: 100, 
    standardHeaders: 'draft-7',
    legacyHeaders: false, 
    
})

app.use(limiter)


4. Implement test codes in Postman to check the correct status code and message
5. Restart server in VS code to ensure its running properly
6. Run the entire folder. 

### Expected result
- Expect 100 to pass 
- Expect next time running all test fail.
