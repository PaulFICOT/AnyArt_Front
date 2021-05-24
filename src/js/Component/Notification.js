import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

export default function Notification(props) {
    const { content, is_read, crea_date, follower_user_id, post_id } = props.notif;
    const date = new Date(crea_date);
    const link = "/" + ((follower_user_id) ? `profils/${follower_user_id}` : `post/${post_id}`);

	return (
        <Link to={link} style={{ textDecoration: 'none', padding: '0 0 0 0' }}>
            <div className="notification uk-grid-collapse uk-flex uk-flex-middle" data-uk-grid>
                <div>
                    {(is_read === "0")  && <FontAwesomeIcon icon={['fas', 'circle']} />}
                </div>
                <div>
                    <div className="uk-text-normal uk-text-emphasis">
                        {content}
                    </div>
                    <div className="uk-text-meta uk-text-italic">
                        {date.toUTCString()}
                    </div>
                </div>
            </div>
        </Link>
	);
}
