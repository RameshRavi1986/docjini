'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Receipt = require('../models/Receipt');

var _Receipt2 = _interopRequireDefault(_Receipt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


// GET ALL DATA
router.get('/:userId', function (req, res) {
  var userId = req.params.userId;
  console.log(userId);
  _Receipt2.default.find({ userId: userId }).exec().then(function (docs) {
    console.log(docs);
    res.status(200).json(docs);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

router.get('/:userId/:id', function (req, res) {
  var userId = req.params.userId;
  var id = req.params.id;
  console.log(userId);
  _Receipt2.default.find({ userId: userId, _id:id }).exec().then(function (docs) {
    console.log(docs);
    res.status(200).json(docs);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

// CREATE NEW DATA
router.post('/', function (req, res) {
  if (!req.body.storeName) {
    return;
  }
  var receipt = new _Receipt2.default({
    _id: new _mongoose2.default.Types.ObjectId(),
    storeName: req.body.storeName,
    total: req.body.total,
    currency: req.body.currency,
    userId: req.body.userId
  });
  receipt.save().then(function (result) {
    console.log(result);
    res.status(201).json({
      message: 'product was created',
      createdProduct: result
    });
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

// GET SPESIFIC DATA BY ID
router.get('/:id', function (req, res) {
  var id = req.params.id;
  _Receipt2.default.findById(id).exec().then(function (doc) {
    console.log(doc);
    if (doc) res.status(200).json(doc);else res.status(404).json({ message: 'No valid entry for provided ID' });
  }).catch(function (err) {
    console.log(err);
    res.status(200).json({ error: err });
  });
});

// UPDATE DATA
router.patch('/:userId/:id', function (req, res) {
  var userId = req.params.userId;
  var id = req.params.id;
  var updateOps = {};
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = Object.entries(req.body)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref = _step.value;

      var _ref2 = _slicedToArray(_ref, 2);

      var key = _ref2[0];
      var value = _ref2[1];

      updateOps[key] = value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  _Receipt2.default.update({ userId: userId, _id: id }, { $set: updateOps }).exec().then(function (result) {
    console.log(result);
    res.status(200).json(result);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});

// DELETE DATA
router.delete('/:userId/:id', function (req, res) {
  var id = req.params.id;
  var userId = req.params.userId;
  _Receipt2.default.remove({ _id: id, userId: userId }).exec().then(function (result) {
    console.log(result);
    res.status(200).json(result);
  }).catch(function (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
});
module.exports = router;
