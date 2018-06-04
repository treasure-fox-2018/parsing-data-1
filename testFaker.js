
const faker = require('faker')

const User = {
  name: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumber(),
  createdAt: new Date()
  
}

module.exports = User

console.log(User)