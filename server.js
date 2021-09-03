const mysql = require('mysql2');

// Get all candidates
function getEmployees() {
  const sql = `SELECT employees.*, roles.role_name
              AS role
              FROM employees
              LEFT JOIN roles
              ON employees.role_id = roles.id`;
  
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  };

getEmployees();


