To open the My Organization project you must connect to the sql-sever database, if you don't have one on your computer you can download it from the following link: https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management -studio-ssms?view=sql-server-ver16 Then run the following commands on the database tier server: add-migration [name] update-database

When you activate the client side written in React, a list of all the employees of the organization will appear and it will be possible to add a new employee
There is another option of downloading Excel with all the employees and their details
And also the possibility of searching by all the fields in the employee table.
![Uploading דף הבית.jpg…]()

You can delete any employee by clicking the delete button (delete status) and update his details by clicking the update button

Each employee has a details button, when you click on it the job data of that employee appears. And there is the possibility of adding a position, provided that the date is later than or equal to the date of the start of work
![Uploading פרטים.jpg…]()

When you click on the login button, there is an option of administrator login managed by the JWT. If you are an administrator and know the password (admin 123456), you can login and have additional options.
![Uploading login.jpg…]()

If you are an additional manager, you have two exit buttons and a button to add a role, only if you are an additional manager you have the option of adding a role to the factory
![Uploading מצב מנהל.jpg…]()

