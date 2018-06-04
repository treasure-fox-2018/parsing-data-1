"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(arrInfo){
    this.id = arrInfo[0]
    this.first_name = arrInfo[1]
    this.last_name = arrInfo[2]
    this.email = arrInfo[3]
    this.phone = arrInfo[4]
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() { 
    
    return this.parsing()
  }
  get file() { 
    
    return this._file
  }

  parsing() {
    const fs = require('fs')
    this._people = fs.readFileSync(this._file).toString().split('\n')

    var arrPeople = []
    for (let i = 1; i < this._people.length; i++) {
      this._people[i] = this._people[i].split(',')
         
      
      var objPerson = new Person(this._people[i])

      arrPeople.push(objPerson)

    }

    this._people = arrPeople
    return this._people
  }

  addPeople(){}


}

let parser = new PersonParser('people.csv')

// console.log(parser.addPerson());


console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
