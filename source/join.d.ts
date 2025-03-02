/**
Join an array of strings and/or numbers using the given string as a delimiter.

Use-case: Defining key paths in a nested object. For example, for dot-notation fields in MongoDB queries.

@example
```
import type {Join} from 'type-fest';

// Mixed (strings & numbers) items; result is: 'foo.0.baz'
const path: Join<['foo', 0, 'baz'], '.'> = ['foo', 0, 'baz'].join('.');

// Only string items; result is: 'foo.bar.baz'
const path: Join<['foo', 'bar', 'baz'], '.'> = ['foo', 'bar', 'baz'].join('.');

// Only number items; result is: '1.2.3'
const path: Join<[1, 2, 3], '.'> = [1, 2, 3].join('.');
```

@category Array
@category Template literal
*/
export type Join<
	Strings extends ReadonlyArray<string | number>,
	Delimiter extends string,
> = Strings extends []
	? ''
	: Strings extends readonly [string | number]
		? `${Strings[0]}`
		: Strings extends readonly [
			string | number,
			...infer Rest extends ReadonlyArray<string | number>,
		]
			? `${Strings[0]}${Delimiter}${Join<Rest, Delimiter>}`
			: string;
