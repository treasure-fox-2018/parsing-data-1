"use strict"

const fs = require('fs')

class Person {
  constructor(id, firstName, lastName, email, phone, created_at) {
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = new Date(created_at)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  //setter
  set people (people) {
    this._people = people;
  }

  get dataPeople() {
    let data = fs.readFileSync(this._file, 'utf-8').split('\n')
    this.people = [];
  
    for (let i = 1; i < data.length; i++) {
      let currentLine = data[i].split(',')

      let id = currentLine[0]
      let firstName = currentLine[1]
      let lastName = currentLine[2]
      let email = currentLine[3]
      let phone = currentLine[4]
      let created_at = currentLine[5]
  
      let classPerson = new Person(id, firstName, lastName, email, phone, created_at)

      this._people.push(classPerson)
    }

    return this._people
    
  }

  //getter
  get people() {
    return {
      size: this.dataPeople.length,
      file: this._file
    }
  }

  addPerson(letter) {
    this.dataPeople.push(letter)
  }

  save() {
    let file = fs.readFileSync(this._file, 'utf-8').split('\n')
    let headers = file[0].split(',')
    for (let i = 0; i < this._people.length; i++) {
      headers += Object.values(this._people[i]).join(',') + '\n'
    }

    fs.writeFileSync(this._file, headers)
    return this.people
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(new Person(`${parser.people.size + 1}`, 'Ari', 'Supriatna', 'arisupriatna703@gmail.com', '085777282844', '2018-02-22T10:09:03-08:00'))
parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser.people.file}'.`)

// console.log(parser.people)
// // console.log(parser.save())