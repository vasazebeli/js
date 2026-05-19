/**
 * Модуль для управления массивом транзакций.
 * @module transactions
 */

/**
 * @typedef {Object} Transaction
 * @property {string} id - Уникальный идентификатор.
 * @property {Date} date - Дата и время создания.
 * @property {number} amount - Сумма (положительная или отрицательная).
 * @property {string} category - Категория.
 * @property {string} description - Полное описание.
 */

/** @type {Transaction[]} */
let transactions = [];

/**
 * Возвращает текущий массив транзакций.
 * @returns {Transaction[]} Массив транзакций.
 */
export function getTransactions() {
    return transactions;
}

/**
 * Добавляет новую транзакцию в массив.
 * @param {Omit<Transaction, 'date'>} transactionData - Данные для создания транзакции.
 * @returns {Transaction} Созданный объект транзакции.
 */
export function addTransactionToArray(transactionData) {
    const newTransaction = {
        ...transactionData,
        date: new Date()
    };
    transactions.push(newTransaction);
    return newTransaction;
}

/**
 * Удаляет транзакцию из массива по её ID.
 * @param {string} id - Идентификатор удаляемой транзакции.
 * @returns {boolean} True, если элемент был удален, иначе false.
 */
export function deleteTransactionFromArray(id) {
    const initialLength = transactions.length;
    transactions = transactions.filter(t => t.id !== id);
    return transactions.length < initialLength;
}

/**
 * Вычисляет общую сумму всех транзакций.
 * @returns {number} Итоговый баланс.
 */
export function calculateTotal() {
    return transactions.reduce((sum, current) => sum + current.amount, 0);
}