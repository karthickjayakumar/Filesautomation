var fs = require('fs');
var jsforce = require('jsforce');

const CLIENT_ID = process.env.CLIENT_ID || '3MVG9dzDZFnwTBRLlZQ9VuFD13e_dEQtQX4gg0gjC1fIZhm15OqDc8zqCn8NO1y9T5Tfb823ioF_x50EAUvVc';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '0E4B354D25B43448F380DF8512C0B6291C865CA3DD2AF1CB0FEB4F2C3E2E9E97';
const BFO_USER = process.env.BFO_USER || 'karthick.jayakumar@honeywell.com.bt.titanextr2';
const BFO_PASSWORD = process.env.BFO_PASSWORD || 'Karthy0!@#';
const LOGIN_URL = process.env.LOGIN_URL || 'https://test.salesforce.com';

const OAUTH2 ={
	oauth2 : {
	  // you can change loginUrl to connect to sandbox or prerelease env.
	  loginUrl : LOGIN_URL,
	  grant_type: 'password',
	  clientId : CLIENT_ID,
	  clientSecret : CLIENT_SECRET,
	  redirectUri : ''
	}
};

var conn = new jsforce.Connection(OAUTH2);
					
conn.login(BFO_USER, BFO_PASSWORD, (err, userInfo) => {
   
   /* var records = [];
    conn.query("SELECT Id, Name FROM Account", function(err, result) {
    if (err) { return console.error(err); }
     console.log("total : " + result.totalSize);
     console.log("fetched : " + result.records.length);
});*/

// execute report synchronously with details option,
// to get detail rows in execution result.
var reportId = '00O6t000000VHmv';
var report = conn.analytics.report(reportId);
report.execute({ details: true }, function(err, result) {
  if (err) { return console.error(err); }
  console.log(result.reportMetadata);
  console.log(result.factMap);
  console.log(result.factMap["T!T"]);
  console.log(result.factMap["T!T"].aggregates);
  console.log(result.factMap["T!T"].rows); // <= detail rows in array
  // ...
});

});