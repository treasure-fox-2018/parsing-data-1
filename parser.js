"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.id = id,
    this.first_name = first_name,
    this.last_name = last_name,
    this.email = email,
    this.phone = phone,
    this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.parse()
  }

  get people() {
    // return this._people
    return{
      size : this._people.length,
      people : this._people
    }
  }

  parse(){
  // Read from csv, Convert CSV to Array of Objects, this._people = Array of Objects
    var people = fs.readFileSync('people.csv').toString().split('\n')
    // console.log(people);
    
    var arrConvert = []
    for(var i = 1; i < people.length; i++){
        let personAttr = people[i].split(',')
        let personId = personAttr[0]
        let personFirst_Name = personAttr[1]
        let personlast_name = personAttr[2]
        let personEmail = personAttr[3]
        let personPhone = personAttr[4]
        let personCreated_at = personAttr[5]
        let personData = new Person(personId,personFirst_Name,personlast_name,personEmail,personPhone,personCreated_at)
        arrConvert.push(personData)
    }
    console.log(arrConvert);
    
    return arrConvert
  }

  addPerson(personbaru) {
    return this._people.push(personbaru)
  }

  save(){
    // console.log(this._people);
    var dataPerson = ''
    for(var i = 0; i < this._people.length; i++){
        var arrDataPerson = []
        for(var j in this._people[i]){
          arrDataPerson.push(this._people[i][j])
        }
        dataPerson += arrDataPerson.join(',')+'\n'
    }
    // console.log(arrDataPerson);
    // console.log(dataPerson);
    fs.writeFileSync('people.csv',dataPerson)
   //string tampung
   // loopng this people ambil value object pake for in -> array.join()
   // string tmpung += hasil array join + \n
   // write filesync (csv, string)
  }
}

var fs = require('fs')

let parser = new PersonParser('people.csv')

parser.addPerson(new Person('202','Helmi','Yogantara','helmi@gmail.com','08xxxxxx','1-702-580-47852012-02-22T10:09:03-08:00'))


console.log(parser.save());
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

// console.log(parser.addPerson().length);
// console.log(parser.people[199]);










