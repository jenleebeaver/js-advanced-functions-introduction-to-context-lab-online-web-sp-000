// Your code here
let createEmployeeRecord = function(row) {
  return {
    firstName: row[0],
    familyName: row[1],
    title: row[2],
    payPerHour: row[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

//this is creating multiple records
let createEmployeeRecords = function(employeeRowData) {
  return employeeRowData.map( function(row){
    return createEmployeeRecord(row)
  })
}

let createTimeInEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeInEvents.push({
    type: 'TimeIn',
    hour: parseInt(hour, 10),
    date,
  })

  return employee
}

let createTimeOutEvent = function(employee, dateStamp) {
  let [date, hour] = dateStamp.split(' ')

  employee.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  })

  return employee
}

let hoursWorkedOnDate = function(employee, soughtDate) {

  let clockIn = employee.timeInEvents.find(function(e){
    return e.date === soughtDate
  })

  let clockOut = employee.timeOutEvents.find(function(e){
    return e.date === soughtDate
  })

  return (clockOut.hour - clockIn.hour) / 100
}

let wagesEarnedOnDate = function(employee, dateSought){
  let rawWage = hoursWorkedOnDate(employee, dateSought) * employee.payPerHour
  return parseFloat(rawWage)
}
//note that parseFloat() parses a value: will convert into a string and return a floating point number

let allWagesFor = function(employee){
  let workDays = employee.timeInEvents.map(function(e){
    return e.date
  })

  let totalWage = workDays.reduce(function(memo, d){
    return memo + wagesEarnedOnDate(employee, d)
    }, 0)

  return totalWage
}

let calculatePayroll = function(arrayOfEmployees){
  return arrayOfEmployees.reduce(function(memo, rec){
    return memo + allWagesFor(rec)
  }, 0)
}
//note: difference between map and reduce: map iterates over and can manipulate vc reduce adds it all together for some kind of total

let findEmployeeByFirstName = function(srcArray, firstName){
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}
