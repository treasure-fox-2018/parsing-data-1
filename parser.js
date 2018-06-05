"use strict"
const fs = require("fs")

// buat format yang diinginkan berdasarkan isi data csv 
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor([id, first_name, last_name, email, phone, created_at]) {
    this.id = id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.email = email,
    this.phone = phone,
    this.created_at = created_at
  }
}
// mengolah data csv: membaca file dengan FileSystem readFileSync, menulis file dengan FileSystem writeFileSync 
class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }
  // agar private property bisa diakses dr luar class
  get people() {
    return this._people
  }
  // membaca file csv
  parse () {
    let data = fs.readFileSync(this._file)
    data = data.toString().split('\n')
    
    let dataArr = []
    
    for (let i = 0; i < data.length; i++) {
      dataArr.push(data[i].split(','))
      this._people.push(new Person(dataArr[i]))
    }
    return this._people
  }
  
  addPerson(newPersonObj) {
    return this._people.push(newPersonObj)
  }

  save() {
    let mainStr = ''
    for (let i = 0; i < this._people.length-1; i++) {
      mainStr += `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at}\n`
    }
    fs.writeFile(this._file, mainStr)
  }
  
}


//driver code
let parser = new PersonParser('people.csv')
let haka = new Person(['201', 'Fadhil', 'HaKa', 'fadhilhanri@gmail.com', '007', '2017-11-01T06:08:44-07:00'])

parser.parse() // olah data
parser.addPerson(haka) // masukkan data
parser.save()

console.log(parser.save())
// console.log(parser.savePerson())
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
