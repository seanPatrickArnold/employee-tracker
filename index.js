const inquirer = require('inquirer');
const { addRole, addEmployee, addDepartment, getEmployees, getRoles, getDepartments, getEmployeeArray, updateEmployee } = require('./utils/databaseInterface');
const { employeeQuestions, departmentQuestions, roleQuestions } = require('./utils/questions');

function selectAction() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'Select an action:',
            name: 'action',
            choices: [
                'View Employees',
                'View Roles',
                'View Departments',
                'Add an Employee',
                'Add a Role',
                'Add a Department',
                'Update an Employee'
            ],
            default: ['View Employees'],
            validate: actionInput => {
                if (actionInput) {
                    return true;
                } else {
                    console.log('Please select an action.');
                    return false;
                }
            }
        })
        .then(result => handleSelection(result));
    
}

function handleSelection(result) {
    if ( result.action === 'View Employees') {
        getEmployees()
            .then(() => selectAction());
    }
    else if ( result.action === 'View Roles') {
        getRoles()
            .then(() => selectAction());
    }
    else if ( result.action === 'View Departments') {
        getDepartments()
            .then(() => selectAction());
    }
    else if ( result.action === 'Add an Employee') {
        inquirer
            .prompt(employeeQuestions)
            .then(result => {
                addEmployee(result)
                .then(() => selectAction())
                .catch(err => {
                    console.log(err);
                });
            });
    }
    else if ( result.action === 'Add a Role') {
        inquirer
            .prompt(roleQuestions)
            .then(result => {
                addRole(result)
                .then(() => selectAction())
                .catch(err => {
                    console.log(err);
                });
            });
    }
    else if ( result.action === 'Add a Department') {
        inquirer
            .prompt(departmentQuestions)
            .then(result => {
                addDepartment(result)
                .then(() => selectAction())
                .catch(err => {
                    console.log(err);
                });
            });
    }
    else if ( result.action === 'Update an Employee') {
        getEmployeeArray()
            .then(result => {
                inquirer
                    .prompt(
                        [
                            {
                                type: 'list',
                                message: 'Select an action:',
                                name: 'employee',
                                choices: result,
                                validate: employeeInput => {
                                    if (employeeInput) {
                                        return true;
                                    } else {
                                        console.log('Please select an employee.');
                                        return false;
                                    }
                                }
                            },
                            {
                                type: 'input',
                                message: "What is this employee's new role?",
                                name: 'role',
                                default: 'Departmenter',
                                validate: roleInput => {
                                    if (roleInput) {
                                        return true;
                                    } else {
                                        console.log('Please enter a role.');
                                        return false;
                                    }
                                }
                            }
                        ]
                    )
                    .then(result => {
                        const arr = result.employee.split(': ');
                        const scArr = arr.splice(-1, 1)[0];
                        const employeeId = parseInt(scArr.slice(0, scArr.length-1));
                        const body = { employeeId: employeeId, role: result.role }
                        return body;
                    })
                    .then(body => {
                        updateEmployee(body);
                    })
                    .then(() => selectAction())
                    .catch(err => {
                        console.log(err);
                    });
            })
    }
}


selectAction();