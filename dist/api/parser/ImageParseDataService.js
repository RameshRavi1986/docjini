'use strict';

var _rules_en = require('./rules_en');

var _rules_en2 = _interopRequireDefault(_rules_en);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var http = require('http');
var request = require('request');

module.exports = function ImageParseDataService() {
  var formResult = {};
  var scannedTxt = "";
  var coordsList = [];
  var lines = [];

  function checkForCoordMatch(obj, des) {
    var len = coordsList.length;

    var matchlineFound = false;

    var index = 0;

    for (var i = 0; i < len; i++) {
      if (obj.t >= coordsList[i].t && obj.b <= coordsList[i].b) {
        lines[coordsList[i].t] = lines[coordsList[i].t] + " " + des;

        matchlineFound = true;

        index = i;
      }
    }

    if (!matchlineFound) {
      coordsList.push({ t: obj.t - 4, b: obj.b + 4 });

      lines[obj.t - 4] = des;
    }
  }

  this.parseData = function (data) {
    alert("inside data");
    formResult = {};
    scannedTxt = data.responses[0].fullTextAnnotation.text;
    scannedTxt = scannedTxt.toLowerCase();
    lines = scannedTxt.split("\n");
    extractTotalPrice();
    //console.log(extractedTotalPrice);
    console.log("before process rules");
    processRules(scannedTxt);
    console.log("after process rules reesult", formResult);
    return formResult;
  };

  function extractTotalPrice() {
    var totalPrice = scannedTxt.match(/[0-9]+\.[0-9]+/g);
    var extractedTotalPrice = sortDescending(totalPrice);
  }
  function sortDescending(list) {
    if (list && list.length > 0) {
      alert("lsitlength");
      alert(list.length);
      var sortedList = list.sort(function (a, b) {
        return b - a;
      });
      getTotalPrice(sortedList);
      if (!formResult.total) {
        formResult.total = sortedList[0];
      }
      return sortedList;
    }
  }

  function getTotalPrice(sortedList) {
    alert(sortedList[0]);
    for (var i = 0; i < 6; i++) {
      if (!isNaN(sortedList[i])) {
        var regexNumber = new RegExp(sortedList[i], 'g');
        var occuringList = scannedTxt.match(regexNumber);
        if (occuringList && occuringList.length > 1) {
          alert(formResult.total);
          formResult.total = sortedList[i];
          break;
        }
      }
    }
  }

  function processRules(data) {
    var keys = Object.keys(_rules_en2.default);

    for (var i = 0; i < keys.length; i++) {
      if (_rules_en2.default[keys[i]].options) {
        // this.applyRules(rules[keys[i]], data);
      } else if (_rules_en2.default[keys[i]].valueRegex) {
        var rege = new RegExp(_rules_en2.default[keys[i]].valueRegex);
        var regeArray = void 0;
        if (rege && rege instanceof Array) {
          regeArray = rege;
        } else {
          regeArray = [rege];
        }
        for (var _i = 0; _i < regeArray.length; _i++) {
          alert("regex");
          alert(regeArray[_i]);
          var result = data.match(regeArray[_i]);
          alert(result);
          if (result) {
            formResult[_rules_en2.default[keys[_i]].name] = result[result.length - 1];
          }
        }
      }
    }
  }

  function applyRules(rule, data) {
    var options = rule.options;

    var selectedRule = { priority: 1000 };

    for (var i = 0; i < options.length; i++) {
      if (selectedRule.priority && selectedRule.priority > options[i].priority) {
        var matchFound = getResult(rule, options[i]);

        if (matchFound) {
          selectedRule = options[i];
        }
      }
    }
  }

  function getResult(rule, selectedRule) {
    var matchFound = false;

    for (var j = 0; j < lines.length; j++) {
      var rege = new RegExp(selectedRule.regex);

      var executedResult = lines[j].match(rege);

      if (executedResult) {
        var erg = new RegExp(rule.valueRegex);

        var finalOutput = lines[j + 1] && lines[j + 1].match(erg);

        if (finalOutput && finalOutput.length > 0) {
          formResult[rule.name] = finalOutput[finalOutput.length - 1];
        }
      }
    }

    return matchFound;
  }

  this.parseImage = function (img) {
    var reqs = {
      requests: [{
        features: [{
          type: "TEXT_DETECTION"
        }],

        image: {
          "source": {
            "imageUri": img
          }
        }
      }]
    };
    var options = {
      method: 'POST',
      uri: 'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB-YzJYxWrHEkEAcpJhPCgpyXsda5P6mhs&alt=json',
      body: reqs,
      json: true
      // JSON stringifies the body automatically
    };
    return request(options);

    /* $.ajax({
       url:
         "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB-YzJYxWrHEkEAcpJhPCgpyXsda5P6mhs&alt=json",
         type: "post",
         method: "POST",
         contentType: "application/json",
         data: JSON.stringify(reqs),
         processData: false,
         success: function(data) {
         this.processData(data);
       }
     }); */

    /*$.post( "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyB-YzJYxWrHEkEAcpJhPCgpyXsda5P6mhs&alt=json", reqs)
           .done(function( data ) {
           alert( "Data Loaded: " + data );
           });*/

    /* var img = new Image ();
          img.src = "tesco1.jpeg";
          img.onload = function () {
    
            Tesseract.recognize (img)
                  .then (function (result) {
                      console.log (result)
                  });
          }*/
  };
};