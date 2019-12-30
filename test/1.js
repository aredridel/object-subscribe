import test from "@aredridel/t6"
import objwatch from "../index.js";

test("It calls back when subscribed", t => {
	const inner = { initial: true };
	const x = objwatch(inner);
	let ret = null;
	x.subscribe(val => ret = val);
	t.deepEqual(ret, {initial: true}, 'initial proxy value matches');
	t.deepEqual(inner, {initial: true}, 'initial inner value matches');
	t.end();
});

test("It calls back when updating", t => {
	const inner = {initial: true};
	const x = objwatch(inner);
	let ret = null;
	x.subscribe(val => ret = val);
	x.proxied.newVal = true;
	t.deepEqual(ret, {initial: true, newVal: true}, 'updated proxy value matches');
	t.deepEqual(inner, {initial: true, newVal: true}, 'updated inner value matches');
	t.end();
});

test("It calls back when deleting", t => {
	const inner = { initial: true }
	const x = objwatch(inner);
	let ret = null;
	x.subscribe(val => ret = val);
	delete x.proxied.initial;
	t.deepEqual(ret, {}, 'updated proxy value matches');
	t.deepEqual(inner, {}, 'updated inner value matches');
	t.end();
});

test("It works with an array", t => {
	const inner = [];
	const x = objwatch(inner)
	let ret = null;
	x.subscribe(val => ret = val);
	t.deepEqual(ret, [], 'initial proxy value matches');
	t.deepEqual(inner, [], 'initial inner value matches');
	t.end();
});

test("It calls back with a push", t => {
	const inner = [];
	const x = objwatch(inner);
	let ret = null;
	x.subscribe(val => ret = val);
	x.proxied.push('new');
	t.deepEqual(ret, ['new'], 'updated proxy value matches');
	t.deepEqual(inner, ['new'], 'updated inner value matches');
	t.end();
});
