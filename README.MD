# timers
## Enhanced `setInterval` and `setTimeout`

## Installation
With `npm`:
```
npm install @hickatheworld/timers
```
With `yarn`:
```
yarn add @hickatheworld/timers
```

## Documentation

## Interval
### Constructor
```
new Interval(callback, params, ...args)
```
| Parameter  | Type | Description |
| ---------- | ---- | ----------- |
| callback | Function  | The function to recurrently execute |	
| params  | IntervalParams \| number  | Parameters of the interval. A number can be passed, it will be used as the interval's delay |
| args  | any[]  | Arguments to pass in the callback function |

### Properties
| Property | Type | Description |
| -------- | ---- | ----------- |
| args | any[] | Arguments to pass in the callback function |
| callback | Function | The function to recurrently execute |
| createdAt | Date | The Date when the Interval was instanciated |
| delay | number | The delay between each execution of the callback |
| executions | number | The amount of times the callback function has been executed by the Interval |
| lastExecution | ?Date | The Date when the last callback execution occured |
| maxExecutions | ?number | The maximum amount of callback executions before the interval automatically stops |
| paused | boolean | Whether the Interval is being paused |
| resetDelayOnPause | ?boolean | Whether to reset the delay of the next execution when the Interval gets paused |	
| paused | boolean | Whether the Interval is being paused |

### Methods
| Method | Return Type | Description |
| ------ | ----------- | ----------- |
| pause | void | Pauses the Interval |
| resume | void | Resumes the Interval |

## Timeout
### Constructor
```
new Timeout(callback, delay, ...args)
```
| Parameter  | Type | Description |
| ---------- | ---- | ----------- |
| callback | Function | The function to execute |
| delay  | number | The delay before the callback function is executed |
| args  | any[] | Arguments to pass in the callback function |

### Properties
| Property | Type | Description |
| -------- | ---- | ----------- |
| args | any[] | Arguments to pass in the callback function |
| callback | Function | The function to execute |
| createdAt | Date | The Date when the Timeout was instanciated |
| delay | number | The delay before the callback function is executed |
| finished | boolean | Whether the Timeout has finished |
| paused | boolean | Whether the Timeout is being paused |
| resumedAt | ?Date | The Date when the Timeout was resumed |

### Methods
| Method | Return Type | Description |
| ------ | ----------- | ----------- |
| pause | void | Pauses the Timeout |
| rerun | void | Restarts the Timeout after it's finished. A `delay` parameter can be passed. |
| resume | void | Resumes the Timeout |
| stop | void | Stops the Timeout |