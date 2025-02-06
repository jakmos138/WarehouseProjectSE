# How to properly set up the SQL Server connection
The following steps apply to connecting to a local instance of SQL Server (SQL Express).
## Use SQL Server Authentication
The app does not support Windows Authentication for SQL Server, only SQL Server Authentication with a username and password.
To create a user login in SQL Server, do the following in SQL Server Management Studio:

- In the Object Explorer, go to your SQL Server instance / *Security* / *Logins*, right click it and select *New Login...*
- For the new login, select *SQL Server Authentication*. Disable *Enforce password policy*.
- Go to the *User Mapping* tab, check the *WarehouseSE* database and the *db_owner* and *public* roles for that database.
## Enable TCP/IP and set up ports in SQL Server
- Open the SQL Server Manager, located in your Windows system folder `Windows/System32/SQLServerManager##.msc`, where `##` corresponds to the SQL Server version.
- Go to *SQL Server Network Configuration* / *Protocols for \[SQL instance name\]*.
- Enable *TCP/IP*.
- Open the properties of *TCP/IP*, go to *IP Addresses*, and under *IPAll* clear *TCP Dynamic Ports* and set *TCP Port* to 1433.
- For the changes to take effect, restart SQL Server. This can be done in SQL Server Manager - *SQL Server Services* / *SQL Server (\[SQL instance name\])* right click and select *Restart*.
## Make sure SQL Server Browser is running
- While in the SQL Server Manager, we can also check if *SQL Server Browser* is running - it is required for the Node.js module to connect, otherwise the connection will time out on app startup. If not, go to its properties.
- In the *Service* tab, set *Start Mode* to *Automatic*.
- In the *Log On* tab, start the service.
## Relevant .env variables
`DB_SERVER` - full name of the SQL server instance, for example `PC_NAME\INSTANCE_NAME`
`DB_PORT` - port on which SQL Server is running, 1433 by default
`DB_NAME` - name of the database schema - `WarehouseSE`
`DB_USER` - login name for SQL Server Authentication
`DB_PWD` - password for SQL Server Authentication