class Watcher {
	subscribe(fn) {
		fn(this);
	}
}

export default function objwatch(watched) {
	const proxy = new Proxy(watched, {
		set(target, property, val) {
			watched[property] = val;
			notify(property);
			return true;
		},
		
		deleteProperty(target, property) {
			delete watched[property];
			notify(property);
			return true;
		}
	});

	const subs = new Set();

	function notify() {
		for (const fn of subs) {
			fn(proxy);
		}
	}

	function subscribe(fn) {
		fn(proxy);
		subs.add(fn);
		return function() {
			subs.delete(fn);
		}
	}
	return { proxied: proxy, subscribe };
}
