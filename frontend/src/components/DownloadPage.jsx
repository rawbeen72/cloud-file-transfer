import React from "react";
import axios from "axios";
import async from "async";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FileDownload from "js-file-download";
import { IoMdCloudDownload } from "react-icons/io";
import { fileUrlMap } from "../utils/urlsMap";
import { ProgressBar } from "react-bootstrap";

let downloadUrls = [];

const DownloadPage = () => {
	const { id } = useParams();
	const [files, setFiles] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [downloadpercentage, setDownloadpercentage] = React.useState(0);
	useEffect(() => {
		const getFileData = () => {
			axios
				.get(`${process.env.REACT_APP_BASE_URL}/api/files/${id}`)
				.then((res) => {
					setFiles(res.data["file(s)"]);
				});
		};
		getFileData();
	}, []);
	const downloadMultipleFiles = async () => {
		setLoading(true);
		for (let file of files) {
			downloadUrls.push(
				`${process.env.REACT_APP_BASE_URL}/file/download/${file.uuid}`
			);
		}
		let i = 0;

		async.each(downloadUrls, (file, callback) => {
			axios
				.get(file, {
					responseType: "blob",
					onDownloadProgress: (progressEvent) => {
						const percentCompleted = Math.round(
							(progressEvent.loaded * 100) / progressEvent.total
						);
						setDownloadpercentage(percentCompleted);
					},
				})
				.then((res) => {
					FileDownload(res.data, files[i].fileName);

					setTimeout(() => {
						setDownloadpercentage(0);
					}, 4000);
					i++;
				});
		});
	};
	return (
		<div className="bg-[url('https://cdn.dribbble.com/users/24711/screenshots/3886002/falcon_persistent_connection_2x.gif')] bg-auto min-h-screen">
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
			<div className=" flex justify-center align-center lg:px-0 px-1 pt-4 md:pt-0">
				<div className="bg-white border-2 opacity-90 min-h-[80vh] 4xl:min-h-[60vh]   max-h-96 4xl:mt-24 lg-pt-0  4xl:w-4/12 lg:w-1/2 md:w-8/12 w-full rounded-lg p-4 flex flex-col justify-between">
					<img
						className="w-1/12 mx-auto"
						src="https://aux3.iconspalace.com/uploads/649488478459802787.png"
						alt=""
					/>
					<h1 className="text-lg text-center">
						{files.length === 1
							? "Your file is ready to download"
							: `Your files are ready to download`}
					</h1>
					<ProgressBar
						className="bg-transparent mb-2 md:mx-0  min-h-[12px]"
						animated
						now={downloadpercentage}
						label={`Downloading...${downloadpercentage} %`}
					/>
					<div className="px-2 rounded border-gray-400 border-2 overflow-auto">
						{files.map((file) => {
							return (
								<div>
									<hr />
									<img
										className="inline-block pr-2 pb-1"
										src={
											fileUrlMap[file.fileType] ||
											"https://icon-library.com/images/image-icon-png/image-icon-png-24.jpg"
										}
										alt=""
										width={30}
									/>
									<span>{file.fileName}</span>
								</div>
							);
						})}
					</div>
					<button
						className="mt-3 bg-blue-600 rounded-lg text-white px-2 py-2 w-1/2 mx-auto flex justify-center align-center gap-3 cursor-pointer"
						onClick={downloadMultipleFiles}
					>
						<span className="self-center text-xl">
							<IoMdCloudDownload />
						</span>
						<span className="self-center">
							{files.length > 1 ? "Download Files" : "Download File"}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default DownloadPage;
