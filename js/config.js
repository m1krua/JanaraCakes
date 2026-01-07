function sendToWhatsApp(data) {
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

    // Используем номер из CONFIG
    const phoneNumber = CONFIG.whatsapp.phoneNumber;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    setTimeout(() => {
        document.querySelector('.order-form').style.display = 'none';
        document.getElementById('successMessage').classList.add('show');
    }, 500);
}