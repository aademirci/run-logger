import { useState } from 'react'

const KEY_CODES = {
    "DOWN": 40,
    "UP": 38,
    "PAGE_DOWN": 34,
    "ESCAPE": 27,
    "PAGE_UP": 33,
    "ENTER": 13,
}

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

    const optionHeight = inputRef?.current?.children[0]?.clientHeight

    function scrollUp() {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1)
        }
        inputRef.current.scrollTop -= optionHeight
    }

    function scrollDown() {
        if (selectedIndex < suggestions.length - 1) {
            setSelectedIndex(selectedIndex + 1)
        }
        inputRef.current.scrollTop = selectedIndex * optionHeight
    }

    function pageDown() {
        setSelectedIndex(suggestions.length - 1)
        inputRef.current.scrollTop = suggestions.length * optionHeight
    }

    function pageUp() {
        setSelectedIndex(0)
        inputRef.current.scrollTop = 0
    }

    function onKeyDown(e) {
        const keyOperation = {
            [KEY_CODES.DOWN]: scrollDown,
            [KEY_CODES.UP]: scrollUp,
            [KEY_CODES.ENTER]: () => selectOption(selectedIndex, inputRef.current.classList[0]),
            [KEY_CODES.ESCAPE]: clearSuggestions,
            [KEY_CODES.PAGE_DOWN]: pageDown,
            [KEY_CODES.PAGE_UP]: pageUp,
        }
        if (keyOperation[e.keyCode]) {
            keyOperation[e.keyCode]()
        } else {
            setSelectedIndex(-1)
        }
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
            onKeyDown
        },
        isBusy,
        suggestions,
        selectedIndex,
        refResult: inputRef.current,
        textValue
    }
}