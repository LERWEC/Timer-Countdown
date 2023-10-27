import { SButton, baseTheme } from '../assets/styles/style';

interface ButtonMethod {
    timerStatus: string;
    counterTimer?: () => void;
}

function ButtonTimer(props: ButtonMethod) {
    return (
        <SButton
            colorTimerButton={props.timerStatus === 'play' ? baseTheme.based : baseTheme.green}
            onClick={props.counterTimer}
        >
            {props.timerStatus === 'reset' ? 'Запустить' : props.timerStatus === 'stop' ? 'Возобновить' : 'Пауза'}
        </SButton>
    );
}

export default ButtonTimer;
