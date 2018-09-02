const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const file = 'data.txt';
var router = express.Router();
const http = require("http");
var read="";

router.get('/', (req, res) => {

  console.log("Hello from server");
//  n=req.params['no'];
fs.readFile(file, 'utf8', function (err, data) {

  if (err) throw err;

  var wordsArray = splitByWords(data.toLowerCase());
  var wordsMap = createWordMap(wordsArray);
  var finalWordsArray = sortByCount(wordsMap);

  //console.log(finalWordsArray);
  console.log('The word "' + finalWordsArray[0].name + '" appears the most in the file ' +
    finalWordsArray[0].total + ' times');
  //  console.log("hbjhgbjhgjhjjbbjjggggggggggggggggg");
  res.json(finalWordsArray);
  /*
    output:
    [ { name: 'he', total: 10 },
      { name: 'again', total: 7 },
      { name: 'away', total: 7 },
      ... ]
    The word "he" appears the most in the file 10 times
  */

});


function splitByWords (text) {
  // split string by spaces (including spaces, tabs, and newlines)
  var wordsArray = text.split(/[@\n\s.?:/_\-]/);
  return wordsArray;
}


function createWordMap (wordsArray) {

  // create map for word counts
  var wordsMap = {};
  /*
    wordsMap = {
      'Oh': 2,
      'Feelin': 1,
      ...
    }
  */
  wordsArray.forEach(function (key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });

  return wordsMap;

}


function sortByCount (wordsMap) {

  // sort by count in descending order
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function(key) {
    return {
      name: key,
      count: wordsMap[key]
    };
  });

  finalWordsArray.sort(function(a, b) {
    return b.count - a.count;
  });

  return finalWordsArray;

}

  });
module.exports = router;
