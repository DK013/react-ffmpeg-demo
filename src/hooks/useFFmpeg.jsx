import { useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

export const useFFmpeg = () => {
	const [loading, setLoading] = useState(false);
	const [loaded, setLoaded] = useState(false);
	const [progress, setProgress] = useState(0);
	const [time, setTime] = useState(0);
	const [file, setFile] = useState(null);
	const [video, setVideo] = useState(null);
	const [args, setArgs] = useState([]);
	const [logs, setLogs] = useState([]);
	const ffmpegRef = useRef(new FFmpeg());

	const load = async () => {
		setLoading(true);
		const baseURL =
			import.meta.env.MODE === "production"
				? "https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm"
				: window.location.origin + "/ffmpeg";
		const ffmpeg = ffmpegRef.current;
		ffmpeg.on("log", ({ message }) => {
			setLogs((prevLogs) => [...prevLogs, message]);
			console.log(message);
		});
		ffmpeg.on("progress", ({ progress, time }) => {
			setProgress(Math.round(progress * 100));
			setTime(Math.round(time / 1000000000));
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
		setLoading(false);
	};

	const transcode = async () => {
		const ffmpeg = ffmpegRef.current;
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
		await ffmpeg.exec([
			"-i",
			inputFile,
			...args,
			"output.mp4",
		]);
		const data = await ffmpeg.readFile("output.mp4");
		setVideo(
			URL.createObjectURL(
				new Blob([data.buffer], {
					type: "video/mp4; codecs=avc1.42E01E,mp4a.40.2",
				})
			)
		);
		await ffmpeg.unmount(inputDir);
		await ffmpeg.deleteDir(inputDir);
	};

	return {
		loaded,
		loading,
		load,
		setFile,
		file,
		progress,
		time,
		transcode,
		setArgs,
		video,
	};
};
