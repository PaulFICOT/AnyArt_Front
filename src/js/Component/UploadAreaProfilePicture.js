import 'src/css/UploadArea.css';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UIkit from 'uikit';

export default function UploadAreaProfilePicture(props) {
	const { img, setFile } = props;
	const imageSelector = useRef(null);

	function loadFile(fileObject) {
		let image = new Image();
        var image_url = URL.createObjectURL(fileObject[0]);
        image.onload = function() {
			if (this.width === this.height) {
				img.current.src = URL.createObjectURL(fileObject[0]);
				setFile(fileObject[0]);
			} else {
				UIkit.notification({
					message: 'The profile photo must be a square image.',
					status: 'danger',
					pos: 'top-right',
					timeout: 5000
				});
			}
        };
        image.src = image_url;
	}

	function handleUpload(event) {
		loadFile(imageSelector.current.files);
	}

	function handleDrop(event) {
		event.preventDefault();

		if (event.dataTransfer.items) {
			const file = [];
			for (let item of event.dataTransfer.items) {
				if (item.kind === 'file') {
					file.push(item.getAsFile());
				}
			}
			loadFile(file);
		}
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	return (
		<div
			className="drop-area uk-card uk-card-secondary uk-card-body uk-flex uk-flex-middle uk-flex-around"
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			<FontAwesomeIcon icon={['fas', 'cloud-upload-alt']} size="4x" />
			<span className="uk-text-large">
				Drop a file or{' '}
				<span
					className="uk-button uk-button-text uk-text-large"
					data-uk-form-custom
				>
					<input
						type="file"
						accept="image/*"
						onChange={handleUpload}
						ref={imageSelector}
					/>
					select one
				</span>
			</span>
		</div>
	);
}
