import eventBus from "./eventBus";

/**
 * judge type accurate
 * @param value
 * @returns {*}
 */
export function judgeType(value) {
  const t = Object.prototype.toString.call(value);
  let map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  if (value instanceof Element) {
    return 'element';
  }
  return map[t];
}

/**
 * judge array contain another Obj
 * @param arr
 * @param obj
 * @returns {boolean}
 */
export function arrContainObj(arr, obj) {
  if (Object.prototype.toString.call(arr) === '[object Array]') {
    let i = arr.length;
    while (i--) {
      if (arr[i] === obj) {
        return true;
      }
    }
    return false;
  }
  else {
    this.throw("the object of the judgment must be a array format ，you better find it");
  }
}

/**
 * debounce
 * @param func
 * @param wait
 * @param immediate
 * @returns {Function}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    const last = +new Date() - timestamp;
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };
  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
}

/**
 * stop propagation
 * @param e
 */
export function stopPropagation(e) {
  if (e && e.stopPropagation) {
    e.stopPropagation();//W3C stop propagation
  } else {
    window.event.cancelBubble = true;//IE stop propagation
  }
}

/**
 * addEventListener（绑定Dom元素的监听事件）
 * @param target  监听对象
 * @param type    监听函数类型，如click,mouseover
 * @param func    监听函数
 */
export function addEventHandler(target, type, func) {
  if (target.addEventListener) {
    //监听IE9，谷歌和火狐
    target.addEventListener(type, func, false);
  } else if (target.attachEvent) {
    target.attachEvent("on" + type, func);
  } else {
    target["on" + type] = func;
  }
}

/**
 * removeEventHandler （移除Dom元素的监听事件）
 * target：监听对象
 * type：监听函数类型，如click,mouseover
 * func：监听函数
 */
export function removeEventHandler(target, type, func) {
  if (target.removeEventListener) {
    //监听IE9，谷歌和火狐
    target.removeEventListener(type, func, false);
  } else if (target.detachEvent) {
    target.detachEvent("on" + type, func);
  } else {
    delete target["on" + type];
  }
}

/**
 * get query
 * @param url
 * @param name
 * @returns {null}
 */
export function getQuery(url, name) {
  let reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\area-linkage|&|$)", "i");
  if (url) {
    if (reg.test(url)) {
      const val = unescape(RegExp.$2.replace(/\+/g, " "));

      if (val !== null && val.toString().length >= 1) {
        return val;
      }
    }
  }
  return null;
}

/**
 * get mock query
 * @param config
 * @param name
 * @returns {string}
 */
export function getMockQuery(config, name) {
  const url = encodeURI(config.url);
  const qn = getQuery(url, name);
  return decodeURI(decodeURI(qn));
}

/**
 * hasClass
 * @param elements
 * @param cName
 * @returns {boolean}
 */
export function hasClass(elements, cName) {
  return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)")); // ( \\s|^ ) 判断前面是否有空格 （\\s | $ ）判断后面是否有空格 两个感叹号为转换为布尔值 以方便做判断
}

/**
 * add class
 * @param elements
 * @param cName
 */
export function addClass(elements, cName) {
  if (!hasClass(elements, cName)) {
    elements.className += ' ' + cName;
  }
}

/**
 * remove class
 * @param elements
 * @param cName
 */
export function removeClass(elements, cName) {
  if (hasClass(elements, cName)) {
    elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " "); // replace方法是替换
  }
}

/**
 * count range
 * @param holderInfo
 * @returns {number}
 */
export function countRange(holderInfo) {
  const fatherID = holderInfo.fatherID;//father element className
  const childIDList = holderInfo.childIDList;//children elements className list

  /**
   * get style
   * @param obj
   * @param attr
   * @returns {string}
   * @private
   */
  function _getStyle(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    }
    else {
      return document.defaultView.getComputedStyle(obj, null)[attr];
    }
  }

  /**
   * get real height in dom
   * @param obj
   * @param attList
   * @returns {number}
   * @private
   */
  function _getInHeight(obj, attList) {
    let inH = 0;
    for (let value of attList) {
      inH = inH + parseFloat(_getStyle(obj, value));
    }
    return inH;
  }

  /**
   * real total height
   * @param fatherID
   * @param childIDList
   * @returns {number}
   * @private
   */
  function _realTotalHeight(fatherID, childIDList) {

    /*
    * 判断父级内部容器高度时候，只需计算内部控件即可
    * 1、content-box => 直接取 offsetHeight 高度
    * 2、border-box  => 取 offsetHeight 高度后取出 padding 高度
    * ===========================================================================
    */
    const faNode = document.getElementById(fatherID); //父级容器
    if (!faNode) {
      throw 'the father element whitch ID is "' + fatherID + '" is not found, find it in grid component.';
    }
    const fbs = _getStyle(faNode, 'boxSizing');//get style of box-sizing
    let faNodeH = 0;//init height

    //father element height
    if (fbs === 'content-box') {
      faNodeH = faNode.offsetHeight;
    }
    if (fbs === 'border-box') {
      faNodeH = faNode.offsetHeight - _getInHeight(faNode, ['paddingTop', 'paddingBottom']);

      // console.log(faNode.offsetHeight);
      // console.log(_getInHeight(faNode, ['paddingTop', 'paddingBottom']))
    }
    console.log('表格组件 - 容器父级高度：');
    console.log(faNodeH);
    /*===========================================================================*/

    /*
     * 计算内部子集元素实际高度之和
     * 默认全部增加 box-size = 'borderBox' 后取 offsetHeight 高度
     * 循环实现高度累加
     * ===========================================================================
    */
    let childTotalH = 0;
    childIDList.forEach(id => {
      const node = document.getElementById(id); //容器
      let realH = 0;
      if (node) {
        addClass(node, 'borderBox');//add className => add style box-size ( borderBox )
        const nodeH = node.offsetHeight; //child element height
        realH = nodeH + _getInHeight(node, ['marginTop', 'marginBottom']);//add margin height
      }
      childTotalH = childTotalH + realH;
    });
    return faNodeH - childTotalH;
  }

  const hh = _realTotalHeight(fatherID, childIDList);
  console.log('表格组件 - 最终计算出的高度');
  console.log(hh);
  return hh;
}

/**
 * render range
 * @param holderInfo
 */
export function renderRange(holderInfo) {
  eventBus.$emit('buildRange', countRange(holderInfo));
}

/**
 * get current page data total list
 * @param keyRefer
 * @param tableList     （ table data List ）
 * @param headList      （ table head List ）
 * @param sumFixedNum      （ 保留几位小数 ）
 * @returns {{}}
 * @private
 */
export function getTotalList(keyRefer, tableList, headList, sumFixedNum) {
  let sumObj = {};
  let attrList = [];
  //get attrList
  headList.forEach(item => {
    if (item[keyRefer['xtype']] === 'number') {
      attrList.push(item[keyRefer['model-code']]);
    }
  });
  // console.log('需要合计的字段值 （表头类型为number）的计算队列');
  // console.log(attrList);
  const len = tableList.length;
  //get Total list
  tableList.forEach((item, index) => {
    for (let key in item) {
      if (arrContainObj(attrList, key)) {

        // console.log('新增加的 数字信息');
        // console.log(Number(item[key]));

        sumObj[key] = Number(sumObj[key] ? sumObj[key] : 0) + Number(item[key]);//累加
        //累加到最后一项时，小数点后保留n位置
        if (index === len - 1) {
          sumObj[key] = sumObj[key].toFixed(sumFixedNum);//保留几位小数
        }
      }
      else {
        sumObj[key] = '';
      }
      // console.log('当前数字信息累加值');
      // console.log(sumObj[key]);
    }
  });
  // console.log('输出结果当前页 合计结果');
  // console.log(sumObj);
  return sumObj;
}

