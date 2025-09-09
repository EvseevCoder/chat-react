const trimString = (str) => {
    return String(str ?? "").trim().toLowerCase();
}

module.exports = { trimString };