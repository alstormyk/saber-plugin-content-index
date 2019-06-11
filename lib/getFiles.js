var path = require("path");
var fs = require("fs");
const glob = require('glob');
var cheerio = require('cheerio');
const { findContent } = require('./getItems.js/index.js');

const HTML_FOLDER = "./public";  // folder with your HTML files
const EXCLUDE_FILES = ["./public/404.html"];

const options = {
    ignore: EXCLUDE_FILES,
  };

  fs.writeFile('content-index.json', '{"contentIndex": {"pages": [\n', function(error) {
    if (error) {
      throw err;
    } else {
      console.log('Cleared:');
    }
}); 

glob(HTML_FOLDER + '/**/*.html', options, function (err, files) {
        if (err) {
            console.log('error finding files')
        } else {
            files.forEach(function (file) {
                fs.readFile(file, 'utf-8', function (error, data) {
                  if (error) {
                    console.log('forEach error')
                  } else {
                    var items = [];
                    var $ = cheerio.load(data)
                    const result = findContent($, true);
                    items.push(result)
                    fs.appendFile('content-index.json', JSON.stringify({
                      items
                  }) + ',\n', function(error) {
                        if (error) {
                          console.log(file + ' processed!');
                        }
                      else {
                          fs.appendFile('content-index.json', '', function(error) {
                            if (error) {
                              throw error;
                            } else {
                              console.log('Success');
                            }
                          });
                      }
                  });
                  }
                })
              })
            }
          })


