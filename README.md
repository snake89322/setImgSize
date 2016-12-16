# setImgSize.js
按照固定尺寸调整图片，防止用户上传非预期尺寸图片所产生的图片拉伸和失真问题。<br />
不依赖jQuery
# Scope
&lt;img /&gt; 标签
# Quote
```ini
<script src="setImgSize-0.0.1.min.js" type="text/javascript" charset="utf-8"></script>
```
# Apply
## [HTML]
关键属性：data-size <br />
数据格式："width, height"
```ini
// 直接设置图片的预期尺寸
<img src="images/1.jpg" data-size="600, 500" alt="" />

// 为图片添加一个容器并设置图片的预期尺寸
<div class="img-frame"><img src="images/1.jpg" class="img-adapt" data-size="600, 500" alt="" /></div>
```

## [CSS]
```ini
.img-frame {
	text-align: center; // 居中图片
	overflow: hidden; // 防止图片溢出
	position: relative; // center: true 时顶层dom需设置
	height: 300px; // 自定义
}
```
## [JS]
```ini
setImgSize.init({
  className: 'img-adapt', // 设置图片的标签的className，默认为""，查询所有<img />标签
  callback: function () { // 所有图片设置完毕后的回调函数
    console.log('set complete');
  },
  center: true // 是否让图片按照中心显示，默认false，需设置顶层dom CSS position: relative
});
```

23

