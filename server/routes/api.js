const express = require('express');
const router = express.Router();
const request = require('request');
const queryString  = require("querystring");

const apiDomain = "http://ggservice.sandbox.gofund.com.cn";
const get = (req, res) => new Promise((resolve, reject) => {
    const { version, namespace, method } = req.params;

    const apiName = version + "/" + namespace + "/" + method;
    const url = apiDomain + "/" + apiName;
    // 签名
    // const params = makeSign(apiAppKey, apiSecret, "GET", apiName, req.query).query;
    const params = req.query;
    
    request(`${url}?${queryString.stringify(params)}`, { json: true }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(body);
        }
        reject(error);
    });
});
const post = (req, res) => new Promise((resolve, reject) => {
    const { version, namespace, method } = req.params;

    const apiName = version + "/" + namespace + "/" + method;
    const url = apiDomain + "/" + apiName;
    // 签名
    // const params = makeSign(apiAppKey, apiSecret, "POST", apiName, req.body).query;
    const params = req.query;
    const content = queryString.stringify(params);

    const postHeader = {
        "Content-type": "application/x-www-form-urlencoded",
        'Content-Length': content.length
    };

    const _req = request.post(url, {
        headers: postHeader,
        json: true
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(body);
        }
        reject(error);
    });

    _req.write(content);
    _req.end();
});

/* API */
router.get('/:version/:namespace/:method', async (req, res) => {
    try {
        const data = await get(req, res);
        res.send(data);
    } catch (err) {
        res.send(err.toString());
    }
});
router.post('/:version/:namespace/:method', async (req, res) => {
    try {
        const data = await post(req, res);
        res.send(data);
    } catch (err) {
        res.send(err.toString());
    }
});

module.exports = router;
