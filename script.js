const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const convertButton = document.getElementById('convert');
const resultDiv = document.getElementById('result');

const convertAmount = async () => {
    const amount = parseFloat(amountInput.value);
    const currency = currencySelect.value;

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor, ingrese un monto válido.');
        return;
    }

    try {
        const response = await fetch('assets/js/mindicador.json');
        if (!response.ok) {
            throw new Error('Problema al obtener los datos del archivo JSON');
        }

        const data = await response.json();
        
        const currencyValue = data[currency].valor;
        
        const convertedAmount = (amount / currencyValue).toFixed(2);

        resultDiv.textContent = `${amount} CLP son ${convertedAmount} ${data[currency].nombre}`;
    } catch (error) {
        
        resultDiv.textContent = `Error: ${error.message}`;
    }
};


convertButton.addEventListener('click', convertAmount);

const fillCurrencyOptions = async () => {
    try {
        const response = await fetch('assets/js/mindicador.json');
        if (!response.ok) {
            throw new Error('Problema al obtener los datos del archivo JSON');
        }

        const data = await response.json();
        
        const requiredCurrencies = ['dolar', 'euro', 'uf'];

        
        requiredCurrencies.forEach(key => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = data[key].nombre;
            currencySelect.appendChild(option);
        });
    } catch (error) {
        resultDiv.textContent = `Error: ${error.message}`;
    }
};

fillCurrencyOptions();
