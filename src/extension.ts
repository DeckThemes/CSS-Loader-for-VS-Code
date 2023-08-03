import * as path from "path";
import * as fs from 'fs';
import { homedir } from "os";
import { ConfigurationTarget, ExtensionContext, WorkspaceConfiguration, workspace } from "vscode";

const logoSvg = `
<svg width="512" height="512" viewBox="0 0 420 420" fill="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="roller_gradient" x1="171.562" y1="5" x2="171.562" y2="158.75" gradientUnits="userSpaceOnUse">
    <stop stop-color="#AC6BF0"></stop>
    <stop offset="0.65625" stop-color="#6883F7"></stop>
    <stop offset="1" stop-color="#179FFF"></stop>
  </linearGradient>
  <path
    d="M133.125 286.875C133.125 272.701 144.576 261.25 158.75 261.25V248.438C158.75 213.043 187.418 184.375 222.812 184.375H338.125C352.299 184.375 363.75 172.924 363.75 158.75V133.125V60.6543C393.619 71.2246 415 99.6523 415 133.125V158.75C415 201.191 380.566 235.625 338.125 235.625H222.812C215.766 235.625 210 241.391 210 248.438V261.25C224.174 261.25 235.625 272.701 235.625 286.875V389.375C235.625 403.549 224.174 415 210 415H158.75C144.576 415 133.125 403.549 133.125 389.375V286.875Z"
    fill="white"></path>
  <path
    d="M56.25 5C27.9824 5 5 27.9824 5 56.25V107.5C5 135.768 27.9824 158.75 56.25 158.75H286.875C315.143 158.75 338.125 135.768 338.125 107.5V56.25C338.125 27.9824 315.143 5 286.875 5H56.25Z"
    fill="url(#roller_gradient)"></path>
</svg>
`;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "css-loader-for-vs-code" is now active!');

  setMaterialIconAssociation();
}

// This method is called when your extension is deactivated
export function deactivate() {
  // TODO: remove the icon and file association here
}


const applySettings = (settings: any) => {
  if (!settings) {
    return // no settings, nothing to do
  }
  const workspaceSettings = workspace.getConfiguration()
  Object.keys(settings).forEach((k) => {
    workspaceSettings.update(k, settings[k], ConfigurationTarget.Global).then(undefined, (reason) => {
      console.log(
        `You tried to apply \`${ k }: ${ settings[k] }\` but this is not a valid VS Code settings
          key/value pair.`
      )
    })
  })
}

function setMaterialIconAssociation() {
  const materialUIConfiguration = workspace.getConfiguration('material-icon-theme');
	const fileConfiguration: WorkspaceConfiguration = materialUIConfiguration.get('files')!;
  const associations: any = fileConfiguration.associations;
  const cleaned = JSON.parse(JSON.stringify(associations));

  if (!Object.keys(cleaned).includes("theme.json")) {
    cleaned['theme.json'] = "../../icons/cssloader";

    applySettings({
      "material-icon-theme.files.associations": { ...cleaned }
    });
  }

  const extensionsDir = path.join(homedir(), ".vscode", "extensions");
  const iconsDir = path.join(extensionsDir, "icons");
  const iconpath = path.join(iconsDir, "cssloader.svg");
  
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir);
  if (!fs.existsSync(iconpath)) fs.writeFileSync(iconpath, logoSvg);
}