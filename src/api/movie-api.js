export const submitCode= (token,googleToken)=>{
    return fetch('/api/code/totp-validate',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
        body:JSON.stringify({secret:token,token:googleToken})
    }).then(res=>res.json())
};

export const getGoogleAuthKey= ()=>{
    return fetch('/api/code/totp-secret',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
    }).then(res=>res.json())
};





export const login= (username,password)=>{
    return fetch('/api/users',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
        body:JSON.stringify({username:username,password:password})
    }).then(res=>res.json())
};

export const reg= (username,password)=>{
    return fetch('/api/users?action=register',{
        headers:{
            'Content-Type':'application/json'
        },
        method:'post',
        body:JSON.stringify({username:username,password:password})
    }).then(res=>res.json())
};
export const getFavourite = (username) => {
    return fetch(
        `/api/users/${username}/favourites`,{headers: {
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };
    

export const addFavourite= (username,movieId)=>{
    return fetch(`/api/users/${username}/favourites`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method:'post',
        body:JSON.stringify({id:movieId})
    }).then(res=>res.json())
};

export const getMovies = () => {
    return fetch(
        `/api/movies?page=1&limit=10`
      ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
       throw error
    });
  };

  export const getMovie = (args) => {
    // console.log(args)
    const [, idPart] = args.queryKey;
    const { id } = idPart;
    return fetch(
      `/api/movies/${id}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error(response.json().message);
      }
      return response.json();
    })
    .catch((error) => {
      throw error
   });
  };


  export const getWatchList = (username) => {
    return fetch(
        `/api/users/${username}/watchlist`,{headers: {
            'Content-Type':'application/json',
            
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };

  
  


export const addWatchList= (username,movieId)=>{
    return fetch(`/api/users/${username}/watchlist`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method:'post',
        body:JSON.stringify({id:movieId})
    }).then(res=>res.json())
};

export const removeFavourite= (username,movieId)=>{
    return fetch(`/api/users/${username}/favourites`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method:'delete',
        body:JSON.stringify({id:movieId})
    }).then(res=>res.json())
};

export const removeWatchList= (username,movieId)=>{
    return fetch(`/api/users/${username}/watchlist`,{
        headers:{
            'Content-Type':'application/json',
            'Authorization': window.localStorage.getItem('token')
        },
        method:'delete',
        body:JSON.stringify({id:movieId})
    }).then(res=>res.json())
};

export const getReviews = (id) => {
    return fetch(
        `/api/movies/${id}/reviews`,{headers: {
            'Content-Type':'application/json',
            
         'Authorization': window.localStorage.getItem('token')
      }
    }
    ).then((res) => res.json());
  };