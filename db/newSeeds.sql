INSERT INTO departments (department)
VALUES
  ('Department Making'),
  ('Department Naming');

INSERT INTO roles (role_name, salary, department_id)
VALUES
  ('Departmenter', 10, 1),
  ('Departmentizer', 10, 1),
  ('Departmentalator', 1, 2),
  ('Departer', 2, 2);

INSERT INTO employees (first_name, last_name, role_id, manager)
VALUES
  ('Joe', 'Joeson', 1, 'Jack Jackson'),
  ('Jack', 'Jackson', 2, 'Responds to no one.'),
  ('Jill', 'Jilldaughter', 3, 'Jill Jillmother'),
  ('Jill', 'Jillmother', 4, 'Responds to no one.');
