import React, { Component } from 'react';
//import { Debounce } from 'react-throttle';
import './App.css';
import MapInput from './MapInput.js';
import emojiList from './emojiList.json';
import { debounce, copyToClipBoard } from './helpers.js';
import Notifications, {notify} from 'react-notify-toast';


class App extends Component { 
    //constructor
    constructor (props) {
        super(props);
        //set states
        this.state = {
            list: [],
            input: '',
            currentEmoji: '',
            debouncedFunction: debounce(function (newArray){
                this.setState({
                    list: newArray
                });
            }, 750, this)
        }
        //setuping your own custom functions
        this.inputHandler = this.inputHandler.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
    }

    //method
    inputHandler (event) {
        //updating the state/value of input 
        let input = event.target.value.toLowerCase();

        let newEmojiList = emojiList.filter(function (emojiObject){
            if (emojiObject.keywords.includes(input)){
                if(input === '') return
                else return emojiObject
            }
        });

        this.setState({
            input : input
        });

        this.state.debouncedFunction(newEmojiList);

    }

    handleEmojiClick (event){
        let emoji = event.target.innerHTML;
        let emojiNode = event.target;

        // add CSS to current emoji
        emojiNode.style.backgroundColor = "skyBlue";
        this.setState({
            currentEmoji : emojiNode
        });  

        // remove CSS from current emojis
        if(this.state.currentEmoji){
            this.state.currentEmoji.removeAttribute('style');
        }

        copyToClipBoard(emoji);
        notify.show('Emoji Copied!');
    }

    render () {
        return (
            <div>
                <Notifications />
                <section className="hero is-small is-primary">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title">
                            👻💩🐔 &nbsp; Emoji Funtime! &nbsp; 😁😆😍
                            </h1>
                        </div>
                    </div>
                </section>

                <div className="main">
                    <input 
                        className="input"
                        placeholder="Type here to search for emoji"
                        onChange={this.inputHandler}
                        value={this.state.input}
                    />
                    <div id="filterEmojis">
                        {<MapInput 
                            parentState={this.state.list}
                            handleEmojiClick={this.handleEmojiClick}
                        />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;