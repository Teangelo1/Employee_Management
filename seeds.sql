USE employees_db;

INSERT INTO department (name)
VALUES 
('Development'),
('Cyber Security'),
("Sales"),
("HR")


INSERT INTO employee_role (title, salary, department_id)
VALUES 
('Software Engineer', 100000, 1),
('Web Developer', 80000, 2),
('Cyber Security Specialist', 95000, 3),
('HR Lead', 70000, 4),
('Sales Engineer', 95000, 5),
('Security Guard', 60000, 6),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Teangelo", "Burks", 200,),
("Lindsey", "Woods", 893,),
("Michael", "Hernandez", 938,),
("Jim", "Cook", 142,),
("Elizabeth", "Davis", 237,),
