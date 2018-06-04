"use strict"

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
    const fs = require('fs')
    let people = fs.readFileSync(this._file, 'utf8')
                   .split("\n")

    let peopleData = []

    for(let i = 1; i < people.length; i++){
      let personData = people[i].split(',')
      let lastIndex = personData.length - 1;
      personData[lastIndex] = personData[lastIndex].slice(0, -1);
      peopleData.push(personData)
    }

    console.log(peopleData);

    for(let i = 1; i < peopleData.length; i++){
      peopleData[i][peopleData[i].length - 1] = new Date(peopleData[i][peopleData[i].length-1])
      let peopleDataObj = new Person(peopleData[i])
      this._people.push(peopleDataObj)
    }

    console.log(this._people)
  }

  addPerson(arr) {
    let person = new Person(arr)
    this._people.push(person)
    return this._people
  }

  /*save() {
    const fs = require("fs");
    fs.appendFileSync(this._file, this._people + "\n", "utf8");
  }
  */


}

let parser = new PersonParser('people.csv')

parser.parser()
console.log(parser)

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

