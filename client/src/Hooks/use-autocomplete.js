import { useState } from 'react'

export default function useAutoComplete({ delay = 500, source, onChange, inputRef }) {
    
    const [myTimeout, setMyTimeOut] = useState(setTimeout(() => { }, 0))
    const [suggestions, setSuggestions] = useState([])
    const [isBusy, setBusy] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const [textValue, setTextValue] = useState({})

    function delayInvoke(cb) {
        if (myTimeout) {
            clearTimeout(myTimeout)
        }
        setMyTimeOut(setTimeout(cb, delay));
    }

    function selectOption(index, type) {
        if (index > -1) {
            onChange(suggestions[index])
            setTextValue({...textValue, [type]: suggestions[index].label})
        }
        clearSuggestions()
    }

    async function getSuggestions(searchTerm, type) {
        if (searchTerm && source) {
            const options = await source(searchTerm, type)
            setSuggestions(options)
        }
    }

    function clearSuggestions() {
        setSuggestions([])
        setSelectedIndex(-1)
    }

    function onTextChange(searchTerm, type) {
        setBusy(true)
        setTextValue({ ...textValue, [type]: searchTerm })
        clearSuggestions()
        delayInvoke(() => {
            getSuggestions(searchTerm, type)
            setBusy(false)
        });
    }

    return {
        bindOption: {
            onClick: e => {
                let nodes = Array.from(inputRef.current.children)
                selectOption(nodes.indexOf(e.target.closest("li")), inputRef.current.classList[0])
            },
        },
        bindInput: {
            onChange: e => onTextChange(e.target.value, e.target.getAttribute('name')),
        },
        isBusy,
        suggestions,
        selectedIndex,
        refResult: inputRef.current,
        textValue
    }
}