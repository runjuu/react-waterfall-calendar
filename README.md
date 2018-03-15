# react-waterfall-calendar
[![Greenkeeper badge](https://badges.greenkeeper.io/Runjuu/react-waterfall-calendar.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/Runjuu/react-waterfall-calendar.svg?branch=master)](https://travis-ci.org/Runjuu/react-waterfall-calendar)
[![Coverage Status](https://coveralls.io/repos/github/Runjuu/react-waterfall-calendar/badge.svg?branch=master)](https://coveralls.io/github/Runjuu/react-waterfall-calendar?branch=master)
[![npm version](https://badge.fury.io/js/react-waterfall-calendar.svg)](https://badge.fury.io/js/react-waterfall-calendar)
[![Total downloads](https://img.shields.io/npm/dt/react-waterfall-calendar.svg)](https://www.npmjs.com/package/react-waterfall-calendar)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md#pull-requests)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

[![DEMO](https://i.imgur.com/sj0SHqn.gif)](https://runjuu.github.io/react-waterfall-calendar/demo/static/index.html)

# Props
```jsx
    <Calendar
      interval

      selectType
      classNames
      dataAttribute
      defaultSelected

      dateFormat
      monthFormat

      enableTouchTap
      onClick
    />
```

## interval
日历显示的月份区间

```javascript
    const { from, to, months } = interval;
```
##### { from, to }
> 格式为符合 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 的 `String` 类型

##### { months }
> 格式为大于0的 Number 类型，`{ from }` 为 `undefined` 时从当前月份开始计算

⚠️ 当`months !== undefined`时，`to`将不起任何作用


## selectType
日期选择类型
> 格式为 String 类型，接受以下三个值，默认为 `'SINGLE'`

##### 'INTERVAL'
被选中的日期 是前后选择的两次日期间的所有日期
##### 'MULTIPLE'
所有被选中的日期都会同时存在
##### 'SINGLE'
只有最后一个被选择的日期

## classNames
传入自定义样式的样式名

```javascript
    const { calendar, month, horizontal, date } = classNames;
```

## dataAttribute
可对个别日期单独设置 data-* 属性

```javascript
    const dataAttribute = {};
    dataAttribute['2017-04-05'] = { attribute: 'attribute' }
```

## defaultSelected
默认选中的日期

```javascript
    const defaultSelected = ['2017-02-06', '2017-02-07'];
```

## dateFormat
日期显示格式

> 默认为 `'D'`

```javascript
    const dateFormat = 'D' || 'DD' || 'D日';
```

## monthFormat
月份标题格式

> 默认为 `'YYYY-MM'`

```javascript
    const dateFormat = 'M' || 'MM' || 'M月';
```

## onClick
点击日期时触发的回调方法
```javascript
    function onClick({ date, event, nextSelected, state }) {}
```

#### 调用 onClick 后的返回值
##### false *[boolean]*
> 被选中的日期不会更新为 `nextSelected` 中的内容

##### { nextSelected } *[Array]*
> 会根据 `onClick` 返回的 `nextSelected` 值更新
> `nextSelected` 为 **符合 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 的 `String` 类型** 的**数组**

## enableTouchTap
当 `enableTouchTap = true` 时，`onClick`回调事件为 `onTouchTap`
> 默认为 `false`
