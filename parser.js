"use strict"


class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }

  size(){
    var arr = this.addPerson()
    var countPeople = arr.length
    // console.log(arr)
    return countPeople
  }

  get people() {
    var arr = this.addPerson()
    this._people = arr
    return this._people
  }

  get file(){
    // this._file = 'people.csv'
    return this._file
  }

  addPerson() {
    var fs = require('fs');
    var dataString = fs.readFileSync('people.csv','UTF8');
    var dataSplit = dataString.split('\n')
    var arrObj = []
    var dataArr=[]
    // var objPerson = new Person 
    // console.log(dataString)
    // console.log(dataSplit)
    for(var i = 0; i<dataSplit.length; i++){
      var dataSplitInside = dataSplit[i].split(',')
      dataArr.push(dataSplitInside)
    }

    for(var j = 1; j<dataArr.length; j++){
      var objPerson = new Person;
      arrObj.push(objPerson)
      for(var k = 0; k<dataArr[j].length; k++){
        objPerson.id = dataArr[j][0]
        objPerson.first_name = dataArr[j][1]
        objPerson.last_name = dataArr[j][2]
        objPerson.email = dataArr[j][3]
        objPerson.phone = dataArr[j][4]
        objPerson.created_at = dataArr[j][5]

      }


    }
    // console.log(arrObj)
    // console.log(dataArr)
    // console.log(arrObj)

    return arrObj
  }

}

let parser = new PersonParser('people.csv')
// console.log(parser.size())

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
