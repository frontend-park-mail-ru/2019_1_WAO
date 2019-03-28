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

export function makeSafe(unsafeString = '', isSafe1 = false, isSafe2 = false, schet = 0) {
  console.log(isSafe1, isSafe2);
  unsafeString = unsafeString
    .replace(R_TAG, (match, g1) => {
      schet++;
      console.log(g1, isSafe1, isSafe2);
      if (BLACKLIST_TAGS.includes(g1)) {
        isSafe1 = false;
        return '';
      } else {
        isSafe1 = true;
        return match;
      }
    })
    .replace(R_ATTRIBUTES, (match, g1) => {
      schet++;
      console.log(g1, isSafe1, isSafe2);
      if (WHITELIST_ATTRS.includes(g1)) {
        isSafe2 = true;
        return match;
      } else {
        isSafe2 = false;
        return '';
      }
    });
    if (schet === 0) {
      console.log("return 2");
      return [
        unsafeString,
        true
      ];
    }
    isSafe1 = isSafe1 && isSafe2;
    return [
      unsafeString,
      isSafe1
    ];
}

export function makeSafeList(unsafeStringList = []) {
  if (!Array.isArray(unsafeStringList)) {
    return true;
  }
  let errList = [''];
  let isSafe;
  unsafeStringList.foreach(unsafeString => {
    isSafe = makeSafe(unsafeString);
    if (isSafe[1] == false) {
      errList.push('Текст содержит недопустимые теги или атрибуты!');
    }
  });
  if (errList.length > 1) {
    console.log(errList);
    return false;
  }
  return true;
}