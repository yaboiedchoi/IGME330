function downloadFile(url, callbackRef) {
    const xhr = new XMLHttpRequest();
    // set onerror
    xhr.onerror = (e) => console.log("error");

    // set onload
    xhr.onload = (e) => {
        const headers = e.target.getAllResponseHeaders();
        const jsonString = e.target.response;
        console.log(`headers = ${headers}`);
        console.log(`jsonString = ${jsonString}`);
        callbackRef(jsonString);
    };

    // open connection using get
    xhr.open("GET", url);

    // send request
    xhr.send();
}

export { downloadFile };