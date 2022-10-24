const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj);
        if (!response.ok) throw Error('Please reload the app');

    }

    catch (err) {
        errMsg = err.message

    }
    //finally will run regardless if we have a try or catch block 
    finally {
        return errMsg;
    }
}

export default apiRequest