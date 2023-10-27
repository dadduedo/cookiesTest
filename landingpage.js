// Get a Cookie
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); // Essere prudenti
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

// Set a Cookie
function setCookie(cName, cValue, expDays) {
    let date = new Date();
    date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
    const expires = "Expires=" + date.toUTCString();
    document.cookie = cName + "=" + JSON.stringify(cValue) + "; " + expires + "; Path=/; Domain=.start2impact.it; ";
}
// Get UTMParameters
function getUTMParameters() {
    let url = new URL(window.location);
    let search_params = url.searchParams;
    let utm_campaign = search_params.get('utm_campaign');
    let utm_medium = search_params.get('utm_medium');
    let utm_source = search_params.get('utm_source');
    return { utm_campaign, utm_medium, utm_source };
}

// Get the browser referrer
function getReferrer() {
    return document.referrer || null;
}
// Set UTM and ReferrarCookies
function setUtmAndReferrerCookies() {
    let cName = 'utm_parameters';
    let storedUTM = JSON.parse(getCookie(cName) || 'null');
    
    // Get the new UTM parameters from the querystring
    let { utm_campaign, utm_medium, utm_source } = getUTMParameters();

    // Get the browser referrer
    let referrer = getReferrer();

    // Combine new parameters with previously stored parameters
    if (storedUTM) {
        utm_campaign = utm_campaign || storedUTM.utm_campaign;
        utm_medium = utm_medium || storedUTM.utm_medium;
        utm_source = utm_source || storedUTM.utm_source;
    }

    // If there are UTM parameters or a referrer, set cookies
    if (utm_campaign || utm_medium || utm_source || referrer) {
        let expDays = 30;
        let landed_at = new Date().toLocaleString();
        let cValue = { utm_campaign, utm_medium, utm_source, referrer, landed_at };
        setCookie(cName, cValue, expDays);
    }
}

setUtmAndReferrerCookies();
