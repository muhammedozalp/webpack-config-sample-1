import Swal from 'sweetalert2';

require('./bootstrap.js');

window.Swal = Swal;

const Toast = Swal.mixin({
    position: 'top-end',
    showCloseButton: true,
    showConfirmButton: false,
    target: '#swal-toast',
    toast: true,
    // 'onOpen' 9 üstü versiyonlarda 'didOpen' şeklinde kullanılıyor.
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

/**
 * @param _status - {'success', 'error', 'warning', 'info', 'question'}
 * @param _title - _title default olarak boş kullanıldığı varsayılarak title'a '_text' değeri atanıyor.
 * @param _text - HTML olarak toast mesajına basılır. Bu sayede html kodlarını kullanabiliriz.
 * @param _timer - default 6sn. Toast'ın sabit kalması için `null` değeri kullanılabilir.
 * @param _width - default değer 360px
 * @param _position - checkout sayfası için `absolute` değeri kullanılması gerekiyor.
 */
// eslint-disable-next-line func-names
window.toastAlert = function (_status, _title, _text = '', _timer = 6000, _width = 360, _position = 'relative') {
    let contentClass = '';
    let titleClass = 'ky-swal-title-single';
    let toastTitle = _text;
    let toastText = '';
    let containerClass = 'ky-swal-cr';

    if (_title !== '') {
        // hem _title hem de _text kullanılması durumunda class'lar ve içerikler farklılaştırılıyor.
        contentClass = 'ky-swal-ct-double';
        titleClass = 'ky-swal-title-double';
        toastTitle = _title;
        toastText = _text;
    }

    if (_position === 'absolute') {
        containerClass += ' position-absolute';
    }

    Toast.fire({
        customClass: {
            container: containerClass,
            content: contentClass,
            popup: 'ky-swal-popup-' + _status,
            title: titleClass
        },
        icon: _status,
        html: toastText,
        timer: _timer,
        title: toastTitle,
        width: _width
    });
};
