// ========================================
// ФОРМА ЗАКАЗА - ПРОСТАЯ ВЕРСИЯ
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initOrderForm();
    initDeliveryToggle();
});

function initOrderForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;
    
    let currentStep = 1;
    
    // Навигация по шагам
    const nextButtons = form.querySelectorAll('.btn-next');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
            }
        });
    });
    
    const prevButtons = form.querySelectorAll('.btn-prev');
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
        });
    });
    
    // Отправка формы
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;
        
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);
        
        sendToTelegram(data);
    });
    
    function showStep(step) {
        const steps = form.querySelectorAll('.form-step');
        steps.forEach(s => s.classList.remove('active'));
        form.querySelector(`[data-step="${step}"]`)?.classList.add('active');
    }
    
    function validateStep(step) {
        const currentStepElement = form.querySelector(`[data-step="${step}"]`);
        if (!currentStepElement) return false;
        
        let isValid = true;
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
                field.addEventListener('input', () => field.style.borderColor = '', { once: true });
            }
        });
        
        if (step === 3) {
            const dateInput = document.getElementById('date');
            if (dateInput?.value) {
                const selectedDate = new Date(dateInput.value);
                const minDate = new Date();
                minDate.setDate(minDate.getDate() + 3);
                
                if (selectedDate < minDate) {
                    alert('Минимальный срок изготовления - 3 дня');
                    return false;
                }
            }
        }
        
        return isValid;
    }
    
    const newOrderBtn = document.getElementById('newOrderBtn');
    if (newOrderBtn) {
        newOrderBtn.addEventListener('click', function() {
            form.reset();
            currentStep = 1;
            showStep(1);
            document.getElementById('successMessage').classList.remove('show');
            document.querySelector('.order-form').style.display = 'block';
        });
    }
}

function sendToTelegram(data) {
    const message = `
🎂 НОВЫЙ ЗАКАЗ!

👤 КОНТАКТЫ:
Имя: ${data.name}
Телефон: ${data.phone}
${data.email ? `Email: ${data.email}` : ''}

🍰 ДЕТАЛИ:
Тип: ${getCakeTypeText(data.cakeType)}
Вес: ${data.weight} кг
Ярусы: ${data.layers}
Начинка: ${getFillingText(data.filling)}
Декор: ${getDecorationText(data.decoration)}
Дата: ${formatDate(data.date)}

🚚 ДОСТАВКА:
${data.delivery === 'delivery' ? 'Доставка' : 'Самовывоз'}
${data.address ? `Адрес: ${data.address}` : ''}

${data.comments ? `💬 КОММЕНТАРИИ:\n${data.comments}` : ''}
    `.trim();
    
    // Открываем Telegram с готовым сообщением
    const telegramUrl = `https://t.me/janaracakes_bot?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
    
    setTimeout(() => {
        document.querySelector('.order-form').style.display = 'none';
        document.getElementById('successMessage').classList.add('show');
    }, 500);
}

function initDeliveryToggle() {
    const deliverySelect = document.getElementById('delivery');
    const addressGroup = document.getElementById('addressGroup');
    
    if (deliverySelect && addressGroup) {
        deliverySelect.addEventListener('change', function() {
            if (this.value === 'delivery') {
                addressGroup.style.display = 'block';
                document.getElementById('address').required = true;
            } else {
                addressGroup.style.display = 'none';
                document.getElementById('address').required = false;
            }
        });
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ru-RU', { 
        year: 'numeric', month: 'long', day: 'numeric', weekday: 'long'
    });
}

function getCakeTypeText(type) {
    const types = {
        'wedding': '💒 Свадебный',
        'birthday': '🎉 День рождения',
        'corporate': '💼 Корпоративный',
        'anniversary': '🎊 Юбилей',
        'other': 'Другое'
    };
    return types[type] || type;
}

function getFillingText(filling) {
    const fillings = {
        'classic': 'Классическая',
        'chocolate': '🍫 Шоколадная',
        'berry': '🍓 Ягодная',
        'caramel': '🍮 Карамельная',
        'fruit': '🍊 Фруктовая',
        'custom': 'Своя начинка'
    };
    return fillings[filling] || filling;
}

function getDecorationText(decoration) {
    const decorations = {
        'simple': 'Простой',
        'medium': 'Средний',
        'complex': '⭐ Сложный',
        'exclusive': '✨ Эксклюзивный'
    };
    return decorations[decoration] || decoration;
}