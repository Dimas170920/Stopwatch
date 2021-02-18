import { Subject } from 'rxjs';

const subject = new Subject();
const initialState = {
    onClicked: true,
    interval:null,
    counter: 0,
    min: 0,
    hours: 0

}

let state = initialState;

const TimerService = {
    init: () => {
        state = {...state};
        subject.next(state)
    },
    subscribe: setState => subject.subscribe(setState),
    reset: () => {
        state = {
            ...state,
            counter:0,
            min: 0,
            hours:0,
            onClicked:false,
        };
        subject.next(state);
    },
    wait: () => {
        clearInterval(state.interval);
        state = {
            ...state,
            onClicked:!state.onClicked,
        };
        subject.next(state);
    },
    resume:()=>{
        state = {
            ...state,
            onClicked:!state.onClicked,
            interval: setInterval(()=>{
                TimerService.tick();
            },1000),
        };
        subject.next(state);
    },
    start:()=>{
        state={
            ...state,
            onClicked:!state.onClicked,
            interval: setInterval(()=>{
                TimerService.tick();
            },1000),
        };
        subject.next(state)
    },
    stop:()=>{
        clearInterval(state.interval);
        state={
            ...state,
            onClicked:!state.onClicked,
            counter:0,
            min: 0,
            hours:0
        };
        subject.next(state)
    },
    tick:()=>{

        state={
            ...state,
            counter:state.counter+1,

        };
        if(state.counter %60 === 0){
            state.min += 1
            state.counter = 0
        }
        if(state.min %60 === 0 && state.min){
            state.hours += 1
            state.min=0
            if(state.hours === 24){
                state.hours = 0
            }
        }
        subject.next(state)
    },
    initialState
};

export default TimerService;