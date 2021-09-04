let employeeQuestions = [
            
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name? (Required)",
        default: 'John',
        validate: firstNameInput => {
            if (firstNameInput) {
                return true;
            } else {
                console.log('Please enter a name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's Last name? (Required)",
        default: 'John',
        validate: lastNameInput => {
            if (lastNameInput) {
                return true;
            } else {
                console.log('Please enter a name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: "What is this employee's role?",
        name: 'role',
        default: 'Role Maker',
        validate: roleInput => {
            if (roleInput) {
                return true;
            } else {
                console.log('Please enter id!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: "Who is the employee's manager?",
        name: 'manager',
        default: 'john',
        validate: managerInput => {
            if (managerInput) {
                return true;
            } else {
                console.log('Please enter an email!');
                return false;
            }
        }
    }
]

let departmentQuestions = [
            
    {
        type: 'input',
        name: 'department',
        message: "What is the department name? (Required)",
        default: 'Department',
        validate: departmentInput => {
            if (departmentInput) {
                return true;
            } else {
                console.log('Please enter a name!');
                return false;
            }
        }
    }
]

let roleQuestions = [
            
    {
        type: 'input',
        name: 'role',
        message: "What is the name of the role? (Required)",
        default: 'Role Maker',
        validate: roleInput => {
            if (roleInput) {
                return true;
            } else {
                console.log('Please enter a role!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'salary',
        message: "What is the salary for this role? (Required)",
        default: '10',
        validate: salaryInput => {
            if (salaryInput) {
                return true;
            } else {
                console.log('Please enter a salary!');
                return false;
            }
        }
    },
    {
        type: 'input',
        message: "What is this role's department?",
        name: 'department',
        default: 'Department Making',
        validate: roleInput => {
            if (roleInput) {
                return true;
            } else {
                console.log('Please enter id!');
                return false;
            }
        }
    }
]

module.exports = { employeeQuestions, departmentQuestions, roleQuestions }