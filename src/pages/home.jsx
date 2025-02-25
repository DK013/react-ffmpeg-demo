import React, { useRef, useState } from "react";
import {
	Page,
	Navbar,
	NavTitle,
	NavTitleLarge,
	Link,
	Toolbar,
	Block,
	Button,
	List,
	ListInput,
	f7,
} from "framework7-react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";

const HomePage = () => {
	const [loaded, setLoaded] = useState(false);
	const ffmpegRef = useRef(new FFmpeg());
	const videoRef = useRef(null);
	const messageRef = useRef(null);
	const [file, setFile] = useState(null);
	const load = async () => {
		f7.preloader.show();
    const baseURL = import.meta.env.MODE === "production" ? import.meta.env.BASE_URL + "/ffmpeg" : window.location.origin + "/ffmpeg"; //"https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm";
		const ffmpeg = ffmpegRef.current;
		ffmpeg.on("log", ({ message }) => {
			// messageRef.current.innerHTML = message;
			console.log(message);
		});
		ffmpeg.on("progress", ({ progress, time }) => {
			messageRef.current.innerHTML = `${Math.round(
				progress * 100
			)} % (transcoded time: ${Math.round(time / 1000000000)} s)`;
		});
		// toBlobURL is used to bypass CORS issue, urls with the same
		// domain can be used directly.
		await ffmpeg.load({
			coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, "text/javascript"),
			wasmURL: await toBlobURL(
				`${baseURL}/ffmpeg-core.wasm`,
				"application/wasm"
			),
			workerURL: await toBlobURL(
				`${baseURL}/ffmpeg-core.worker.js`,
				"text/javascript"
			),
		});
		setLoaded(true);
		f7.preloader.hide();
	};

	const transcode = async () => {
		const ffmpeg = ffmpegRef.current;
		// const fileData = new Uint8Array(await file.arrayBuffer());
    // await ffmpeg.writeFile(`input.${file.name.split(".")[1]}`, fileData);
    const inputDir = "/input";
		const inputFile = `${inputDir}/${file.name}`;
		await ffmpeg.createDir(inputDir);
		await ffmpeg.mount(
			"WORKERFS",
			{
				files: [file],
			},
			inputDir
		);
		await ffmpeg.exec(["-i", inputFile, "-codec", "copy", "output.mp4"]);
		const data = await ffmpeg.readFile("output.mp4");
		videoRef.current.src = URL.createObjectURL(
			new Blob([data.buffer], {
				type: "video/mp4; codecs=avc1.42E01E,mp4a.40.2",
			})
    );
    await ffmpeg.unmount(inputDir);
		await ffmpeg.deleteDir(inputDir);
	};

	const loadFile = (e) => {
		const file = e.target.files[0];
		console.log(file);
		if (file) {
			setFile(file);
		}
	};

	return (
		<Page name="home" onPageInit={load}>
			<Navbar large>
				<NavTitle>React FFmpeg Demo</NavTitle>
				<NavTitleLarge>React FFmpeg Demo</NavTitleLarge>
			</Navbar>
			{/* Page content */}
			<Block>
				{loaded ? (
					<>
						<video ref={videoRef} controls></video>
						<br />
						<List>
							<ListInput
								type="file"
								label="Select a file"
								accept={{
									"video/*": [
										".mp4",
										".m4v",
										".webm",
										".avi",
										".mkv",
										".mov",
										".wmv",
									],
								}}
								onChange={loadFile}
							/>
						</List>
						<Button fill onClick={transcode} disabled={!file}>
							Transcode video to mp4
						</Button>
						<p ref={messageRef}></p>
						<p>Open Developer Tools (Ctrl+Shift+I) to View Logs</p>
					</>
				) : (
					<Button fill onClick={load}>
						Load ffmpeg-core (~31 MB)
					</Button>
				)}
			</Block>
		</Page>
	);
};
export default HomePage;
