import React,{ createRef,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import styled from "styled-components"

import { resetGame,addPlayerScore,newGame } from "../redux/gameReducer"
import Dice from "../components/Dice"
import Dialog from "../components/Dialog"

import "../styles/layout.css"
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
    const [modalWinOpen,setmodalWinOpen] = useState(false);
    const [activePlayer,setactivePlayer] = useState(Math.random() > 0.5 ? 0 : 1); // random start player
    var inter // interval timer

    const exit = () => {
        setmodalWinOpen(false)
        dispatch(resetGame())
    }

    const newgame = () => {
        setmodalWinOpen(false)
        dispatch(newGame())
    }
    const lookForWinner = () => {
        if (game.players[activePlayer].score + refVal.current >= game.settings.maxScore) {
            setmodalWinOpen(true)
        }
    }
    const run = () => {
        AnimateDice()
        setTimeout(() => {
            setshowDicevalue(true)

            // dispaly the value and swap the aactive user in 500ms
            setTimeout(() => {
                dispatch(addPlayerScore({
                    index: activePlayer,
                    score: refVal.current
                }))
                lookForWinner()
                if (refVal.current !== 6) setactivePlayer(activePlayer === 1 ? 0 : 1)
                setshowDicevalue(false)
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
    }

    return <div>
        {
            game.settings.winner !== null && <button onClick={newgame} className="primary">New game</button>
        }
        <Dice value={diceValue} />
        <Dialog
            isOpen={modalWinOpen}
            onClose={() => setmodalWinOpen(false)}
            content={<h1 className="dialog-title">{game.settings.winner} Wins !</h1> }
            footer={
                <>
                    <button onClick={newgame} className="primary">New game</button>
                    <button onClick={exit} className="primary">Exit</button>
                </>
            }
        />
        <FlexBox>
            <div className={`player-zone ${activePlayer === 0 ? "active" : ""}`}>
                <h1>{game.players[0].name}</h1>
                <p className="status"></p>
                <br />
                {showDicevalue && activePlayer === 0 && <p className="score-plus">+{diceValue}</p>}
                <p className="score">{game.players[0].score}</p>
                <button className={`${activePlayer === 0 ? "primary" : ""}`} disabled={activePlayer === 1 || game.settings.winner !== null} onClick={run}>Run</button>
            </div>
            <div className={`player-zone ${activePlayer === 1 ? "active" : ""}`}>
                <h1>{game.players[1].name}</h1>
                <p className="status"></p>
                <br />
                {showDicevalue && activePlayer === 1 && <p className="score-plus">+{diceValue}</p>}
                <p className="score">{game.players[1].score}</p>
                <button className={`${activePlayer === 1 ? "primary" : ""}`} disabled={activePlayer === 0 || game.settings.winner !== null} onClick={run}>Run</button>
            </div>
        </FlexBox>
    </div>
};
