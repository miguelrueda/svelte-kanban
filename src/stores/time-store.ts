import { readable } from "svelte/store";

const time = readable(new Date(), function start(set) {
    const interval = setInterval(() => {
        set(new Date())
    }, 1000);

    return function stop() {
        clearInterval(interval);
    }
});

export default time;