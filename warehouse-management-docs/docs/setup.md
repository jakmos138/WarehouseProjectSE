# Setting up the app environment
This assumes that you have cloned the app repository onto your machine.
## Create the .env file for the server
In the `server` folder, create an `.env` file and put the following variables there (below is an example):
```
BACKEND_PORT=3000
FRONTEND_PORT=5173

DB_SERVER="PC_NAME\INSTANCE_NAME"
DB_PORT=1433
DB_NAME="WarehouseSE"
DB_USER="username"
DB_PWD="p@ssw0rd"
```
- `BACKEND_PORT` is the port on which the server will run.
- `FRONTEND_PORT` is the port from which the server will accept cross-origin requests as per CORS. Set it to the port on which the client runs, which is `5173` by default.
- `DB_SERVER` is the full name of the SQL server instance.
- `DB_PORT` - is the port on which SQL Server is running, `1433` by default.
- `DB_NAME` - is the name of the database schema, `WarehouseSE` by default.
- `DB_USER` and `DB_PWD` are the SQL Server Authentication credentials.

## Set up the SQL Server connection
The following steps to configure the connection with (a local instance of) SQL Server should prevent any errors when connecting to the database.
### Use SQL Server Authentication
The app does not support Windows Authentication for SQL Server, only SQL Server Authentication with a username and password.
To create a user login in SQL Server, do the following in SQL Server Management Studio:

- In the Object Explorer, go to your SQL Server instance / *Security* / *Logins*, right click it and select *New Login...*
- For the new login, select *SQL Server Authentication*. Disable *Enforce password policy*. The entered credentials will be `DB_USER` and `DB_PWD` in the `.env` file.
- Go to the *User Mapping* tab, check the *WarehouseSE* database and the *db_owner* and *public* roles for that database.
### Enable TCP/IP and set up ports in SQL Server
- Open the SQL Server Manager, located in your Windows system folder `Windows/System32/SQLServerManager##.msc`, where `##` corresponds to the SQL Server version.
- Go to *SQL Server Network Configuration* / *Protocols for \[SQL instance name\]*.
- Enable *TCP/IP*.
- Open the properties of *TCP/IP*, go to *IP Addresses*, and under *IPAll* clear *TCP Dynamic Ports* and set *TCP Port* to 1433. This will be `DB_PORT` in the `.env` file.
- For the changes to take effect, restart SQL Server. This can be done in SQL Server Manager - *SQL Server Services* / *SQL Server (\[SQL instance name\])* right click and select *Restart*.
### Make sure SQL Server Browser is running
- While in the SQL Server Manager, we can also check if *SQL Server Browser* is running - it is required for the Node.js module to connect, otherwise the connection will time out on app startup. If not, go to its properties.
- In the *Service* tab, set *Start Mode* to *Automatic*.
- In the *Log On* tab, start the service.
## Run the client and server
To run the **client**:

- Open a terminal in the `client` folder.
- Enter `npm i` to install all dependencies.
- Enter `npm run dev` to run the client. The following, for example, should appear in the console:
```
VITE v6.0.7  ready in 226 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
To run the **server**:
- Open a terminal in the `server` folder.
- Enter `npm i` to install all dependencies.
- Enter `node server.mjs` to run the server. The following, for example, should appear in the console:
```
App listening on port 3000
```