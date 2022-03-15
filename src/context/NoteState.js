import React, { useEffect, useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {
    const [allrides, setAllrides] = useState([])
    const [user, setUser] = useState({})
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([""])
    const [upcomingrides, setUpcomingrides] = useState([])
    const [pastrides, setPastrides] = useState([])

    const [stateinput, setStateinput] = useState("State")
    const [cityinput, setCityinput] = useState("City")

    const date = new Date()
    const datecompare = (str) => {
        const fdate = new Date((+str.slice(6, 10)), (+str.slice(0, 2)), (+str.slice(3, 5)), (+str.slice(11, 13)), (+str.slice(14, 16)), 0)
        if (date.getTime() <= fdate.getTime()) return 1;
        else if (date.getTime() > fdate.getTime()) return 0;
    }
    const datecomparepast = (str) => {
        const fdate = new Date((+str.slice(6, 10)), (+str.slice(0, 2)), (+str.slice(3, 5)), (+str.slice(11, 13)), (+str.slice(14, 16)), 0)
        if (date.getTime() > fdate.getTime()) return 1;
        else if (date.getTime() <= fdate.getTime()) return 0;
    }
    const fetchdata = async () => {
        try {
            const response = await fetch("https://assessment.api.vweb.app/user", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            })
            const json = await response.json()
            setUser(json)
        } catch (error) {
            console.log(error.message);
        }
        try {
            const response = await fetch("https://assessment.api.vweb.app/rides", {
                method: "GET",
                headers: {
                    'Content-Type': "application/json"
                }
            })
            const json = await response.json()
            setAllrides(json)
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        fetchdata()
    }, [])

    useEffect(() => {
        if (allrides) {
            // creating array of all states in data 
            const statearray = Array.from(new Set(allrides.map((ele) => { return ele.state })))
            setStates(statearray)

            // creating array of all cities in data 
            const cityarray = allrides.map((ele) => { return { city: ele.city, state: ele.state } })
            const arr = cityarray.filter((c, index, self) => {
                return index === self.findIndex((t) => { return t.city === c.city && t.state === c.state })
            })
            setCities(arr)

            // filtering upcoming rides according to state and cities selected
            setUpcomingrides(allrides.filter(ele => datecompare(ele.date)).filter((ele) => {
                if (stateinput !== "State" && cityinput !== "City") { return ele.state === stateinput && ele.city === cityinput }
                else if (stateinput !== "State" && cityinput === "City") {
                    return ele.state === stateinput
                }
                else if (stateinput === "State" && cityinput !== "City") {
                    return ele.city === cityinput
                }
                else return 1;
            }))
            // filtering past rides according to state and cities selected
            setPastrides(allrides.filter(ele => datecomparepast(ele.date)).filter((ele) => {
                if (stateinput !== "State" && cityinput !== "City") { return ele.state === stateinput && ele.city === cityinput }
                else if (stateinput !== "State" && cityinput === "City") {
                    return ele.state === stateinput
                }
                else if (stateinput === "State" && cityinput !== "City") {
                    return ele.city === cityinput
                }
                else return 1;
            }))
        }
    }, [allrides, stateinput, cityinput])

    return <NoteContext.Provider value={{
        allrides, setAllrides,
        user,
        cities, states,
        stateinput, setStateinput,
        cityinput, setCityinput,
        upcomingrides,
        pastrides
    }}>
        {props.children}
    </NoteContext.Provider>;
};

export default NoteState;
