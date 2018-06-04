"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.email = email,
    this.phone = phone,
    this.created_at = created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }
  
  get people() {
    return this.parse()
  }

  parse () {
    let fs = require("fs")
    let filename = './people,csv'
    let data = fs.readFileSync('./people.csv')
    data = data.toString().split('\n')
    
    let dataArr = []
    for (let i = 0; i < data.length; i++) {
      dataArr.push(data[i].split(','))
    }
    // let parseArr = []
    for (let i = 1; i < dataArr.length; i++) {
      this._people.push(new Person(dataArr[i][0], dataArr[i][1], dataArr[i][2], dataArr[i][3], dataArr[i][4], dataArr[i][5]))
    }
    return this._people
  }
  
  addPerson(newData) {
    return this._people.push(newData)
  }

  savePerson() {
    let fs = require("fs")
    let filename = './people,csv'
    let data = fs.writeFileSync('./people.csv')
    let mainStr = ''
    for (let i = 0; i < this.parse().length; i++) {
      mainStr += `id:${this.parse()[i].id}|first_name:${this.parse()[i].first_name}|last_name:${this.parse()[i].last_name}|email:${this.parse()[i].email}|phone:${this.parse()[i].phone}created_at:${this.parse()[i].created_at}\n`
    }
    return mainStr
  }
  
}

let parser = new PersonParser('people.csv')
let haka = new Person('201', 'Fadhil', 'HaKa', 'fadhilhanri@gmail.com', '007', '2017-11-01T06:08:44-07:00')

// parser.addPerson(haka)

console.log(parser.people)
// console.log(parser.savePerson())
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
