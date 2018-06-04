"use strict"

class Person {
    constructor (id,first_name,last_name,email,phone,created_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.phone = phone;
        this.created_at = created_at;
    }

}

class PersonParser {
    constructor(filename) {
      this._filename = filename;
      this._people = this.parsePeople();
    }

    parsePeople() {
        var arrayPersonData = [];
        var rows = fs.readFileSync(this._filename, 'utf8').split("\n")

        for (let i = 1; i < rows.length; i++) {
            let personAttr = rows[i].split(",");

            let personId = personAttr[0];
            let personFirstName = personAttr[1];
            let personLastName = personAttr[2];
            let personEmail = personAttr[3];
            let personPhone = personAttr[4];
            let personCreatedAt = personAttr[5];

            let personData = new Person(personId, personFirstName, personLastName, personEmail, personPhone, personCreatedAt);

            arrayPersonData.push(personData);
        }

        return arrayPersonData;
    }

    // getter attribute this._people
    get people() {
      return this._people;
    }

    // getter attribute this._filename
    get file() {
        return this._filename;
    }

    addPerson() {}
}

const fs = require('fs');

let parser = new PersonParser('people.csv');

console.log(parser.parsePeople());

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
