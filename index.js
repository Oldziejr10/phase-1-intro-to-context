function createEmployeeRecord(employee) {
    return { 
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

function createEmployeeRecords(employees) { 
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, event) {
    let [date, hour] = event.split(" ")
    let eventObj = { 
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date

    }
    employee.timeInEvents.push(eventObj)
    return employee 
}

function createTimeOutEvent(employee, event) {
    let [date, hour] = event.split(" ")
    let eventObj = { 
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date

    }
    employee.timeOutEvents.push(eventObj)
    return employee 
}

function hoursWorkedOnDate(employee, date) { 
  const timeIn = employee.timeInEvents.find(event => event.date === date) 
  const timeOut = employee.timeOutEvents.find(event => event.date === date)
  return (timeOut.hour - timeIn.hour)/100

}

function wagesEarnedOnDate(employee, date) { 
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    const allWages = employee.timeInEvents.map(event => wagesEarnedOnDate(employee, event.date));
    return allWages.reduce((total, wage) => total + wage); 

}

function calculatePayroll(employee) {
    const totalForEachEmployee = employee.map(record => allWagesFor(record))
    return totalForEachEmployee.reduce((total, employee) => total + employee)

}
