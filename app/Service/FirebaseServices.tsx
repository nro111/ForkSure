import { ref as storageRefInstance, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRefInstance, get, set, push, query, orderByChild, equalTo, onValue, off  } from "firebase/database";
import { database, storage } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import utils from "../utilities/utils";

async function saveImageToFirebase(uri: string): Promise<string> {
  try {
    const fileName = uri.split("/").pop()!;
    const storageRef = storageRefInstance(storage, `images/${fileName}`);

    // Convert to a Blob to upload
    const response = await fetch(uri);
    const blob = await response.blob();

    // Upload to Firebase
    await uploadBytes(storageRef, blob);

    // Get the download URL
    const downloadUrl = await getDownloadURL(storageRef);

    // return downloadURL
    return downloadUrl;
  } 
  catch (error) {
    //Alert.alert("Error", "Failed to upload photo to Firebase.");
    return "";
  }
}

async function saveReceiptDetails(receiptData: any): Promise<boolean> {
  try {
    // save to realtime db
    const txRef = databaseRefInstance(database, 'transactions');

    // Save data to the database
    const newTransactionRef = await push(txRef);

    // Save the receipt data to the generated key
    await set(newTransactionRef, receiptData);

    return true;
  } catch (error) {
    return false;
  }
}

async function checkReceiptExists(newReceiptData: any): Promise<boolean> {
  try {
    
    const txRef = databaseRefInstance(database, "transactions");
    const receiptQuery = query(txRef, orderByChild("merchantName"), equalTo(newReceiptData.merchantName));

    console.log('searching for receipt with merchantName', newReceiptData.merchantName)

    // Fetch data once
    const snapshot = await get(receiptQuery);

    if (snapshot.exists()) {
      // Iterate through receipts and compare fields
      const receipts = snapshot.val();
      for (const receiptId in receipts) {
        const existingReceiptData = receipts[receiptId];
        console.log('existing receipt data', existingReceiptData);
        
        if (
          existingReceiptData.total === newReceiptData.total &&
          utils.formatFromISODate(existingReceiptData.transactionDate, "MM/dd/yyyy") === utils.formatFromISODate(newReceiptData.transactionDate, "MM/dd/yyyy") &&
          existingReceiptData.transactionTime === newReceiptData.transactionTime &&
          existingReceiptData.merchantAddress === newReceiptData.merchantAddress
        ) {
          // Match found
          console.log("Receipt match found.");
          return true;
        }
      }

      // No matches found
      console.log("No matching receipt found.");
      return false;
    }

    // user has no existing receipts
    return false;
  } 
  catch (error) {
    // unknown error - treat as existing receipt
    console.log('error', error)
    return true;
  }
}

function subscribeToUserReceipts (callback: (data: any[]) => void) {
  const userId = getAuth().currentUser?.uid ?? "Unknown";
  
  // Reference to the user's receipts in the database
  const receiptsRef = databaseRefInstance(database, `transactions/`);
  
  // Subscribe to changes using onValue
  onValue(receiptsRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      const transactions = Object.keys(data)
        .map((key) => ({
          id: key,
          ...data[key],
        }))
        .filter((retVal) => retVal.userId === userId); // Filter by userId

        // Group by merchantName
        const groupedTransactions = transactions.reduce((acc, transaction) => {
        const merchantName = transaction.merchantName || "Unknown";
        if (!acc[merchantName]) {
          acc[merchantName] = [];
        }
        acc[merchantName].push(transaction);
        return acc;
      }, {});

      callback(groupedTransactions);
    } else {
      callback([]); // No data
    }
  });

  // Return an unsubscribe function to clean up
  return () => off(receiptsRef);
};

export default {
  saveImageToFirebase,
  saveReceiptDetails,
  checkReceiptExists,
  subscribeToUserReceipts
};
