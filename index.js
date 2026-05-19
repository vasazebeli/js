/**
 * Главный файл приложения (Точка входа).
 * @module index
 */

import { generateId } from './utils.js';
import { 
    addTransactionToArray, 
    deleteTransactionFromArray, 
    calculateTotal, 
    getTransactions 
} from './transactions.js';
import { 
    renderTransactionRow, 
    updateBalanceDisplay, 
    validateForm, 
    showTransactionDetails 
} from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const table = document.getElementById('transactions-table');
    const tbody = document.getElementById('transactions-body');

    /**
     * Обработчик отправки формы (Добавление транзакции).
     * @param {Event} e - Объект события.
     */
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Шаг 8: Проверка формы на ошибки
        const formData = validateForm();
        if (!formData) return; 

        // Шаг 4: Создание объекта транзакции и добавление в массив
        const transactionPayload = {
            id: generateId(),
            ...formData
        };

        const newTransaction = addTransactionToArray(transactionPayload);

        // Шаг 4: Добавление новой строки в UI
        renderTransactionRow(tbody, newTransaction);

        // Шаг 6: Расчет и отображение суммы
        updateBalanceDisplay(calculateTotal());

        form.reset();
    });

    /**
     * Шаг 5 & 7: Делегирование кликов на уровне элемента <table>.
     * Реализует реакцию на удаление строки и выбор строки для детального просмотра.
     */
    table.addEventListener('click', (e) => {
        const target = e.target;

        // Вариант А: Клик по кнопке «Удалить» (Шаг 5)
        if (target.classList.contains('delete-btn')) {
            e.stopPropagation(); // Предотвращаем срабатывание клика по строке
            const transactionId = target.getAttribute('data-id');

            // Удаление из массива данных
            deleteTransactionFromArray(transactionId);

            // Удаление строки из DOM дерева
            const row = target.closest('tr');
            if (row) row.remove();

            // Пересчет баланса
            updateBalanceDisplay(calculateTotal());
            
            // Скрытие деталей, если удалили просматриваемую транзакцию
            document.getElementById('details-block').classList.add('hidden');
            return;
        }

        // Вариант Б: Клик по строке таблицы для полного просмотра (Шаг 7)
        const row = target.closest('tr[data-id]');
        if (row) {
            const transactionId = row.getAttribute('data-id');
            const allTransactions = getTransactions();
            const currentTransaction = allTransactions.find(t => t.id === transactionId);

            if (currentTransaction) {
                showTransactionDetails(currentTransaction);
            }
        }
    });
});