const BLACKLIST_TAGS = [
  'iframe',
  'script',
];

const WHITELIST_ATTRS = [
  'src',
  'alt',
];

const R_TAG = /<(\w+)\s?(.*?)>.*?(<\/(.*?)>)?/;
const R_ATTRIBUTES = /(\w+\s*)=(\s*".*?")/g;

/**
 * Проверяет входную строку на отстутствие губительных тэгов и атрибутов
 * @param {String} unsafeString
 * @param {boolean} isSafe1
 * @param {boolean} isSafe2
 * @param {number} schet
 */
function makeSafe(unsafeString = '', isSafe1 = false, isSafe2 = false, schet = 0) {
  console.log(isSafe1, isSafe2);
  unsafeString = unsafeString
    .replace(R_TAG, (match, g1) => {
      schet += 1;
      console.log(g1, isSafe1, isSafe2);
      if (BLACKLIST_TAGS.includes(g1)) {
        isSafe1 = false;
        return '';
      }
      isSafe1 = true;
      return match;
    })
    .replace(R_ATTRIBUTES, (match, g1) => {
      schet += 1;
      console.log(g1, isSafe1, isSafe2);
      if (WHITELIST_ATTRS.includes(g1)) {
        isSafe2 = true;
        return match;
      }
      isSafe2 = false;
      return '';
    });
  if (schet === 0) {
    console.log('return 2');
    return [
      unsafeString,
      true,
    ];
  }
  isSafe1 = isSafe1 && isSafe2;
  return [
    unsafeString,
    isSafe1,
  ];
}

/**
 * Проверяет список строк на XSS атаку
 * @param {Array<String>} unsafeStringList
 */
function makeSafeList(unsafeStringList = {}) {
  const errList = [''];
  for (const field in unsafeStringList) {
    if ((Object.prototype.hasOwnProperty.call(unsafeStringList, field))) {
      const isSafe = makeSafe(unsafeStringList[field]);
      if (isSafe[1] === false) {
        errList.push('Текст содержит недопустимые теги или атрибуты!');
      }
    }
  }
  if (errList.length > 1) {
    console.log(errList);
    return false;
  }
  return true;
}

/**
 * Проверяет данные на XSS атаку
 * @param {Object} body Тело будующего запроса
 */
export default function checkXSS(body) {
  if (!(makeSafeList(body))) {
    alert('Попытка XSS атаки');
    return false;
  }
  return true;
}
