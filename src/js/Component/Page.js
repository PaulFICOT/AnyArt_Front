/**
 * Component that adds css for the content of it
 */
export default function Page(props) {
	return (
		<div className="uk-container uk-container-large uk-container-center uk-margin-top uk-margin-large-bottom">
			{props.children}
		</div>
	);
}
