import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) =>
{
  console.log('PUT to the  database.');
  // connects to the database and the version being used
  const jateDb = await openDB("jate", 1);
  // allows for the creation of a new transaction specifying store & data privileges
  const tx = jateDb.transaction("jate", "readwrite");
  // opens the object store
  const store = tx.objectStore("jate");
  // updates the content in the database
  const request = store.put({id: 1, value: content});

  // confirms the request
  const result = await request;
  console.log("The data was saved to the database!", result.value);
} 


// Gets all the content from the database
export const getDb = async () => 
{
  console.log('GET data from database');
  // connects to the IndexedDB database & the version being used
  const jateDb = await openDB("jate", 1);
  // creates new transaction specifying the store and data privileges
  const tx = jateDb.transaction("jate", "readonly");
  // opens the object store
  const store = tx.objectStore("jate");
  // gets all the data in the database
  const request = store.getAll();
  // confirms the request
  const result = await request;
  console.log('result.value', result.value);
  return result.value
}


initdb();
