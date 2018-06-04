"use strict"

const fs = require('fs')

class Person {
  constructor (id,first_name,last_name,email,phone,created_at) {
    this._id = id
    this._firstName = first_name
    this._lastName = last_name
    this._email = email
    this._phone = phone
    this._createdAt = created_at
  }

  get id () {
    return this._id;
  }
}


class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  getPeople() {
    let getPerson = new Person;
    let dataStr = fs.readFileSync(this._file,'utf8');
    let dataArr = dataStr.split('\n')

    for (let i =1; i < dataArr.length; i++) {
      dataArr[i].split(',')
      if(dataArr[i][0] !== undefined) {
        this._people.push(new Person(...dataArr[i].split(',') ) )
      }
    }
    return this._people
  }

  addPerson(param_first_name, param_last_name, param_email, param_phone) {
    let last_id = this._people[this._people.length - 1].id
    let new_id = +last_id
    new_id += 1

    let person = new Person(new_id, param_first_name, param_last_name, param_email, param_phone, new Date())
    this._people.push(person)
    return this._people[this._people.length - 1]
  }

  save () {
    const keys = Object.keys(this._people[0])
    let strJoined = ''

    //for first line
    for (let i = 0; i < keys.length; i++ ) {
      strJoined += keys[i]
      if (i === keys.length -1) {
        strJoined += '\n'
      } else {
        strJoined += ','
      }
    }

    //for all remaining data
    for (let i = 0; i < this._people.length; i++) {
      let person = this._people[i]
      let array = [person._id, person._firstName, person._lastName, person._email, person._phone, person._createdAt];
      strJoined+= `${array.join(',')}`;
      if (i !== this._people.length - 1) {
        strJoined += '\n'
      }
    }
    fs.writeFileSync('people.csv',strJoined)
  }
}

let parser = new PersonParser('people.csv')

parser.getPeople()
parser.addPerson('Tushar','Bedi','tushar@email.com','12345678')
parser.save()

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)
