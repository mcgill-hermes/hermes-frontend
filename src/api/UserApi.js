
//waiting to finish latter when backend is set up
export async function signingOut(successCallback, failCallback) {
    await fetch({
        method: 'POST',
        headers: {
            'Accept': '',
        }
    })
        .then(res => {
            if (res.status === 500 || res.status === 401) {
                failCallback(res.status)
            } else {
                res.json()
                    .then(jsonRes => {
                        if (res.status === 200) {
                            successCallback(jsonRes)
                        } else {
                            failCallback(res.status, jsonRes)
                        }
                    })
            }
        })
        .catch(error => console.log(error));
}
