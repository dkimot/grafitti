var exports = module.exports = {};
const fs = require('fs');

let init = (filepath) => {
  process.env.jsonConfig.filepath = filepath;
}

exports.init = init;

/**
 * Excuse how poorly this is written. This allows you to pull from your config file.
 */

let accessConfig = (key) => {
  try {
    return proces.env.jsonConfig[key];
  } catch(e) {
    try {
      let str = fs.readFile(process.env.jsonConfig, 'utf8');
      let json = JSON.parse(str);
      try {
        process.env.jsonConfig[key] = json[key];
        return json[key];
      } catch(e) {
        subCatch(e);
        return null;
      }
    } catch(e) {
      subCatch(e);
      return null;
    }
  }

  let subCatch = (e) => {
    console.error(e);
  }
}

/**
 * The interpreter cobbled together for this package. Doesn't do much more than
 * create and assign values to the confige object. It's only claim to fame is
 * going through common Node.js global variables to assign things like proccess.env.port
 * if the key is PORT or some variation of PORT (e.g. port).
 *
 * @private
 * @param {object} json
 * @return {void}
 *
 */

 let _config = (json) => {

 }
