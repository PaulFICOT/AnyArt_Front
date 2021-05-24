import 'src/css/toggle.css';

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
