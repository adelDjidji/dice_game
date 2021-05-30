import React,{ useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import styled from "styled-components"
import { saveSettings } from "../redux/gameReducer"

const Flex = styled.div`
display:flex;
gap:15px;
`
const Error = styled.p`
color:red;
`

const MIN_MAXSCORE = 7
export default function SettingsPanel() {
    const [playersnames,setplayersnames] = useState(["Player 1","Player 2"]);
    const [error,setError] = useState("");
    const [maxscore,setmaxscore] = useState();
    const dispatch = useDispatch()

    const handleChangeNames = (name,index) => {
        setplayersnames(playersnames.map((p,i) => {
            if (i === index) return name
            else return p
        }))
    }
    const handleSubmit = () => {
        if (!!playersnames[0] && playersnames[0]?.trim !== "" && !!playersnames[1] && playersnames[1]?.trim !== "")
            if (!maxscore || maxscore < MIN_MAXSCORE) {
                setError("Max Score must be greather than or equal to " + MIN_MAXSCORE)
                return
            }
        dispatch(saveSettings({
            maxScore: maxscore,
            player1: playersnames[0],
            player2: playersnames[1],
        }))
    }
    return <div>
        
        <div className="settings-container">
        <h2><b>Game settings</b></h2>
        {/* <hr /> */}
            {
                Array.isArray(playersnames) && playersnames.map((player,index) => <><Flex>
                    <b>Player {index + 1}</b>
                    <input type="text" onChange={(e) => {
                        handleChangeNames(e.target.value,index)
                    }} placeholder={`plyayer ${index + 1}`} value={player} />
                </Flex><br /></>)
            }
            <Flex>
                <b>Max score</b>
                <input type="number" min="0" onChange={(e) => {
                    setmaxscore(e.target.value)
                }} placeholder="max score" value={maxscore} />
            </Flex>
            <Error>{error}</Error>

            <button className="primary" onClick={handleSubmit}>Submit</button>
        </div>


    </div>
};
