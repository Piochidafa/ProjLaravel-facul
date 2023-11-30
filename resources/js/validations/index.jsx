export class Validar {
    static CPF(cpf) {
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

        // Remover pontos e traços para verificar apenas os dígitos
        const cpfLimpo = cpf.replace(/\D/g, '');

        if (!regexCpf.test(cpf) || cpfLimpo.length !== 11) {
            return false;
        }

        // Validação dos dígitos verificadores
        const somaPrimeirosDigitos = cpfLimpo.split('').slice(0, 9)
            .map(Number)
            .reduce((acc, value, index) => acc + value * (10 - index), 0);

        const primeiroDigitoVerificador = 11 - (somaPrimeirosDigitos % 11);
        const primeiroDigitoCalculado = primeiroDigitoVerificador > 9 ? 0 : primeiroDigitoVerificador;

        const somaUltimosDigitos = cpfLimpo.split('').slice(0, 10)
            .map(Number)
            .reduce((acc, value, index) => acc + value * (11 - index), 0);

        const segundoDigitoVerificador = 11 - (somaUltimosDigitos % 11);
        const segundoDigitoCalculado = segundoDigitoVerificador > 9 ? 0 : segundoDigitoVerificador;

        return (
            parseInt(cpfLimpo.charAt(9)) === primeiroDigitoCalculado &&
            parseInt(cpfLimpo.charAt(10)) === segundoDigitoCalculado
        );
    }

    static CNPJ(cnpj) {
        const regexCnpj = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

        // Remover pontos, traços e barras para verificar apenas os dígitos
        const cnpjLimpo = cnpj.replace(/\D/g, '');

        if (!regexCnpj.test(cnpj) || cnpjLimpo.length !== 14) {
            return false;
        }

        // Validação dos dígitos verificadores
        const multiplicadoresPrimeiroDigito = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const somaPrimeiroDigito = multiplicadoresPrimeiroDigito.reduce((acc, value, index) => {
            return acc + parseInt(cnpjLimpo.charAt(index)) * value;
        }, 0);

        const primeiroDigitoVerificador = 11 - (somaPrimeiroDigito % 11);
        const primeiroDigitoCalculado = primeiroDigitoVerificador > 9 ? 0 : primeiroDigitoVerificador;

        const multiplicadoresSegundoDigito = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
        const somaSegundoDigito = multiplicadoresSegundoDigito.reduce((acc, value, index) => {
            return acc + parseInt(cnpjLimpo.charAt(index + 6)) * value;
        }, 0);

        const segundoDigitoVerificador = 11 - (somaSegundoDigito % 11);
        const segundoDigitoCalculado = segundoDigitoVerificador > 9 ? 0 : segundoDigitoVerificador;

        return (
            parseInt(cnpjLimpo.charAt(12)) === primeiroDigitoCalculado &&
            parseInt(cnpjLimpo.charAt(13)) === segundoDigitoCalculado
        );
    }

    static mascaraCNPJ(cnpj) {
        const cnpjLimpo = cnpj.replace(/\D/g, '');
        const cnpjFormatado = cnpjLimpo.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
        return cnpjFormatado;
    }

    static mascaraTelefone(telefone) {
        const telefoneLimpo = telefone.replace(/\D/g, '');

        const telefoneComMascara = telefoneLimpo.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

        return telefoneComMascara;
    }

    static mascaraCEP(cep) {
        const regexCEP = /^\d{5}-\d{3}$/;
        let valorLimpo = cep.replace(/\D/g, '');

        if (valorLimpo.length > 5) {
            valorLimpo = valorLimpo.replace(/(\d{5})(\d{1,3})/, '$1-$2');
        }
        return valorLimpo;
    }

    static StringNoSpecialChars(texto) {
        const regexApenasLetrasAcentuadas = /[^a-zA-ZÀ-ÖØ-öø-ÿ\s ]/g;
        return texto.replace(regexApenasLetrasAcentuadas, '').toUpperCase();
    }

    static StringWithSpecialChars(texto) {
        const regexApenasLetrasAcentuadas = /[^a-zA-ZÀ-ÖØ-öø-ÿ\s.,;-]+g/;
        return texto.replace(regexApenasLetrasAcentuadas, '').toUpperCase();
    }

    static OnlyNumber(number) {
        const valorNumerico = number.replace(/[^\d.]/g, '');
        return valorNumerico;
    };

    static validarEmail(email) {
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(regexEmail.test(email)) {
            return true;
        };
        return false;
    }

}
