import { STimeInput } from '../assets/styles/style';
import { useState } from 'react';

interface Props {
    setCounterMseconds: (a: number) => void;
}

function CountdownInput({ setCounterMseconds }: Props) {
    const [givenTime, setGivenTime] = useState<{ min: number | string; sec: number | string; slider: number }>({
        min: 0,
        sec: 0,
        slider: 0,
    });

    const onChengeTime = (value: string, typeTime: string) => {
        let msc = 0;
        if (typeTime === 'slider') {
            setGivenTime({
                min: Math.floor(Number(value) / 60),
                sec: Math.floor(Number(value) - Math.floor(Number(value) / 60) * 60),
                slider: Number(value),
            });
            msc = Number(value) * 100;
        } else {
            const valueTime = Number(value) < 0 ? 0 : value;
            msc =
                typeTime === 'min'
                    ? (Number(valueTime) * 60 + Number(givenTime.sec)) * 100
                    : (Number(givenTime.min) * 60 + Number(valueTime)) * 100;
            setGivenTime(
                typeTime === 'min'
                    ? {
                          min: Number(valueTime) > 720 ? 720 : valueTime,
                          sec: givenTime.sec,
                          slider: Number(valueTime) > 60 ? 3600 : Number(valueTime) * 60 + Number(givenTime.sec),
                      }
                    : {
                          min: givenTime.min,
                          sec: Number(valueTime) > 60 ? 60 : givenTime.min === 720 ? 0 : valueTime,
                          slider: Number(givenTime.min) * 60 + Number(valueTime),
                      }
            );
        }
        setCounterMseconds(msc);
    };

    return (
        <STimeInput>
            <div>
                min
                <input type='number' value={givenTime.min} onChange={e => onChengeTime(e.target.value, 'min')} />
                : sec
                <input type='number' value={givenTime.sec} onChange={e => onChengeTime(e.target.value, 'sec')} />
            </div>
            <input
                type='range'
                value={givenTime.slider}
                step='15'
                min='0'
                max='3600'
                onChange={e => onChengeTime(e.target.value, 'slider')}
            />
        </STimeInput>
    );
}

export default CountdownInput;
