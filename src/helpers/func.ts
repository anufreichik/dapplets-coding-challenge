export const debounce = (callback:Function, delay:number) => {
    let timer:any;
    return function (...args:any[]) {
        //check if we set timer already, clear it
        if (timer) clearTimeout(timer);
        //reset timer
        timer = setTimeout(() => {
            callback(...args);
        }, delay)

    }
}

export function throttle(cb:Function, delay:number){
    let isWaiting:boolean=false;
    let lastArgs:any;
    let lastThis:any;
    function wrapper(this:any){
        const context = this, args = arguments;
        if(isWaiting){
            lastArgs = args;
            lastThis = this;
            return;
        }
        else{
            cb.apply(context, args);
            isWaiting=true;
        }
        setTimeout(()=>{
            isWaiting=false;
            if(lastArgs) {
                wrapper.apply(lastThis, lastArgs);
                lastArgs = null;
                lastThis = null;
            }

        },delay)
    }

    return wrapper;
}
