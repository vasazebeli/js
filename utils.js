/**
 * Модуль вспомогательных утилит.
 * @module utils
 */

/**
 * Генерирует уникальный строковый идентификатор (UUID v4-подобный).
 * @returns {string} Уникальный идентификатор.
 */
export function generateId() {
    return crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
}

/**
 * Форматирует объект даты в удобочитаемую строку.
 * @param {Date} date - Объект даты для форматирования.
 * @returns {string} Строка даты и времени в формате DD.MM.YYYY HH:MM.
 */
export function formatDate(date) {
    const options = { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return new Intl.DateTimeFormat('ru-RU', options).format(date);
}

/**
 * Обрезает строку до указанного количества слов.
 * @param {string} text - Исходный текст.
 * @param {number} maxWords - Максимальное количество слов.
 * @returns {string} Обрезанный текст с многоточием, если он превысил лимит.
 */
export function truncateWords(text, maxWords) {
    const words = text.trim().split(/\s+/);
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(' ') + '...';
}