"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.peopleArr()
  }

  peopleArr(){
    let listPerson = []
    // console.log(fs.readFileSync(this._file, "utf8"))
    let file = fs.readFileSync(this._file, 'utf8').split("\n")
    for(let i=1; i<file.length-1; i++){
      let dataPerson = file[i].split(",") // example: [3,Wahyudi,Setiaji,wahyudisetiaji@gmail.com,1-633-389-7173,2012-05-10T03:53:40-07:00]
      let person = new Person(dataPerson[0], dataPerson[1], dataPerson[2], dataPerson[3], dataPerson[4], dataPerson[5])
        listPerson.push(person)
    }
    return listPerson
  }

  get people(){
    return this._people

  }

  addPerson(data) {
    return this._people.push(data)
  }

  save(){
    fs.writeFileSync(this._file, this._people + "\n", "utf8")
  }
}

let parser = new PersonParser('people1.csv');
let date = new Date;

parser.addPerson(new Person('4', 'Wahyudi', 'Setiaji', 'wahyudisetiaji@gmail.com', '085813486177', date))

console.log((parser.people));
console.log("---------------------------")

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
