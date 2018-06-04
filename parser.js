"use strict"
const fs = require('fs')
let fileCSV = fs.readFileSync('./people.csv', 'UTF-8').split('\n')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.create = created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = fs.readFileSync(file,'utf8')
    this.file = file
    this._people = this.fileObj()
  }

  get people() {
    return this
  }
  get size(){
    return this._people.length
  }
  

  addPerson(id,first_name,last_name,email,phone){
    let data = new Person(id,first_name,last_name,email,phone,new Date)
    this._people.push(data)
    // return this._people
    
    
  }

  save(){
    let convert = this.arrToStr()
    let saveData = fs.writeFileSync('people.csv',convert)
    
  }
 


  csvToArr() {
    let data = this._file
    // console.log(data)
    let arrData = []
    let splitData = data.split('\n')

    for(let i=1;i<splitData.length;i++){
      let personData = splitData[i].split(',')
      arrData.push(personData)
    }
    
    return arrData
  }

  fileObj(){
    let arr = this.csvToArr()
    let arrPerson = []
    for(let i=0;i<arr.length;i++){
      let obj = new Person(arr[i][0],arr[i][1],arr[i][2],arr[i][3],
                           arr[i][4],arr[i][5])
      arrPerson.push(obj)
    }
      return arrPerson
  }

  convertArr(){
    let objPeople = this._people
    // return objPeople
    let str =''
    let arr =[]
    for(let i=0;i<objPeople.length;i++){
        let tempt =[]
      for(let j in objPeople[i]){
        
          tempt.push(objPeople[i][j])
          
      }
     
    arr.push(tempt)
    }
    arr.unshift(['id','first_name','last_name','email','phone','created_at'])
    return arr
  }

  arrToStr(){
    let arr = this.convertArr()
    let newArr = []
    for(let i=0;i<arr.length;i++){
      let data = arr[i].join(',')
      newArr.push(data)
    }
    return newArr.join('\n')
  }

}

let parser = new PersonParser('people.csv')

parser.addPerson(201,'panggih','mario','mario@mail.com','123-123123')
parser.addPerson(202,'mario','panggih','panggih@mail.com','123-123123')
parser.save()

// parser.people()
// parser.addObj()
let tes =parser.convertArr()
console.log(tes[tes.length-1])
// console.log(parser.people)

console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// console.log(parser.arrToStr())
