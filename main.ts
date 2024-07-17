import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class CreateFileUnderFolder extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();
		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: 'create-file-under-folder',
			name: 'Create File Under Curretly Active Folder',
			callback: async () => {
				const { vault, workspace } = this.app;
				const activeFile = workspace.getActiveFile();
				const root = activeFile?.parent?.path;
				
				const file = await vault.create(`${root}/Untitled.md`, '');
				const leaf = workspace.getLeaf();
				await leaf.openFile(file);
			}
		});
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}