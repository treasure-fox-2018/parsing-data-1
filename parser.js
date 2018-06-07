"use strict"
const fs = require ('fs')

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

  dataPeople() {
    let peopleArr = []
    var fileName = fs.readFileSync(this._file,'utf8').split('\n')
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
    let str = ''
    for (let i = 0 ; i < this._file.length ; i++ ){
      
    }
    fs.writeFileSync(this._file, 'utf8')

    // console.log(this._people);
  }
}

let parser = new PersonParser('people.csv')
let riza = new Person('999', 'Cim', 'Ming', 'cimMing@ming.com', '3-999-111-9999', '2018-02-20T06:09.00'))

parser.dataPeople()
parser.addPerson(riza)
// console.log(parser.people.length)
//console.log(category)
//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
