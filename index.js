// Your code here
function createEmployeeRecord([firstName, familyName, title, payRatePerHour]) {
  return {
    firstName: firstName,
    familyName: familyName,
    title: title,
    payPerHour: payRatePerHour,
    timeInEvents: [],
    timeOutEvents: [],
  }
}
function createEmployeeRecords(arrayOfArrays) {
  return arrayOfArrays.map((employee) => createEmployeeRecord(employee))
}
function createTimeInEvent(employeeRecord, dateStamp) {
  const saveDate = dateStamp.split(" ")
  const timeIn = {
    type: "TimeIn",
    hour: parseInt(saveDate[1]),
    date: saveDate[0]
  }
  employeeRecord.timeInEvents.push(timeIn)
  return employeeRecord
}
function createTimeOutEvent(employeeRecord, dateStamp) {
  const saveDate = dateStamp.split(" ")
  const timeOut = {
    type: "TimeOut",
    hour: parseInt(saveDate[1]),
    date: saveDate[0]
  }
  employeeRecord.timeOutEvents.push(timeOut)
  return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, dateStamp) {
  const timeIn = employeeRecord.timeInEvents.find(object => object.date === dateStamp)
  const timeOut = employeeRecord.timeOutEvents.find(object => object.date === dateStamp)
  return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, dateStamp) {
  const timeIn = employeeRecord.timeInEvents.find(object => object.date === dateStamp)
  const timeOut = employeeRecord.timeOutEvents.find(object => object.date === dateStamp)
  const payRate = employeeRecord.payPerHour
  return (timeOut.hour - timeIn.hour) / 100 * payRate
}

function allWagesFor(employeeRecord) {
  const dates = employeeRecord.timeInEvents.map(record => record.date)
  const payDates = dates.reduce((prev, next) => prev + wagesEarnedOnDate(employeeRecord, next), 0)
  return payDates
}

function calculatePayroll(employeeArray) {
  const payDates = employeeArray.reduce((prev, next) => prev + allWagesFor(next), 0)
  return payDates
}