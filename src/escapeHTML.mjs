export default (content) => {
    // Quick & dirty: https://stackoverflow.com/questions/6234773/can-i-escape-html-special-chars-in-javascript/18108463
    return content
         .replace(/&/g, '&amp;')
         .replace(/</g, '&lt;')
         .replace(/>/g, '&gt;')
         .replace(/"/g, '&quot;')
         .replace(/'/g, '&#039;');
};
