
const DB_NAME = 'productDB';
const STORE_NAME = 'products';
const DB_VERSION = 1;

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = event => {
      reject(`IndexedDB error: ${event.target.error}`);
    };

    request.onsuccess = event => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = event => {
      const db = event.target.result;
      db.createObjectStore(STORE_NAME, { keyPath: 'id' });
    };
  });
};

export const addProductToDB = (product) => {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Get the maximum ID value
      const cursorRequest = store.openCursor(null, 'prev');
      let maxId = 0;

      cursorRequest.onsuccess = (event) => {
        const cursor = event.target.result;
        if (cursor) {
          maxId = Math.max(maxId, cursor.value.id);
          cursor.continue();
        } else {
          // Set the ID of the new record to the maximum ID value incremented by 1
          product.id = maxId + 1;

          // Add the new record
          const addRequest = store.add(product);

          addRequest.onsuccess = () => {
            resolve();
          };

          addRequest.onerror = (event) => {
            reject(event.target.error);
          };
        }
      };

      cursorRequest.onerror = (event) => {
        reject(event.target.error);
      };
    }).catch(error => {
      reject(error);
    });
  });
};

export const updateProductInDB = (product) => {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Ensure the product has a valid id field
      if (!product.id) {
        reject('Product ID is missing');
        return;
      }

      // Use put() method without specifying the key parameter
      const request = store.put(product);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    }).catch(error => {
      reject(error);
    });
  });
};



export const deleteProductFromDB = (id) => {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);

      // Delete the record with the given ID
      const request = store.delete(id);

      request.onsuccess = () => {
        // Get the maximum ID value after deletion
        const cursorRequest = store.openCursor(null, 'prev');
        let maxId = 0;

        cursorRequest.onsuccess = (event) => {
          const cursor = event.target.result;
          if (cursor) {
            maxId = Math.max(maxId, cursor.value.id);
            cursor.continue();
          } else {
            resolve(maxId);
          }
        };

        cursorRequest.onerror = (event) => {
          reject(event.target.error);
        };
      };

      request.onerror = (event) => {
        reject(event.target.error);
      };
    }).catch(error => {
      reject(error);
    });
  });
};




export const getAllProductsFromDB = () => {
  return new Promise((resolve, reject) => {
    openDB().then(db => {
      const transaction = db.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = event => {
        resolve(event.target.result);
      };

      request.onerror = event => {
        reject(`IndexedDB error: ${event.target.error}`);
      };
    });
  });
};









