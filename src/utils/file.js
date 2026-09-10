// 下载文件
export const downloadFile = (res) => {
    let url = window.URL.createObjectURL(new Blob([res.data]));
    const filename = res.headers['content-disposition'].split(';')[1].split('filename=')[1];
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = window.decodeURI(filename);
    document.body.appendChild(link);
    link.click();
};