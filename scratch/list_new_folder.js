async function listNewFolder() {
  const folderId = '1w2cq7tjOMj-r9J0vjGcgyjt-GL1s_nY0';
  const key = 'AIzaSyAWGrfCCr7albM3lmCc937gx4uIphbpeKQ';
  let allFiles = [];
  let pageToken = '';

  do {
    const pageParam = pageToken ? `&pageToken=${pageToken}` : '';
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=nextPageToken,files(id,name,mimeType,size)&pageSize=1000${pageParam}&key=${key}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok) {
      console.error('Error fetching files:', data);
      return;
    }
    allFiles = allFiles.concat(data.files || []);
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  console.log('Total files found in new folder:', allFiles.length);
  console.log('First 10 files:', allFiles.slice(0, 10));
  require('fs').writeFileSync('scratch/all_drive_files_new.json', JSON.stringify(allFiles, null, 2));
}

listNewFolder();
