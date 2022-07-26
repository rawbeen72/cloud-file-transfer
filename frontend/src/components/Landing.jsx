import React from "react";
import { useNavigate } from "react-router-dom";
import fileSharing from "../assets/img/file-sharing.jpg";
const Landing = () => {
	const navigate = useNavigate();
	return (
		<div>
			<nav className="flex justify-between mt-1 md:ml-8 ">
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
			<main className="flex lg:flex-row flex-col lg:justify-between md:mt-10">
				<div className="max-w-xl lg:mt-20 xl:mt-36 sm:mt-10 mt-10 md:ml-20 ml-10">
					<h1
						style={{ fontFamily: "roboto slab" }}
						className="text-5xl mb-2 text-indigo-800 font-normal"
					>
						Cloud
					</h1>
					<h1
						style={{ fontFamily: "roboto slab" }}
						className="text-5xl mb-4 text-indigo-800 font-sans font-normal"
					>
						File Transfer
					</h1>
					<p className="text-gray-500 mb-4">
						Cloud file transfer is an online file sharing tool. It is an open
						source project and free to use for everyone.
					</p>
					<button
						className="bg-blue-600 rounded-full text-white px-5 py-1"
						onClick={() => navigate("/transfer")}
					>
						Transfer Files
					</button>
				</div>
				<div className="md:mt-0 mt-14">
					<img src={fileSharing} alt="" width={660} />
				</div>
			</main>
		</div>
	);
};

export default Landing;
