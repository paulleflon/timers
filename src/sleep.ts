import Timeout from './Timeout';

/**
 * Pauses the script for a certain duration. **Must be awaited to work**.
 * @param ms The duration in milliseconds while the script should be paused.
 * 
 * @example 
 * ```javascript
 * async function hey() {
 * 		console.log('Hey');
 * 		await sleep(1000);
 * 		console.log('Hey 1 second later');
 * }
 * ```
 * Using a tradtional `setTimeout`:
 * ```javascript
 * function hey() {
 * 		console.log('Hey');
 * 		setTimeout(() => console.log('Hey 1 second later'), 1000);
 * }
 * ```
 */
export default function sleep(ms: number): Promise<void> {
	return new Promise(res => {
		return void new Timeout(res, ms);
	});
}