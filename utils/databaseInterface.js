const db = require('../config/connection')
const cTable = require('console.table');

// Get all candidates
async function getEmployees() {
    const sql = `SELECT employees.first_name, employees.last_name, employees.manager,
                roles.role_name AS role, roles.salary
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('There was an error:' , err)
      }
      console.log('\n');
      console.table(rows);
      });
  };

// Get all departments
async function getDepartments() {
    const sql = `SELECT departments.department FROM departments`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('There was an error:' , err)
      }
      console.log('\n');
      console.table(rows);
      });
  };

// Get all roles
async function getRoles() {
    const sql = `SELECT roles.role_name, roles.salary, departments.department
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('There was an error:' , err)
      }
      console.log('\n');
      console.table(rows);
      });
  };

// Add a roles
async function addRole(body) {
  const sql = `SELECT id FROM departments WHERE department = ?`;
  const params = [body.department];

  db.query(sql, params, (err, result) =>{
    if (err) {
      console.log('There was an error: ', err)
    }
    
    const sql = `INSERT INTO roles (role_name, salary, department_id)
            VALUES (?, ?, ?);`;

    const params = [body.role, body.salary, result[0].id];
    
    db.query(sql, params, (err) => {
      if (err) {
        console.log('There was an error:' , err)
      }
    });
  }); 
};

// Add a department
async function addDepartment(body) {
  const sql = `INSERT INTO departments (department)
              VALUES (?);`;

  const params = [body.department];

  db.query(sql, params, (err) => {
    if (err) {
      console.log('There was an error:' , err)
    }
  });
};

// Add an employee
async function addEmployee(body) {
  
  const sql = `SELECT id FROM roles WHERE role_name = ?`;
  const params = [body.role];

  console.log(body.role);

  db.query(sql, params, (err, result) =>{
    if (err) {
      console.log('There was an error: ', err)
    }
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager)
            VALUES (?, ?, ?, ?);`;

    const params = [body.firstName, body.lastName, result[0].id, body.manager];
    
    db.query(sql, params, (err) => {
      if (err) {
        console.log('There was an error:' , err)
      }
    });
  });
};

// Update an employee
async function updateEmployee(body) {
  return new Promise(function(resolve) {
    const sql = `SELECT id FROM roles WHERE role_name = ?`;

    const params = [ body.role ];
    
    db.query(sql, params, (err, rows) => {
      if (err) {
        console.log('There was an error:' , err)
      }
      const sql = `UPDATE employees SET role_id = ? 
                WHERE id = ?`;

      const params = [ rows[0].id, body.employeeId ];
      
      db.query(sql, params, (err, rows) => {
        if (err) {
          console.log('There was an error:' , err)
        }
        resolve();
      });
    });
  });
};

// Get array of employees
async function getEmployeeArray() {
    return new Promise(function(resolve, reject) {
      const sql = `SELECT employees.first_name, employees.last_name, employees.manager, employees.id,
                  roles.role_name AS role, roles.salary
                  FROM employees
                  LEFT JOIN roles
                  ON employees.role_id = roles.id`;

      db.query(sql, (err, rows) => {
        if (err) {
          return reject(err);
        }
        const employeeArray = [];
        for (i=0; i<rows.length; i++) {
          employeeArray.push(rows[i].first_name + ' ' + rows[i].last_name + ' (id: ' + rows[i].id + ')');
        }
        resolve(employeeArray);
      });
    });
};

module.exports = { addRole, addEmployee, addDepartment, getEmployees, getRoles, getDepartments, getEmployeeArray, updateEmployee }