import { spawn } from "node:child_process";

import { resolveExecutable } from "./executables.js";

type ResolveExecutableFn = (name: string, fallbackPaths?: string[]) => string | undefined;

type OpenUrlCommand = {
	command: string;
	args: string[];
};

export function getOpenUrlCommand(
	url: string,
	platform = process.platform,
	resolveCommand: ResolveExecutableFn = resolveExecutable,
): OpenUrlCommand | undefined {
	if (platform === "win32") {
		// Avoid `cmd /c start` — query strings contain `&`, which cmd treats as a
		// command separator, so OAuth URLs (e.g. Claude) open without `client_id`.
		return {
			command: "rundll32",
			args: ["url.dll,FileProtocolHandler", url],
		};
	}

	if (platform === "darwin") {
		const command = resolveCommand("open");
		return command ? { command, args: [url] } : undefined;
	}

	const command = resolveCommand("xdg-open");
	return command ? { command, args: [url] } : undefined;
}

export function openUrl(url: string): boolean {
	const command = getOpenUrlCommand(url);
	if (!command) {
		return false;
	}

	try {
		const child = spawn(command.command, command.args, {
			detached: true,
			stdio: "ignore",
			windowsHide: true,
		});
		child.on("error", () => {});
		child.unref();
		return true;
	} catch {
		return false;
	}
}
