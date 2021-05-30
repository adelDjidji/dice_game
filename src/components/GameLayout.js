import React,{ createRef,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import styled from "styled-components"

import { resetGame,addPlayerScore,runPlayer2 } from "../redux/gameReducer"
import Dice from "../components/Dice"
const FlexBox = styled.div`
display:flex;
justify-content: center;
`

const INTERVAL_DICE = 100 // time between generated random numbers
const ANIMATION_DURATION = 1000

export default function GameLayout() {
    const dispatch = useDispatch()
    const refVal = createRef()
    const game = useSelector(state => state.game)
    const [diceValue,setdiceValue] = useState(0);
    const [showDicevalue,setshowDicevalue] = useState(false);
    const [rollCounter,setRollCounter] = useState(0);
    const [activePlayer,setactivePlayer] = useState(Math.random() > 0.5 ? 0 : 1); // random start player
    var inter // interval timer

    const exit = () => {
        dispatch(resetGame())
    }

    const lookForWinner = () => {
        if (game.players[0].score >= game.settings.maxScore || game.players[1].score >= game.settings.maxScore){
            alert("Winner :"+game.settings.winner)
        } 
    }
    const run = () => {
        AnimateDice()
        setTimeout(() => {
            setshowDicevalue(true)
            dispatch(addPlayerScore({
                index: activePlayer,
                score: refVal.current
            }))
            setTimeout(() => {
                setactivePlayer(activePlayer === 1 ? 0 : 1)
                refVal.current = 0
                setshowDicevalue(false)
                setdiceValue(0)
                lookForWinner()
            },500)
            clearInterval(inter);
        },ANIMATION_DURATION)
    }


    function AnimateDice() {
        inter = setInterval(rolldice,INTERVAL_DICE)
    }

    function rolldice() {
        setRollCounter(rollCounter + 1)
        var ranNum = Math.floor(1 + Math.random() * 6);
        setdiceValue(ranNum)
        refVal.current = ranNum
        console.log("val",ranNum);
    }

    return <div>
        <button onClick={exit}>Exit</button>
        <hr />
        <Dice value={diceValue} />
        <FlexBox>
            <div className={`player-zone ${activePlayer === 0 ? "active" : ""}`}>
                <h1>{game.players[0].name}</h1>
                <p className="status"></p>
                <br />
                {showDicevalue && activePlayer === 0 && <p>+{diceValue}</p>}
                <p className="score">{game.players[0].score}</p>
                <button disabled={activePlayer === 1} onClick={run}>Run</button>
            </div>
            <div className={`player-zone ${activePlayer === 1 ? "active" : ""}`}>
                <h1>{game.players[1].name}</h1>
                <p className="status"></p>
                <br />
                {showDicevalue && activePlayer === 1 && <p>+{diceValue}</p>}
                <p className="score">{game.players[1].score}</p>
                <button disabled={activePlayer === 0} onClick={run}>Run</button>
            </div>
        </FlexBox>
    </div>
};
