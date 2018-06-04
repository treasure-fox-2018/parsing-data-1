"use strict"
let fs = require('fs')

class Person {
  constructor(id,firstName,lastName,email,phone,createdAt){
    this._id = id
    this._firstName = firstName
    this._lastName = lastName
    this._email = email
    this._phone = phone
    this._createdAt = createdAt
  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    // this.file = file
    // this.objPerson()
  }

  get people() {
    return this._people
  }

  parserArr(){
    var file = this._file
    var splitFile = []
    if(file.length-1 == ''){
      for (let i = 0; i < file.length-1; i++) {
        splitFile.push(file[i].split(','))
      }
    }
    else{
      for (let i = 0; i < file.length; i++) {
        splitFile.push(file[i].split(','))
      }
    }
    return splitFile
  }

  objPerson(){
    var split = this.parserArr()
    for(var i = 1; i < split.length; i++){

      var NewPers = new Person(split[i][0],split[i][1],split[i][2],split[i][3],split[i][4],split[i][5])
 
      this._people.push(NewPers)
    }
    // return this._people
  }

  addPerson(lastName,firstName,email,phone) {
    var people = this._people
    var newPers = new Person(people.length+1,lastName,firstName,email,phone,new Date())
    this._people.push(newPers)
  }
  
  convertToStr(){
    var data_str = ''
    var people = this._people
    data_str += 'id,first_name,last_name,email,phone,created_at\n'
    for(let i = 0;i < people.length;i++){
      var person = people[i]
      for(var key in people[i]){
        console.log(key);
        if(key == 'id'){ 
          console.log("----masuk sini----");
               
          data_str += person[key]
        }else{
          data_str += person[key] + ','
        }
        // console.log(key);
        
      }
      if(i!=people.length-1){
        data_str += '\n'
        // data_str
      }
 
    }
    return data_str
  }
  writeFile(){
    var data_str = this.convertToStr()
    var writeFS = fs.writeFileSync('people.csv',data_str)
  }

}

let data = fs.readFileSync('people.csv','utf8').split('\n')
let parser = new PersonParser(data)
parser.objPerson()
// var person = parser.people
// parser.addPerson('Shanti','Dyah','shantidyah@gmail.com','081274567455')
// var convert = parser.convertToStr()
parser.writeFile()
// console.log(write);

// let addData = fs.writeFileSync('people.csv',convert)
console.log(`There are ${parser.people.length} people in the file.`)
// console.log(parser.objPerson());
// console.log(parser.parserArr().length);
// console.log(parser.people[200]);
// console.log(parser.addPerson());
// console.log(parser.convertToStr());



