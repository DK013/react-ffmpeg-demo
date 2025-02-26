import React, { useEffect, useRef, useState } from "react";
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
	Progressbar,
} from "framework7-react";
import { useFFmpeg } from "../hooks/useFFmpeg";

const HomePage = () => {
	const {
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
	} = useFFmpeg();

	useEffect(() => {
		loading ? f7.preloader.show() : f7.preloader.hide();
	}, [loading]);

	return (
		<Page
			name="home"
			onPageInit={() => {
				load();
				setArgs(["-codec", "copy"]);
			}}>
			<Navbar large>
				<NavTitle>React FFmpeg Demo</NavTitle>
				<NavTitleLarge>React FFmpeg Demo</NavTitleLarge>
			</Navbar>
			{/* Page content */}
			<Block>
				{loaded ? (
					<>
						{video && <video src={video} controls></video>}
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
								onChange={(e) => setFile(e.target.files[0])}
							/>
						</List>
						{progress ? (
							<>
								<Progressbar progress={progress} />
								<p
									style={{
										marginTop: "10px",
										width: "100%",
										textAlign: "center",
									}}>
									Time elapsed: {time}s
								</p>
							</>
						) : null}
						<Button
							fill
							onClick={transcode}
							disabled={!file}
							preloader
							loading={progress}>
							Transcode video to mp4
						</Button>
						<p>
							Open Developer Tools (Ctrl+Shift+I) to View Logs or render
							anywhere with logs state from the hook
						</p>
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
