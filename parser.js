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
    this.create_at = arrInfo[5]
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() { 
    
    return this._people
  }
  get file() { 
    
    return this._file
  }

  parsing() {
    const fs = require('fs')
    var arrPeople = fs.readFileSync(this._file).toString().split('\n')

    var AOBpeople = []
    for (let i = 1; i < arrPeople.length; i++) {
      arrPeople[i] = arrPeople[i].split(',')
      
      var objPerson = new Person(arrPeople[i])

      AOBpeople.push(objPerson)

    }

    this._people = AOBpeople
    return this._people
  }

  addPeople(obj){
    
     this._people.push(obj) 
    //  console.log(this._people);
    // console.log(this._people[200]);
    
  }


}

let parser = new PersonParser('people.csv')



console.log(parser.parsing());

parser.addPeople(new Person(['201','Bimo','yoyo','bimo@yoyo.com','034-23034-34','2014-11-01T06:08:44-07:00']))
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
