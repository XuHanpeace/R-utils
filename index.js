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


module.exports = {
	'compose': compose,
    'curry': curry,
    'cache': cache
}

