function doPost(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };

  try {
    // Parse the incoming data
    var formData = {};
    if (e.postData && e.postData.contents) {
      formData = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      formData = e.parameter;
    }

    // Validate required fields
    var requiredFields = ['email', 'firstName', 'lastName'];
    for (var i = 0; i < requiredFields.length; i++) {
      if (!formData[requiredFields[i]]) {
        throw new Error('Missing required field: ' + requiredFields[i]);
      }
    }
    
    // Get the spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // Define column headers and their corresponding data keys
    var columnConfig = [
      { header: 'Timestamp', key: 'timestamp', required: true },
      { header: 'Email', key: 'email', required: true },
      { header: 'First Name', key: 'firstName', required: true },
      { header: 'Last Name', key: 'lastName', required: true },
      { header: 'Country', key: 'country', required: false },
      { header: 'State/Province', key: 'state', required: false },
      { header: 'LinkedIn Profile', key: 'linkedinProfile', required: false },
      { header: 'Certification Link', key: 'certificationLink', required: false },
      { header: 'Join Community', key: 'joinCommunity', required: false },
      { header: 'Review', key: 'review', required: false },
      { header: 'Submitted At', key: 'submittedAt', required: true }
    ];
    
    // If sheet is empty, create headers
    if (sheet.getLastRow() === 0) {
      var headers = columnConfig.map(function(col) { return col.header; });
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Prepare row data based on column configuration
    var rowData = columnConfig.map(function(col) {
      var value = formData[col.key];
      
      // Handle special cases
      if (col.key === 'timestamp' && !value) {
        value = new Date().toISOString();
      } else if (col.key === 'submittedAt' && !value) {
        value = new Date().toLocaleString();
      } else if (col.key === 'joinCommunity') {
        value = value === 'true' || value === 'Yes' ? 'Yes' : 'No';
      }
      
      // Validate required fields
      if (col.required && !value) {
        throw new Error('Missing required field: ' + col.header);
      }
      
      return value || '';
    });
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Data successfully recorded',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch (error) {
    var errorMessage = error.toString();
    var statusCode = 400;
    
    // Determine error type and set appropriate status code
    if (errorMessage.includes('Missing required field')) {
      statusCode = 422; // Unprocessable Entity
    } else if (errorMessage.includes('Access denied')) {
      statusCode = 403; // Forbidden
    } else if (errorMessage.includes('Sheet not found')) {
      statusCode = 404; // Not Found
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      code: statusCode,
      message: errorMessage,
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

function doOptions(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
}

function doGet(e) {
  return doPost(e);
}