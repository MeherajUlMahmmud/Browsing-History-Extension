//you may not need cors
//fetch('https://yourapi').then(function (response) {
// fetch("https://localhost:44320/sampleformdata/book", { mode: 'cors' }).then(function (response) {
// 	//fetch(`https://localhost:44320/sampleformdata/?value=${value}`, {mode: 'cors'}).then(function (response) {
// 	// The API call was successful!
// 	if (response.ok) {
// 		return response.json();
// 	} else {
// 		return Promise.reject(response);
// 	}
// }).then(function (data) {
// 	// This is the JSON from our response
// 	fillforms(data);
// 	console.log(data);
// }).catch(function (err) {
// 	// There was an error
// 	console.warn('Something went wrong.', err);
// });

fillforms(passportData);

function fillforms(data) {
	fillField(document.querySelector('input[name="name"]'), data.name.toUpperCase());
	if (data.gender === "M") {
		document.querySelector('input[name="gender"][value="' + data.gender + '"]').checked = true;
	} else if (data.gender === "F") {
		document.querySelector('input[name="gender"][value="' + data.gender + '"]').checked = true;
	}
	fillField(document.querySelector('input[name="birthDate"]'), data.dob);
	fillField(document.querySelector('input[name="birthRegNo"]'), data.birthRegNo);
	fillField(document.querySelector('input[name="passportNo"]'), data.passportNo);
	fillField(document.querySelector('input[name="passportNoRep"]'), data.passportNo);
	fillField(document.querySelector('input[name="issueDate"]'), data.passportIssueDate);
	fillField(document.querySelector('input[name="expiryDate"]'), data.passportExpiryDate);
	fillField(document.querySelector('input[name="fatherName"]'), data.fatherName.toUpperCase());
	fillField(document.querySelector('input[name="address1"]'), data.address1.toUpperCase());
	fillField(document.querySelector('input[name="address2"]'), data.address2.toUpperCase());
	fillField(document.querySelector('input[name="address3"]'), data.address3.toUpperCase());
	fillField(document.querySelector('input[name="zipCode"]'), data.zipCode);
	fillField(document.querySelector('input[name="phoneNo"]'), data.phoneNo);

	// fillField(document.querySelector('input[name="workerKin.name"]'), data["workerKinName"].toUpperCase());
	// fillField(document.querySelector('input[name="workerKin.age"]'), data["workerKinAge"]);
	// fillField(document.querySelector('input[name="workerKin.addr1"]'), data["workerKinAddr1"].toUpperCase());
	// fillField(document.querySelector('input[name="workerKin.addr2"]'), data["workerKinAddr2"].toUpperCase());
	// fillField(document.querySelector('input[name="workerKin.addr3"]'), data["workerKinAddr3"].toUpperCase());
}

function fillField(field, value) {
	if (field) {
		field.value = value;
	}
}
