import { IMessage } from "@/types";
import { IndexedDBManager } from "../indexedDBManager";

export class MessagedDBManager extends IndexedDBManager {
  protected storeName = 'chatMessages'
  constructor(config: IDBConfig, protected storeName = 'chatMessages') {
    super(config);
  }
  withTransaction(storeName: string, mode: IDBTransactionMode): IDBTransaction {
    if (!this.db) {
      throw new Error('Database not opened.');
    }

    const transaction = this.db.transaction([storeName], mode);
    return transaction;
  }
  getMessagesRange(startId: number, endId: number, storeName: string): Promise<IMessage[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.withTransaction(this.storeName, 'readonly');
      const store = transaction.objectStore(this.storeName);
      const range = IDBKeyRange.bound(startId, endId);
      const request = store.index('id').getAll(range);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error(`Failed to get data in the range from ${storeName}.`));
      };
    });
  }
  private isMessage(obj: any): obj is IMessage {
    // Реализуйте логику проверки, что объект является сообщением
    // Например, проверьте наличие обязательных свойств или используйте другие методы проверки
    return typeof obj === 'object' && obj !== null && 'text' in obj && 'timestamp' in obj;
  }
  async addMessages(messages: unknown[]): Promise<void> {
    for (const message of messages) {
      try {
        if (this.isMessage(message)) {
          await this.addData(message as IMessage, this.storeName);
        } else {
          console.error(`Invalid message format: ${JSON.stringify(message)}`);
        }
      } catch (error) {
        console.error(`Failed to add message to ${this.storeName}: ${error instanceof Error ? error.message : 'Unknown error'}`);
        // Обработка ошибок, если это необходимо
      }
    }
  }
}
