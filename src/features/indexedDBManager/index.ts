interface IDBConfig {
  dbName: string;
  version?: number;
}

export class IndexedDBManager {
  private dbName: string;
  private version: number;
  protected db: IDBDatabase | null = null;

  constructor(config: IDBConfig) {
    this.dbName = config.dbName;
    this.version = config.version || 1;
  }

  openDatabase(objectStoreNames: string | string[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBRequest<IDBDatabase>).result;

        [objectStoreNames].flat().forEach((storeName) => {
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'id' });
          }
        });
      };

      request.onsuccess = (event: Event) => {
        this.db = (event.target as IDBRequest<IDBDatabase>).result;
        resolve();
      };

      request.onerror = () => {
        reject(new Error(`Failed to open the database: ${this.dbName}`));
      };
    });
  }


  closeDatabase(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  addData(data: unknown, storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not opened.'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.add(data);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error(`Failed to add data to ${storeName}.`));
      };
    });
  }

  getDataByKey(key: number, storeName: string): Promise<unknown | undefined> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not opened.'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readonly');
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error(`Failed to get data from ${storeName}.`));
      };
    });
  }

  deleteDataByKey(key: number, storeName: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error('Database not opened.'));
        return;
      }

      const transaction = this.db.transaction([storeName], 'readwrite');
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error(`Failed to delete data from ${storeName}.`));
      };
    });
  }
}
