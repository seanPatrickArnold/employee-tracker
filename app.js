const db = require('./config/connection')

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

getEmployees();