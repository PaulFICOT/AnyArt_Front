import 'src/css/UploadArea.css';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function UploadArea(props) {
	const { imgs, setImgs, files, setFiles } = props;
	const imageSelector = useRef(null);

	function loadFiles(filesObject) {
		let tmpImgs = [];
		let tmpFiles = [];
		for (let file of filesObject) {
			const img = URL.createObjectURL(file);
			tmpImgs.push({
				thumbnail: img,
				original: img,
			});
			tmpFiles.push(file);
		}
		tmpImgs = tmpImgs.concat(imgs);
		tmpFiles = tmpFiles.concat(files);
		setImgs(tmpImgs);
		setFiles(tmpFiles);
	}

	function handleUpload(event) {
		loadFiles(imageSelector.current.files);
	}

	function handleDrop(event) {
		event.preventDefault();
		if (event.dataTransfer.items) {
			const files = [];
			for (let item of event.dataTransfer.items) {
				if (item.kind === 'file') {
					files.push(item.getAsFile());
				}
			}
			loadFiles(files);
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
						multiple
						onChange={handleUpload}
						ref={imageSelector}
					/>
					select one
				</span>
			</span>
		</div>
	);
}
