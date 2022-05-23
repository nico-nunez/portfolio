(function () {
	'use strict';
	const form = document.querySelector('.email-form');

	form.addEventListener('submit', handleFormSubmit);

	function handleFormSubmit(evt) {
		evt.preventDefault();
		const thisForm = this;
		thisForm.querySelector('.loading').classList.add('d-block');
		const values = {};

		for (const input of thisForm) {
			if (input.name) values[input.name] = input.value;
		}

		const msgBody = {
			toEmails: ['nick.nunez.dev@gmail.com'],
			subject: 'Portfolio Message',
			message: `Name: ${values.name} \nEmail: ${values.email} \nSubject: ${values.subject} \n \n${values.message}`,
		};

		fetch('https://l8y5wmscj9.execute-api.us-east-2.amazonaws.com/Prod/send', {
			method: 'POST',
			body: JSON.stringify(msgBody),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				if (response.ok) {
					return response.text();
				} else {
					throw new Error(
						`${response.status} ${response.statusText} ${response.url}`
					);
				}
			})
			.then((data) => {
				console.log(!!data);
				thisForm.querySelector('.loading').classList.remove('d-block');
				thisForm.querySelector('.sent-message').classList.add('d-block');
				thisForm.reset();
			})
			.catch((error) => {
				displayError(thisForm, error);
			});
	}

	function displayError(thisForm, error) {
		thisForm.querySelector('.loading').classList.remove('d-block');
		thisForm.querySelector('.error-message').innerHTML = error;
		thisForm.querySelector('.error-message').classList.add('d-block');
	}
})();
