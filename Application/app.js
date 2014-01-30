/**
 * Module dependencies.
 */

var express = require('express');
var fs = require('fs')
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

//Require for authantication
mongoose = require('mongoose');

var passport = require("passport");
var localStrategy = require('passport-local').Strategy;
//var facebookStrategy = require('passport-facebook').Strategy;
//var googleStrategy=require('passport-google').Strategy;

var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];


//mongoose.connect(config.db);

var models_dir = __dirname + '/models';
fs.readdirSync(models_dir).forEach(function (file) {
    if (file[0] === '.') return;
    require(models_dir + '/' + file);
});


require('./config/passport')(passport, config)


// code above is for authantication

var EmployeeProvider = require('./employeeProvider').EmployeeProvider;


var app = express();

app.configure(function() {
    app.use(express.static('public'));
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.session({ secret: 'keyboard cat' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(app.router);
});
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Database provider

var EmployeeProvider = require('./employeeProvider').EmployeeProvider;
var employeeProvider = new EmployeeProvider('localhost', 27017);


// Middleware for authantication
require('./config/routes')(app, passport, function (req, res) {
    console.log(res.provider);
    employeeProvider.findAll(function (error, emps) {
        console.log("REACHING HERE", emps);
        res.render('index', {
            title: 'List of Employees',
            employees: emps
        });
    })
});
require('./config/auth/gapi')(app, passport, function (req, res) {
        console.log(res.provider);
        employeeProvider.findAll(function (error, emps) {
            console.log("REACHING HERE", emps);
            res.render('index', {
                title: 'List of Employees',
                employees: emps
            });
        })
    }
);

require('./config/auth/fapi')(app, passport, function (req, res) {
        console.log(arguments);
        res.provider = "facebook";
        employeeProvider.findAll(function (error, emps) {
            res.render('index', {
                title: 'List of Employees',
                employees: emps
            });
        });
    }

);


// Code above is for authantication
// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//var employeeProvider= new EmployeeProvider('localhost', 27017);


/**app.get('/', function(req, res){
  employeeProvider.findAll(function(error, emps){
      res.render('index', {
            title: 'List of Employees',
            employees:emps
        });
  });
});
 */


////////


///////////////////////

app.get('/employee/new', function (req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});

//save new employee
app.post('/employee/new', function (req, res) {
    employeeProvider.save({
        title: req.param('title'),
        name: req.param('name')
    }, function (error, docs) {
        res.redirect('/')
    });
});

app.get('/employee/:id/edit', function (req, res) {
    employeeProvider.findById(req.param('_id'), function (error, employee) {
        res.render('employee_edit',
            {
                employee: employee
            });
    });
});

//save updated employee
app.post('/employee/:id/edit', function (req, res) {
    employeeProvider.update(req.param('_id'), {
        title: req.param('title'),
        name: req.param('name')
    }, function (error, docs) {
        res.redirect('/')
    });
});

//delete an employee
app.post('/employee/:id/delete', function (req, res) {
    employeeProvider.delete(req.param('_id'), function (error, docs) {
        res.redirect('/')
    });
});


app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
