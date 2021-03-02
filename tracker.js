const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require("console.table");
const chalk = require('chalk');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.myPassword,
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  firstQuestion();

});

// Function to prompt the user on what they would like to do

const firstQuestion = () => {
  
  inquirer
    .prompt({
      name: 'AddViewUpdate',
      type: 'list',
      message: 'Hello There, What would you like to do?',
      choices: ["Add Employee", "Add Department", "Add Role", "Update Employee Role", "View all Employees", "View all Departments", "View all Roles", "Done"]
    })
    .then(function (answer) {
      switch (answer.AddViewUpdate) {
        case "Add Employee":
          addEmployee()
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateRole();
          break;

        case "View all Employees":
          viewEmployees("employee");
          break;

        case "View all Departments":
          viewEmployees("department");
          break;

        case "View all Roles":
          viewEmployees("employee_role");
          break;

        default:
          break;
      };
    });

  const addEmployee = () => {
    inquirer.prompt([
      {
        name: 'First_Name',
        type: 'input',
        message: "What is your employees's first name?"

      },

      {
        name: 'Last_Name',
        type: 'input',
        message: "What is your employees's Last name?"

      },

      {
        name: 'Role',
        type: 'input',
        message: "What is your employees's role?"

      },

      {
        name: 'Manager_Name',
        type: 'input',
        message: "Who is your employees's manager?"

      },

    ])
      .then((answer) => {
        connection.query(
          'INSERT INTO employee SET ?',

          {
            first_name: answer.First_Name,
            last_name: answer.Last_Name,
            role_id: answer.Role,
            manager_id: answer.Manager_Name || 0,

          },
          (err) => {
            if (err) throw err;
            console.log("You have successfully added an employee")
            // ask initial question again.
            firstQuestion();
          }
        );
      });
  };

  const addDepartment = () => {
    inquirer
      .prompt([
        {
          name: "Department",
          type: "input",
          message: "What department would you like to add?"
        }
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO department SET ?',

          {
            name: answer.Department
          },
          (err) => {
            if (err) throw err;
            console.log("You have successfully added an department")
            // ask initial question again.
            firstQuestion();
          }
        );
      });
  }

  const addRole = () => {
    inquirer
      .prompt([
        {
          name: "Role",
          type: "input",
          message: "What role would you like to add?"
        },

        {
          name: "Salary",
          type: "input",
          message: "What is the yearly salary for this role?"
        },

        {
          name: "DepartmentId",
          type: "input",
          message: "What is the Department ID?"
        }
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO employee_role SET ?',

          {
            title: answer.Role,
            salary: answer.Salary,
            department_id: answer.DepartmentId
          },
          (err) => {
            if (err) throw err;
            console.log("You have successfully added a new role")
            // ask initial question again.
            firstQuestion();
          }
        );
      });
  }

  const viewEmployees = (x) => {
    console.log(x)
    connection.query(`SELECT * FROM ${x}`, 
      (err, res) => {
        if (err) throw err;
        console.table(res);
        firstQuestion();
      }
    )
  }

  const updateRole = () => {
    connection.query('UPDATE employee_role SET ? WHERE ?') 

  }


}