const inquirer = require('inquirer');
const { addRole, addEmployee, getEmployees, getRoles, getDepartments } = require('./utils/databseInterface');
const { employeeQuestions, departmentQuestions, roleQuestions } = require('./questions');

