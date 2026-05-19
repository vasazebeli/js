/**
 * Модуль для работы с пользовательским интерфейсом (DOM).
 * @module ui
 */

import { formatDate, truncateWords } from './utils.js';

/**
 * Отрисовывает одну строку транзакции в теле таблицы.
 * @param {HTMLTableSectionElement} tbody - Элемент tbody таблицы.
 * @param {Object} transaction - Объект транзакции.
 */
export function renderTransactionRow(tbody, transaction) {
    const row = document.createElement('tr');
    row.setAttribute('data-id', transaction.id);
    
    // Шаг 4: Если сумма положительная — класс income (зеленый), иначе expense (красный)
    row.className = transaction.amount >= 0 ? 'income' : 'expense';

    row.innerHTML = `
        <td>${formatDate(transaction.date)}</td>
        <td>${transaction.category}</td>
        <td>${truncateWords(transaction.description, 4)}</td>
        <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
    `;
    
    tbody.appendChild(row);
}

/**
 * Обновляет текстовое поле итогового баланса на странице.
 * @param {number} total - Значение баланса.
 */
export function updateBalanceDisplay(total) {
    const balanceEl = document.getElementById('total-balance');
    if (balanceEl) {
        balanceEl.textContent = total.toFixed(2);
    }
}

/**
 * Отображает блок подробного описания транзакции.
 * @param {Object} transaction - Объект выбранной транзакции.
 */
export function showTransactionDetails(transaction) {
    const detailsBlock = document.getElementById('details-block');
    
    document.getElementById('detail-id').textContent = transaction.id;
    document.getElementById('detail-date').textContent = formatDate(transaction.date);
    document.getElementById('detail-amount').textContent = `${transaction.amount.toFixed(2)} MDL`;
    document.getElementById('detail-category').textContent = transaction.category;
    document.getElementById('detail-description').textContent = transaction.description;

    detailsBlock.classList.remove('hidden');
}

/**
 * Валидирует форму добавления транзакции.
 * @returns {Object|null} Объект с очищенными данными, если форма валидна; иначе null.
 */
export function validateForm() {
    const amountInput = document.getElementById('amount');
    const categoryInput = document.getElementById('category');
    const descriptionInput = document.getElementById('description');

    let isValid = true;

    // Сброс ошибок
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (!amountInput.value || isNaN(parseFloat(amountInput.value)) || parseFloat(amountInput.value) === 0) {
        document.getElementById('amount-error').textContent = 'Введите корректное число (не равное 0)';
        isValid = false;
    }

    if (!categoryInput.value) {
        document.getElementById('category-error').textContent = 'Выберите категорию';
        isValid = false;
    }

    if (!descriptionInput.value.trim()) {
        document.getElementById('description-error').textContent = 'Описание не может быть пустым';
        isValid = false;
    }

    if (!isValid) return null;

    return {
        amount: parseFloat(amountInput.value),
        category: categoryInput.value,
        description: descriptionInput.value.trim()
    };
}