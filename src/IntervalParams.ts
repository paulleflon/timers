/**
 * Parameters of an `Interval` object.
 */
export default interface IntervalParams {
	/**
	 * The delay between each callback execution.
	 */
	delay: number;
	/**
	 * The maximum amount of callback executions before the interval automatically stops.
	 */
	maxExecutions?: number;
	/**
	 * The maximum time in milliseconds the Interval can run before stopping.
	 */
	maxTime?: number;
	/**
	 * Whether to count the time while the Interval is being paused to determine when it should stop according to `maxTime` value.
	 */
	maxTimeIncludesPauses?: boolean;
	/**
	 * Whether to reset the delay of the next execution when the Interval gets paused.
	 * 
	 * For example, given an Interval with a **1000ms** delay, if it gets paused **300ms** after the last execution,
	 *  - if `resetDelayOnPause` is `true`, the callback  will be executed **1000ms** after it is resumed.
	 *  - if `resetDelayOnPause` is `false`, the callback  will be executed **700ms** after it is resumed.
	 */
	resetDelayOnPause?: boolean;

}