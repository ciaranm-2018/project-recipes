

# COOKING RECIPE




## Technologies Used

* [Reactjs](https://reactjs.org/) -  The project uses Reactjs for  DOM manipulation.
* [axios](https://www.npmjs.com/package/axios) - The project uses axios for  Make XMLHttpRequests from the browser
* [Flask](http://flask.pocoo.org/) - Flask is a microframework for Python the project uses to implement backend APIs


## How to run code locally.
## How to run client ( front-end )
Navigate to the client directory 

```sh
cd client
```

Install dependencies and run:

```sh
npm install
npm run start
```

## How to run server ( back-end )

Pre - Requirements
install and run MongoDB 

```sh
mongoDB runs on default port 27017
127.0.0.1:27017
```


```sh
install python 3.X

then

> python3 -m pip install virtualenv

```

```sh
> cd server
```

create virtualenv and Install python modules and run:

```sh
> python3 -m virtualenv venv #create virtual environment
> . venv/bin/activate #activate virtual environment
```



```sh
(venv) > pip install -r requirements.txt 
(venv) > set export FLASK_APP=app.py
(venv) > python -m flask run
```

