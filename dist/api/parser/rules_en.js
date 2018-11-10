"use strict";

var rules = {
  total: {
    options: [{
      text: "total",

      regex: /\btotal\b/g,

      priority: 1
    }, {
      text: "subtotal",

      regex: /\bsubtotal\b/g,

      priority: 2
    }, {
      text: "amt",

      regex: /\bamt\b/g,

      priority: 3
    }],

    valueRegex: /[0-9]+\.[0-9]*/g,

    name: "totalAmount"
  },

  cardDetails: {
    valueRegex: /([*]{8})([0-9]{4})/g,

    name: "cardNumber"
  },
  currency: {
    valueRegex: [/(gbp|aud)/g, /[\$\xA2-\xA5\u058F\u060B\u09F2\u09F3\u09FB\u0AF1\u0BF9\u0E3F\u17DB\u20A0-\u20BD\uA838\uFDFC\uFE69\uFF04\uFFE0\uFFE1\uFFE5\uFFE6]/g],
    name: "currency"
  },

  date: {
    name: "date",
    valueRegex: [/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/g, /^(([0-9])|([0-2][0-9])|([3][0-1]))\-(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\-\d{2,4}$/g, /^(([0-9])|([0-2][0-9])|([3][0-1]))(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\'\d{2,4}$/g]
  }
};

module.exports = rules;