import { Chart,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle } from '../../library/chartjs/chart.js';

Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
);

// eslint-disable-next-line max-len
const getPriceData = (prPriceData, productName, prPrice, prLang) => new Promise((resolve) => {
    const dataCount = prPriceData.product_price_history_dates.length;
    let radioBtnCount = 1;

    if (dataCount > 180) {
        radioBtnCount = 4;
    } else if (dataCount > 90) {
        radioBtnCount = 3;
    } else if (dataCount > 30) {
        radioBtnCount = 2;
    }

    const fullDateFormatted = prPriceData.product_price_history_dates.map((date) => {
        const day = date.slice(8, 10);
        const month = date.slice(5, 7);
        const year = date.slice(0, 4);

        return `${day}/${month}/${year}`;
    });

    const dateDayMonth = prPriceData.product_price_history_dates.map((date) => {
        const day = date.slice(8, 10);
        const month = date.slice(5, 7);

        return `${day}/${month}`;
    });

    const dateMonthYear = prPriceData.product_price_history_dates.map((date) => {
        const month = date.slice(5, 7);
        const year = date.slice(2, 4);

        return `${month}/${year}`;
    });

    const month1Dates = dateDayMonth.slice(-30);
    const month3Dates = dateMonthYear.slice(-90);
    const month6Dates = dateMonthYear.slice(-180);
    const year1Dates = dateMonthYear.slice(-365);

    const month1DatesFullFormattedDate = fullDateFormatted.slice(-30);
    const month3DatesFullFormattedDate = fullDateFormatted.slice(-90);
    const month6DatesFullFormattedDate = fullDateFormatted.slice(-180);
    const year1DatesFullFormattedDate = fullDateFormatted.slice(-365);

    const month1Prices = prPriceData.product_price_history_prices.slice(-30);
    const month3Prices = prPriceData.product_price_history_prices.slice(-90);
    const month6Prices = prPriceData.product_price_history_prices.slice(-180);
    const year1Prices = prPriceData.product_price_history_prices.slice(-365);

    const priceHisData = {
        textPriceHasNotIncreasedFor6Months: prPriceData.text_price_has_not_increased_for_6_months,
        textPriceHasNotIncreasedFor12Months: prPriceData.text_price_has_not_increased_for_12_months,
        linkPriceHasNotIncreasedFor6Months: prPriceData.link_price_has_not_increased_for_6_months,
        linkPriceHasNotIncreasedFor12Months: prPriceData.link_price_has_not_increased_for_12_months,
        btnCount: radioBtnCount,
        prName: productName,
        // priceHis: 'Ürün Fiyat Geçmişi',
        priceHis: prPriceData.text_product_price_history,
        // 'son 1 aylık fiyat geçmişi',
        last1MonthHistory: prPriceData.text_last_1_month_price_history,
        // 'son 3 aylık fiyat geçmişi',
        last3MonthHistory: prPriceData.text_last_3_months_price_history,
        // 'son 6 aylık fiyat geçmişi',
        last6MonthHistory: prPriceData.text_last_6_months_price_history,
        // 'son 1 yıllık fiyat geçmişi',
        last1YearHistory: prPriceData.text_last_1_year_price_history,
        textLast1Month: prPriceData.text_last_1_month,
        textLast3Month: prPriceData.text_last_3_month,
        textLast6Month: prPriceData.text_last_6_month,
        textLast1Year: prPriceData.text_last_1_year,
        lang: prLang,
        month: prPriceData.text_month,
        months: prPriceData.text_months,
        year: prPriceData.text_year,
        // 'Dönem İçi En Yüksek Fiyat',
        priceMaxText: prPriceData.text_highest_price_during_the_period,
        // 'Dönem İçi En Düşük Fiyat',
        priceMinText: prPriceData.text_lowest_price_during_the_period,
        priceCurrentText: prPriceData.text_current_price,
        priceMax: prPriceData.product_price_history_max_price,
        priceMin: prPriceData.product_price_history_min_price,
        priceCurrent: new Intl.NumberFormat('tr-TR').format(prPrice.toString().replace('.', '').replace(',', '.')),
        history: prPriceData.text_date,
        price: prPriceData.text_price,
        minPriceFor1Month: new Intl.NumberFormat('tr-TR').format(Math.min(...month1Prices)),
        maxPriceFor1Month: new Intl.NumberFormat('tr-TR').format(Math.max(...month1Prices)),
        minPriceFor3Month: new Intl.NumberFormat('tr-TR').format(Math.min(...month3Prices)),
        maxPriceFor3Month: new Intl.NumberFormat('tr-TR').format(Math.max(...month3Prices)),
        minPriceFor6Month: new Intl.NumberFormat('tr-TR').format(Math.min(...month6Prices)),
        maxPriceFor6Month: new Intl.NumberFormat('tr-TR').format(Math.max(...month6Prices)),
        minPriceFor1Year: new Intl.NumberFormat('tr-TR').format(Math.min(...year1Prices)),
        maxPriceFor1Year: new Intl.NumberFormat('tr-TR').format(Math.max(...year1Prices)),
        priceData: {
            month1: {
                datesFormatted: month1DatesFullFormattedDate,
                dates: month1Dates,
                prices: month1Prices
            },
            month3: {
                datesFormatted: month3DatesFullFormattedDate,
                dates: month3Dates,
                prices: month3Prices
            },
            month6: {
                datesFormatted: month6DatesFullFormattedDate,
                dates: month6Dates,
                prices: month6Prices
            },
            year1: {
                datesFormatted: year1DatesFullFormattedDate,
                dates: year1Dates,
                prices: year1Prices
            }
        }
    };

    resolve(priceHisData);
});

const prepareSwitchDom = (
    month,
    months,
    year,
    radioBtnCount,
    lang,
    pData
) => new Promise((resolve) => {
    let switchDom = '';
    let switch1 = '';
    let switch2 = '';
    let switch3 = '';
    let switch4 = '';

    if (radioBtnCount === 1) {
        switch1 = ' checked="true"';
    } else if (radioBtnCount === 2) {
        switch2 = ' checked="true"';
    } else if (radioBtnCount === 3) {
        switch3 = ' checked="true"';
    } else if (radioBtnCount === 4) {
        switch4 = ' checked="true"';
    }

    const monthValue = lang === 'tr' ? month : months;

    const radiobtn1 = `
    <input name="switch" id="one" type="radio"${switch1}/>
    <label for="one" class="js-switch-button switch__label">${pData.textLast1Month}</label>`;
    const radiobtn2 = `
    <input name="switch" id="two" type="radio"${switch2}/>
    <label for="two" class="js-switch-button switch__label">${pData.textLast3Month}</label>`;
    const radiobtn3 = `
    <input name="switch" id="three" type="radio"${switch3}/>
    <label for="three" class="js-switch-button switch__label">${pData.textLast6Month}</label>`;
    const radiobtn4 = `
    <input name="switch" id="four" type="radio"${switch4}/>
    <label for="four" class="js-switch-button switch__label">${pData.textLast1Year}</label>`;

    if (radioBtnCount === 1) {
        switchDom = radiobtn1;
    } else if (radioBtnCount === 2) {
        switchDom = radiobtn1 + radiobtn2;
    } else if (radioBtnCount === 3) {
        switchDom = radiobtn1 + radiobtn2 + radiobtn3;
    } else if (radioBtnCount === 4) {
        switchDom = radiobtn1 + radiobtn2 + radiobtn3 + radiobtn4;
    }

    resolve(switchDom);
});

const createHTML = (priceData, switchDom) => new Promise((resolve) => {
    let lastDateText = '';
    let minPrice = 0;
    let maxPrice = 0;

    if (priceData.btnCount === 1) {
        lastDateText = priceData.last1MonthHistory;
        minPrice = priceData.minPriceFor1Month;
        maxPrice = priceData.maxPriceFor1Month;
    } else if (priceData.btnCount === 2) {
        lastDateText = priceData.last3MonthHistory;
        minPrice = priceData.minPriceFor3Month;
        maxPrice = priceData.maxPriceFor3Month;
    } else if (priceData.btnCount === 3) {
        lastDateText = priceData.last6MonthHistory;
        minPrice = priceData.minPriceFor6Month;
        maxPrice = priceData.maxPriceFor6Month;
    } else if (priceData.btnCount === 4) {
        lastDateText = priceData.last1YearHistory;
        minPrice = priceData.minPriceFor1Year;
        maxPrice = priceData.maxPriceFor1Year;
    }

    const htmlChart = `
    <div class="pr-details-price-history-chart">
        <div class="header">
            <div class="" style="max-width: 285px;">
                <div class="chart-title">${priceData.priceHis}</div>
                <div id="js-last-range-date" class="chart-sub-title"><span class="product-name">${priceData.prName}</span></div>
            </div>
            <div class="top-section ${priceData.lang}">
                <div id="js-switch-cr" class="switch switch-${priceData.btnCount}">
                    ${switchDom}
                    <div class="switch__indicator"></div>
                </div>
            </div>
        </div>
        <div class="chart-body">
            </div>
            <div class="chart-section"><canvas id="js-pr-price-history-cr"></canvas></div>
            <div class="bottom-section">
                <div class="max-price">
                    <div class="title">${priceData.priceMaxText}</div>
                    <div class="price"><span class="js-period-max-price">${maxPrice}</span>TL</div>
                </div>
                <div class="min-price">
                    <div class="title">${priceData.priceMinText}</div>
                    <div class="price"><span class="js-period-min-price">${minPrice}</span>TL</div>
                </div>
                <div class="current-price">
                    <div class="title">${priceData.priceCurrentText}</div>
                    <div class="price">${priceData.priceCurrent}TL</div>
                </div>
            </div>
        </div>
    </div>
    <div class="list-buttons">
      <a href="${priceData.linkPriceHasNotIncreasedFor6Months}" class="list-button">
        ${priceData.textPriceHasNotIncreasedFor6Months}
        <i class="fa fa-arrow-right ml-1"></i>
      </a>
      <a href="${priceData.linkPriceHasNotIncreasedFor12Months}" class="list-button">
        ${priceData.textPriceHasNotIncreasedFor12Months}
        <i class="fa fa-arrow-right ml-1"></i>
      </a>
    </div>
    `;

    resolve(htmlChart);
});

const createSwalOptions = (htmlChart) => new Promise((resolve) => {
    const swalOptions = {
        width: 'auto',
        padding: '24px',
        html: htmlChart,
        allowEscapeKey: true,
        showCloseButton: true,
        showConfirmButton: false
    };

    resolve(swalOptions);
});

const fireSwal = (swalOptions) => new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    Swal.fire(swalOptions);

    resolve('ok');
});

const getSwalEls = () => new Promise((resolve) => {
    const swalEls = {
        priceHistoryChartEl: document.getElementById('js-pr-price-history-cr').getContext('2d'),
        prLastRangeDate: document.getElementById('js-last-range-date'),
        switchLabels: document.querySelectorAll('.js-switch-button'),
        switchRadioBtns: document.querySelectorAll('#js-switch-cr input[type="radio"]'),
        maxPrice: document.querySelector('.js-period-max-price'),
        minPrice: document.querySelector('.js-period-min-price')
    };

    resolve(swalEls);
});

function whatDecimalSeparator() {
    var n = 1.1;
    n = n.toLocaleString().substring(1, 2);
    return n;
}

const createPriceHistoryChart = (swalEls, priceHisData) => new Promise((resolve) => {
    let datesFormatted = '';
    let dates = '';
    let prices = '';

    if (priceHisData.btnCount === 1) {
        datesFormatted = priceHisData.priceData.month1.datesFormatted;
        dates = priceHisData.priceData.month1.dates;
        prices = priceHisData.priceData.month1.prices;
    } else if (priceHisData.btnCount === 2) {
        datesFormatted = priceHisData.priceData.month3.datesFormatted;
        dates = priceHisData.priceData.month3.dates;
        prices = priceHisData.priceData.month3.prices;
    } else if (priceHisData.btnCount === 3) {
        datesFormatted = priceHisData.priceData.month6.datesFormatted;
        dates = priceHisData.priceData.month6.dates;
        prices = priceHisData.priceData.month6.prices;
    } else if (priceHisData.btnCount === 4) {
        datesFormatted = priceHisData.priceData.year1.datesFormatted;
        dates = priceHisData.priceData.year1.dates;
        prices = priceHisData.priceData.year1.prices;
    }

    let tooltipUL = '';
    const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');

        if (!tooltipEl) {
            tooltipUL = document.createElement('UL');
            tooltipUL.classList.add('history-chart-tooltip-ul');

            tooltipEl = document.createElement('DIV');
            tooltipEl.classList.add('history-chart-tooltip-cr');

            tooltipEl.appendChild(tooltipUL);
            chart.canvas.parentNode.appendChild(tooltipEl);
        }

        return tooltipEl;
    };

    const externalTooltipHandler = (context) => {
        const { chart, tooltip } = context;
        const tooltipEl = getOrCreateTooltip(chart);

        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = 0;
            return;
        }

        if (tooltip.body) {
            const titleLines = tooltip.title || [];
            const bodyLines = tooltip.body.map((body) => body.lines);

            const tooltipTitleDIVDate = document.createElement('DIV');
            const tooltipLI = document.createElement('LI');

            titleLines.forEach(() => { // tarih geliyor
                let formattedDate = -1;
                for (let i = 0; i < datesFormatted.length; i++) {
                    const date = datesFormatted[i];

                    const position = date.includes(titleLines[0]);

                    if (position) {
                        formattedDate = datesFormatted[i];
                    }
                }

                const tooltipTitle = document.createTextNode(formattedDate);
                tooltipTitleDIVDate.style.fontSize = '12px';

                tooltipTitleDIVDate.appendChild(tooltipTitle);
            });

            bodyLines.forEach((body) => { // fiyat geliyor
                // eslint-disable-next-line eqeqeq
                if (whatDecimalSeparator() == '.') {
                    // eslint-disable-next-line no-param-reassign
                    body = body.toString().replace(',', '');
                } else {
                    // eslint-disable-next-line no-param-reassign
                    body = body.toString().replace('.', '').replace(',','.');
                }

                const textLabelPrice = document.createTextNode(new Intl.NumberFormat('tr-TR').format(body));
                const textLabelCurrency = document.createTextNode(' TL');

                const tooltipBodySPANCurrency = document.createElement('SPAN');
                tooltipBodySPANCurrency.appendChild(textLabelCurrency);
                tooltipBodySPANCurrency.style.fontSize = '14px';
                tooltipBodySPANCurrency.style.fontWeight = 'normal';

                const tooltipBodyDIV = document.createElement('DIV');
                tooltipBodyDIV.appendChild(textLabelPrice);
                tooltipBodyDIV.appendChild(tooltipBodySPANCurrency);
                tooltipBodyDIV.style.fontSize = '16px';
                tooltipBodyDIV.style.fontWeight = 'bold';

                tooltipLI.appendChild(tooltipBodyDIV);
                tooltipUL.appendChild(tooltipLI);
            });

            const ULnode = tooltipEl.querySelector('ul');

            while (ULnode.firstChild) {
                ULnode.firstChild.remove();
            }

            ULnode.appendChild(tooltipLI);
            tooltipLI.appendChild(tooltipTitleDIVDate);
            tooltipEl.style.opacity = 1;

            const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;
            tooltipEl.style.left = `${positionX + tooltip.caretX}px`;
            tooltipEl.style.top = `${positionY + tooltip.caretY - 50}px`;
        }
    };

    const priceChartOptions = {
        type: 'line',
        data: {
            // labels: priceHisData.priceData.year1.dates,
            datasets: [
                {
                    // data: priceHisData.priceData.year1.prices,
                    fill: {
                        target: 'origin',
                        above: 'rgba(255, 128, 0, .5)',
                        below: 'rgb(0, 0, 255)'
                    },
                    backgroundColor: 'rgba(255, 128, 0, .5)',
                    borderWidth: 1,
                    borderColor: 'rgb(204, 102, 0)',
                    hoverBorderWidth: 2,
                    hoverBorderColor: 'gray',
                    tension: 0.4
                }
            ]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: priceHisData.price
                    },
                    beginAtZero: true,
                    ticks: {
                        maxTicksLimit: 10
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: priceHisData.history
                    },
                    ticks: {
                        maxTicksLimit: 10
                    }
                }
            },
            plugins: {
                legend: false,

                tooltip: {
                    enabled: false,
                    position: 'nearest',
                    external: externalTooltipHandler
                }
            },
            interaction: {
                mode: 'index',
                intersect: false
            }
        }
    };

    priceChartOptions.data.labels = datesFormatted;
    priceChartOptions.data.datasets[0].data = prices;

    const priceChart = new Chart(swalEls.priceHistoryChartEl, priceChartOptions);

    resolve(priceChart);
});

const toggleRadioBtns = (e, swalEls, priceChart, priceHisData) => new Promise((resolve) => {
    Array.from(swalEls.switchRadioBtns).forEach((element) => {
        const isChecked = element.getAttribute('checked');

        if (isChecked) element.setAttribute('checked', 'false');
    });

    const forValue = e.target.getAttribute('for');
    const radioBtn = document.getElementById(forValue);

    radioBtn.setAttribute('checked', 'true');

    let lastRangeDateText = '';
    let dates = '';
    let prices = '';
    let minPrice = 0;
    let maxPrice = 0;

    if (forValue === 'one') {
        lastRangeDateText = priceHisData.last1MonthHistory;
        // dates = priceHisData.priceData.month1.dates;
        dates = priceHisData.priceData.month1.datesFormatted;
        prices = priceHisData.priceData.month1.prices;
        minPrice = priceHisData.minPriceFor1Month;
        maxPrice = priceHisData.maxPriceFor1Month;
    } else if (forValue === 'two') {
        lastRangeDateText = priceHisData.last3MonthHistory;
        // dates = priceHisData.priceData.month3.dates;
        dates = priceHisData.priceData.month3.datesFormatted;
        prices = priceHisData.priceData.month3.prices;
        minPrice = priceHisData.minPriceFor3Month;
        maxPrice = priceHisData.maxPriceFor3Month;
    } else if (forValue === 'three') {
        lastRangeDateText = priceHisData.last6MonthHistory;
        // dates = priceHisData.priceData.month6.dates;
        dates = priceHisData.priceData.month6.datesFormatted;
        prices = priceHisData.priceData.month6.prices;
        minPrice = priceHisData.minPriceFor6Month;
        maxPrice = priceHisData.maxPriceFor6Month;
    } else if (forValue === 'four') {
        lastRangeDateText = priceHisData.last1YearHistory;
        // dates = priceHisData.priceData.year1.dates;
        dates = priceHisData.priceData.year1.datesFormatted;
        prices = priceHisData.priceData.year1.prices;
        minPrice = priceHisData.minPriceFor1Year;
        maxPrice = priceHisData.maxPriceFor1Year;
    }

    const lastRangeDateEl = swalEls.prLastRangeDate;
    const maxPriceEl = swalEls.maxPrice;
    const minPriceEl = swalEls.minPrice;
    lastRangeDateEl.innerHTML = `<span class="product-name">${priceHisData.prName}</span>`;
    maxPriceEl.innerText = maxPrice;
    minPriceEl.innerText = minPrice;

    const chart = priceChart;
    chart.data.labels = dates;
    chart.data.datasets[0].data = prices;
    chart.update();

    resolve('DONE');
});

const listenSwitchLabels = (swalEls, priceChart, priceHisData) => new Promise((resolve) => {
    Array.from(swalEls.switchLabels).forEach((element) => {
        element.addEventListener('click', (e) => {
            toggleRadioBtns(e, swalEls, priceChart, priceHisData);
        });
    });

    resolve('OK');
});

export {
    getPriceData, prepareSwitchDom, createHTML,
    createSwalOptions, fireSwal, getSwalEls, createPriceHistoryChart,
    listenSwitchLabels
};
