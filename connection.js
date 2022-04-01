var jsforce = require('jsforce');

module.exports = (done) =>{
	var soqlConn = new jsforce.Connection({instanceUrl: process.env.BFO_INSTANCE_URL, accessToken: process.env.BFO_ACCESS_TOKEN});
	soqlConn.identity(function(err, res) {
		if (!err)
			return done(null, soqlConn);
		soqlConn = new jsforce.Connection({
			oauth2 : {
				// you can change loginUrl to connect to sandbox or prerelease env.
				loginUrl : 'https://test.salesforce.com',
				grant_type: 'password',
				clientId : '3MVG9M43irr9JAuzj6OYTqwCy2__XdD8lZsBQs4bxdwP0cie.nCoXXHJQJceqMeWz4FuAtxg4k6hhR0hnkpz4',
				clientSecret : '8F2313FA5EAC5CA222FF1F32F785BCC7511905602EA0CB18635245F605477D48',
				redirectUri : ''
			}
		});
		soqlConn.login(process.env.BFO_USERNAME, process.env.BFO_PASSWORD, (err, userInfo)=> {
			if(err){
				done({message: "auth error", errorCode: "INTERNAL_ERROR", errorStack: err}, null);
			}else{
				process.env.BFO_ACCESS_TOKEN = soqlConn.accessToken;
				process.env.BFO_INSTANCE_URL = soqlConn.instanceUrl;
				done(null, soqlConn);
			}
		});
	});
}