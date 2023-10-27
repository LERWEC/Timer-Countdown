
interface Props {
    startTime: number,
    nowTime: number,
}

function Progress({ startTime, nowTime }: Props) {
    return <div>{100 - Math.floor(nowTime / startTime * 100)}%</div>;
}

export default Progress;
