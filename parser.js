"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(arr){
    this.id = arr[0],
    this.first_name = arr[1],
    this.last_name = arr[2],
    this.email = arr[3],
    this.phone = arr[4],
    this.created_at = arr[5]
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return {
      people: this._people,
      size: this._people.length
    }
  }

  get file(){
    return this._file
  }

  parser(){
    let people = fs.readFileSync(this._file, 'utf8')
                   .split("\n")

    let peopleData = []

    for(let i = 1; i < people.length; i++){
      peopleData[i] = people[i].split(',')
      peopleData[i][peopleData[i].length - 1] = new Date(peopleData[i][peopleData[i].length-1])
      let peopleDataObj = new Person(peopleData[i])
      this._people.push(peopleDataObj)
    }

  }

  addPerson(arr) {
    let person = new Person(arr)
    this._people.push(person)
    return this._people
  }

 save() {
    let convert = 'id,first_name,last_name,email,phone,created_at\n'
 
    for(let i = 0; i < this._people.length; i++){
      convert += `${this._people[i].id}, ${this._people[i].first_name}, ${this._people[i].last_name}, ${this._people[i].email}, ${this._people[i].phone}, ${this._people.created_at}\n`
    }
    fs.appendFileSync(this._file, this._people + "\n", "utf8");
  }
  

}

let parser = new PersonParser('people.csv')

parser.parser()
console.log(parser.people)

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

