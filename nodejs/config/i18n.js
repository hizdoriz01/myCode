var i18n = require('i18n')

i18n.configure({
    locales: ['EN',"CN"],
    directory: path.join(__dirname, '../locales'),
    defaultLocale: 'EN',
    syncFiles: true,
    objectNotation: true,
    register: global
})

exports.i18n = i18n.init;