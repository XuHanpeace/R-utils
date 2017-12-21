## 这是一个提供了函数组合、函数柯里化和一些数据验证的工具库

## 安装
```javascript
npm install -g rapper-utils
```

## Usage
```javascript
var R = require('rapper-utils');
```

### 函数柯里化
```javascript
/*例一：声明一个替换空格的函数*/
//柯里化replace函数
var replace = R.curry(function(reg, replacement, str) {
    	return str.replace(reg, replacement);
	});

var replaceSpace = replace(/\s+/g, 'Space');

//调用
var space = " gang ";
space = replaceSpace(space);
console.log(space); //output: SpacegangSpace;空格被替换成了Space

/*例二：声明一个对数组每一项加一的函数*/
//柯里化map函数
var map = curry(function(fn, arr){
		return arr.map(fn);
	});

var mapAdd = map(function(item){
		return item + 1;
	});

//调用
var arr = [1,2,3];
arr = mapAdd(arr);
console.log(arr);	//output:[2,3,4];
```
