# Mobx-Listener-Observable

## Usage

```js
import ListenerObservable from 'mobx-listener-observable';
let lOb = new ListenerObservable({
    trackScroll: {
        on: () => document.body.addEventListener('scroll', console.log),
        off: () => document.body.removeEventListener('scroll', console.log),
        active: true,
    },
    autoLog: {
        on: () => autorun(() => console.log(toJS(ob))),
        // disposer pattern like mobx autorun/reaction does not require off function.
        active: false,
        // active: false will not automatically run at first.
    }
})
lOb.state.trackScroll.active = false;
// trackscroll is now stopped.
setTimeout(() => {
    lOb.state.trackScroll.active = true; // restart trackscroll 1s later.
}, 1000)
lOb.state.autoLog.active = true;
// start autoLog.
```