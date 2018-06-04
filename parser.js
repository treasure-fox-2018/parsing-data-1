"use strict"

class Person {
  constructor(arrPerson) {
    this.id = arrPerson[0];
    this.first_name = arrPerson[1];
    this.last_name = arrPerson[2];
    this.email = arrPerson[3];
    this.phone = arrPerson[4];
    this.created_at = arrPerson[5];
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = null;
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file;
  }

  addPerson() {}

  parseData() {
    const fs = require('fs');
    this._people = fs.readFileSync("./people.csv").toString().split("\n");

    var arrOfObjPeople = [];
    for (let i = 1; i < this._people.length; i++) {
      var personObj = new Person(this._people[i].split(","))
      arrOfObjPeople.push(personObj)
    }

    this._people = arrOfObjPeople;

    return this;

    // console.log(arrOfObjPeople);
    // console.log(this._people);
  }

}
let parser = new PersonParser('people.csv')

parser.parseData()

// console.log(parser.parseData());


console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
