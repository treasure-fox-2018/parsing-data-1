"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?a
  constructor(arr){
    this.id = arr[0]
    this.first_name = arr[1]
    this.last_name = arr[2]
    this.email = arr[3]
    this.phone = arr[4]
    this.created_at = arr[5]
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  parse(){
    var fs = require('fs')
    var file = fs.readFileSync('people.csv').toString().split('\n');

    var newArrPeople = [];
    for (let i = 0; i < file.length; i++) {
      var obj = new Person(file[i].split(','));
      newArrPeople.push(obj);
    }
    console.log(newArrPeople);
  }

  get people() {
    return this._people

  }

  addPerson() {

  }

}

let parser = new PersonParser('people.csv')


// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
console.log(parser.parse());
