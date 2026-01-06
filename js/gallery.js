// ========================================
// ФИЛЬТРАЦИЯ ГАЛЕРЕИ - gallery.js
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    initGalleryFilter();
});

function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length === 0 || galleryItems.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            // Активная кнопка
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Фильтрация элементов
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';

                    // Анимация появления
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.9)';

                        setTimeout(() => {
                            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    }, 0);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';

                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Счетчик работ
    updateGalleryCount();
}

function updateGalleryCount() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        const filterValue = button.getAttribute('data-filter');
        let count = 0;

        if (filterValue === 'all') {
            count = galleryItems.length;
        } else {
            galleryItems.forEach(item => {
                if (item.getAttribute('data-category') === filterValue) {
                    count++;
                }
            });
        }

        // Можно добавить отображение количества
        // button.innerHTML += ` (${count})`;
    });
}