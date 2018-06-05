"use strict"
var fs = require('fs');

class Person {
  constructor (peopleArr) {
    this.id = peopleArr[0];
    this.firstName = peopleArr[1];
    this.lastName = peopleArr[2];
    this.email = peopleArr[3];
    this.phone = new Date(peopleArr[4]);
    this.created_at = peopleArr[5];
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(fileName) {
    this._file = fileName
    this._people = [];
  }

  get people() {
    return {
      people: this._people,
      size: this._people.length
    }
  }

  get file () {
    return this._file;
  }

  parse() {
    var arrPeople = fs.readFileSync(this._file)
      .toString()
      .split("\n")
    
    var peopleArr = [];

    for (var i = 1; i <= arrPeople.length - 1; i++) {
      var perPerson = new Person (arrPeople[i].split(','));
      peopleArr.push(perPerson)
    }

    this._people = peopleArr;


    console.log(this._people)
    return this._people
  }

  addPerson(arr) {

    this._people.push(arr);
  }

  save() {
    console.log(this._people)
    var str = 'id,first_name,last_name,email,phone,created_at\n'

    for(var i=0; i<= this._people.length - 1; i++) {
      var person_str = `${this._people[i].id}, ${this._people[i].firstName}, ${this._people[i].lastName}, ${this._people[i].email}, ${this._people[i].phone}, ${this._people[i].created_at}\n`
      str = str + person_str
    }

    fs.writeFileSync(this._file, str);
    
  }
}

let parser = new PersonParser('people.csv')
parser.parse()
parser.addPerson(new Person (['201', 'Joko', 'Jacky', 'jackiechan@blabla.com', '1-174-752-3723', '2012-07-22T15:45:20-07:00']))

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.save();