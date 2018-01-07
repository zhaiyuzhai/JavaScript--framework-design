/*
扩展对象的方法*/
function extend(des,source) {
    for(var property in source){
        des[property]=source[property];
    }
    return des;
}
/*模拟出ES6的方法，Object.keys()的方法*/
Object.keys=function (obj) {
    var a=[];
    for(a[a.length] in obj){
        console.log(a[a.length-1])
    }
    return a;
}

/*模仿出extend的扩展方法，avalon.mixin和jquery.extend()的方法*/
avalon.mix=function () {
    var options,name,src,copy,copyIsArray,clone,
       /* 选取第一个参数，来确定是否深拷贝*/
        target=arguments[0] || {},
        i=1,
        length=arguments.length,
        deep=false;
   /* 确定是否是深拷贝*/
    if(typeof target==="boolean"){
        deep=target;
        target=arguments[1] || {};
        i++;
    }
    /*确保传入的数据类型是一个复杂的数据类型，如果既不是对象又不是函数，手动赋值对象*/
    if(typeof target !=="object"  && avalon.isFsunction(target)){
        target={}
    }
    /*如果是一个参数的话，那么直接将传入的对象加入到this的对象上*/
    if(i===length){
        target=this;
        i--;
    }
    for (;i<length;i++){
        if((options=arguments[i])!=null){
            for(name in options){
                try{
                    src=target[name];
                    copy=options[name];
                }catch(e){
                    continue;
                }
                /*防止循环引用*/
                if(target===copy){
                    continue;
                }
                if(deep && copy && (copyIsArray=avalon.isArray(copy) || avalon.isPlainObject(copy))){
                    if(copyIsArray){
                        copyIsArray=false;
                        clone=src && Array.isArray(src) ? src:[];
                    }else{
                        clone=src &&avalon.isPlainObject(src) ? src:{};
                    }
                   /* 连续的拷贝，直到找到不是引用类型的数据*/
                    target[name]=avalon.mix(deep,clone,copy)
                }else if(copy !=void 0){
                    target[name]=copy;
                }

            }
        }
    }
    return target;
}

/*支持Object.assign()*/

