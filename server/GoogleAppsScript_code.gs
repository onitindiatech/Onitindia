/**
 * Google Apps Script - Deploy as Web App to collect task data to Google Sheets
 * 
 * Instructions:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this code into the editor (code.gs)
 * 3. Deploy as Web App:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL and use it in your server.js
 */

// Your Google Sheet ID (from the spreadsheet URL)
const SPREADSHEET_ID = '1vv5ET9truRKKJMCA3T2eTyCxUa830-2s6txBY36WKrQ';
const SHEET_NAME = 'Tasks';

const doPost = (e) => {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    // Open the spreadsheet by ID
    const doc = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = doc.getSheetByName(SHEET_NAME);
    
    // Create sheet if it doesn't exist
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      // Add headers
      sheet.appendRow(['Timestamp', 'Task Details', 'Mobile Number', 'Status']);
    }
    
    // Get data from POST request
    const taskDetails = e.parameter.taskDetails || '';
    const mobileNumber = e.parameter.mobileNumber || '';
    
    // Append data to sheet
    sheet.appendRow([
      new Date(),
      taskDetails,
      mobileNumber,
      'New'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved to sheet' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
};

// For testing - add GET handler
const doGet = (e) => {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'Google Apps Script is running' }))
    .setMimeType(ContentService.MimeType.JSON);
};
