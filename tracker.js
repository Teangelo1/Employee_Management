const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require("console.table");
const chalk = require('chalk');
let figlet = require('figlet');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: process.env.myPassword,
  database: 'employee_db',
});

figlet('Employee Management System', function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data)
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

        case "Done":
          connection.end();

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

  function updateRole() {
    const updating = "SELECT id, first_name, last_name, role_id  FROM employee";
    connection.query(updating, function (err, res) {
      if (err) throw err;
      console.table(res); // using table to show list of employee's

      let allRoles = 'SELECT * FROM employee_role';
      let roles = connection.query(allRoles, (err, data) => {
        let roleChoices = [];

        for (let i = 0; i < data.length; i++) {
          roleChoices.push({
            name: data[i].title,
            value: data[i].id
          })
        }

        inquirer.prompt([
          {
            type: "input",
            message: "Select the employee by ID that you would like to update",
            name: "employee",

          },

          {

            type: "list",
            message: "Select which role you'd like to update the employee to",
            name: "newRole",
           choices: roleChoices
          }

        ])
          .then((answer) => {
            connection.query(
              'UPDATE employee SET role_id = ? WHERE id = ? ', // role_id is the employee were updating

              [
                answer.newRole,
                answer.employee

              ],

              (err) => {
                if (err) throw err;
                console.log("You have successfully udpated a role")
                // ask initial question again.
                firstQuestion();
              }
            );
          });


      })
    });
  };
}
