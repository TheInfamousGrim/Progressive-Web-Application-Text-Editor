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

/* ----- a method that accepts some content and adds it to the database ----- */
export const putDb = async (content) => {
    // Connect to the db and version we wish to use
    const jateDB = await openDB('jate', 1);
    // Create a transaction and specify the db and data privileges
    const tx = jateDB.transaction('jate', 'readwrite');
    // Open the specified object store
    const store = tx.objectStore('jate');
    // Use put() method on the store to update db with the content
    const request = store.put({ id: 1, value: content });
    // Get confirmation of the PUT request
    const result = await request;
    console.log('😲 - Data saved to the database - 🙌', result);
};

/* ---------- a method that gets all the content from the database ---------- */
export const getDb = async () => {
    console.log('🥊 Getting your data!');
    // Connect to the db and version we wish to use
    const jateDb = await openDB('jate', 1);
    // Create a transaction and specify the db and data privileges
    const tx = jateDb.transaction('jate', 'readonly');
    // Open the specified object store
    const store = tx.objectStore('jate');
    // Use get() method to retrieve all the data from the database
    const request = store.get(1);
    // Get confirmation of the GET request
    const result = await request;
    console.log('result:', result);
    return result?.value;
};

initdb();
