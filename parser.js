"use strict"

let fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.getArray()
  }

  getArray() {

    let ar = []
    let list = fs.readFileSync(this._file, 'utf8').split('\n');
    for (let i = 1; i < list.length - 1; i++) {
      let result = list[i].split(',')
      let persons = new Person(result[0], result[1], result[2], result[3], result[4], result[5])
      ar.push(persons)

    }
    return ar
  }

  get people() {
    return this._people
  }

  addPerson(id, first_name, last_name, email, phone) {
    let objNew = new Person(id, first_name, last_name, email, phone, new Date)
    this._people.push(objNew)
    return this._people
  }


  save() {
    var string = '';
    string += 'id,first_name,last_name,email,phone,created_at' + '\n';
    for (let i = 0; i < this._people.length; i++) {
      for (let j in this._people[i]) {
        if (j === 'created_at') {
          string = string + this._people[i][j]
        } else {
          string += this._people[i][j] + ','
        }
      }
      string = string + '\n'

    }
    fs.writeFileSync(this._file, string)


  }


}

let parser = new PersonParser('people.csv')
parser.addPerson(201, 'handi', 'priyono', 'email@mail.com', '061666')
parser.addPerson(202, 'MArio', 'Panggih', 'panggih@mail.com', '069899')

// let lihat = parser.people
parser.save()
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
