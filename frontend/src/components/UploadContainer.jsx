import React from "react";
import axios from "axios";
import { BsClipboard, BsClipboardCheck } from "react-icons/bs";
import { ProgressBar } from "react-bootstrap";
import { fileUrlMap } from "../utils/urlsMap";

const UploadContainer = () => {
	const [isDragged, setIsDragged] = React.useState(false);
	const [files, setFiles] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [uploadSuccess, setUploadSuccess] = React.useState(false);
	const [uploadPercentage, setUploadPercentage] = React.useState(0);
	const [isUploading, setIsUploading] = React.useState(false);
	const [isLinkCopied, setIsLinkCopied] = React.useState(false);
	const [fileLink, setFileLink] = React.useState("");
	const dragHandler = (e) => {
		e.preventDefault();
		setIsDragged(true);
		setUploadSuccess(false);
	};
	const dropHandler = (e) => {
		e.preventDefault();
		setIsDragged(false);
		setFiles(e.dataTransfer.files);
		setUploadSuccess(false);
	};
	const fileHandler = (e) => {
		setFiles(e.target.files);
		setUploadSuccess(false);
	};
	console.log(files);
	const copyClipboard = () => {
		const copyText = document.getElementById("input");
		copyText.select();
		copyText.setSelectionRange(0, 99999);
		navigator.clipboard.writeText(copyText.value);
		setIsLinkCopied(true);
	};
	const uploadFiles = async () => {
		if (!files.length) return;
		setUploadSuccess(false);
		setIsUploading(true);
		setLoading(true);
		const formData = new FormData();
		for (let i = 0; i < Object.keys(files).length; i++) {
			formData.append("files", files[i]);
		}
		await axios
			.post(`${process.env.REACT_APP_BASE_URL}/api/files`, formData, {
				onUploadProgress: (progressEvent) => {
					const percentCompleted = Math.round(
						(progressEvent.loaded * 100) / progressEvent.total
					);

					setUploadPercentage(percentCompleted);
				},
			})
			.then((res) => {
				if (res.status === 200) {
					setFileLink(`http://localhost:3000/files/download/${res.data.id}`);
					// }
					setLoading(false);
					setUploadSuccess(true);
					setTimeout(() => {
						setIsUploading(false);
					}, 4000);
					setTimeout(() => {
						setUploadPercentage(0);
					}, 2500);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="bg-[url('https://i.pinimg.com/originals/71/a7/5d/71a75dace5dd09eb98fb0bee98a85876.gif')] md:bg-cover bg-auto min-h-screen">
			<nav className="flex justify-between md:pb-2 lg:ml-8 ">
				<div className="flex text-blue-700 ml-10 mt-4 md:text-lg text-xl gap-2">
					<img
						src="https://img.apksum.com/ea/com.qksoft.sharefilemess/2.7/icon.png"
						alt=""
						width={40}
					/>
					<h3 className="font-sans :text-lg text-3xl">Cloud</h3>
					<span className="self-center">File Transfer</span>
				</div>
			</nav>
			<div className="flex lg:flex-row flex-col lg:justify-evenly align-center pb-6 lg:pb-0">
				<div className="bg-white md:pb-0 lg:mx-0 mx-2 pb-2 opacity-90 border-2 rounded-xl lg:max-h-96 mt-3">
					<h2 className="font-semibold my-2 mx-6 text-lg">Upload File</h2>

					<hr />
					<div
						className={`drag-container mt-6 mb-6 border-blue-500 border-dashed border-2 rounded-lg xl:mb-[3rem] md:px-32 mx-6 py-16 flex flex-col justify-center gap-2 ${
							isDragged && "dragged"
						}`}
						onDragOver={dragHandler}
						onDragLeave={() => setIsDragged(false)}
						onDrop={dropHandler}
					>
						<div className="img-container relative flex justify-center md:mt-10">
							<img
								className="self-center top-img z-index-2 "
								src="https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png"
								alt=""
								draggable="false"
								width={80}
							/>
							<img
								className="self-center bottom-img"
								src="https://www.kindpng.com/picc/m/261-2619141_cage-clipart-victorian-cloud-upload-icon-svg-hd.png"
								alt=""
								draggable="false"
								width={80}
							/>
						</div>
						<input
							multiple={true}
							onChange={fileHandler}
							type="file"
							name="file"
							id="file"
							className="d-none"
						/>
						<label
							htmlFor="file"
							className="text-blue-700 font-semibold text-xl self-center mt-10 cursor-pointer"
						>
							Select a file to upload
						</label>

						<p className="text-gray-600 self-center">
							or drag and drop it here
						</p>
					</div>
					<div className="flex justify-center">
						<button
							className={`w-1/2 bg-blue-700  border-green-400 border-2 rounded-lg mb-10 px-4 py-1 text-white text-md ${
								loading && "cursor-not-allowed opacity-80"
							}`}
							onClick={uploadFiles}
							disabled={loading}
						>
							Upload Files
						</button>
					</div>
					{
						<ProgressBar
							className="bg-transparent mb-2 mx-4 md:mx-0"
							animated
							now={uploadPercentage}
							label={`${
								loading ? `Uploading...${uploadPercentage} %` : "Upload Success"
							}`}
						/>
					}
					{/* copy to clipboard */}
					{uploadSuccess && (
						<div className="px-3 md:px-0">
							<span className="text-md mt-3 px-2 py-1 text-blue-700 ">
								Share Link:
							</span>

							<div className=" flex bg-gray-700 text-white mt-1 justify-center rounded gap-2">
								<input
									className="bg-blue-800 text-white rounded w-full px-2 py-1 focus:outline-none text-sm"
									type="text"
									name="input"
									id="input"
									readOnly={false}
									value={fileLink}
									onChange={() => setIsLinkCopied(false)}
								/>
								<span
									className="self-center cursor-pointer mr-2"
									onClick={copyClipboard}
								>
									{!isLinkCopied ? <BsClipboard /> : <BsClipboardCheck />}
								</span>
							</div>
						</div>
					)}
				</div>
				<div className="lg:max-w-xl md:px-0 px-2 md:mx-0 mx-2 lg:w-1/2 bg-white opacity-90  border-solid border-2 rounded-lg mt-3 ">
					<h2 className="font-semibold my-2 mx-6 text-lg">File(s) Info</h2>
					<hr />
					<div className="mt-6 max-h-96  overflow-auto px-2 rounded-lg">
						{files.length == 0 ? (
							<div className="flex flex-col text-xl align-center justify-center">
								<img
									className="-mt-4 self-center"
									src="https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
									alt=""
									width={200}
								/>
								<h4 className="self-center text-xl">No Files Uploaded...</h4>
							</div>
						) : (
							""
						)}
						{Object.keys(files).map((file, index) => {
							return (
								<div>
									<div className="flex ">
										<img
											className="my-2 mx-1 self-start"
											src={
												fileUrlMap[files[file].name.split(".")[1]] ||
												"https://icon-library.com/images/image-icon-png/image-icon-png-24.jpg"
											}
											alt=""
											width={20}
										/>
										<div className="flex gap-2 align-center">
											<p className="py-1 px-1" key={index}>
												{files[file].name}
											</p>

											{loading && (
												<img
													className="self-center -mt-4  rounded-full"
													src="https://cutewallpaper.org/21/loading-gif-transparent-background/Tag-For-Loading-Bar-Gif-Transparent-Loading-Gif-.gif"
													width={20}
													alt=""
												/>
											)}
											{uploadSuccess && (
												<img
													className="self-center -mt-4 rounded-full"
													src="https://toppng.com/uploads/preview/check-mark-html-done-icon-11563029359rpmvepeinu.png"
													width={17}
													alt=""
												/>
											)}
										</div>
									</div>
									<hr />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UploadContainer;
