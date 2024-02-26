import FetchUtil from '../../util/FetchUtil.js';
import { getPriceData, prepareSwitchDom, createHTML,
    createSwalOptions, fireSwal, getSwalEls, createPriceHistoryChart,
    listenSwitchLabels } from './product-price-history.js';

const productPriceThumb = document.getElementById('js-pr-details-price-history');

if (productPriceThumb) {
    const fetchPriceHistoryJson = new FetchUtil();
    const productId = productPriceThumb.getAttribute('data-id');
    const productName = productPriceThumb.getAttribute('data-name');
    const currentPrice = productPriceThumb.getAttribute('data-sellprice');
    const language = productPriceThumb.getAttribute('data-lang');
    const pDay = '365';
    const priceHistoryDataUrl = `index.php?route=product&product_id=${productId}&pday=${pDay}`;

    // eslint-disable-next-line max-len
    const showProductPriceHistoryModal = async (url, prName, prPrice, lang) => {
        // eslint-disable-next-line no-undef
        Swal.fire({
            html: '<span class="preloader"></span>',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            customClass: {
                popup: 'price-history-loading-modal'
            }
        });
        const jsonData = await fetchPriceHistoryJson.fetchData(url);
        const priceData = await jsonData;
        // eslint-disable-next-line no-undef
        Swal.close();
        const pData = await getPriceData(priceData, prName, prPrice, lang);
        // eslint-disable-next-line max-len
        const switchDom = await prepareSwitchDom(pData.month, pData.months, pData.year, pData.btnCount, lang, pData);
        const swalDOM = await createHTML(pData, switchDom);
        const swalOptions = await createSwalOptions(swalDOM);
        // eslint-disable-next-line no-undef
        await fireSwal(swalOptions);
        const swalEls = await getSwalEls();
        const priceChart = await createPriceHistoryChart(swalEls, pData);
        await listenSwitchLabels(swalEls, priceChart, pData);
    };

    productPriceThumb.addEventListener('click', showProductPriceHistoryModal.bind(
        null, priceHistoryDataUrl, productName, currentPrice, language
    ), false);
}
