import express from 'express'
import { RegistrationData  , LoginData} from '../controllers/Auth.js';
import { addCustomer , listCustomers } from '../controllers/Customers.js';
import { deleteCustomer , updateCustomer } from '../controllers/CustomersDetails.js';
import { addItem, listItems , updateItem , deleteItem} from '../controllers/Items.js';
import { addQuotation , getQuotation} from '../controllers/AddQuotation.js';
const Router = express.Router();


// User Routes

Router.post('/register' , RegistrationData);
Router.post('/login' , LoginData)


// Customers Route

Router.post('/addcustomer' , addCustomer)
Router.get('/listcustomer' , listCustomers)
Router.put("/updatecustomer/:id", updateCustomer);
Router.delete("/deletecustomer/:id", deleteCustomer);


// Items Routes

Router.post('/additem' , addItem);
Router.get('/listitem' , listItems);
Router.put('/items/:id', updateItem); 
Router.delete('/items/:id', deleteItem); 


// Quotation 

Router.post('/addquotation' , addQuotation )
Router.get('/getquotations' , getQuotation )

export default Router;

