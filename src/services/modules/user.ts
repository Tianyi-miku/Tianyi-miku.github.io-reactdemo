import request from ".."
export function getUser(){
    return request.get({
        url: "/home/goodprice"
      })
}