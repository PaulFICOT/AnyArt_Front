import 'src/css/toggle.css';

/**
 * Component that shows a toggle with a specific id and text
 */
export default function Toggle(props) {

    function onChecked(event) {
        props.setToggle(props.id, event.target.checked);
    }

    return(
        <span>
			<div className="uk-item-text">{props.text}</div>
        <div>
            <label className="uk-switch" htmlFor={props.id}>
                <input type="checkbox" id={props.id} onChange={(event) => onChecked(event)}/>
                <div className="uk-switch-slider"></div>
            </label>
        </div>
        </span>
    );
}
