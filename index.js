/*!

 * Functional version of Reasy validation library

 *	Copyright (c) 2017 XuHanpeace, contributors

 * Released under MIT license

 */

 'use strict'

//保存各个工具函数的全局对象
var R = {} 

/*
 * 纯函数组合compose
*/
var _pipe = function(func1,func2) {//先实现两个纯函数的组合
    return function(){
        //获取参数arguments
        var args = Array.prototype.slice.call(arguments,0);
        //闭包会将func1和func2保留
        return func2.call(this,func1.apply(this,args));
    }
}

var _reverse = function(str) {//curry化reverse
    return str.reverse();
}

var compose = function(){//利用reduce函数，实现多函数的组合
    var args = Array.prototype.slice.call(arguments,0);
    //args.shift()作为第一个参数，依次与args里面的函数组合
    return _reverse(args).reduce(_pipe,args.shift());
}

/*
 *ES6实现compose
 *const _pipe = (func1,func2) => (...args) => func2.call(this,func1.apply(this,args));
 *const _reverse = str => str.reverse();
 *const compose = (...args) => _reverse(args).reduce(_pipe,args.shift());
*/

/*
 * 柯里化函数curry
*/
var curry = function(fn) {
    //获取匿名函数fn参数长度
    var arity = fn.length;
    return function fn_1() {//curry化后返回的函数
        var fn1_args = Array.prototype.slice.call(arguments,0);
        if(fn1_args.length >= arity){
            //这时候参数完备了，直接执行fn逻辑
            return fn.apply(null,fn1_args);
        }else {
            //如果第一次调用只传了部分参数，则继续返回一个函数，接收剩下的参数
            var fn_2 = function(){
                var fn2_args = Array.prototype.slice.call(arguments,0);
                //将剩下的参数与上次注册时的参数合并
                //再次调用fn_1
                return fn_1.apply(null,fn1_args.concat(fn2_args));
            }
            return fn_2;
        }
    }
}

/*
 *简易缓存函数
*/
var cache = (function(){
    var store = {};

    return {
        'get': function(key) {
            return store[key];
        },
        'set': function(key,val) {
            store[key] = val;
        }
    }
}());

/*
 *函数节流
*/
var throttle = function(method, delay){
    var last = 0;
    return function (){
       var now = +new Date();

       if(now - last > delay){
           method.apply(this,arguments);
           last = now;
       }
    }
}

/*
 * 函数防抖
*/
var debounce = function(method,delay){
    var timer = null;
    return function(){
        var _self = this,
            args = [].prototype.slice.call(arguments);

        clearTimeout(timer);
        timer = setTimeout(function(){
            method.apply(_self, args);
        },delay);
    }
}

/*
 *获取字符串字节数
*/
var sizeof = function(str, charset){
    var total = 0,
        charCode,
        i,
        len;

    charset = charset ? charset.toLowerCase() : '';
    if(charset === 'utf-16' || charset === 'utf16'){
        for(i = 0, len = str.length; i < len; i++){
            charCode = str.charCodeAt(i);
            if(charCode <= 0xffff){
                total += 2;
            }else{
                total += 4;
            }
        }
    }else{
        for(i = 0, len = str.length; i < len; i++){
            charCode = str.charCodeAt(i);
            if(charCode <= 0x007f) {
                total += 1;
            }else if(charCode <= 0x07ff){
                total += 2;
            }else if(charCode <= 0xffff){
                total += 3;
            }else{
                total += 4;
            }
        }
    }
    return total;
}

/*
 *冒泡排序
*/
var bubbleSort = function(arr){
    for(var i = 0;i < arr.length;i++){
        //每循环一遍最大数字就会放到最后
        //所以每次待排序的数组长度应该是arr.length - i
        for(var j = 0;j< arr.length - i - 1;j++){
            if(arr[j] > arr[j +1]){
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

/*
 *快速排序
*/
var quickSort = function(arr){
    if(arr.length <= 1) {
        return arr;
    }
    
    var pivotIndex = Math.floor(arr.length / 2),
        pivot = arr.splice(pivotIndex,1)[0], //取得基准元素
        left = [],  //存放小于基准的数据
        right = []; //存放大于基准的数据
    for(var i=0;i<arr.length;i++){
        if(arr[i] <= pivot){
            left.push(arr[i]);//小于基准的push到left
        }else {
            right.push(arr[i])//大于基准的Push到right
        }
    }
    //不断重复这个过程
    return quickSort(left).concat([pivot],quickSort(right))
}


module.exports = {
	'compose': compose,
    'curry': curry,
    'cache': cache,
    'sizeof': sizeof
}

