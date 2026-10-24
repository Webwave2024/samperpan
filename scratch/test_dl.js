async function testDownload() {
  const id = '1OSB3T-T_KazhUib-WthPqyiAuM_E8jwZ';
  const urls = [
    `https://lh3.googleusercontent.com/d/${id}`,
    `https://drive.google.com/uc?export=download&id=${id}`,
    `https://drive.usercontent.google.com/download?id=${id}&export=download`
  ];
  for (const u of urls) {
    try {
      const res = await fetch(u);
      console.log(u, 'status:', res.status, 'type:', res.headers.get('content-type'), 'size:', res.headers.get('content-length'));
      if (res.ok && res.headers.get('content-type')?.includes('image')) {
        const buffer = await res.arrayBuffer();
        require('fs').writeFileSync('test_img.jpg', Buffer.from(buffer));
        console.log('Successfully saved test_img.jpg! Size:', buffer.byteLength);
        break;
      }
    } catch (e) {
      console.error(u, 'error:', e.message);
    }
  }
}
testDownload();
