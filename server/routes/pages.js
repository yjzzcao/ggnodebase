const express = require('express');
const router = express.Router();

const render = (req, res) => {
  const { namespace, module, func } = req.params;
  // 权限判断
  if (namespace !== undefined) {
    res.render(`${namespace}/${module}/${func}`);
  } else if (module !== undefined) {
    res.render(`${module}/${func}`);
  } else if (func !== undefined) {
    res.render(`${func}`);
  } else {
    res.render('index');
  }
};

router.get('/:namespace/:module/:func', function (req, res, next) {
  const { namespace } = req.params;
  if (namespace.startsWith('_')) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    render(req, res);
  }
});
router.get('/:module/:func', function (req, res, next) {
  const { module } = req.params;
  if (module.startsWith('_')) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    render(req, res);
  }
});
router.get('/:func', function (req, res, next) {
  const { func } = req.params;
  if (func.startsWith('_')) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  } else {
    render(req, res);
  }
});
router.get('/', function (req, res, next) {
  render(req, res);
});

module.exports = router;
