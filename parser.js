"use strict"

const fs = require ('fs')
const data = fs.readFileSync('people.csv', 'utf8').split("\n")

class Person {
  
  constructor(id, fName, lName, email, phone, createdAt) {
    this.id = id
    this.firstName = fName
    this.lastName = lName
    this.email = email
    this.phone = phone
    this.createdAt = createdAt
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }
  get file() {
    return this._file
  }
  set file (newFile) {
    this._file = newFile
  }
  get people() {
    return this._people
  }
  set people (newPeople) {
    this._people = newPeople
  }

  seedData() {
    for(let x=0; x<this.file.length; x++) {
      let fileIdx = this.file[x].split(",")
      this.people.push(new Person(fileIdx[0],fileIdx[1],fileIdx[2],fileIdx[3],fileIdx[4],fileIdx[5]))
      
    }
    console.log(this.people)
  }

  addPerson(id, fName, lName, email, phone, createdAt) {
    
    this.people.push(new Person(id, fName, lName, email, phone, createdAt))
    
  }

  save () {
    let saveDat =[]
    for(let r=0; r<this.people.length; r++) {
      let personDat = this.people[r]
      let personPack = [personDat.id,personDat.firstName,personDat.lastName,personDat.email,personDat.phone,personDat.createdAt]
      let tmp = personPack.join(",")
      saveDat.push(tmp)
    }
    fs.writeFileSync('people.csv', (saveDat.join('\n')), 'utf8' )
  }

}

const parser = new PersonParser(data)
parser.seedData ()
parser.addPerson (300, 'Emon', 'Dramon', 'ggwp@ggmail.com', '123-456-789', new Date())
parser.save()
console.log(`There are ${parser.people.length-1} people in the file '${'people.csv'}'.`)
