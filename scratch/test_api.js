async function testApiKey() {
  const folderId = '1riGT7AFG2nxM-5g7zDMzYaRckt5lcfaF';
  const keys = [
    'AIzaSyD_InbmSFufIEps5UAt2NmB_3LvBH3Sz_8',
    'AIzaSyB-cPcIPE_o4mYfAz0ebn_mMRcfxq5PXT4',
    'AIzaSyDKPo3lyh1TvNSku7gw7jDDlYr1zo7tHQs',
    'AIzaSyAWGrfCCr7albM3lmCc937gx4uIphbpeKQ',
    'AIzaSyC1qbk75NzWBvSaDh6KnsjjA9pIrP4lYIE',
    'AIzaSyCIGHYEdm91p31HKyJSoU4at7IqhCViXuA'
  ];

  for (const key of keys) {
    const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=nextPageToken,files(id,name,mimeType,size)&pageSize=1000&key=${key}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        console.log('SUCCESS with key:', key);
        console.log('Total files found:', data.files.length);
        console.log('First 5:', data.files.slice(0, 5));
        require('fs').writeFileSync('scratch/all_drive_files.json', JSON.stringify(data.files, null, 2));
        return;
      } else {
        console.log('Failed key:', key, data.error?.message);
      }
    } catch (e) {
      console.log('Error key:', key, e.message);
    }
  }
}

testApiKey();
