"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?

  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

  
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [] //tampung
  }

  get people() {
    // Read from csv
    return this._people
  }

  convertData() {
    var fs = require('fs')
    var data = fs.readFileSync('./people.csv', 'utf8') // for read csv file use readFileSync
    data = data.split('\r\n')

    var seperatedArr = []
    for (let i = 1; i < data.length; i++) {
      seperatedArr.push(data[i].split(','))  
    }
    // console.log(seperatedArr)
    for (let j = 0; j < seperatedArr.length; j++) {
      var newPerson = new Person(seperatedArr[j][0], seperatedArr[j][1], seperatedArr[j][2], seperatedArr[j][3], seperatedArr[j][4], seperatedArr[j][5])
      this._people.push(newPerson)
    }
    return this._people
  }

  addPerson(addData) {
    return this._people.push(addData)
  }

  save() {
    // var str = ''
    // var fs = require('fs')
    // console.log(this._people)
    // for (let i = 0; i < this._people.length; i++) {
    //   var resultArr = []
    //   for (var key in this._people[i]) {
    //     resultArr.push(this._people[i][key])
    //   }
    //   str = str + resultArr.join(',') + '\n'
    // }
    // // return    
    // fs.writeFileSync('people.csv', str)
    // console.log(str)
    // // return str
  }
}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person('203', 'fajar', 'tri', 'fajartc02@gmail.com', '0821-2123-2314', '2012-07-15T12:06:16-07:00'))

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// parser.save()
console.log(parser.convertData());
console.log(parser.convertData())
console.log(parser.addPerson())
// console.log(parser.save());