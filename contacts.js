import { nanoid } from 'nanoid';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  const contactsText = await fs.readFile(contactsPath);
  return JSON.parse(contactsText);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);
  return contactById || null;
}

async function addContact(name, email, phone) {
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return [result];
  } else {
    return null;
  }
}

export const contacts = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
