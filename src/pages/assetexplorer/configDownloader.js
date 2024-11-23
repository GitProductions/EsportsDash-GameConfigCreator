
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const githubRepoPath = "https://api.github.com/repos/GitProductions/EsportsDashBoard/contents";
export const githubImages = "https://raw.githubusercontent.com/GitProductions/EsportsDashBoard/main/Game%20Configs";

export const downloadFolder = async (folderUrl, folderName) => {
  try {
    const response = await fetch(folderUrl);
    const files = await response.json();
    const zip = new JSZip();

    for (const file of files) {
      const fileResponse = await fetch(file.download_url);
      const fileData = await fileResponse.blob();
      zip.file(file.name, fileData);
    }

    const zipContent = await zip.generateAsync({ type: 'blob' });
    saveAs(zipContent, `${folderName}.zip`);
  } catch (error) {
    console.error('Error downloading folder:', error);
  }
};

export const fetchFiles = async (folderPath) => {
  try {
    const url = `${githubRepoPath}/${folderPath}`;
    const response = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } });
    if (!response.ok) throw new Error("Failed to fetch files.");
    const data = await response.json();
    return data.filter((file) => file.name.endsWith(".bgg"));
  } catch (err) {
    throw new Error(err.message);
  }
};

export const fetchFolders = async (repoPath) => {
  try {
    const url = `${githubRepoPath}/${repoPath}`;
    const response = await fetch(url, { headers: { Accept: "application/vnd.github.v3+json" } });
    if (!response.ok) throw new Error("Failed to fetch repository data.");
    const data = await response.json();
    const dirs = data.filter((item) => item.type === "dir");

    // Sort Deadlock and Splatoon to bottom
    dirs.sort((a, b) => {
      if (a.name === "Deadlock" || a.name === "Splatoon") return 1;
      if (b.name === "Deadlock" || b.name === "Splatoon") return -1;
      return 0;
    });

    return dirs;
  } catch (err) {
    throw new Error(err.message);
  }
};