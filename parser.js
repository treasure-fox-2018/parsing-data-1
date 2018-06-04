"use strict"

const fs = require('fs');
// const fileUrl = new URL('file:///tmp/hello');

// fs.readFileSync(fileUrl);


class Person {

  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at


  }

  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []

  }

  get people() {

    return this._people

  }

  personParser() {

    let arr = []
    let peoples = fs.readFileSync(this._file).toString().split('\n')
    for (let i = 0; i < peoples.length; i++) {

      arr.push(peoples[i].split(','))

    }

    for (let i = 1; i < arr.length; i++) {

      const id = arr[i][0];
      const first_name = arr[i][1]
      const last_name = arr[i][2]
      const email = arr[i][3]
      const phone = arr[i][4]
      const created_at = arr[i][5]

      this._people.push(new Person(id, first_name, last_name, email, phone, created_at, new Date()))

    }
    return this._people
  }


  addPerson(people) {
    this._people.push(people)
    // return this


  }



  save() {
    let str = ''
    for (let i = 0; i < this.people.length; i++) {
      str += this.people[i].id + ','
      str += this.people[i].first_name + ','
      str += this.people[i].last_name + ','
      str += this.people[i].email + ','
      str += this.people[i].phone + ','
      str += this.people[i].created_at + '\n'
      // console.log(this.people)

    }
    const fs = require('fs');
    let write = fs.writeFileSync(this.people, str)
  }




}

let parser = new PersonParser('people.csv')
parser.personParser()
let add_person = new Person(parser.people.length, 'ade', 'fahri', 'adefahri@gmail.com', 3389492890, new Date())
console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
// console.log(parser.people)
parser.addPerson(add_person)
parser.save()

