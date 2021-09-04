const db = require('../config/connection')

// Get all candidates
function getEmployees() {
    const sql = `SELECT employees.*, roles.role_name
                AS role, roles.salary
                AS salary
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.id`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('There was an error:' , err)
        return;
      }
      console.table(rows);
      return;
      });
  };

// Get all departments
function getDepartments() {
    const sql = `SELECT * FROM departments`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('There was an error:' , err)
        return;
      }
      console.table(rows);
      return;
      });
  };

// Get all roles
function getRoles() {
    const sql = `SELECT roles.*, departments.department
                AS department
                FROM roles
                LEFT JOIN departments
                ON roles.department_id = departments.id`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        console.log('There was an error:' , err)
        return;
      }
      console.table(rows);
      return;
      });
  };

// Get all roles
function addRole(body) {
    const sql = `INSERT INTO roles (role_name, salary, department_id)
                VALUES (?, ?, ?);`;

    const params = [body.role_name, body.salary, getDepartmentId(body.department)];
    
    db.query(sql, params, (err, result) => {
      if (err) {
        console.log('There was an error:' , err)
        return;
      }
      return;
      });
  };

function addDepartment(body) {
const sql = `INSERT INTO departments (department)
            VALUES (?);`;

const params = [body.department];

db.query(sql, params, (err, result) => {
    if (err) {
    console.log('There was an error:' , err)
    return;
    }
    return;
    });
};

function addEmployee(body) {
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager)
                VALUES (?, ?, ?, ?);`;


    const roleId = getRoleId(body.role_name);
    const params = [body.first_name, body.last_name, roleId, body.manager];
    
    db.query(sql, params, (err, result) => {
        if (err) {
        console.log('There was an error:' , err)
        return;
        }
        return;
        });
    };

function getRoleId(roleName) {
    const sql = `SELECT id FROM roles WHERE role_name = ?`;
    const params = [roleName];

    const roleId = db.query(sql, params, (err, result) =>{
        if (err) {
            console.log('There was an error: ', err)
            return;
        }
        return parseInt(result[0].id);
    });
    return roleId;
}

function getDepartmentId(department) {
    const sql = `SELECT id FROM departments WHERE department = ?`;
    const params = [department];

    const departmentId = db.query(sql, params, (err, result) =>{
        if (err) {
            console.log('There was an error: ', err)
            return;
        }
        return parseInt(result[0].id);
    });
    return departmentId;
}


getRoleId('Departmenter');
// addDepartment({department: 'Role Making'});
addRole({role_name: 'Role Maker', salary: 2, department: 'Deparrtment Making'});
addEmployee({first_name: 'Jack', last_name: 'Jillson', role_name: 'Role Maker', manager: 'Jill Jilldaughter'});
getEmployees();
getRoles();
getDepartments();

module.exports = {addRole, addEmployee, getEmployees, getRoles, getDepartments}