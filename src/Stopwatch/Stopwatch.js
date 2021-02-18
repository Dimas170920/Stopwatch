import './Stopwatch.css'
import React, {useLayoutEffect, useState} from "react";
import TimerService from './TimerService';

const Stopwatch = (props) =>{
    const [timerState, setTimerState] = useState(TimerService.initialState);
    let isWaitClicked= false;
    let waitTimeout;
    useLayoutEffect(()=> {
        const subs = TimerService.subscribe(setTimerState);
        TimerService.init();

        return () => subs.unsubscribe();
    },[]);

    const onResetHandler = () =>{
        TimerService.reset()
    }

    const onWaitHandler = () =>{
        if (isWaitClicked) {
            clearTimeout(waitTimeout);
            isWaitClicked = false;
            if(timerState.onClicked){
                TimerService.resume();
            }else{
                TimerService.wait();
            }
            return;
        }
        waitTimeout = setTimeout(() => {
            isWaitClicked = false;
        }, 300);
        isWaitClicked = true;

    }

    const onStartStopHandler = () =>{

        if(timerState.onClicked){
            TimerService.start();
        }else{
            TimerService.stop();
        }
    }


    return(
        <div>
            <div id={'stopwatch'}>
                <div id={'hours'}>{((timerState.hours < 10) ? '0' : '')+timerState.hours}</div>
                <div id={'min'}>{((timerState.min < 10) ? ':0' : ':')+timerState.min}</div>
                <div id={'sec'}>{((timerState.counter < 10) ? ':0' : ':')+timerState.counter}</div>
            </div>
            <div id={'panel'}>
            <button onClick={onStartStopHandler}>{timerState.onClicked?'Start':'Stop'}</button>
            <button onClick={onWaitHandler}>{timerState.onClicked?'Resume':'Wait'}</button>
            <button onClick={onResetHandler}>Reset</button>
        </div>
        </div>
    )
}

export default Stopwatch;