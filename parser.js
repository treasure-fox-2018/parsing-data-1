"use strict"

class Person {

  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
  
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this._arrPeople = []
    this._header = null
  }

  people() {
      let arr = fs.readFileSync(this._file, 'utf-8').split('\n')
      this._header = arr[0]

      for(let i = 1; i < arr.length; i++) {
        this._people.push(new Person(...arr[i].split(',')))
      }

    return this._people
  }

  addPerson(number) {
    for(let i = 0; i < number; i++) {

      let id = String(this._people.length + 1)
      let firstName = faker.name.firstName()
      let lastName = faker.name.lastName()
      let email = faker.internet.email()
      let phone = faker.phone.phoneNumber()
      let createdAt = new Date()
      let tempFaker = []

      tempFaker.push(id)
      tempFaker.push(firstName)
      tempFaker.push(lastName)
      tempFaker.push(email)
      tempFaker.push(phone)
      tempFaker.push(createdAt)
      
      this._people.push(new Person(...tempFaker))
    }
  }

  objectToArray() {
    let arrOfObject = this._people
    let arr = []
    arr.push(this._header)

    for(let i = 0; i < arrOfObject.length; i++) {
      arr.push((Object.values(arrOfObject[i]).join(',')))
    }

    this._arrPeople = arr;
  }

}

const fs = require('fs')  
const faker = require('faker')

let parser = new PersonParser('people.csv')

parser.people()
parser.addPerson(20)
console.log(parser.objectToArray())
console.log(parser._people)

fs.writeFileSync('people.csv', parser._arrPeople.join('\n'))

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`) 