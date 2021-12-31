import IntervalParams from './IntervalParams';
import Timeout from './Timeout';

/**
 * Enhanced `setInterval`.
 */
export default class Interval implements IntervalParams {

	/**
	 * Arguments to pass in the callback function.
	 */
	args: any[];
	/**
	 * The function to recurrently execute.
	 */
	callback: Function;
	/**
	 * The Date when the Interval was instanciated.
	 */
	createdAt: Date;
	/**
	 * The Date when the last callback execution occured.
	 */
	lastExecution?: Date;
	maxExecutions?: number;
	/**
	 * Whether the interval is being paused.
	 */
	paused: boolean;
	resetDelayOnPause?: boolean;

	private _resumingDelay?: number;
	private _delay: number;
	private _executionCount: number;
	private _interval!: NodeJS.Timer;

	/**
	 * @param callback The function to recurrently execute.
	 * @param params Parameters of the interval. A number can be passed, it will be used as the interval's delay.
	 * @param args Arguments to pass in the callback function.
	 */
	constructor(callback: Function, params: IntervalParams | number, ...args: any[]) {
		this.callback = callback;
		this.args = args || [];
		this.paused = false;
		this.createdAt = new Date();
		this._executionCount = 0;
		if (typeof params === 'number')
			this._delay = params;
		else {
			this._delay = params.delay;
			this.maxExecutions = params.maxExecutions;
			this.resetDelayOnPause = params.resetDelayOnPause || false;
		}
		this.run();
	}

	private execute() {
		this.lastExecution = new Date();
		this.callback(...(this.args));
		if (this.maxExecutions && ++this._executionCount >= this.maxExecutions) {
			clearInterval(this._interval);
		}
	}

	private run() {
		this._interval = setInterval(this.execute.bind(this), this._delay);
	}

	/**
	 * Pauses the interval.
	 */
	pause() {
		if (this.paused)
			return;
		clearInterval(this._interval);
		if (!this.resetDelayOnPause) {
			const last = this.lastExecution ? this.lastExecution.getTime() : this.createdAt.getTime();
			this._resumingDelay = this._delay - (Date.now() - last);
		}
	}

	/**
	 * Resumes the interval.
	 */
	resume() {
		if (!this.paused)
			return;
		const d = this._resumingDelay || 0;
		this._resumingDelay = undefined;
		new Timeout(() => {
			this.execute();
			this.run();
		}, d)
	}

	/**
	 * The amount of times the callback function has been executed by the Interval.
	 */
	get executions(): number {
		return this._executionCount;
	}

	get delay(): number {
		return this._delay;
	}

	set delay(ms: number) {
		this._delay = ms;
		const d = this.lastExecution ? Date.now() - this.lastExecution.getTime() + this._delay : 0;
		new Timeout(() => {
			this.pause();
			this.run();
		}, d);
	}
}