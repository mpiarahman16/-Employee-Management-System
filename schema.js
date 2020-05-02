const inquirer = require("inquirer");
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'PiaRahman',
    password: 'NewPassword!',
    database: 'schema'
});

connection.connect();
function main() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'roles',
            message: 'What will you like to do',
            choices: [
                'Add departments',
                'Add roles',
                'Add employees',
                'View departments',
                'View roles',
                'View employees',
                'Update employee roles',
            ],
        }
    ]).then(function (answers) {
        if (answers.roles == 'Add departments') {
            addDepartment()
        }
        if (answers.roles === 'Add roles') {
            addRoles()
        }
        if (answers.roles === 'Add employees') {
            addEmployees()
        }
        if (answers.roles === 'View departments') {
            viewTable("department")
        }
        if (answers.roles === 'View roles') {
            viewTable("role")
        }
        if (answers.roles === 'View employees') {
            viewTable("employee")
        }
        if (answers.roles === 'Update employee roles') {
            updateEmployeeRole()
        }
    })
}
function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the department name:',
            name: 'deptName'
        }
    ])
        .then(function ({ deptName }) {
            var query = 'INSERT INTO `department` (`name`) VALUES ("' + deptName + '")';//write the query here
            connection.query(query);
            main()
        });
}
function addRoles() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the roles:',
            name: 'rolesName'
        },
        {
        type: 'input',
        message: 'Please enter the salary:',
        name: 'salary'
        },
        {
            type: 'input',
            message: 'Please enter the department id:',
            name: 'departmentId'
            }
    ])
        .then(function ({ rolesName, salary, departmentId }) {
            var query = 'INSERT INTO `role` (`title`,`salary`, `department_id`) VALUES ("' + rolesName + '", "' + salary + '", "' + departmentId + '")';//write the query here
            connection.query(query);
            main()
        });
}
function addEmployees() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Please enter the employees:',
            name: 'rolesEmployees'
        }
    ])
        .then(function ({ employeesName }) {
            var query = 'INSERT INTO `employees` (`name`) VALUES ("' + employeesName + '")'; //write the query here
            connection.query(query);
            main()
        });
}
function viewTable(table) {
    connection.query(`select * from ${table}`, function (error, data) {
        if (error) console.error(error)
        console.table(data)
        main()
    })

}
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter the name of the role that you want to update:',
            name: 'oldRoleName',
        },
        {
            type: 'input',
            message: 'Enter the new name for the roles:',
            name: 'nwRoleName',
        },
    ])
        .then(function ({ oldRoleName, newRoleName }) {
            var query = 'UPDATE `role` SET `title` = "' + newRoleName + '" WHERE `title` = "' + oldRoleName + '"';
            connection.query(query);
            main();

        });
}

main();
