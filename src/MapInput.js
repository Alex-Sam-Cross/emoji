import React from 'react';

function MapInput (props) {
	return props.parentState.map(function(emojiObject,i){
		return (
			<span 
				key={i}
				class="singleEmoji"
				onClick={props.handleEmojiClick}
				>{emojiObject.symbol}</span>
		)
	})
}

export default MapInput;