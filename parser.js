"use strict"
var fs = require ('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id=id
    this.first_name=first_name
    this.last_name=last_name
    this.email=email
    this.phone=phone
    this.created_at=created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  convertFile(){
    var readFile = fs.readFileSync('people.csv', 'utf-8').split('\n')
    for (let i = 0; i < readFile.length; i++) {
      var detailsPerson = readFile[i].split(",")
        var newDate = new Date(detailsPerson[5]) // change string to date
        var person = new Person(detailsPerson[0], detailsPerson[1], detailsPerson[2], detailsPerson[3], detailsPerson[4], newDate)
        this._people.push(person)
    }
  }

  get people() {
    var object = {
      dataPerson : this._people,
      size : this._people.length
    }
    return object
  }

  addPerson(id, firstName, lastName, email, phone, createdAt) {
    this._people.push(new Person(id, firstName, lastName, email, phone, createdAt))
  }

  save(){
    var addPerson = ""
    for (let i = 0; i < this._people.length; i++) {
      var detailsData = Object.values(this._people[i]).join(",")
      if(i !== this._people.length-1){
        addPerson += detailsData + "\n"
      }else{
        addPerson += detailsData
      }
      fs.writeFileSync('people.csv', addPerson, 'utf8')
    }
  }

}

let parser = new PersonParser('people.csv')
parser.convertFile()
parser.addPerson(parser.people.size + 1, "setia", "anggraeni", "tia@mail.com", "081234256431", new Date())
parser.addPerson(parser.people.size + 1, "daniel", "nino", "daniel@mail.com", "081234242311", new Date())
parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)