/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/* eslint-disable no-useless-escape */

/*!
 * International Telephone Input v17.0.13
 * https://github.com/jackocnr/intl-tel-input.git
 * Licensed under the MIT license
 */

import intlTelInput from 'intl-tel-input';

const loginPhoneNumberInputs = document.querySelectorAll('.login-phone-number');

const optionsIntlTelInput = {
    preferredCountries: [
        'tr',
        'de',
        'us'
    ],
    utilsScript: `${preG.ASSETS_PATH}default/js/library/intl_tel_input/utils-17.0.13.min.js`,
    nationalMode: false,
    autoHideDialCode: false,
    formatOnDisplay: true // SET THIS!!!
};

const reset = () => {
    $('.login-phone-number').css('border', '');
    $('#submit-btn').removeAttr('disabled');
    $('#submit-btn').removeClass('disabled');
};

const setStyleForIntlElements = (el, iti) => {
    const inputEl = el;
    const itiObj = iti;

    reset();

    if (inputEl.value.trim()) {
        if (itiObj.isValidNumber()) {
            const otpBtn = document.getElementById('otp-button');
            if (otpBtn) {
                otpBtn.classList.remove('gray');
            }
            const errorPhone = document.getElementById('error_phone');
            if (errorPhone && errorPhone.style.display === 'block') {
                errorPhone.style.display('none');
            }

            $('.login-phone-number').css('border', '1px solid green');
        } else {
            const otpBtn = document.getElementById('otp-button');
            otpBtn.classList.add('gray');

            $('.login-phone-number').css('border', '1px solid red');

            $('#submit-btn').attr('disabled', 'disabled');
            $('#submit-btn').addClass('disabled');
        }
    }
};

function formatIntlTelInput(el, iti) {
    const inputEl = el;
    const itiObj = iti;

    reset();

    inputEl.value = inputEl.value.replace(/[^0-9\+]/, '');

    if (typeof intlTelInputUtils !== 'undefined') { // utils are lazy loaded, so must check
        const currentText = itiObj.getNumber(intlTelInputUtils.numberFormat.E164);
        if (typeof currentText === 'string') { // sometimes the currentText is an object :)
            itiObj.setNumber(currentText); // will autoformat because of formatOnDisplay=true
        }
    }
}

const runIntlInput = () => {
    for (let i = 0; i < loginPhoneNumberInputs.length; i++) {
        const el = loginPhoneNumberInputs[i];
        const iti = intlTelInput(el, optionsIntlTelInput);

        el.addEventListener('blur', setStyleForIntlElements.bind(null, el, iti), false);
        el.addEventListener('keyup', formatIntlTelInput.bind(null, el, iti), false);
        el.addEventListener('change', formatIntlTelInput.bind(null, el, iti), false);
    }
};

runIntlInput();
