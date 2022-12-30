const { nanoid } = require("nanoid");
const fs = require("fs/promises");
const path = require("path");

const absolutePath = path.join(__dirname, "./db/contacts.json");

async function updateContacts(contacts) {
  await fs.writeFile(absolutePath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const result = await fs.readFile(absolutePath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find(({ id }) => id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const newListContacts = [...contacts, newContact];
  await updateContacts(newListContacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };