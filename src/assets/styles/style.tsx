import styled from 'styled-components';

const baseTheme = {
    based: '#2b2b2b',
    green: '#4caf50',
    red: '#f44336 ',
};

const STime = styled.div`
    gap: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
    padding-top: 100px;
`;

const STimeInput = styled.div`
    display: flex;
    flex-direction: column;
    div {
        display: flex;
        white-space: nowrap;

        input {
            border: none;
            width: 40px;
            border-radius: 0.25rem;
            border: 1px solid #bdbdbd;
            outline: 0;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            margin: 0 3px;
        }
    }
`;

const STimeCounter = styled.div<{ timerStatus: string }>`
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    display: flex;
    user-select: none;
    justify-content: center;
    border: 1px solid white;
    color: ${props =>
        props.timerStatus === 'play'
            ? baseTheme.green
            : props.timerStatus === 'stop'
            ? baseTheme.based
            : baseTheme.red};
    transition: all 400ms;
    width: 180px;
    height: 180px;
    flex-direction: column;
    margin-bottom: 15px;
    align-items: center;
    div {
        padding-bottom: 10px;
    }
`;

const SButton = styled.button<{ colorTimerButton: string }>`
    width: 100px;
    border-radius: 5px;
    color: black;
    margin: 0px 5px;
    padding: 2px;
    color: ${props => props.colorTimerButton};
    background-color: white;
    border: 1px solid ${props => props.colorTimerButton};
    cursor: pointer;

    &:hover {
        color: white;
        background-color: ${props => props.colorTimerButton};
    }
`;

export { STime, SButton, STimeCounter, STimeInput, baseTheme };
