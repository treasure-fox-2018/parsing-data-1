"use strict"

class Person {
  constructor(arrPerson) {
    this.id = arrPerson[0];
    this.first_name = arrPerson[1];
    this.last_name = arrPerson[2];
    this.email = arrPerson[3];
    this.phone = arrPerson[4];
    this.created_at = new Date(arrPerson[5]);
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

  // get peopleStr() {
  //
  //   return strPeople;
  // }

  addPerson(newPersonObject) {
    let arrOfObjPeople = this._people;
    arrOfObjPeople.push(newPersonObject);
    this._people = arrOfObjPeople;

    return this;
  }

  parseData() {
    const fs = require('fs');
    this._people = fs.readFileSync("./people.csv").toString().split("\n");

    let arrOfObjPeople = [];
    for (let i = 1; i < this._people.length - 1; i++) {
      var personObj = new Person(this._people[i].split(","))
      arrOfObjPeople.push(personObj)
    }

    this._people = arrOfObjPeople;


    return this;

    // console.log(arrOfObjPeople);
    // console.log(this._people);
  }

  save() {

    const fs = require('fs');
    let arrOfObjPeople = this._people;
    var strContain = "";

    for (let i = 0; i < arrOfObjPeople.length; i++) {
      for (const prop in arrOfObjPeople[i]) {
        strContain += `${prop} = ${arrOfObjPeople[i][prop]}`
        // console.log(`obj.${prop} = ${obj[prop]}`);
        strContain += " | "
      }

      strContain += "\n";
    }

    fs.writeFileSync('./people.csv', strContain);
  }

}
let parser = new PersonParser('people.csv')

parser.parseData();

parser.addPerson(new Person(["88aa", "Adi", "Hayo", "blabla@loyo.com", "0827272727294", "2012-02-11T18:50:59-08:00"]));

// console.log(parser.people);

parser.save()


// console.log(parser.peopleStr);


// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
