require('../static/stylesheets/style.scss');
import Rx from 'rx';
import Cycle from '@cycle/core';
import {makeDOMDriver, h} from '@cycle/dom';


var timer$ = Rx.Observable.timer(0, 1000)
            .map(i => `${i} seconds elapsed`)
            .map(str => h('div', str));
timer$.subscribe(e => {
    console.log(e);
})
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

let drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);