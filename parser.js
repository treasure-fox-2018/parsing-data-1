"use strict"

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.firstname = first_name;
    this.lastname = last_name;
    this.email = email;
    this.phoneNo = phone;
    this.createData = new Date(created_at);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  set people(peeps) {
    this._people = peeps;
  }

  get people() {
    // Reads from CSV
    // Convert to Array of Objects
    return {
      people: this._people,
      size: this._people.length 
    }
  }

  get file() {
    return this._file;
  }

  parseData() {
    var details = fs.readFileSync('people.csv').toString().split('\n');
    for (let i = 1; i < details.length; i++) {
      var personArr = details[i].split(',');
      var id = personArr[0];
      var firstname = personArr[1];
      var lastname = personArr[2];
      var email = personArr[3];
      var phoneNo = personArr[4];
      var createData = personArr[5];

      var peeps = new Person(id, firstname, lastname, email, phoneNo, createData);
      this._people.push(peeps);
    
    }
    return this._people;
  }

  addPerson(input) {
      // console.log(input);
      this._people.push(input);
      // console.log(this._people);
  }

  save() {
   
    var detailStr = [];
    for (let i = 0; i < this._people.length; i++) {
      // console.log(this._people[i])
      var addArr = [];
       for (var key in this._people[i]) {
         addArr.push(this._people[i][key]);
       }
       detailStr.push(addArr.join(',') + '\n');
    }
    // console.log(addArr);
    // console.log(this._people[this._people.length-1])
    console.log(this.people.length)
    fs.writeFileSync('people.csv', detailStr.join(''), 'utf8');
    // console.log(detailStr)
    return this._people;
  }

}

//driver code
let parser = new PersonParser('people.csv')
const fs = require('fs')

parser.parseData()
var newId = parser.people.size + 1;
console.log(newId);
parser.addPerson(new Person(newId, 'Odie', 'Susanto', 'odie@pennylane.mail', '1-555-723-5891', '2018-06-04T17:22:07'));

parser.save();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
