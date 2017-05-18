function myFunction_() {
  
  var json = convert("テスト")
  
  Logger.log(json)
  
  //return ContentService.createTextOutput(JSON.stringify(json))
  //  .setMimeType(ContentService.MimeType.JSON)
}

function convert(sheetName) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName)
  // 2行目がkeyになる
  var firstRange = sheet.getRange(2, 1, 2, sheet.getLastColumn())
  var firstRowValues = firstRange.getValues()
  var titleColumns = firstRowValues[0]
  
  // 3番目からデータ
  var lastRow = sheet.getLastRow()
  var rowValues = []
  for(var rowIndex=3; rowIndex<=lastRow; rowIndex++) {
    var colStartIndex = 1
    var rowNum = 1
    var range = sheet.getRange(rowIndex, colStartIndex, rowNum, sheet.getLastColumn())
    var values = range.getValues()
    rowValues.push(values[0])
  }

  // create json
  var jsonArray = []
  for(var i=0; i<rowValues.length; i++) {
    var line = rowValues[i]
    var json = new Object()
    for(var j=0; j<titleColumns.length; j++) {
      json[titleColumns[j]] = line[j]
    }
    jsonArray.push(json)
  }
  return jsonArray
}