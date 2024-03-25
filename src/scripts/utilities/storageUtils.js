/**
 * Сохраняет массив дат в локальном хранилище браузера.
 *
 * @param {string} key - Ключ, по которому будут сохранены даты.
 * @param {Date[]} datesArray - Массив дат для сохранения.
 */
function saveDatesToLocalStorage(key, datesArray) {
    sessionStorage.setItem(key, JSON.stringify(datesArray));
}

/**
 * Получает массив дат из локального хранилища браузера.
 *
 * @param {string} key - Ключ, по которому хранятся даты.
 * @returns {Date[]} - Массив дат, сохраненных по указанному ключу.
 */
function getDatesFromLocalStorage(key) {
    const storedDates = sessionStorage.getItem(key);

    return storedDates ? JSON.parse(storedDates).map(e => new Date(e)) : [];
}

module.exports = {
    saveDatesToLocalStorage,
    getDatesFromLocalStorage
};