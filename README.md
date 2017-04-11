# react-waterfall-calendar
流式布局日历模块

## Props
```javascript
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

### interval
日历显示的月份区间

```javascript
    const { from, to, months } = interval;
```
##### { from, to }
> 格式为符合 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 的 `String` 类型

##### { months }
> 格式为大于0的 Number 类型，`{ from }` 为 `undefined` 时从当前月份开始计算

⚠️ 当`months !== undefined`时，`to`将不起任何作用

---
### selectType
日期如何被选中的类型
> 格式为 String 类型，接受以下三个值，默认为 `'SINGLE'`

```javascript
    const selectType = 'INTERVAL' || 'MULTIPLE' || 'SINGLE'
```

##### 'INTERVAL'
被选中的日期 是前后选择的两次日期间的所有日期
##### 'MULTIPLE'
所有被选中的日期都会同时存在
##### 'SINGLE'
只有最后一个被选择的日期

### classNames
传入自定义样式的样式名

```javascript
    const { calendar, month, horizontal, date } = classNames;
```

### dataAttribute
可对个别日期单独设置 data-* 属性

```javascript
    const dataAttribute = {};
    dataAttribute['2017-04-05'] = { attribute: 'attribute' }
```

### defaultSelected
在挂载日历组件时默认选中的日期

```javascript
    const defaultSelected = ['2017-02-06', '2017-02-07'];
```
---
### dateFormat

日期格式化

> 默认为 `'D'`

```javascript
    const dateFormat = 'D' || 'DD' || 'D日';
```

### monthFormat

月份格式化

> 默认为 `'YYYY-MM'`

```javascript
    const dateFormat = 'M' || 'MM' || 'M月';
```

---
### onClick
日期被点击时的回调方法

```javascript
    function onClick({ date, event, nextSelected, state }) {}
```

#### return
##### false *[boolean]*
> 被选中的日期不会更新为 `nextSelected` 中的内容

##### { nextSelected } *[Array]*
> 会根据 `onClick` 返回的 `nextSelected` 值更新
> `nextSelected` 为 **符合 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 的 `String` 类型** 的**数组**


### enableTouchTap
当 `enableTouchTap = true` 时，`onClick`回调事件为 `onTouchTap`
> 默认为 `false`



