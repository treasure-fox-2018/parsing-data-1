"use strict"

let fs = require('fs');

class Person {
  constructor(personDataArr) {
    this.id = personDataArr[0];
    this.first_name = personDataArr[1];
    this.last_name = personDataArr[2];
    this.email = personDataArr[3];
    this.phone = personDataArr[4];
    //RELEASE 2
    this.created_at = new Date(personDataArr[5]);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    return ( {
      person : this._people,
      length : this._people.length
    })
  }

  get file() {
    return this._file;
  }

  parse() {
    let fs = require('fs');
    let arrayPeople = fs.readFileSync(this._file).toString().split("\n");
    arrayPeople.shift();
    let arrayObjPeople = [];
    for (let i = 0 ; i < arrayPeople.length ; i++) {
      let person = new Person (arrayPeople[i].split(","));
      arrayObjPeople.push(person);
    }
    this._people = arrayObjPeople;
    return this._people;
  }

  addPerson(objPerson) {
    this._people.push(objPerson);
  }
  
  save() {
    let stringOutput = "";
    let lineString = [];
    stringOutput += Object.keys(this._people[0]).join(",");
    for (let i = 0 ; i < this._people.length; i++) {
      for (let key in this._people[i]) {
        lineString.push(this._people[i][key])
      }
      stringOutput += "\n"+lineString.join(",");
      lineString = [];
    }
    fs.writeFileSync(this._file, stringOutput)
  }

}

let parser = new PersonParser('people.csv')


//RELEASE 0
console.log(parser.parse());
// console.log(parser.parse());
console.log("")

//RELEASE 1
let newPersonID = parser.people.length+1;
let newPerson = [`${newPersonID}`,'Fatima', 'Staff','tesa@euplacerateget.ca','1-459-215-5529','2012-11-23T07:04:40-08:00'];
parser.addPerson(new Person(newPerson));
parser.save();

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)