const API = "http://firebase..."

export const submitLogin = (user, setMessage, navigate) => {
    const { mail, password } = user
    fetch(`${API}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: mail, password }),
    })
      .catch(err => {
        if (err instanceof TypeError)
          setMessage(`API offline: login not supported`)
        else setMessage(err.toString())
        return
      })
      .then(reponse => {
        if (!reponse) return
        reponse.json().then(response => {
          const { message, data } = response
          setMessage(message)
          if (data) {
            sessionStorage.setItem('user', JSON.stringify(response))
            navigate('/profile')
            window.location.reload()
          }
        })
      })
  }