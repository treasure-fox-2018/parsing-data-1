"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(obj) {
    this.id = +obj.id
    this.first_name = obj.first_name
    this.last_name = obj.last_name
    this.email = obj.email
    this.phone = obj.phone
    this.created_at = new Date(obj.created_at)
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }

  addPeople(callback) {
    this.readData(data => {
      let key = data[0].split(',')
      for (let i = 1; i < data.length; i++) {
        let obj = {}
        data[i] = data[i].split(',')
        for (let j = 0; j < data[i].length; j++) {
          obj[key[j]] = data[i][j]
        }
        let person = new Person(obj)
        this._people.push(person)
      }
      callback(this._people)
    })
  }

  readData(callback) {
    fs.readFile(this._file, 'utf8', (err, data) => {
      if (err) throw err;
      let array = data.split('\n');
      callback(array);
    })
  }

  save(data) {
    let str = '';
    let keys = Object.keys(data[0]);

    for (let i = 0; i < keys.length; i++) {
      str += keys[i].slice(0);
      if (i === keys.length - 1) str += '\n';
      else str += ',';
    }

    for (let i = 0; i < data.length; i++) {
      let person = data[i]
      let array = [person.id, person.first_name, person.last_name, person.email, person.phone, person.created_at]
      str += `${array.join(',')}`;
      if (i !== data.length - 1) str += '\n';
    }

    fs.writeFile('people-modified.csv', str, (err) => {
      if (err) throw err;
    })
  }

}

let parser = new PersonParser('people.csv')
parser.addPeople((data) => {
  console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
  console.log(parser.people)
  parser.save(data)
})

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
