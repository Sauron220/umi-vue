
const directive = {
  install(Vue,options){
    Vue.directive('js-marquee', {
      bind (el, binding, vnode, oldVnode) {
        function toGetComputedStyle(elChild,value) {
          return window.getComputedStyle(elChild)[value]
        }
        var styleSet = setTimeout(function () {
          let elChildren = el.children[0].children;
          let elWidth = 0;
          for(var i = 0;i<elChildren.length;i++){
            let elChild = elChildren[i];
            let elChildWidth = toGetComputedStyle(elChild,'width').replace('px','')*1;
            let marginRight = toGetComputedStyle(elChild,'margin-right').replace('px','')*1;
            let marginLeft = toGetComputedStyle(elChild,'margin-left').replace('px','')*1;
            let elChildRealWidth = elChildWidth + marginRight + marginLeft;
            elWidth += elChildRealWidth;
          };
          // 元素长度 elWidth
          let elChild = el.children[0];
          elChild.style.float = 'left';
          elChild.style.width = elWidth + 'px';
          el.style.width = elWidth*2 + 'px';
          el.style.overflow = 'hidden';

          // 设置初始位置
          el.style.marginLeft = 0;
          let childCopy = elChild.cloneNode(true);
          el.appendChild(childCopy);
          function elMove() {
            var setMarginClock = setInterval(function () {
              el.style.marginLeft = el.style.marginLeft.replace('px','')*1 -1 +'px';
              if(Math.abs(el.style.marginLeft.replace('px','')) >= elWidth){
                clearTimeout(setMarginClock);
                el.style.marginLeft = 0;
                elMove();
              }
            },10)
          }
          setTimeout(function () {
            elMove();
          },1500)
          clearTimeout(styleSet);
        });
      }
    });
  }
}
export default directive;