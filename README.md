# 这是一个提供了函数组合、函数柯里化和一些数据验证的工具库

## Usage


```javascript
var R = require('rapper-utils');
```
### 函数柯里化
```javascript
var match = R.curry(function(what, str) {
    return str.match(what);
});
//声明一个匹配空格的函数，将正则传进去
var matchSpace = match(/\s+/g);
//调用
matchSpace("hello world");//output ["hello world"]
```
