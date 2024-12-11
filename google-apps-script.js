function doPost(e) {
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };

  try {
    // Get form data
    var formData = e.parameter;
    
    // Get the spreadsheet
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    
    // If sheet is empty, create headers
    if (sheet.getLastRow() === 0) {
      var headers = [
        'Timestamp',
        'Email',
        'First Name',
        'Last Name',
        'Country',
        'State/Province',
        'LinkedIn Profile',
        'Certification Link',
        'Join Community',
        'Review',
        'Submitted At'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    // Prepare row data
    var rowData = [
      formData.timestamp || new Date().toISOString(),
      formData.email || '',
      formData.firstName || '',
      formData.lastName || '',
      formData.country || '',
      formData.state || '',
      formData.linkedinProfile || '',
      formData.certificationLink || '',
      formData.joinCommunity || '',
      formData.review || '',
      formData.submittedAt || new Date().toLocaleString()
    ];
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Data successfully recorded'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
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