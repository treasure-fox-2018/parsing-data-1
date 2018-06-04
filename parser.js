"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor( id, firstName, lastName, email, phone, createdAt) {
    this.id = id
    this.first_name = firstName
    this.last_name = lastName
    this.email = email
    this.phone = phone
    this.created_at = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.callPeople()
  }

  callPeople() {
    let peopleArr = []
    var fileName = fs.readFileSync('people.csv').toString().split('\n')
    //let people_split = []
    for (let i = 0; i < fileName.length; i ++) {
      let fileNameSplit = fileName[i].split(',')
      let id = fileNameSplit[0]
      let firstName = fileNameSplit[1]
      let lastName = fileNameSplit[2]
      let email = fileNameSplit[3]
      let phone = fileNameSplit[4]
      let createdAt = fileNameSplit[5]

      let peopleObj = new Person(id,firstName,lastName,email,phone,createdAt)

      peopleArr.push(peopleObj)
    }
    return peopleArr
  }

  get people() {
    return this._people
  }


  addPerson(category) {
    return this._people.push(category)
  }

  save() {

    console.log(this._people);
  }
}

let fs = require ('fs')
let parser = new PersonParser('people.csv')

console.log(parser.people)

//parser.addPerson(new Person('666', 'Tyler', 'Durden', 'durden@hotwheels.com', '1-666-666-6666', '2018-04-01T06:09.00'))
console.log(parser.people.length)
//console.log(category)
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
