"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email,phone, createdAt){
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  get people() {
    return this._people
  }

  addPerson() {
    let file = this._file
    let arrPerson = fs.readFileSync(file, 'utf8')
    this._people = []
    let data = this.people
    let arrPersonSplitByLine = arrPerson.split('\n')
    for (let a = 1; a < arrPersonSplitByLine.length; a++){
      let element = arrPersonSplitByLine[a].split(',');
      
        let id = element[0]
        let firstName = element[1]
        let lastName = element[2]
        let email = element[3]
        let phone = element[4]
        let createdAt = element[5]

        let person = new Person(id, firstName, lastName, email, phone, createdAt)
        data.push(person)
    }
    return this
  }

  save(){
    var string = '';
    let people = this.people
    string += `id,firstname,lastname,email,phone,createdAt \n`
    for(let a = 0; a < people.length; a++){
        for(var key in people[a]){
          string += people[a][key];
          string += ', '
        }
        string += '\n';  
    }
    
    
    fs.writeFileSync('people2.csv', string);
    return 'data sudah dibuat';
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson()
console.log(parser.save())

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
