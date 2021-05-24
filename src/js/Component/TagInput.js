import React, { useRef } from 'react';
import 'src/css/TagInput.css';

/**
 * Component that shows all tags for the upload post
 */
export default function TagInput(props) {
	const tagContainer = useRef(null);
	const { tags, setTags, placeholder } = props;

	// Allow only alphabetic characters
	function preventUnWantedChar(event) {
		if (event.key.match(/^[A-Za-z ]$/g) == null) {
			event.preventDefault();
		}
	}

	/**
	 * Parse the tagContainer to show all tags
	 */
	function parseTags() {
		let words = tagContainer.current.textContent;
		const t = words.split(/\s/g);
		// the last element is either empty string or the currently typed word
		t.pop();
		setTags(t);
	}

	return (
		<div>
			<div
				className="uk-textarea"
				ref={tagContainer}
				onKeyPress={preventUnWantedChar}
				onInput={parseTags}
				placeholder={placeholder}
				contentEditable
			/>
			<div
				className="uk-input"
				style={{ cursor: 'text' }}
				onClick={event => tagContainer.current.focus()}
			>
				{tags.map((x, i) => (
					<span key={i} className="uk-label uk-margin-right">
						{x}
					</span>
				))}
			</div>
		</div>
	);
}
