// store.ts
import { writable } from 'svelte/store';

export const recordsStore = writable<Record[]>([]);

export type Record = {
  type: 'multiplication' | 'division';
  time: number;
  incorrectAttempts: number;
  date: string;
};

// Function to load records from localStorage and initialize the store
export const loadRecords = () => {
  const multiplicationRecords: Record[] = JSON.parse(
    localStorage.getItem('multiplicationQuizRecords') || '[]'
  );
  const divisionRecords: Record[] = JSON.parse(
    localStorage.getItem('divisionQuizRecords') || '[]'
  );
  const allRecords = [...multiplicationRecords, ...divisionRecords];
  allRecords.sort((a, b) => a.time - b.time);
  recordsStore.set(allRecords);
};

// Function to add a new record and update the store
export const addRecord = (newRecord: Record) => {
  recordsStore.update(records => {
    // Load existing records from localStorage
    const multiplicationRecords: Record[] = JSON.parse(
      localStorage.getItem('multiplicationQuizRecords') || '[]'
    );
    const divisionRecords: Record[] = JSON.parse(
      localStorage.getItem('divisionQuizRecords') || '[]'
    );

    // Add the new record to the appropriate list
    if (newRecord.type === 'multiplication') {
      multiplicationRecords.push(newRecord);
    } else {
      divisionRecords.push(newRecord);
    }

    // Combine both records and sort by time taken (ascending)
    const combinedRecords = [...multiplicationRecords, ...divisionRecords];
    combinedRecords.sort((a, b) => a.time - b.time);

    // Keep only the top 5 records
    const bestRecords = combinedRecords.slice(0, 5);

    // Save the best records back to localStorage
    const bestMultiplicationRecords = bestRecords.filter((r) => r.type === 'multiplication');
    const bestDivisionRecords = bestRecords.filter((r) => r.type === 'division');

    localStorage.setItem('multiplicationQuizRecords', JSON.stringify(bestMultiplicationRecords));
    localStorage.setItem('divisionQuizRecords', JSON.stringify(bestDivisionRecords));

    // Update the store with the best records
    return bestRecords;
  });
};
