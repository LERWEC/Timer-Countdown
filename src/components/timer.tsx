import ButtonTimer from './buttonTimer';
import CountdownInput from './countdownInput';
import Progress from './progress';
import { TimeOptionsStatus } from '../app';
import { useCallback, useEffect, useMemo, useState, memo, useRef } from 'react';
import { STime, SButton, STimeCounter, baseTheme } from '../assets/styles/style';

type TimerStatus = 'stop' | 'play' | 'reset';

interface ITimerProps {
    timeOptions: TimeOptionsStatus;
}

let timerId: unknown;

function Timer(props: ITimerProps) {
    const [mseconds, setMseconds] = useState(0);
    const [counterMseconds, setCounterMseconds] = useState(0);
    const [timerStatus, setTimerStatus] = useState<TimerStatus>('reset');
    const [audio] = useState(
        new Audio(
            'https://allsoundsaround.com/wp-content/uploads/2020/12/zvuk-nepravilnogo-otveta-vkto-hochet-stat-millionerom-5270.mp3?_=6'
        )
    );
    const startTime = useRef(0);

    const renderTime = useMemo(() => {
        const min: number = Math.floor(mseconds / 6000);
        const sec: number = Math.floor(mseconds / 100 - min * 60);
        const msec: number = Math.floor(mseconds - Math.floor(mseconds / 100) * 100);

        return {
            min: min > 9 ? min : `0${min}`,
            sec: sec > 9 ? sec : `0${sec}`,
            msec: msec > 9 ? msec : `0${msec}`,
        };
    }, [mseconds]);

    const isTimerOption = useMemo(() => {
        return props.timeOptions === 'timer';
    }, [props.timeOptions]);

    useEffect(() => {
        switch (timerStatus) {
            case 'stop':
                if (typeof timerId === 'number') {
                    clearInterval(timerId);
                }

                break;
            case 'play':
                if (isTimerOption) {
                    timerId = setInterval(() => {
                        setMseconds(prev => prev + 10);
                    }, 100);
                } else {
                    if (mseconds === 0){
                        setMseconds(counterMseconds);
                        startTime.current = counterMseconds;
                    } 
                    
                    timerId = setInterval(() => {
                        setMseconds(prev => {    
                            if (prev === 0) {
                                handleUpdateTimerStatus('reset');
                                audio.play();
                                return prev;
                            }
                            return prev - 10;
                        });
                    }, 100);
                    setCounterMseconds(0);   
                }
                break;

            case 'reset':
                if (typeof timerId === 'number') {
                    clearInterval(timerId);
                }
                setMseconds(0);

                break;
            default:
                break;
        }
    }, [timerStatus]);

    const handleUpdateTimerStatus = useCallback((value: TimerStatus) => {
        setTimerStatus(value);
    }, []);

    return (
        <div>
            <STime>
                <STimeCounter timerStatus={timerStatus}>
                    <div>{isTimerOption ? 'Таймер' : 'Обратный отсчет'}</div>
                    {(isTimerOption || mseconds > 0) && (
                        <div>
                            {renderTime.min} : {renderTime.sec} {isTimerOption && <span>: {renderTime.msec}</span>}
                        </div>
                    )}
                    {!isTimerOption && mseconds === 0 && <CountdownInput setCounterMseconds={setCounterMseconds} />}
                    {!isTimerOption && mseconds > 0 && <Progress startTime={startTime.current} nowTime={mseconds} />}
                </STimeCounter>
                <div>
                    <ButtonTimer
                        timerStatus={timerStatus}
                        counterTimer={() =>
                            handleUpdateTimerStatus(['stop', 'reset'].includes(timerStatus) ? 'play' : 'stop')
                        }
                    />
                    <SButton colorTimerButton={baseTheme.red} onClick={() => handleUpdateTimerStatus('reset')}>
                        Сбросить
                    </SButton>
                </div>
            </STime>
        </div>
    );
}

export default memo(Timer);
