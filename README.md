# Employee_REST_API
Create Employee with contact details
List Employee (with pagination)
Update Employee
Delete Employee
Get Employee
 

# Technology used
- Express
- Node Js
- mySQL


# Installation
Simply pull the project files and install all the dependencies provided in package.json file. Once all the packages have installed successfully then go to terminal with correct directory of the project and give the command 'npm start', Project will start to run on local port 8000.

# POSTMAN API Test Image
To create or insert employees select **POST** then paste **url** e.g localhost:8000/api/create
![create Employees](images/create%20image.png)

To update employee select **PUT** then paste **url** e.g localhost:8000/api/update/2
![update Employee](images/update%20Employee.png)

To delete employee record select **DELETE** then paste **url** e.g localhost:8000/api/delete/6
![delete Employee](images/delete%20employee.png)

To fetch 1st page of employee records select **GET** then paste **url** e.g localhost:8000/api/employees?page=1&limit=5
![get Employees](images/fetch%20page1%20employee.png)

To fetch 2nd page of employee records select **GET** then paste **url** e.g localhost:8000/api/employees?page=2&limit=5
![fetch Employees](images/fetch%20page2%20employees.png)
