type PromiseWithResolvers<T> = {
	promise: Promise<T>;
	resolve: (value: T | PromiseLike<T>) => void;
	reject: (reason?: unknown) => void;
};

declare global {
	interface PromiseConstructor {
		withResolvers?<T>(): PromiseWithResolvers<T>;
		/** Stage-4 ES2026; required by unpdf/pdf.js on Node < 23. */
		try?<T>(fn: () => T | PromiseLike<T>): Promise<Awaited<T>>;
	}
}

if (typeof Promise.withResolvers !== "function") {
	Promise.withResolvers = function withResolvers<T>(): PromiseWithResolvers<T> {
		let resolve!: (value: T | PromiseLike<T>) => void;
		let reject!: (reason?: unknown) => void;
		const promise = new Promise<T>((res, rej) => {
			resolve = res;
			reject = rej;
		});
		return { promise, resolve, reject };
	};
}

if (typeof Promise.try !== "function") {
	Promise.try = function tryPoly<T>(fn: () => T | PromiseLike<T>): Promise<Awaited<T>> {
		return new Promise<Awaited<T>>((resolve) => {
			resolve(fn() as Awaited<T>);
		});
	};
}

export {};

