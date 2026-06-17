function validate() {
    const usernameRef = document.getElementById('username');
    const emailRef = document.getElementById('email');
    const passwordRef = document.getElementById('password');
    const confirmPassRef = document.getElementById('confirm-password');
    const companyCheckRef = document.getElementById('company');
    const companyInfoRef = document.getElementById('companyInfo');
    const companyNumRef = document.getElementById('companyNumber');
    const buttonRef = document.getElementById('submit');
    const validDivRef = document.getElementById('valid');

    const allInputFields = document.querySelectorAll('#registerForm input');

    const userNamePattern = /^[a-zA-Z0-9]{3,20}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passPattern = /^\w{5,15}$/;
    const companyNumPattern = /^[1-9][0-9]{3}$/;

    buttonRef.addEventListener('click', onClick);
    companyCheckRef.addEventListener('change', (event) => {
        companyInfoRef.style.display = event.target.checked ? 'block' : 'none';
    });

    function checkField(pattern, inputRef) {
        if (pattern.test(inputRef.value)) {
            inputRef.style.border = '';
        } else {
            inputRef.style.border = '2px solid red';
        }
    }

    function onClick(event) {
        event.preventDefault();

        checkField(userNamePattern, usernameRef);
        checkField(emailPattern, emailRef);
        checkField(passPattern, passwordRef);

        confirmPassRef.style.border = confirmPassRef.value === passwordRef.value ? '' : '2px solid red';

        if (companyCheckRef.checked) {
            checkField(companyNumPattern, companyNumRef);
        } else {
            companyNumRef.style.border = '';
        }

        const allValid = [...allInputFields].every(el => el.style.border !== '2px solid red');
        validDivRef.style.display = allValid ? 'block' : 'none';
    }
}
