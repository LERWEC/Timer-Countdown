import Timer from './components/timer';
import { SButton, STime, baseTheme } from './assets/styles/style';
import { useCallback, useEffect, useMemo, useState, memo } from 'react';

export type TimeOptionsStatus = 'timer' | 'countdown' | 'main';

function App() {
    const [timeOptions, setTimerOptions] = useState<TimeOptionsStatus>('main');
    const handleUpdateTimeOptionsStatus = useCallback((value: TimeOptionsStatus) => {
        setTimerOptions(value);
    }, []);

    return (
        <div>
            {timeOptions === 'main' ? (
                <STime>
                    <SButton colorTimerButton={baseTheme.based} onClick={() => handleUpdateTimeOptionsStatus('timer')}>
                        Timer
                    </SButton>

                    <SButton
                        colorTimerButton={baseTheme.based}
                        onClick={() => handleUpdateTimeOptionsStatus('countdown')}
                    >
                        Countdown
                    </SButton>
                </STime>
            ) : (
                <div>
                    <SButton colorTimerButton={baseTheme.based} onClick={() => handleUpdateTimeOptionsStatus('main')}>
                        Go back
                    </SButton>
                    <Timer timeOptions={timeOptions} />
                </div>
            )}
        </div>
    );
}

export default App;
