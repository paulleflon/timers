/**
 * Enhanced `setTimeout`.
 */
export default class Timeout {
	/**
	 * The arguments to pass to the callback.
	 */
	args: any[];
	/**
	 * The function to execute.
	 */
	callback: (...args: any[]) => void;
	/**
	 * The `Date` when the Timeout was instanciated.
	 */
	createdAt: Date;
	/**
	 * Whether the callback has been executed and is not planned to be executed again.
	 */
	finished: boolean;
	/**
	 * Whether the execution is being paused.
	 */
	paused: boolean;
	/**
	 * The `Date` when the execution was last resumed.
	 */
	resumedAt!: Date;

	private _delay: number;
	private _initialDelay: number;
	private _timeout!: NodeJS.Timeout;
	
	/**
	 * @param callback The function to execute.
	 * @param delay The time in millisecondes to wait before executing the callback.
	 * @param args Arguments to pass to the callback function.
	 */
	constructor(callback: (...args: any[]) => any, delay: number, ...args: any[]) {
		this.callback = callback;
		this._delay = delay;
		this._initialDelay = delay;
		this.args = args;
		this.paused = false;
		this.createdAt = new Date();
		this.finished = false;
		this._execute();
	}

	private _execute() {
		const f = async () => {
			await this.callback(...this.args);
			this.finished = true;
		}
		this.resumedAt = new Date();
		this._timeout = setTimeout(f, this._delay);
	}

	/**
	 * The delay of the Timeout.
	 */
	get delay(): number {
		return this._initialDelay;
	}

	/**
	 * Pauses the cooldown of the callback execution.
	 */
	pause() {
		if (!this.paused) {
			this.paused = true;
			clearTimeout(this._timeout);
			this._delay -= Date.now() - this.createdAt.getTime();
		}
	}

	/**
	 * Runs the Timeout again.
	 * @param delay The delay to rerun the Timeout with. If nothing is passed, it will use the initial delay.
	 */
	rerun(delay?: number) {
		if (this.finished) {
			this._delay = delay || this._initialDelay;
			this._execute();
		}
	}

	/**
	 * Resumes the cooldown before the callback is executed.
	 */
	resume() {
		if (this.paused) {
			this.paused = false;
			this._execute();
		}
	}

	/**
	 * Makes the Timeout finished without executing the callback.
	 */
	stop() {
		clearTimeout(this._timeout);
		this.paused = false;
		this.finished = true;
		this._delay = this._initialDelay;
	}

	/**
	 * The `Date` when the callback is expected to execute.
	 */
	get willExecuteAt(): Date | null {
		if (this.finished)
			return null;
		return new Date(this.resumedAt.getTime() + this._delay);
	}
}