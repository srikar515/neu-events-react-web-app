//Utils file to commonly handle get,post and put requests
/**
 * Handles get calls for a particular url
 * @param {*} url 
 * @param {*} headers 
 * @returns retrieved data
 */
 export const get = async (url, headers={'Content-Type': 'application/json'}) =>{
    let res ;
    try {
      res = await fetch(url, {
        method: 'GET', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: headers,
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
      });
    const response = {status: res.status, data: await res.json()}
    return response;
    } catch (error) {
      throw new Error(error);
    }
     
  }
  
  /**
   * Handles post calls to a specific url
   * @param {*} url 
   * @param {*} body 
   * @param {*} headers 
   * @returns created entry object
   */
  
  export const post = async (url, body, headers={'Content-Type': 'application/json'}) =>{
    let res;
    try {
       res = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: headers,
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(body),
      });
    const response = {status: res.status, data: await res.json()}
    return response;
    } catch (error) {
      throw new Error(error);
    }
     
  }
  

  export const put = async (url, body, headers={'Content-Type': 'application/json'}) =>{
    let res;
    try {
       res = await fetch(url, {
        method: 'PUT', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: headers,
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
        body: JSON.stringify(body),
      });
    const response = {status: res.status, data: await res.json()}
    return response;
    } catch (error) {
      throw new Error(error);
    }
     
  }
  
  /**
   * Handles delete calls for a specific url
   * @param {*} url 
   * @param {*} headers 
   * @returns 
   */
  
  export const del = async (url, headers={'Content-Type': 'application/json'}) =>{
    let res;
    try {
      res = await fetch(url, {
        method: 'DELETE', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: headers,
        redirect: 'follow', 
        referrerPolicy: 'no-referrer', 
      });
    const response = {status: res.status, data: await res.json()}
    return response;
    } catch (error) {
      throw new Error(error);
    }
      
  }
  
  /**
   * Method to generate headers with commonly used headers and optional additional headers
   * @param {*} contentType 
   * @param {*} authorization 
   * @param {*} additionalHeaders 
   * @returns 
   */
  export const generateHeaders = (contentType= "application/json", authorization="bearer ",additionalHeaders={}) =>{
    return {
      'Content-Type': contentType,
      'Authentication': authorization,
      ...additionalHeaders
    }
  }
  