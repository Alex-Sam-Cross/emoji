import React, { Component } from 'react';
//import { Debounce } from 'react-throttle';
import logo from './logo.svg';
import './App.css';
import Emojis from './Emojis.js';
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
              })
            }, 750, this)
        }
        //setuping your own custom functions
        this.inputHandler = this.inputHandler.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);
    }

    //method
    handleEmojiClick (event){
      var emoji = event.target.innerHTML;
      var emojiNode = event.target;

      // add CSS to current emoji
      emojiNode.style.backgroundColor = "skyBlue";
      this.setState({
        currentEmoji : emojiNode
      });  

      
      if(this.state.currentEmoji){
        this.state.currentEmoji.removeAttribute('style');
     }

      copyToClipBoard(emoji);
      notify.show('Emoji Copied!');
    }

    inputHandler (event) {
      //updating the state/value of input 
      var input = event.target.value.toLowerCase();

      var newEmojiList = emojiList.filter(function (emojiObject){
            if (emojiObject.keywords.includes(input)){
                if(input === '') return;
                else return emojiObject;
            }
      })

      this.setState({
        input : input
      })

      this.state.debouncedFunction(newEmojiList);
  
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
                        placeholder="Type something"
                        onChange={this.inputHandler}
                        value={this.state.input}
                    />
                    <div id="emojis">
                        {<Emojis 
                            parentState={this.state.list}
                            handleEmojiClick={this.handleEmojiClick}
                        />}
                    </div>
                </div>
            </div>
        )
    }
}

export default App;