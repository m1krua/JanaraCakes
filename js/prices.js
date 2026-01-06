// ========================================
// КАЛЬКУЛЯТОР ЦЕН - prices.js
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initPriceCalculator();
});

function initPriceCalculator() {
    const weightInput = document.getElementById('calcWeight');
    const layersSelect = document.getElementById('calcLayers');
    const fillingSelect = document.getElementById('calcFilling');
    const decorationSelect = document.getElementById('calcDecoration');
    const priceDisplay = document.getElementById('calculatedPrice');

    if (!weightInput || !priceDisplay) return;

    // Базовые цены
    const basePrices = {
        filling: {
            classic: 2000,
            premium: 3500,
            luxury: 5500
        },
        decoration: {
            simple: 0,
            medium: 500,
            complex: 1500,
            exclusive: 3000
        },
        layers: {
            '1': 0,
            '2': 800,
            '3': 1500,
            '4': 2500
        }
    };

    // Обработчики изменений
    const inputs = [weightInput, layersSelect, fillingSelect, decorationSelect];

    inputs.forEach(input => {
        input.addEventListener('change', calculatePrice);
        input.addEventListener('input', calculatePrice);
    });

    // Первоначальный расчет
    calculatePrice();

    function calculatePrice() {
        const weight = parseFloat(weightInput.value) || 2;
        const layers = layersSelect.value;
        const filling = fillingSelect.value;
        const decoration = decorationSelect.value;

        // Расчет цены
        let basePrice = basePrices.filling[filling] || 2000;
        let decorationPrice = basePrices.decoration[decoration] || 0;
        let layersPrice = basePrices.layers[layers] || 0;

        // Общая цена
        let totalPrice = (basePrice * weight) + decorationPrice + layersPrice;

        // Анимация изменения цены
        animatePrice(priceDisplay, totalPrice);
    }

    function animatePrice(element, newPrice) {
        const currentPrice = parseInt(element.textContent.replace(/\D/g, '')) || 0;
        const difference = newPrice - currentPrice;
        const steps = 20;
        const stepValue = difference / steps;
        let currentStep = 0;

        const interval = setInterval(() => {
            currentStep++;
            const displayPrice = Math.round(currentPrice + (stepValue * currentStep));
            element.textContent = formatPrice(displayPrice);

            if (currentStep >= steps) {
                clearInterval(interval);
                element.textContent = formatPrice(newPrice);
            }
        }, 20);
    }

    function formatPrice(price) {
        return new Intl.NumberFormat('ru-RU').format(Math.round(price)) + ' ₽';
    }
}