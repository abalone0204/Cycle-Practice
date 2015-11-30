# Cycle

要了解 Cycle 前可能要先玩過一點點 Rx.js，

明白 Observable 的觀念，

因為 Cycle.js 的核心即是 Observable。

首先要了解怎樣將 code 跟 DOM 連接在一起。

就是使用 Cycle 底下的`run(main, drivers)`

> driver
> drivers is a record of driver functions labeled by some name.

```
import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';
let drivers = {
  DOM: CycleDOM.makeDOMDriver('#app')
}
```


`makeDOMDriver(container)`會回傳一個 driver function，

讓我們的 code 能夠跟 DOM 連接，

container則是我們要跟 DOM 連接的那個點

（可以是個簡單的 Selector，這裏就依照官網的範例用`#app`）


# 從 DOM 中去取得或修改東西

其實我們可以在 Main 加入一個參數，

就是 drivers，而 drivers 底下正好有一個 DOM key。

> 為什麼`main`可以吃 drivers 當作參數呢？
> 在我們處理 curry 或是 composable 的function時，
> 通常都是由右處理到左的 => 把右邊處理完的結果往左傳。


```js
function main (drivers) {
    return {
        DOM: drivers.DOM
                .select('input').events('click')
                .map(ev => ev.target.checked)
                .startWith(false)
                .map(toggled =>
                    h('div', {className: 'toggleBox'},[
                        h('input',{
                            type: 'checkbox', 
                            id: 'sudoCheck'}), 
                        'Toggle me',
                        h('p', toggled ? 'ON' : 'OFF')
                        ])
                    )
    }
}
```