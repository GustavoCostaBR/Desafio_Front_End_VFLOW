// Global
let cepError = document.getElementById('cepError');

document.getElementById('cnpj').addEventListener('input', function (e) {
	let cnpj = e.target.value.replace(/\D/g, '');
	if (cnpj.length > 2) {
		cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2);
	}
	if (cnpj.length > 6) {
		cnpj = cnpj.substring(0, 6) + '.' + cnpj.substring(6);
	}
	if (cnpj.length > 10) {
		cnpj = cnpj.substring(0, 10) + '/' + cnpj.substring(10);
	}
	if (cnpj.length > 15) {
		cnpj = cnpj.substring(0, 15) + '-' + cnpj.substring(15);
	}
	e.target.value = cnpj;
});

document.getElementById('cep').addEventListener('input', function (cepCheck) {
	let cep = cepCheck.target.value.replace(/\D/g, '');
	let cepReal = cep.replace('-', '');
	if (cepReal.length > 5) {
		cep = cep.substring(0, 5) + '-' + cep.substring(5);
		cepCheck.target.value = cep;
		console.log(cepReal);
		console.log(cepValidation(cepReal));
		if (cepValidation(cepReal)) {
			let url = `https://viacep.com.br/ws/${cepReal}/json/`
			fetch(url)
            .then(response => response.json())
            .then(data => {
                document.getElementById('endereco').value = data.logradouro;
                document.getElementById('bairro').value = data.bairro;
                document.getElementById('municipio').value = data.localidade;
                document.getElementById('estado').value = data.uf;
				if(data.logradouro === undefined){

						        // Show the error message
						        cepError.style.display = 'block';
				}
				else {
					cepError.style.display = 'none';
				}
            })
            .catch(error => console.log('Erro:', error));
        }
		}
	}
);

function cepValidation(cep) {
	return /^[0-9]{8}$/.test(cep);
}

// document.getElementById('myForm').addEventListener('submit', function(event) {
//     let cepInput = document.getElementById('cep');
//     let cepError = document.getElementById('cepError');

//     // Check if the CEP input is invalid
//     if (cepValidation(cepInput.value)) {
//         // Hide the error message
//         cepError.style.display = 'none';
//         // Continue with form submission
//     } else {
//         // Show the error message
//         cepError.style.display = 'block';
//         // Prevent form submission
//         event.preventDefault();
//     }
// });





//   document.getElementById('cnpj').addEventListener('input', function(e) {
// 	var cnpj = e.target.value.replace(/\D/g, '');
// 	if (cnpj.length > 2) {
// 	  cnpj = cnpj.substring(0, 2) + '.' + cnpj.substring(2);
// 	}
// 	if (cnpj.length > 6) {
// 	  cnpj = cnpj.substring(0, 6) + '.' + cnpj.substring(6);
// 	}
// 	if (cnpj.length > 10) {
// 	  cnpj = cnpj.substring(0, 10) + '/' + cnpj.substring(10);
// 	}
// 	if (cnpj.length > 15) {
// 	  cnpj = cnpj.substring(0, 15) + '-' + cnpj.substring(15);
// 	}
// 	e.target.value = cnpj;
//   });
