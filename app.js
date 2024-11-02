const dotenv = require('dotenv');
dotenv.config();

const prompt = require('prompt-sync')();
const mongoose = require('mongoose')
// const Todo = require('./models/Todo.js');
const Customer = require('./models/customers.js')

mongoose.connect(process.env.MONGODB_URI)

const username = prompt('what is your name? ');
console.log(`welcome to CMR, ${username}`);


const updateCustomers = async () =>{
    let id = prompt("Copy and paste the id of the customer you would like to update here: ")
    let newName = prompt("What is the customers new name? ")
    let newAge = prompt("What is the customers new Age? ")
    
    const customer = await Customer.findById(id)
    customer.name = newName
    customer.age = newAge
    await customer.save();

    console.log(`update complete for ${newName}`);
    displayOptions()
}

const deleteCustomers = async () => {
  let id = prompt("Copy and paste the id of the customer you would like to delete here: ")

  const customer = await Customer.findById(id);
  await customer.deleteOne();

  console.log(`deleted record with id ${id}`);
  displayOptions()
}

const showCustomers = async (change) =>{
  console.log(`heres a record of all customers: `);

  const customer = await Customer.find({});
  customer.forEach((cus)=>{
    console.log(`id: ${cus._id}, name: ${cus.name}, age: ${cus.age}`);
  })
  
  if(change==="update"){
    updateCustomers()
    return
  }

  if(change==="delete"){
    deleteCustomers()
    return
  }

  displayOptions()
}

const chooseOperation = async (operation)=>{
  if(operation==="1"){
    
    let customerName = prompt("enter the customer's name here: ")
    let customerAge = prompt("enter the customer's age here: ")
    
    const customer = Customer.create({
      name: customerName,
      age: customerAge
    })

    console.log(`you successfully created a record for ${customerName}`);
    displayOptions()
  }

  else if(operation==="2"){
    showCustomers()
  }

  else if(operation==="3"){
    change = "update"
    showCustomers(change)
  }

  else if(operation==="4"){
    change = "delete"
    showCustomers(change)
  }

  else if(operation==="9"){
    console.log(`exiting...`);
    await mongoose.disconnect();
    process.exit();
  }

  else{
    console.log("not a valid number");
    displayOptions()
  }
}

const displayOptions = () => {
  console.log("What would you like to do? enter the corresponding number");
  console.log("1 to create");
  console.log("2 to view ");
  console.log("3 to update ");
  console.log("4 to delete");
  console.log("9 to quit");

  let operation = prompt('enter the number here: ')
  
  chooseOperation(operation)
}

displayOptions()
