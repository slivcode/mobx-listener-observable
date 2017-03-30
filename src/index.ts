import { IObservableObject, observable, observe, runInAction } from 'mobx';

export default class ListenerObservable<A extends { [s: string]: { on, off?, active } }> {
	state: IObservableObject & A;
	disposers = [];

	constructor (a: A) {
		let t = this;
		t.state = observable(a);
		let handler = k => {
			let last;
			return ({ newValue, oldValue }) => {
				let q = t.state[k];
				if (newValue) {
					last = q.on();
				} else {
					let f = q.off || last;
					f && f();
				}
			};
		};
		this.disposers = Object.keys(t.state)
			.map(k => observe(t.state[k], 'active', handler(k), true));
	}

	dispose () {
		runInAction(() => {
			Object.keys(this.state).forEach(k => this.state[k].active = false);
		});
		this.disposers.forEach(d => d && d());
	}
};