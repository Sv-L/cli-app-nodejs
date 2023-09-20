import { contacts } from './contacts.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case 'list':
        const allContacts = await contacts.listContacts();
        console.table(allContacts);
        break;

      case 'get':
        const contactById = await contacts.getContactById(id);
        console.log(contactById);
        break;

      case 'add':
        const newContact = await contacts.addContact(name, email, phone);
        console.log(newContact);
        break;

      case 'remove':
        const removeContact = await contacts.removeContact(id);
        console.log(removeContact);
        break;

      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  } catch {
    console.log(error.message);
    throw error;
  }
}

const arr = hideBin(process.argv);
const argv = yargs(arr).argv;

invokeAction(argv);
