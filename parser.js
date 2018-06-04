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
        var rows = fs.readFileSync(this._filename, 'utf8').split("\n");

        for (let i = 0; i < rows.length-1; i++) {
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
      return {
          people: this._people,
          size: this._people.length-1
      }
    }

    // getter attribute this._filename
    get file() {
        return this._filename;
    }

    addPerson(parseInput) {
        this._people.push(parseInput);
    }

    save() {
        let stringToFile = '';
        for (let i = 0; i < this._people.length; i++) {
            let arrPeople = [];

            for (let keys in this._people[i]) {
                arrPeople.push(this._people[i][keys]);
            }

            stringToFile = stringToFile + arrPeople.join(',') + '\n';
        }

        fs.writeFileSync('people.csv', stringToFile);
    }
}

const fs = require('fs');

let parser = new PersonParser('people.csv');


parser.addPerson(new Person(201, 'Muhamad', 'Haddawi', 'muhamadhaddawi@gmail.com', '1-813-7865-8876', '2018'))

parser.addPerson(new Person(202, 'Dimitri', 'Doe', 'dimsdoe@gmail.com', '1-813-7293-9755', '2018'))

parser.save();

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
