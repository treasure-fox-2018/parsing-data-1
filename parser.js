"use strict"

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
    var fs = require('fs');
    this._people = fs.readFileSync(this._file)
      .toString()
      .split("\n")
    
    var peopleArr = [];
    
    for (var i = 0; i <= this._people.length - 1; i++) {
      peopleArr.push(this._people[i].split(','));
    }
    this._people = peopleArr
    // console.log(this._people)

    var arrGabungan = [];
    for (var i = 1; i <= this._people.length - 1; i++) {
      var newPerson = new Person(this._people[i]);
      arrGabungan.push(newPerson)
    }

    this._people = arrGabungan;

    // console.log(this._people)
    return this._people
  }

  addPerson(arr) {

    this._people.push(arr);
  }

  save () {
    var resultArr = [];
    for (var i = 0; i <= this._people.length - 1; i++) {
      var rowResultArr = [];
      for (var keys in this._people[i]) {
        rowResultArr.push(this._people[i][keys]);
      }
      resultArr.push(rowResultArr)
    }

    var finalStr = '';
    for (var i = 0; i <= resultArr.length - 1; i++) {
      // for (var j = 0; j <= this._people[i].length - 1; j++) {
      var rowStr = resultArr[i].join(',');
      finalStr = finalStr + rowStr + '\n';
      // }
    }
    // console.log(finalStr);
    var fs = require('fs');
    fs.writeFileSync(this._file, finalStr);
  }
}

let parser = new PersonParser('people.csv')
parser.parse()
parser.addPerson(new Person (['201', 'Joko', 'Jacky', 'jackiechan@blabla.com', '1-174-752-3723', '2012-07-22T15:45:20-07:00']))

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
parser.save();