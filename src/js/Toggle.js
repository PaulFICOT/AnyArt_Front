import 'src/css/toggle.css';

export default function Toggle(props) {

    return(
        <div>
            <label className="uk-switch" for="default-1">
                <input type="checkbox" id="default-1"/>
                <div class="uk-switch-slider"></div>
            </label>
        </div>
    );
}