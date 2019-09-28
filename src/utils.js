/**
 * Returns wether a post has children or not
 * @param {Object} post
 * @return {boolean}
 */
export const hasChildren = (post) => post.kind !== 'more' && typeof post.data.replies.data !== 'undefined';

/**
 * Gets the url title of a post
 * @param {string} title
 * @return {string}
 */
export const formatTitle = (title) => {
  const arr = title.replace('https://www.reddit.com/r/', '').split('/');
  return arr[arr.length - 2];
}

/**
 * Returns all values of an async iterable
 * @param {Iterable.<Promise<Object>>} asyncIterable
 * @param {number=} count
 * @return {Promise<Array<Object>>}
 */
export const getAllPosts = async (asyncIterable, count=Infinity) => {
  const result = [];
  const iterator = asyncIterable[Symbol.asyncIterator]();
  while (result.length < count) {
      const {value,done} = await iterator.next();
      if (done) break;
      result.push(value);
  }
  return result;
}

/** @type {boolean} */
const supportsAdoptingStyleSheets =
    ('adoptedStyleSheets' in Document.prototype) &&
    ('replace' in CSSStyleSheet.prototype);

/**
 * Sets a string of css rules to the documents adoptedStyleSheets
 * @param {TemplateStringsArray} strings - css rules
 */
export const css = (strings) => {
  if (document.readyState === "loading") {
    window.addEventListener("DOMContentLoaded", () => adopt(strings));
  } else {
    adopt(strings);
  }
};

/**
 * Creates a new CSSStyleSheet object if supported and adds it to the documents adoptedStyleSheets,
 * or creates a style element and adds it to the document head
 * @private
 * @param {TemplateStringsArray} strings - css rules
 */
const adopt = strings => {
  if(supportsAdoptingStyleSheets) {
    const sheet = new CSSStyleSheet();
    sheet.replace(strings.join(""));
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
  } else {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = strings.join("");
    document.head.append(styleTag);
  }
};

