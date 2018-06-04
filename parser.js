"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(peopleArr){
    this.id = peopleArr[0];
    this.first_name = peopleArr[1];
    this.last_name = peopleArr[2];
    this.email = peopleArr[3];
    this.phone = peopleArr[4];
    this.created_at = peopleArr[5];
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    return {people: this._people,
            size: this._people.length
           }
  }

  get file() {
    return this._file;
  }

  parse() {
    var fs = require('fs');
    var csvData = fs.readFileSync('people.csv').toString().split('\n');

    var peopleArr = [];
    for (var i = 1; i < csvData.length; i++) {
      peopleArr.push(csvData[i]);
    }
    this._people = [];
    for (var i = 0; i < peopleArr.length; i++) {
      let person = new Person(peopleArr[i].split(','));
      this._people.push(person);
    }
    return this.people.people;
  }

  addPerson(person) {
    this._people.push(person);
  }

  save() {
    var fs = require('fs');
    var csvData = fs.readFileSync('people.csv').toString().split('\n');
    var lineStr = csvData[0] + '\n';
    for (var i = 0; i < this._people.length; i++) {
      lineStr += Object.values(this._people[i]).join(',') + '\n';
    }
    fs.writeFileSync('people.csv', lineStr);
  }

}


let parser = new PersonParser('people.csv')
let input = [201,'Maram','Stratos','maramstratos@gmail.com','011899988','2018-06-22T10:09:03-08:00'];
let person = new Person(input);

console.log(parser.parse());
parser.addPerson(person);
parser.save();

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
