import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import ffmpeg from "ffmpeg-static";
const source = "C:/Users/Ivdia/Downloads/HeroPRINCIPAL.mp4";
mkdirSync("public/media", { recursive: true });
mkdirSync("artifacts", { recursive: true });
if (process.argv.includes("--inspect")) {
  try {
    execFileSync(ffmpeg, ["-hide_banner", "-i", source], { stdio: "pipe" });
  } catch (e) {
    console.log(e.stderr.toString());
  }
  execFileSync(ffmpeg, [
    "-y",
    "-i",
    source,
    "-vf",
    "fps=1,scale=384:-1,tile=4x3",
    "-frames:v",
    "1",
    "artifacts/video-contact-sheet.jpg",
  ]);
} else {
  execFileSync(
    ffmpeg,
    [
      "-y",
      "-i",
      source,
      "-an",
      "-vf",
      "scale=1600:-2",
      "-c:v",
      "libx264",
      "-preset",
      "fast",
      "-crf",
      "21",
      "-g",
      "6",
      "-keyint_min",
      "6",
      "-sc_threshold",
      "0",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      "public/media/hero-scrub.mp4",
    ],
    { stdio: "inherit" },
  );
  for (const [name, time] of [
    ["hero-poster", 0.1],
    ["campaign-01", 2],
    ["campaign-02", 4],
    ["campaign-03", 6],
    ["campaign-04", 8],
  ]) {
    execFileSync(ffmpeg, [
      "-y",
      "-ss",
      String(time),
      "-i",
      source,
      "-frames:v",
      "1",
      "-vf",
      "scale=1600:-2",
      "-quality",
      "86",
      `public/media/${name}.webp`,
    ]);
  }
}
