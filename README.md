A sample project with a simple Node.js application that connects to a containerized MongoDB DBMS.

* To start application:
[1] - create a '.env' file with credentials
```bash
    $ cat .env
# node.js app's configuration
EXPRESS_PORT=8001
# mongodb app's configuration
MONGO_INITDB_HOST=localhost
MONGO_INITDB_ROOT_USERNAME=user
MONGO_INITDB_ROOT_PASSWORD=pass
MONGO_INITDB_PORT=27017
MONGO_INITDB_DATABASE=app
```

[2] - In the first bash terminal
```bash
    $ docker compose up
```

[3] - In the second bash terminal
```bash
    $ npm run start
```


* To correctly stop application do not forget
```bash
    $ docker compose down
```