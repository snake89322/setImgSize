/*!
 * VERSION: 0.0.1
 * DATE: 2016-08-10
 * UPDATES AND DOCS AT: https://github.com/snake89322/setImgSize
 *
 * This is a img adapt to fixed size plugin.
 *
 * @author: Zehui Chen, chzhwtnt@163.com
 */

;(function (w) {
  var defaultOption = {
    className: '',
    callback: function () {
    },
    center: false
  }
  w.setImgSize = {
    option: defaultOption, 
    init: function (option) {
      this.option = this.extend(defaultOption, option)
      this.adapt(this.option);
    },
    adapt: function (option) {
      var imgs, imgsCount;
      if (this.trim(option.className) == "" || option.className == undefined) {
        imgs = document.getElementsByTagName('img');
      } else {
        imgs = document.getElementsByClassName(option.className);
      }
      imgsCount = imgs.length;
      for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].nodeName.toUpperCase() === "IMG" && imgs[i].getAttribute('data-size')) {
          if (imgs[i].complete) { // img is loaded
            this.setSize(imgs[i]);
          } else { // new img onload
            imgs[i].onload = function (e) {
              this.setSize(e.target);
              if (--imgsCount == 0) {
                this.option.callback();
              }
            }.bind(this);
          }
        } else {
          imgsCount--;
          continue;
        }
      }
    },
    setSize: function (img) {
      var setSize = [];
      img.getAttribute('data-size').split(',').forEach(function(item, index) {
        setSize.push(parseInt(item));
      });
      if (isNaN(setSize[0]) || isNaN(setSize[1])) {
        console.warn('Image attribute "data-size" is illegal, please input Numbers.');
        return false;
      };
      var setRatio = setSize[0] / setSize[1];
      var imgRatio = img.width / img.height;
      if (setSize[0] >= img.width || setSize[0] >= img.height) {
        return true;
      } else if ( setRatio <= imgRatio ) {
        img.style.width = setSize[0] + 'px';
        img.style.height = 'auto';
      } else if ( setRatio > imgRatio ) {
        img.style.width = 'auto';
        img.style.height = setSize[1] + 'px';
      }
      
      if (this.option.center === true) {
        img.style.position = 'absolute';
        img.style.left = img.style.right = img.style.top = img.style.bottom = '0px';
        img.style.margin = 'auto';
      }
      
      return true;
    },
    extend: function (target, source) {
      for (var p in source) {
        if (source.hasOwnProperty(p)) {
          target[p] = source[p];
        }
      }
      return target;
    },
    trim: function (str) {
      return str.replace(/(^\s*)|(\s*$)/g,'');
    }
  }
})(window);
