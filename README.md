<h1 align="center">
ZATEC CODING ASSESSMENT</h1>
<h3>Candidate: Robby Malunga</h3>

## How to run the project

Project was created using Laravel & ReactJS

## Make sure that you have the following

- Composer
- NodeJS v16 and above
- Xampp / Wamp - Any local server that can allow you to serve php projects

## Setting Up

1. Place your project folder inside the htdocs / www directory depending with the server you are running
2. Create a database
3. In the .env file in the root folder - on the Database Connection section, input your database credentials and name of
   database
4. Open project folder from the command line
5. Run the following commands:

``` 
    1. Composer Update
    2. php artisan migrate --seed  
```
If you want inside folder */database/dumps/* there are some dump files you can import to you mysql database before hand
The above will create the required tables into your database and also dump a default user
account for testing purposes. (email: admin@example.com, password: Admin@1234)

```
    3. php artisan serve  
```

This will start your backend server

4. Open new terminal and change directory (cd) into the frontend directory (/project/frontend/) inside your project
   folder

```
    5. yarn install
    6. yarn run dev 
```

7. Copy the link displayed on the command line of the frontend server and paste into your browser
8. You'll see your application running.

## Running Tests

There are some automated tests available to run

### Backend Testing (using PHPUnit)

- Open project folder on command line run:

```
php artisan test
```

- This command will run all tests for our backend api

### Frontend Testing (Using Cypress)

- From the terminal - cd into /project-folder/fontend and type

```
yarn run cypress open
```

- This will open the cypress GUI where we'll run our tests
- There are 2 tests (e2e) that have been created and are located in the cypress folder
- After opening cypress you'll see the 2 tests and just click the test to run it


