var merged = require('./dist/obj-merged');
var data1 = {
    name: '狼族小狈',
    age: 18,
    sex: '男',
    chlid: {
        name: '小狼',
        sex: '男',
        data: {}
    },
    list: []
}
var data2 = {
    name: '珍果',
    sex: '女',
    chlid: {
        name: '小果',
        age: 5
    }
}
var newObj = merged(data1, data2, { msg: '不限参数个数，后面的会覆盖前面的对应属性值' });
console.log(newObj);
console.log('子对象克隆：' + (newObj.chlid.data === data1.chlid.data) + '===false');  // --=> false
console.log('数组克隆：' + (newObj.list === data1.list) + '===false');  // --=> false
/*
    
    输出：
    { 
        name: '珍果',
        age: 18,
        sex: '女',
        chlid: { name: '小果', sex: '男', age: 5 },
        msg: '不限参数个数，后面的会覆盖前面的对应属性值' 
    }
*/