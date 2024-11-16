function generateModel(varNum: number, constNum: number): [Array<number>, Matrix<number>] {
	const constraints = Array.from({ length: constNum }, () => Array(varNum + 1).fill(0));
	const objectiveFunction = Array(varNum).fill(0);
	return [objectiveFunction, constraints];
}

export class Simplex {
	objectiveFunction: Array<number> = $state([]);
	constraints: Matrix<number> = $state([]);
	tableau: Matrix<number>;
	basis: Array<number>;
	iteration: number = 0;

	constructor(varNum: number, constNum: number) {
		[this.objectiveFunction, this.constraints] = generateModel(varNum, constNum);
		this.tableau = [];
		this.basis = [];
	}

	prepare(): void {
		const m = this.constraints.length;
		const n = this.objectiveFunction.length;

		this.tableau = Array.from({ length: m + 1 }, () => Array(n + m + 1).fill(0));

		for (let i = 0; i < m; i++) {
			for (let j = 0; j < n; j++) {
				this.tableau[i][j] = this.constraints[i][j];
			}
			this.tableau[i][n + i] = 1;
			this.tableau[i][n + m] = this.constraints[i][n];
		}

		for (let j = 0; j < n; j++) {
			this.tableau[m][j] = -this.objectiveFunction[j];
		}

		this.basis = Array.from({ length: m }, (_, i) => n + i);
	}

	*solve(): Generator<SimplexIteration, number, unknown> {
		this.prepare();
		this.iteration = 0;

		while (true) {
			const enteringCol = this.tableau[this.tableau.length - 1]
				.slice(0, -1)
				.reduce((iMin, x, i, arr) => (x < arr[iMin] ? i : iMin), 0);

			const isOptimal = this.tableau[this.tableau.length - 1][enteringCol] >= -1e-10;

			let leavingRow = -1;
			let minRatio = Infinity;

			for (let i = 0; i < this.tableau.length - 1; i++) {
				if (this.tableau[i][enteringCol] <= 0) continue;
				const currentValue = this.tableau[i][this.tableau[0].length - 1];
				if (currentValue * minRatio > this.tableau[i][enteringCol]) {
					minRatio = currentValue / this.tableau[i][enteringCol];
					leavingRow = i;
				}
			}

			yield {
				iteration: this.iteration,
				tableau: this.tableau.map((row) => [...row]),
				enteringVar: enteringCol,
				leavingVar: leavingRow,
				pivot: leavingRow !== -1 ? [leavingRow, enteringCol] : [-1, -1],
				basis: [...this.basis],
				currentValue: -this.tableau[this.tableau.length - 1][this.tableau[0].length - 1],
				isOptimal
			};

			if (isOptimal) break;
			if (leavingRow === -1) throw new Error('Problem is unbounded');

			this.basis[leavingRow] = enteringCol;

			for (let i = 0; i < this.tableau.length; i++) {
				if (i === leavingRow) continue;
				const factor = this.tableau[i][enteringCol];
				for (let j = 0; j < this.tableau[0].length; j++) {
					this.tableau[i][j] -= factor * this.tableau[leavingRow][j];
				}
			}

			this.iteration++;
		}

		return -this.tableau[this.tableau.length - 1][this.tableau[0].length - 1];
	}

	getSolution(): Array<number> {
		const solution = Array(this.objectiveFunction.length).fill(0);
		for (let i = 0; i < this.basis.length; i++) {
			if (this.basis[i] < this.objectiveFunction.length) {
				solution[this.basis[i]] = this.tableau[i][this.tableau[0].length - 1];
			}
		}
		return solution;
	}
}
