# Simple-Stock-Order-Site
This project contains an Angular website and a Node server. The site is able to control stock, customers and the orders placed by the customers. The server holds the API for the site to access.

How to use the Site:
You will need to have a MySQL database running with the provided schema. Additionally, you will need the Simple Stock And Order Site API Server project running.in order to access the site properly. 

Finally you will need to download AngularJS and W3.CSS which can easily be found. Insert the necessary files into the scripts and styles folder respectively. 

How to use the Server:
Have NodeJS installed and be able to access npm via command line.

run 'npm install' in command line, it will download any necessary files.
After everything has installed, run 'node .\app.js' which will start the server.
Note: You will need to configure the database login details in app.js and have the database running. Additionally, if you want to host the files with this server, you need to configure correct directory in the app.js file on line 37 where is says "..express.static('../app/')..". 