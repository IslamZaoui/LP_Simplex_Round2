declare global {
	type Matrix<T> = Array<T>[];
	type SimplexIteration = {
		iteration: number;
		tableau: Matrix<number>;
		enteringVar: number;
		leavingVar: number;
		pivot: [number, number];
		basis: Array<number>;
		currentValue: number;
		isOptimal: boolean;
	};

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
